// Pure Scroll-Driven Illustrated Resume Engine (Robby Leonardi Architecture)

import { ParallaxBackground } from './ParallaxBackground'
import { BIOMES, WORLD_LENGTH } from '../levels/levelData'
import { soundManager } from '../audio/SoundManager'
import { drawRobbyCharacter } from '../entities/RobbyCharacter'

export class ScrollEngine {
  constructor(canvas, callbacks = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.callbacks = callbacks

    this.width = canvas.width
    this.height = canvas.height

    // Scroll progress & smooth momentum physics
    this.scrollProgress = 0
    this.targetScrollProgress = 0
    this.scrollVelocity = 0
    this.worldX = 0
    this.cameraX = 0

    // Touch support
    this.touchStartY = 0
    this.isDragging = false

    // Animation & Avatar
    this.animTimer = 0
    this.stridePhase = 0
    this.isMoving = false
    this.facing = 'right'
    this.propellerAngle = 0
    this.isSubmarine = false
    this.isFlying = false

    // Entities
    this.bg = new ParallaxBackground()

    this.animationFrameId = null

    this.handleWheel = this.handleWheel.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)

    window.addEventListener('wheel', this.handleWheel, { passive: false })
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('touchstart', this.handleTouchStart, { passive: false })
    window.addEventListener('touchmove', this.handleTouchMove, { passive: false })
    window.addEventListener('touchend', this.handleTouchEnd)
  }

  resize(width, height) {
    this.width = width
    this.height = height
    this.canvas.width = width
    this.canvas.height = height
  }

  handleTouchStart(e) {
    if (e.touches && e.touches.length > 0) {
      this.touchStartY = e.touches[0].clientY
      this.isDragging = true
    }
  }

  handleTouchMove(e) {
    if (!this.isDragging || !e.touches || e.touches.length === 0) return
    e.preventDefault()
    const touchY = e.touches[0].clientY
    const deltaY = this.touchStartY - touchY
    this.touchStartY = touchY
    this.scrollVelocity += deltaY * 0.000035
  }

  handleTouchEnd() {
    this.isDragging = false
  }

  handleWheel(e) {
    e.preventDefault()
    let delta = e.deltaY
    if (e.deltaMode === 1) delta *= 20
    else if (e.deltaMode === 2) delta *= 250
    this.scrollVelocity += delta * 0.000025
  }

  handleKeyDown(e) {
    const keyVelocity = 0.0010
    if (e.code === 'ArrowRight' || e.code === 'ArrowDown' || e.code === 'KeyD' || e.code === 'KeyS') {
      this.scrollVelocity += keyVelocity
    } else if (e.code === 'ArrowLeft' || e.code === 'ArrowUp' || e.code === 'KeyA' || e.code === 'KeyW') {
      this.scrollVelocity -= keyVelocity
    }
  }

  setProgress(p) {
    this.targetScrollProgress = Math.max(0, Math.min(1, p))
    this.scrollVelocity = 0
  }

  jumpToBiome(biomeId) {
    const target = BIOMES.find((b) => b.id === biomeId)
    if (target) {
      this.targetScrollProgress = target.startX / WORLD_LENGTH
      this.scrollProgress = this.targetScrollProgress
      this.scrollVelocity = 0
      soundManager.playLevelComplete()
    }
  }

  start() {
    const loop = () => {
      this.update()
      this.draw()
      this.animationFrameId = requestAnimationFrame(loop)
    }
    this.animationFrameId = requestAnimationFrame(loop)
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
    window.removeEventListener('wheel', this.handleWheel)
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('touchstart', this.handleTouchStart)
    window.removeEventListener('touchmove', this.handleTouchMove)
    window.removeEventListener('touchend', this.handleTouchEnd)
  }

  update() {
    this.animTimer += 0.035

    // Smooth inertia physics
    this.targetScrollProgress = Math.max(
      0,
      Math.min(1, this.targetScrollProgress + this.scrollVelocity)
    )
    this.scrollVelocity *= 0.80

    const prevProgress = this.scrollProgress
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.055

    const delta = this.scrollProgress - prevProgress
    const speed = Math.abs(delta)
    this.isMoving = speed > 0.00005

    if (delta > 0.00005) {
      this.facing = 'right'
      this.stridePhase += speed * 95 + 0.04
      this.propellerAngle += speed * 120 + 0.08
    } else if (delta < -0.00005) {
      this.facing = 'left'
      this.stridePhase += speed * 95 + 0.04
      this.propellerAngle -= speed * 120 + 0.08
    }

    this.worldX = this.scrollProgress * WORLD_LENGTH
    this.cameraX = this.worldX

    // Mode transitions
    this.isSubmarine = this.worldX >= 3100 && this.worldX < 5800
    this.isFlying = this.worldX >= 7800

    const currentBiomeIdx = BIOMES.findIndex(
      (b) => this.worldX >= b.startX && this.worldX < b.endX
    )
    if (currentBiomeIdx !== -1 && this.callbacks.onLevelChange) {
      this.callbacks.onLevelChange(BIOMES[currentBiomeIdx])
    }

    const currentScore = Math.floor(this.scrollProgress * 10000)
    if (this.callbacks.onScoreUpdate) {
      this.callbacks.onScoreUpdate(currentScore)
    }

    this.bg.update()
  }

  draw() {
    const currentBiomeIdx = BIOMES.findIndex(
      (b) => this.worldX >= b.startX && this.worldX < b.endX
    )
    const currentBiome = BIOMES[currentBiomeIdx] || BIOMES[0]

    // 1. Draw Parallax Background & Sky
    this.bg.draw(this.ctx, this.width, this.height, this.cameraX, currentBiome)

    // 2. Draw Multi-Level Robby Leonardi Scenery
    this.drawWorldScenery(currentBiome)

    // 3. Draw Fixed Center Cartoon Avatar
    this.drawAvatar()
  }

  drawWorldScenery(currentBiome) {
    const groundY = this.height * 0.80
    const titleCenterX = this.width * 0.5 - this.cameraX

    // =========================================================================
    // 1. GROUND WITH TRIPLE CHEVRON TEXTURED EARTH SOIL (BOTTOM 20%)
    // =========================================================================
    this.ctx.save()
    // Lawn (#8bc34a)
    this.ctx.fillStyle = '#8bc34a'
    this.ctx.fillRect(0, groundY, this.width, 32)

    // Sawtooth trim (#7cb342)
    this.ctx.fillStyle = '#7cb342'
    for (let zx = -((this.cameraX) % 36); zx < this.width + 36; zx += 36) {
      this.ctx.beginPath()
      this.ctx.moveTo(zx, groundY + 32)
      this.ctx.lineTo(zx + 18, groundY + 46)
      this.ctx.lineTo(zx + 36, groundY + 32)
      this.ctx.closePath()
      this.ctx.fill()
    }

    // Soil Body (#795548)
    this.ctx.fillStyle = '#795548'
    this.ctx.fillRect(0, groundY + 32, this.width, this.height - groundY)

    // 2 Wavy Chevron Zig-Zag Soil Bands
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
    for (let row = 0; row < 2; row++) {
      const rowY = groundY + 56 + row * 40
      for (let zx = -((this.cameraX) % 36); zx < this.width + 36; zx += 36) {
        this.ctx.beginPath()
        this.ctx.moveTo(zx, rowY)
        this.ctx.lineTo(zx + 18, rowY + 16)
        this.ctx.lineTo(zx + 36, rowY)
        this.ctx.lineTo(zx + 36, rowY + 14)
        this.ctx.lineTo(zx + 18, rowY + 30)
        this.ctx.lineTo(zx, rowY + 14)
        this.ctx.closePath()
        this.ctx.fill()
      }
    }
    this.ctx.restore()

    // Title instruction prompt (Centered right below the avatar in the soil)
    if (this.cameraX < 900) {
      this.ctx.save()
      this.ctx.font = '900 17px "Arial", "Impact", sans-serif'
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = '#ffffff'
      this.ctx.shadowColor = 'rgba(0,0,0,0.65)'
      this.ctx.shadowBlur = 5
      this.ctx.fillText(
        'Scroll down mouse OR press keyboard\'s down-arrow',
        titleCenterX,
        groundY + 68
      )
      this.ctx.restore()
    }

    // =========================================================================
    // LEVEL 1: ROBBY LEONARDI SKILL PLANTS & MEASUREMENT BARS (X: 1800 - 3000)
    // =========================================================================
    this.drawGate(1700, 'LEVEL 1', '#e52d27', groundY)
    this.drawSkillPlants(2100, groundY)

    // =========================================================================
    // LEVEL 2: DEEP SEA SUBMARINE DIVE - WEBRTC & LOOTLO (X: 3200 - 5600)
    // =========================================================================
    this.drawGate(3200, 'LEVEL 2', '#0284c7')
    this.drawProjectShowcase(3700, {
      tag: 'FLAGSHIP WEBRTC APP',
      title: 'GHOST CALL',
      subtitle: 'Sub-40ms P2P Encrypted Video Call',
      desc: 'Built with pure WebRTC mesh topology, Socket.io signaling, and STUN/TURN relays with zero intermediary media lag.',
      stats: ['< 40ms Latency', 'AES-128 P2P', 'Mesh Network'],
      url: 'https://ghost-call-ten.vercel.app/',
    })

    this.drawProjectShowcase(4700, {
      tag: 'REAL-TIME MULTIPLAYER',
      title: 'LOOTLO',
      subtitle: 'Synchronized Game Room Engine',
      desc: 'Interactive multiplayer room management with bidirectional state synchronization, turn timers, and audio cues.',
      stats: ['100+ Rooms', '< 25ms Sync', 'Socket.io'],
      url: 'https://github.com/krishna23810',
    })

    // =========================================================================
    // LEVEL 3: WORKING EXPERIENCE - TRISX & SUBCIDYS SAAS (X: 5800 - 7600)
    // =========================================================================
    this.drawGate(5800, 'LEVEL 3', '#d97706')
    this.drawExperienceSection(6300, {
      dates: 'August 2024 - Present',
      company: 'TRISX TECHNOLOGIES',
      role: 'Full Stack Developer Intern (Subcidys MSME SaaS)',
      desc: 'Architected automated GST compliance invoicing, secured JWT authorization, webhook processors, and payment gateways with 99.9% uptime.',
      pieStats: [
        { label: 'BACKEND (Node/Postgres)', pct: 60, color: '#38bdf8' },
        { label: 'FRONTEND (React)', pct: 30, color: '#f59e0b' },
        { label: 'DEVOPS & CLOUD', pct: 10, color: '#22c55e' },
      ],
    })

    // =========================================================================
    // LEVEL 4: CLOUD AIRSHIP, APK & CONTACT (X: 7800 - 10500)
    // =========================================================================
    this.drawGate(7800, 'LEVEL 4', '#8b5cf6')
    this.drawProjectShowcase(8300, {
      tag: 'FLUTTER ANDROID APPLICATION',
      title: 'TRAVEL PLANNER',
      subtitle: 'Android Mobile App (55.37 MB APK)',
      desc: 'Intelligent destination guide, offline itinerary planner, and live weather forecast app built with Flutter and SQLite.',
      stats: ['55.37 MB APK', 'Android 8.0+', 'SQLite Sync'],
      url: '/TravelPlanner.apk',
      isDownload: true,
    })

    // Final Victory & Contact Cloud Form
    this.drawVictoryCastle(9600)
  }

  drawGate(startX, text, color, groundY) {
    const screenX = startX - this.cameraX
    if (screenX < -200 || screenX > this.width + 200) return
    const gY = groundY || this.height * 0.82

    this.ctx.save()
    // Gate Columns
    this.ctx.fillStyle = '#64748b'
    this.ctx.fillRect(screenX, gY - 180, 24, 180)
    this.ctx.fillRect(screenX + 136, gY - 180, 24, 180)

    // Gate Header Arch
    this.ctx.fillStyle = color
    this.ctx.fillRect(screenX - 8, gY - 210, 176, 36)

    // Gate Text
    this.ctx.fillStyle = '#ffffff'
    this.ctx.font = '900 16px monospace'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(text, screenX + 80, gY - 186)
    this.ctx.restore()
  }

  // Exact Robby Leonardi Vertical Skill Plant Measurement Stalks
  drawSkillPlants(startX, groundY) {
    const screenX = startX - this.cameraX
    if (screenX < -700 || screenX > this.width + 700) return
    const gY = groundY || this.height * 0.82

    this.ctx.save()
    // 5 Measurement Horizontal Reference Lines (EXPERT down to BEGINNER)
    const levels = ['EXPERT', 'ADVANCED', 'INTERMEDIATE', 'ELEMENTARY', 'BEGINNER']
    levels.forEach((lvl, idx) => {
      const lineY = gY - 220 + idx * 40
      this.ctx.fillStyle = '#64748b'
      this.ctx.font = 'bold 9px monospace'
      this.ctx.textAlign = 'left'
      this.ctx.fillText(lvl, screenX - 60, lineY + 3)

      this.ctx.strokeStyle = 'rgba(100, 116, 139, 0.25)'
      this.ctx.setLineDash([4, 4])
      this.ctx.lineWidth = 1
      this.ctx.beginPath()
      this.ctx.moveTo(screenX + 20, lineY)
      this.ctx.lineTo(screenX + 480, lineY)
      this.ctx.stroke()
    })
    this.ctx.setLineDash([])

    // 4 Growing Skill Plants (React, Node.js, WebRTC, PostgreSQL)
    const skills = [
      { name: 'REACT / VITE', height: 210, color: '#38bdf8' },
      { name: 'NODE.JS API', height: 185, color: '#22c55e' },
      { name: 'WEBRTC REALTIME', height: 175, color: '#e52d27' },
      { name: 'POSTGRESQL', height: 160, color: '#f59e0b' },
    ]

    skills.forEach((s, idx) => {
      const plantX = screenX + 70 + idx * 105
      const growthAnim = Math.min(1, Math.max(0, (this.cameraX - (startX - 500)) / 400))
      const currHeight = s.height * growthAnim

      // Plant Stalk (Stem)
      this.ctx.fillStyle = '#16a34a'
      this.ctx.fillRect(plantX - 4, groundY - currHeight, 8, currHeight)

      // Plant Head Flower / Bulb with Leaves
      this.ctx.fillStyle = s.color
      this.ctx.beginPath()
      this.ctx.arc(plantX, groundY - currHeight - 12, 14, 0, Math.PI * 2)
      this.ctx.fill()

      // Side Leaves
      this.ctx.fillStyle = '#22c55e'
      this.ctx.beginPath()
      this.ctx.ellipse(plantX - 12, groundY - currHeight / 2, 10, 5, -0.4, 0, Math.PI * 2)
      this.ctx.ellipse(plantX + 12, groundY - currHeight / 2 - 15, 10, 5, 0.4, 0, Math.PI * 2)
      this.ctx.fill()

      // Skill Ribbon Banner below
      this.ctx.fillStyle = '#dc2626'
      this.ctx.fillRect(plantX - 45, groundY + 30, 90, 22)
      this.ctx.fillStyle = '#ffffff'
      this.ctx.font = 'bold 8px monospace'
      this.ctx.textAlign = 'center'
      this.ctx.fillText(s.name, plantX, groundY + 44)
    })

    this.ctx.restore()
  }

  // Exact Robby Leonardi Experience Container with Animated Pie Chart
  drawExperienceSection(startX, exp) {
    const screenX = startX - this.cameraX
    if (screenX < -600 || screenX > this.width + 600) return
    const groundY = 480

    this.ctx.save()
    // Hanging Chain from top
    this.ctx.strokeStyle = '#94a3b8'
    this.ctx.lineWidth = 3
    this.ctx.beginPath()
    this.ctx.moveTo(screenX + 30, 0)
    this.ctx.lineTo(screenX + 30, 140)
    this.ctx.stroke()

    // Experience Card Box
    const cardY = 140
    const cardW = 460
    const cardH = 260

    this.ctx.fillStyle = '#ffffff'
    this.ctx.strokeStyle = '#e2e8f0'
    this.ctx.lineWidth = 3
    this.ctx.shadowColor = 'rgba(0,0,0,0.1)'
    this.ctx.shadowBlur = 15
    this.ctx.beginPath()
    this.ctx.roundRect(screenX, cardY, cardW, cardH, 16)
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.shadowBlur = 0

    // Dates & Company
    this.ctx.fillStyle = '#dc2626'
    this.ctx.font = 'bold 11px monospace'
    this.ctx.textAlign = 'left'
    this.ctx.fillText(exp.dates, screenX + 25, cardY + 30)

    this.ctx.fillStyle = '#0f172a'
    this.ctx.font = '900 18px sans-serif'
    this.ctx.fillText(exp.company, screenX + 25, cardY + 54)

    this.ctx.fillStyle = '#64748b'
    this.ctx.font = 'bold 11px sans-serif'
    this.ctx.fillText(exp.role, screenX + 25, cardY + 74)

    this.wrapText(exp.desc, screenX + 25, cardY + 98, 240, 15)

    // Animated Pie Chart (Robby Leonardi Robot/Pie Chart)
    const pieCenterX = screenX + 360
    const pieCenterY = cardY + 110
    const pieRadius = 55

    let startAngle = -Math.PI / 2
    exp.pieStats.forEach((stat) => {
      const sliceAngle = (stat.pct / 100) * Math.PI * 2
      this.ctx.fillStyle = stat.color
      this.ctx.beginPath()
      this.ctx.moveTo(pieCenterX, pieCenterY)
      this.ctx.arc(pieCenterX, pieCenterY, pieRadius, startAngle, startAngle + sliceAngle)
      this.ctx.closePath()
      this.ctx.fill()
      startAngle += sliceAngle
    })

    // Pie Chart Legend
    let legendY = cardY + 185
    exp.pieStats.forEach((stat) => {
      this.ctx.fillStyle = stat.color
      this.ctx.fillRect(screenX + 25, legendY, 12, 12)

      this.ctx.fillStyle = '#1e293b'
      this.ctx.font = 'bold 10px monospace'
      this.ctx.fillText(`${stat.label} - ${stat.pct}%`, screenX + 45, legendY + 10)
      legendY += 20
    })

    this.ctx.restore()
  }

  drawProjectShowcase(startX, project) {
    const screenX = startX - this.cameraX
    if (screenX < -500 || screenX > this.width + 500) return

    const cardY = 140
    const cardW = 380
    const cardH = 270

    this.ctx.save()
    this.ctx.fillStyle = '#ffffff'
    this.ctx.strokeStyle = '#38bdf8'
    this.ctx.lineWidth = 3
    this.ctx.shadowColor = 'rgba(0,0,0,0.15)'
    this.ctx.shadowBlur = 20
    this.ctx.beginPath()
    this.ctx.roundRect(screenX, cardY, cardW, cardH, 20)
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.shadowBlur = 0

    // Top Tag
    this.ctx.fillStyle = '#0284c7'
    this.ctx.font = 'bold 10px monospace'
    this.ctx.textAlign = 'left'
    this.ctx.fillText(project.tag, screenX + 25, cardY + 30)

    // Title
    this.ctx.fillStyle = '#0f172a'
    this.ctx.font = '900 24px sans-serif'
    this.ctx.fillText(project.title, screenX + 25, cardY + 62)

    // Subtitle
    this.ctx.fillStyle = '#64748b'
    this.ctx.font = 'bold 12px sans-serif'
    this.ctx.fillText(project.subtitle, screenX + 25, cardY + 84)

    // Description text
    this.ctx.fillStyle = '#334155'
    this.ctx.font = '11px sans-serif'
    this.wrapText(project.desc, screenX + 25, cardY + 110, cardW - 50, 16)

    // Stats Grid
    let statX = screenX + 25
    for (const stat of project.stats) {
      this.ctx.fillStyle = '#f1f5f9'
      this.ctx.beginPath()
      this.ctx.roundRect(statX, cardY + 165, 100, 32, 8)
      this.ctx.fill()

      this.ctx.fillStyle = '#0284c7'
      this.ctx.font = 'bold 10px monospace'
      this.ctx.textAlign = 'center'
      this.ctx.fillText(stat, statX + 50, cardY + 185)
      statX += 112
    }

    // Action Button at Bottom
    this.ctx.fillStyle = '#f59e0b'
    this.ctx.beginPath()
    this.ctx.roundRect(screenX + 25, cardY + 215, cardW - 50, 36, 10)
    this.ctx.fill()

    this.ctx.fillStyle = '#000000'
    this.ctx.font = 'black 12px monospace'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      project.isDownload ? '⬇ CLICK TO DOWNLOAD APK' : '🔗 CLICK TO EXPLORE PROJECT',
      screenX + cardW / 2,
      cardY + 238
    )

    this.ctx.restore()
  }

  drawVictoryCastle(startX) {
    const screenX = startX - this.cameraX
    if (screenX < -600 || screenX > this.width + 600) return

    const cardY = 120
    const cardW = 420
    const cardH = 310

    this.ctx.save()
    this.ctx.fillStyle = '#ffffff'
    this.ctx.strokeStyle = '#f59e0b'
    this.ctx.lineWidth = 4
    this.ctx.beginPath()
    this.ctx.roundRect(screenX, cardY, cardW, cardH, 20)
    this.ctx.fill()
    this.ctx.stroke()

    // Title
    this.ctx.fillStyle = '#dc2626'
    this.ctx.font = '900 24px sans-serif'
    this.ctx.textAlign = 'center'
    this.ctx.fillText('MISSION COMPLETE! 🏆', screenX + cardW / 2, cardY + 40)

    this.ctx.fillStyle = '#475569'
    this.ctx.font = '12px sans-serif'
    this.ctx.fillText('Ready to build high-impact real-time systems together.', screenX + cardW / 2, cardY + 68)

    // Contact info
    this.ctx.fillStyle = '#0f172a'
    this.ctx.font = 'bold 13px monospace'
    this.ctx.fillText('📧 agrawall.krishna08@gmail.com', screenX + cardW / 2, cardY + 110)
    this.ctx.fillText('📱 +91-9669070394', screenX + cardW / 2, cardY + 140)
    this.ctx.fillText('💼 linkedin.com/in/krishnakant-agrawal-811a4b289', screenX + cardW / 2, cardY + 170)

    // Action button
    this.ctx.fillStyle = '#22c55e'
    this.ctx.beginPath()
    this.ctx.roundRect(screenX + 40, cardY + 230, cardW - 80, 44, 12)
    this.ctx.fill()

    this.ctx.fillStyle = '#ffffff'
    this.ctx.font = 'black 14px monospace'
    this.ctx.fillText('✉️ SEND MESSAGE / HIRE', screenX + cardW / 2, cardY + 258)

    this.ctx.restore()
  }

  wrapText(text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ')
    let line = ''
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' '
      const metrics = this.ctx.measureText(testLine)
      const testWidth = metrics.width
      if (testWidth > maxWidth && n > 0) {
        this.ctx.fillText(line, x, y)
        line = words[n] + ' '
        y += lineHeight
      } else {
        line = testLine
      }
    }
    this.ctx.fillText(line, x, y)
  }

  drawAvatar() {
    const screenX = this.width * 0.5
    const groundY = this.height * 0.80
    const avatarY = this.isSubmarine ? groundY - 140 + Math.sin(this.animTimer * 2) * 12 : groundY - 68

    this.ctx.save()
    this.ctx.translate(screenX, avatarY)
    // Scale avatar to 1.4x to match Robby Leonardi's hero presence
    this.ctx.scale(1.4, 1.4)

    if (this.facing === 'left') {
      this.ctx.scale(-1, 1)
    }

    if (this.isSubmarine) {
      // ROBBY LEONARDI YELLOW SUBMARINE
      this.ctx.fillStyle = '#facc15'
      this.ctx.strokeStyle = '#ca8a04'
      this.ctx.lineWidth = 2.5
      this.ctx.beginPath()
      this.ctx.ellipse(0, 4, 32, 22, 0, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.stroke()

      // Cockpit
      this.ctx.fillStyle = '#67e8f9'
      this.ctx.strokeStyle = '#0891b2'
      this.ctx.lineWidth = 2
      this.ctx.beginPath()
      this.ctx.arc(0, -8, 15, Math.PI, 0)
      this.ctx.fill()
      this.ctx.stroke()

      this.ctx.fillStyle = '#ef4444'
      this.ctx.beginPath()
      this.ctx.arc(0, -11, 8, 0, Math.PI * 2)
      this.ctx.fill()

      // Periscope
      this.ctx.fillStyle = '#ef4444'
      this.ctx.fillRect(4, -26, 4, 14)
      this.ctx.fillRect(4, -26, 9, 4)

      // Propeller
      this.ctx.save()
      this.ctx.translate(-32, 4)
      this.ctx.rotate(this.propellerAngle)
      this.ctx.fillStyle = '#ef4444'
      this.ctx.fillRect(-2, -16, 4, 32)
      this.ctx.restore()
    } else {
      const bounceY = this.isMoving ? Math.sin(this.stridePhase) * 4 : 0
      drawRobbyCharacter(this.ctx, bounceY, this.isMoving, this.stridePhase)
    }

    this.ctx.restore()
  }
}

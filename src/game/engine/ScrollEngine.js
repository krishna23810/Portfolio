import { ParallaxBackground } from './ParallaxBackground'
import { BIOMES, WORLD_LENGTH } from '../levels/levelData'
import { soundManager } from '../audio/SoundManager'
import { drawRobbyCharacter } from '../entities/RobbyCharacter'
import plantSkillSrc from '../../assets/plant-skill.png'
import gateSrc from '../../assets/gate.png'
import grassEdgeSrc from '../../assets/grass-edge.png'
import groundSrc from '../../assets/ground.png'
import titleAboutSrc from '../../assets/title-about.png'
import treeBushSrc from '../../assets/tree-bush.png'
import treeDarkSrc from '../../assets/tree-dark.png'
import treeMedSrc from '../../assets/tree-medium.png'
import treeSrc from '../../assets/tree.png'
import treePillSrc from '../../assets/tree-pill.png'

const plantSkillImg = new Image()
plantSkillImg.src = plantSkillSrc

const gateImg = new Image()
gateImg.src = gateSrc

const grassEdgeImg = new Image()
grassEdgeImg.src = grassEdgeSrc

const groundImg = new Image()
groundImg.src = groundSrc

const titleAboutImg = new Image()
titleAboutImg.src = titleAboutSrc

const treeBushImg = new Image()
treeBushImg.src = treeBushSrc

const treeDarkImg = new Image()
treeDarkImg.src = treeDarkSrc

const treeMedImg = new Image()
treeMedImg.src = treeMedSrc

const treeImg = new Image()
treeImg.src = treeSrc

const treePillImg = new Image()
treePillImg.src = treePillSrc

export class ScrollEngine {
  constructor(canvas, callbacks = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.callbacks = callbacks

    this.dpr = Math.min(window.devicePixelRatio || 1, 2.5)
    this.width = canvas.width / this.dpr || window.innerWidth
    this.height = canvas.height / this.dpr || window.innerHeight

    // Scroll progress & smooth momentum physics
    this.scrollProgress = 0
    this.targetScrollProgress = 0
    this.scrollVelocity = 0
    this.worldX = 0
    this.cameraX = 0

    // Touch support
    this.touchStartY = 0
    this.isDragging = false

    // Animation, Loading & Avatar Entrance
    this.animTimer = 0
    this.stridePhase = 0
    this.isMoving = false
    this.facing = 'right'
    this.propellerAngle = 0
    this.isSubmarine = false
    this.isFlying = false

    // Robby Leonardi In-Scene Loading & Falling Drop
    this.isLoading = true
    this.loadingTimer = 0
    this.cameraY = canvas.height * 0.85 // Camera starts up in sky, hiding ground & title initially
    this.targetCameraY = canvas.height * 0.85
    this.characterDropY = -200 // Starts just above sky for smooth visible descent
    this.characterVelocityY = 0
    this.hasLanded = false

    // One-time Skill Plant Growth Animation
    this.plantGrowths = [0, 0, 0, 0]
    this.plantGrowthTriggered = false
    this.plantAnimTimer = 0

    // Robby Autonomous 1-Time Jump Animation
    this.hasJumpedUp = false
    this.hasJumpedDown = false
    this.isAutoJumpingUp = false
    this.isAutoJumpingDown = false
    this.jumpAnimProgress = 0
    this.charElevationY = 0
    this.isJumping = false

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

  resize(width, height, dpr = Math.min(window.devicePixelRatio || 1, 2.5)) {
    this.dpr = dpr
    this.width = width
    this.height = height
    if (this.isLoading) {
      this.cameraY = height * 0.85
      this.targetCameraY = height * 0.85
    }
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

    // Smooth scroll inertia
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

    // One-time Skill Plant Growth Trigger when entering Level 1 skills
    if (this.cameraX >= 2900) {
      this.plantGrowthTriggered = true
    }
    if (this.plantGrowthTriggered) {
      this.plantAnimTimer += 1
      for (let i = 0; i < 4; i++) {
        const delay = i * 8 // 8 frames staggered delay per plant
        if (this.plantAnimTimer >= delay && this.plantGrowths[i] < 1) {
          this.plantGrowths[i] = Math.min(1, this.plantGrowths[i] + 0.028)
        }
      }
    }

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

    // =========================================================================
    // BIDIRECTIONAL AUTONOMOUS JUMP PLATFORM SYSTEM (Forward & Backward)
    // =========================================================================
    const charWorldX = this.worldX + this.width * 0.5
    const platX = 4640
    const platW = 420
    const platH = 120

    const isScrollingLeft = delta < -0.00005
    const isScrollingRight = delta > 0.00005

    // --- FORWARD MOTION (Moving Right) ---
    if (isScrollingRight && !this.isAutoJumpingUp && !this.isAutoJumpingDown) {
      // 1. Forward Jump-Up onto platform from left lawn
      if (charWorldX >= platX - 55 && charWorldX < platX + 40 && !this.hasJumpedUp) {
        this.isAutoJumpingUp = true
        this.hasJumpedUp = true
        this.jumpAnimProgress = 0
        this.jumpDirection = 'right'
        this.jumpStartX = this.scrollProgress
        this.jumpTargetX = (platX + 70 - this.width * 0.5) / WORLD_LENGTH
      }

      // 2. Forward Jump-Down off platform right ledge to right lawn
      if (charWorldX >= platX + platW - 20 && this.hasJumpedUp && !this.hasJumpedDown) {
        this.isAutoJumpingDown = true
        this.hasJumpedDown = true
        this.jumpAnimProgress = 0
        this.jumpDirection = 'right'
        this.jumpStartX = this.scrollProgress
        this.jumpTargetX = (platX + platW + 80 - this.width * 0.5) / WORLD_LENGTH
      }
    }
    // --- BACKWARD MOTION (Moving Left) ---
    else if (isScrollingLeft && !this.isAutoJumpingUp && !this.isAutoJumpingDown) {
      // 1. Backward Jump-Up onto platform from right lawn
      if (charWorldX <= platX + platW + 55 && charWorldX > platX + platW - 40 && this.hasJumpedDown) {
        this.isAutoJumpingUp = true
        this.hasJumpedDown = false
        this.jumpAnimProgress = 0
        this.jumpDirection = 'left'
        this.jumpStartX = this.scrollProgress
        this.jumpTargetX = (platX + platW - 70 - this.width * 0.5) / WORLD_LENGTH
      }

      // 2. Backward Jump-Down off platform left ledge to left lawn
      if (charWorldX <= platX + 20 && this.hasJumpedUp && !this.hasJumpedDown) {
        this.isAutoJumpingDown = true
        this.hasJumpedUp = false
        this.jumpAnimProgress = 0
        this.jumpDirection = 'left'
        this.jumpStartX = this.scrollProgress
        this.jumpTargetX = (platX - 70 - this.width * 0.5) / WORLD_LENGTH
      }
    }

    // --- ANIMATE ACTIVE JUMPS (Target Interpolated) ---
    if (this.isAutoJumpingUp) {
      this.jumpAnimProgress += 0.045
      this.isJumping = true

      const p = Math.min(1, this.jumpAnimProgress)
      this.scrollProgress = this.jumpStartX + (this.jumpTargetX - this.jumpStartX) * p
      this.targetScrollProgress = this.scrollProgress
      this.worldX = this.scrollProgress * WORLD_LENGTH
      this.cameraX = this.worldX

      const arc = Math.sin(p * Math.PI) * 140
      this.charElevationY = platH * p + arc

      if (this.jumpAnimProgress >= 1) {
        this.isAutoJumpingUp = false
        this.charElevationY = platH
        this.isJumping = false
      }
    } else if (this.isAutoJumpingDown) {
      this.jumpAnimProgress += 0.045
      this.isJumping = true

      const p = Math.min(1, this.jumpAnimProgress)
      this.scrollProgress = this.jumpStartX + (this.jumpTargetX - this.jumpStartX) * p
      this.targetScrollProgress = this.scrollProgress
      this.worldX = this.scrollProgress * WORLD_LENGTH
      this.cameraX = this.worldX

      const arc = Math.sin(p * Math.PI) * 60
      this.charElevationY = platH * (1 - p) + arc

      if (this.jumpAnimProgress >= 1) {
        this.isAutoJumpingDown = false
        this.charElevationY = 0
        this.isJumping = false
      }
    } else {
      // --- PHYSICAL TERRAIN ELEVATION (Never floats in mid-air when scrolling slow/stopped!) ---
      if (charWorldX >= platX && charWorldX <= platX + platW) {
        this.charElevationY = platH
        this.hasJumpedUp = true
        this.hasJumpedDown = false
      } else {
        this.charElevationY = 0
        if (charWorldX < platX) {
          this.hasJumpedUp = false
          this.hasJumpedDown = false
        } else {
          this.hasJumpedUp = true
          this.hasJumpedDown = true
        }
      }
      this.isJumping = false
    }

    // Mode transitions
    this.isSubmarine = this.worldX >= 5400 && this.worldX < 8200
    this.isFlying = this.worldX >= 10000

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

    // =========================================================================
    // IN-SCENE LOADING -> CAMERA DOWNWARD SCROLL -> CHARACTER GRAVITY DROP
    // =========================================================================
    this.loadingTimer += 0.022
    if (this.loadingTimer < 1.6) {
      this.isLoading = true
      this.targetCameraY = this.height * 0.85 // Keep camera high in sky
    } else {
      this.isLoading = false
      this.targetCameraY = 0 // Scroll camera down to ground level
    }

    // Smooth ease-out camera downward pan
    this.cameraY += (this.targetCameraY - this.cameraY) * 0.055

    // Once camera has nearly reached the ground (cameraY < 140), character drops down with gravity
    if (this.cameraY < 140 && !this.hasLanded) {
      const targetGroundY = this.height * 0.68 - 2
      this.characterVelocityY += 0.1 // Gentle arcade gravity acceleration
      this.characterDropY += this.characterVelocityY

      if (this.characterDropY >= targetGroundY) {
        this.characterDropY = targetGroundY
        if (Math.abs(this.characterVelocityY) > 2) {
          this.characterVelocityY = -this.characterVelocityY * 0.4 // Soft landing bounce
        } else {
          this.characterVelocityY = 0
          this.hasLanded = true
        }
      }
    }

    this.bg.update()
  }

  draw() {
    const currentBiomeIdx = BIOMES.findIndex(
      (b) => this.worldX >= b.startX && this.worldX < b.endX
    )
    const currentBiome = BIOMES[currentBiomeIdx] || BIOMES[0]

    // Scale context to devicePixelRatio for crystal sharp text, vector curves, and raster assets
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.ctx.imageSmoothingEnabled = true
    this.ctx.imageSmoothingQuality = 'high'

    // 1. Clear with Cyan Sky background
    this.ctx.fillStyle = '#00bff3'
    this.ctx.fillRect(0, 0, this.width, this.height)

    // 2. Draw World with vertical camera pan (pushed down during loading)
    this.ctx.save()
    this.ctx.translate(0, this.cameraY)

    // Parallax Background & Sky elements
    this.bg.draw(this.ctx, this.width, this.height, this.cameraX, currentBiome, this.cameraY)

    // Multi-Level Scenery & Ground
    this.drawWorldScenery(currentBiome)

    // Avatar (only revealed as scene descends into place)
    if (this.cameraY < 180) {
      this.drawAvatar()
    }

    this.ctx.restore()

    // 3. Draw LOADING Banner in Sky (slides up as camera descends)
    if (this.cameraY > 2) {
      this.drawInSceneLoadingBanner()
    }
  }

  drawInSceneLoadingBanner() {
    const bannerOffset = (this.height * 0.85 - this.cameraY) * 1.5
    const centerY = this.height * 0.44 - bannerOffset
    if (centerY < -120) return // Fully off screen

    const centerX = this.width * 0.5
    const bannerW = Math.min(420, this.width * 0.82)
    const bannerH = 100
    const bannerX = centerX - bannerW / 2
    const bannerY = centerY - bannerH / 2

    this.ctx.save()

    // Left Ribbon Tail
    this.ctx.fillStyle = '#b91c1c'
    this.ctx.beginPath()
    this.ctx.moveTo(bannerX - 26, bannerY + 18)
    this.ctx.lineTo(bannerX + 10, bannerY + 18)
    this.ctx.lineTo(bannerX + 10, bannerY + bannerH + 18)
    this.ctx.lineTo(bannerX - 26, bannerY + bannerH + 18)
    this.ctx.lineTo(bannerX - 12, bannerY + bannerH / 2 + 18)
    this.ctx.closePath()
    this.ctx.fill()

    // Right Ribbon Tail
    this.ctx.beginPath()
    this.ctx.moveTo(bannerX + bannerW + 26, bannerY + 18)
    this.ctx.lineTo(bannerX + bannerW - 10, bannerY + 18)
    this.ctx.lineTo(bannerX + bannerW - 10, bannerY + bannerH + 18)
    this.ctx.lineTo(bannerX + bannerW + 26, bannerY + bannerH + 18)
    this.ctx.lineTo(bannerX + bannerW + 12, bannerY + bannerH / 2 + 18)
    this.ctx.closePath()
    this.ctx.fill()

    // Main Banner Body (#f26d7d)
    this.ctx.fillStyle = '#f26d7d'
    this.ctx.fillRect(bannerX, bannerY, bannerW, bannerH)

    // Top Highlight & Bottom Shadow Strips
    this.ctx.fillStyle = '#f87171'
    this.ctx.fillRect(bannerX, bannerY, bannerW, 5)
    this.ctx.fillStyle = '#d32f2f'
    this.ctx.fillRect(bannerX, bannerY + bannerH - 5, bannerW, 5)

    // LOADING Text
    this.ctx.fillStyle = '#ffffff'
    this.ctx.font = '900 42px "Impact", "Arial Black", sans-serif'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.shadowColor = 'rgba(0,0,0,0.2)'
    this.ctx.shadowBlur = 4
    this.ctx.fillText('LOADING', centerX, centerY - 10)

    // 5 Pulsing Dots
    const activeDot = Math.floor(this.loadingTimer * 4) % 5
    for (let i = 0; i < 5; i++) {
      const dotX = centerX - 36 + i * 18
      const dotY = centerY + 24
      const isActive = i === activeDot
      this.ctx.fillStyle = isActive ? '#ffffff' : 'rgba(255, 204, 213, 0.65)'
      this.ctx.beginPath()
      this.ctx.arc(dotX, dotY, isActive ? 5 : 3.5, 0, Math.PI * 2)
      this.ctx.fill()
    }

    this.ctx.restore()
  }

  drawWorldScenery(currentBiome) {
    const groundY = this.height * 0.80
    const titleCenterX = this.width * 0.5 - this.cameraX

    // =========================================================================
    // 0. BACKGROUND 3D STRUCTURES & TREES (Behind grass & ground layer)
    // =========================================================================
    const aboutBaseX = 2300 + 130 - this.cameraX

    if (treePillImg.complete && treePillImg.naturalWidth > 0) {
      const transPillW = 200
      const transPillH = transPillW * (treePillImg.naturalHeight / treePillImg.naturalWidth)
      this.ctx.drawImage(treePillImg, aboutBaseX + 610, groundY - transPillH, transPillW, transPillH)
    }
    // 0b. Cloud hovering above top-left of ABOUT letters
    const aboutW = 860
    const aboutH = titleAboutImg.complete && titleAboutImg.naturalWidth > 0
      ? aboutW * (titleAboutImg.naturalHeight / titleAboutImg.naturalWidth)
      : 360
    const aboutY = groundY - aboutH * 0.90

    // 0c. 3D "ABOUT" Graphic (tucked behind gate & grass lawn)
    if (titleAboutImg.complete && titleAboutImg.naturalWidth > 0) {
      this.ctx.drawImage(titleAboutImg, aboutBaseX, aboutY, aboutW, aboutH)
    }

    // =========================================================================
    // 1. GROUND WITH AUTHENTIC TEXTURED EARTH SOIL (BOTTOM 20%) & GRASS EDGE
    // =========================================================================
    this.ctx.save()

    // 1a. Ground Soil Texture (ground.png)
    if (groundImg.complete && groundImg.naturalWidth > 0) {
      const gTileW = 181
      const gTileH = 70
      const startGX = -((this.cameraX) % gTileW)
      for (let gx = startGX; gx < this.width + gTileW; gx += gTileW) {
        for (let gy = groundY; gy < this.height + gTileH; gy += gTileH) {
          this.ctx.drawImage(groundImg, gx, gy, gTileW, gTileH)
        }
      }
    } else {
      // Lawn & Soil Body fallback (#795548)
      this.ctx.fillStyle = '#795548'
      this.ctx.fillRect(0, groundY + 3, this.width, this.height - groundY)

      // 2 Wavy Chevron Zig-Zag Soil Bands fallback
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
    }

    // 1b. Lawn Grass Edge (grass-edge.png)
    if (grassEdgeImg.complete && grassEdgeImg.naturalWidth > 0) {
      const tileW = 100
      const tileH = tileW * (grassEdgeImg.naturalHeight / grassEdgeImg.naturalWidth)
      const startX = -((this.cameraX) % tileW)
      for (let gx = startX; gx < this.width + tileW; gx += tileW) {
        this.ctx.drawImage(grassEdgeImg, gx, groundY, tileW, tileH)
      }
    } else {
      // Lawn fallback (#8bc34a)
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
    }
    this.ctx.restore()

    // Title instruction prompt (Centered right below the avatar in the soil)
    if (this.cameraX < 900) {
      this.ctx.save()
      const isMobile = this.width < 600
      this.ctx.font = isMobile ? 'bold 12px monospace' : '900 17px "Arial", "Impact", sans-serif'
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = '#ffffff'
      this.ctx.shadowColor = 'rgba(0,0,0,0.65)'
      this.ctx.shadowBlur = 5
      const promptText = isMobile
        ? 'Swipe OR scroll to explore'
        : 'Scroll down mouse OR press keyboard\'s down-arrow'
      this.ctx.fillText(
        promptText,
        titleCenterX,
        groundY + (isMobile ? 50 : 68)
      )
      this.ctx.restore()
    }

    // =========================================================================
    // LEVEL 1: ROBBY LEONARDI 3D ABOUT TITLE, GATE & SKILL PLANTS
    // 1. Pill tree before LEVEL 1 Gate

    // LEVEL 1 Gate (in front of ABOUT shadow, on grass)
    this.drawGate(2300, 'LEVEL 1', '#e52d27', groundY)

    // 2. Overlapping Round Green Bushes & Trees at base of ABOUT slope (on grass)
    if (treeBushImg.complete && treeBushImg.naturalWidth > 0) {


      // Middle-left larger bush
      const bush2W = 145
      const bush2H = bush2W * (treeBushImg.naturalHeight / treeBushImg.naturalWidth)
      this.ctx.drawImage(treeBushImg, aboutBaseX + 430, groundY - bush2H * 1, bush2W, bush2H)

      // Middle-right bush
      const bush3W = 125
      const bush3H = bush3W * (treeDarkImg.naturalHeight / treeDarkImg.naturalWidth)
      this.ctx.drawImage(treeDarkImg, aboutBaseX + 535, groundY - bush3H, bush3W, bush3H)
    }

    // Right-side medium dome tree next to bushes
    // if (treeMedImg.complete && treeMedImg.naturalWidth > 0) {
    //   const medW = 135
    //   const medH = medW * (treeMedImg.naturalHeight / treeMedImg.naturalWidth)
    //   this.ctx.drawImage(treeMedImg, aboutBaseX + 630, groundY - medH * 0.92, medW, medH)
    // }


    // Right-side foreground pill tree transitioning towards skill plants
    if (treeImg.complete && treeImg.naturalWidth > 0) {
      const transPillW = 200
      const transPillH = transPillW * (treeImg.naturalHeight / treeImg.naturalWidth) * 1
      this.ctx.drawImage(treeImg, aboutBaseX + 750, groundY - transPillH, transPillW, transPillH)
    }

    // 3. Robby Leonardi Skill Plants (spaced with breathing room after ABOUT)
    this.drawSkillPlants(3500, groundY)

    // 4. Robby Leonardi Elevated Jump Platform Step & Mountain (X: 4650)
    this.drawJumpPlatform(4650, groundY)

    // =========================================================================
    // LEVEL 2: DEEP SEA SUBMARINE DIVE - WEBRTC & LOOTLO (X: 5600 - 8200)
    // =========================================================================
    this.drawGate(5600, 'LEVEL 2', '#0284c7', groundY)
    this.drawProjectShowcase(6200, {
      tag: 'FLAGSHIP WEBRTC APP',
      title: 'GHOST CALL',
      subtitle: 'Sub-40ms P2P Encrypted Video Call',
      desc: 'Built with pure WebRTC mesh topology, Socket.io signaling, and STUN/TURN relays with zero intermediary media lag.',
      stats: ['< 40ms Latency', 'AES-128 P2P', 'Mesh Network'],
      url: 'https://ghost-call-ten.vercel.app/',
    })

    this.drawProjectShowcase(7200, {
      tag: 'REAL-TIME MULTIPLAYER',
      title: 'LOOTLO',
      subtitle: 'Synchronized Game Room Engine',
      desc: 'Interactive multiplayer room management with bidirectional state synchronization, turn timers, and audio cues.',
      stats: ['100+ Rooms', '< 25ms Sync', 'Socket.io'],
      url: 'https://github.com/krishna23810',
    })

    // =========================================================================
    // LEVEL 3: WORKING EXPERIENCE - TRISX & SUBCIDYS SAAS (X: 8400 - 10000)
    // =========================================================================
    this.drawGate(8400, 'LEVEL 3', '#d97706', groundY)
    this.drawExperienceSection(9000, {
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
    // LEVEL 4: CLOUD AIRSHIP, APK & CONTACT (X: 10200 - 12000)
    // =========================================================================
    this.drawGate(10200, 'LEVEL 4', '#8b5cf6', groundY)
    this.drawProjectShowcase(10800, {
      tag: 'FLUTTER ANDROID APPLICATION',
      title: 'TRAVEL PLANNER',
      subtitle: 'Android Mobile App (55.37 MB APK)',
      desc: 'Intelligent destination guide, offline itinerary planner, and live weather forecast app built with Flutter and SQLite.',
      stats: ['55.37 MB APK', 'Android 8.0+', 'SQLite Sync'],
      url: '/TravelPlanner.apk',
      isDownload: true,
    })

    // Final Victory & Contact Cloud Form
    this.drawVictoryCastle(12100)
  }

  drawGate(startX, text, color, groundY) {
    const screenX = startX - this.cameraX
    if (screenX < -300 || screenX > this.width + 300) return
    const gY = groundY || this.height * 0.80

    this.ctx.save()

    if (gateImg.complete && gateImg.naturalWidth > 0) {
      const gateW = 340
      const gateH = gateW * (gateImg.naturalHeight / gateImg.naturalWidth)
      const gateX = screenX
      const gateY = gY - gateH

      this.ctx.drawImage(gateImg, gateX, gateY, gateW, gateH)

      // Gate Text in bold rounded white on top arch (exact 1:1 Robby Leonardi style)
      this.ctx.fillStyle = '#ffffff'
      this.ctx.font = '900 60px "Fredoka", "Arial Rounded MT Bold", "Nunito", sans-serif'
      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.ctx.shadowColor = 'transparent'
      this.ctx.shadowBlur = 0
      this.ctx.fillText(text, gateX + gateW * 0.435, gateY + gateH * 0.165)
    } else {
      // Gate Columns fallback
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
    }

    this.ctx.restore()
  }

  // Exact Robby Leonardi Vertical Skill Plant Measurement Stalks
  drawSkillPlants(startX, groundY) {
    const screenX = startX - this.cameraX
    if (screenX < -1000 || screenX > this.width + 1000) return
    const gY = groundY || this.height * 0.8

    this.ctx.save()

    // 5 Measurement Horizontal Reference Lines (EXPERT down to BEGINNER)
    const yLevels = [
      { lvl: 'EXPERT', y: gY - 368 },
      { lvl: 'ADVANCED', y: gY - 296 },
      { lvl: 'INTERMEDIATE', y: gY - 224 },
      { lvl: 'ELEMENTARY', y: gY - 152 },
      { lvl: 'BEGINNER', y: gY - 80 },
    ]

    const yExpert = yLevels[0].y

    // Cloud Right behind Plant 3 & 4 flower heads
    this.ctx.beginPath()
    this.ctx.arc(screenX + 660, yLevels[1].y - 35, 44, 0, Math.PI * 2)
    this.ctx.arc(screenX + 710, yLevels[1].y - 62, 58, 0, Math.PI * 2)
    this.ctx.arc(screenX + 765, yLevels[1].y - 35, 42, 0, Math.PI * 2)
    this.ctx.fill()

    // 2. Top Red Folded Ribbon ("Multidisciplinary Designer" / "Full Stack Developer")
    const ribbonCX = screenX + 510
    const ribbonCY = yExpert - 160
    const ribbonW = 520
    const ribbonH = 56

    // Ribbon Tails
    this.ctx.fillStyle = '#b91c1c'
    // Left Tail
    this.ctx.beginPath()
    this.ctx.moveTo(ribbonCX - ribbonW / 2 - 32, ribbonCY - ribbonH / 2 + 10)
    this.ctx.lineTo(ribbonCX - ribbonW / 2 + 8, ribbonCY - ribbonH / 2 - 6)
    this.ctx.lineTo(ribbonCX - ribbonW / 2 + 8, ribbonCY + ribbonH / 2 + 10)
    this.ctx.lineTo(ribbonCX - ribbonW / 2 - 32, ribbonCY + ribbonH / 2 + 6)
    this.ctx.lineTo(ribbonCX - ribbonW / 2 - 14, ribbonCY + 6)
    this.ctx.closePath()
    this.ctx.fill()

    // Right Tail
    this.ctx.beginPath()
    this.ctx.moveTo(ribbonCX + ribbonW / 2 + 32, ribbonCY - ribbonH / 2 + 10)
    this.ctx.lineTo(ribbonCX + ribbonW / 2 - 8, ribbonCY - ribbonH / 2 - 6)
    this.ctx.lineTo(ribbonCX + ribbonW / 2 - 8, ribbonCY + ribbonH / 2 + 10)
    this.ctx.lineTo(ribbonCX + ribbonW / 2 + 32, ribbonCY + ribbonH / 2 + 6)
    this.ctx.lineTo(ribbonCX + ribbonW / 2 + 14, ribbonCY + 6)
    this.ctx.closePath()
    this.ctx.fill()

    // Main Red Ribbon Body
    this.ctx.fillStyle = '#e52521'
    this.ctx.beginPath()
    this.ctx.roundRect(ribbonCX - ribbonW / 2, ribbonCY - ribbonH / 2, ribbonW, ribbonH, 6)
    this.ctx.fill()

    // Ribbon Text
    this.ctx.fillStyle = '#ffffff'
    this.ctx.font = 'italic 900 32px "Fredoka", "Nunito", cursive, sans-serif'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText('Full Stack Developer', ribbonCX, ribbonCY + 2)

    // 3. Solid White Measurement Reference Lines & Labels
    yLevels.forEach(({ lvl, y }) => {
      // White bold level text
      this.ctx.fillStyle = '#ffffff'
      this.ctx.font = '900 20px "Fredoka", "Arial Rounded MT Bold", "Nunito", sans-serif'
      this.ctx.textAlign = 'left'
      this.ctx.textBaseline = 'bottom'
      this.ctx.fillText(lvl, screenX + 40, y - 5)

      // Solid crisp white line spanning across all plants
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.90)'
      this.ctx.lineWidth = 2.2
      this.ctx.beginPath()
      this.ctx.moveTo(screenX + 40, y)
      this.ctx.lineTo(screenX + 900, y)
      this.ctx.stroke()
    })

    // 4. Four Skill Plant Columns
    const skills = [
      { category: 'BACKEND', name: 'NODE.JS API', leafCount: 4, headTier: 0 },
      // { category: 'EVENT-DRIVEN', name: 'WEBRTC P2P', leafCount: 4, headTier: 0 },
      { category: 'DATABASE', name: 'POSTGRESQL', leafCount: 4, headTier: 0 },
      { category: 'DESIGN / UI', name: 'REACT / VITE', leafCount: 4, headTier: 0 },
      { category: 'FLUTTER', name: 'FLUTTER APK', leafCount: 3, headTier: 0 },
    ]

    skills.forEach((s, idx) => {
      const plantX = screenX + 290 + idx * 170
      const headCenterY = yLevels[s.headTier].y

      // (a) Top Orange Zigzag Skill Badge
      const badgeW = 142
      const badgeH = 38
      const badgeY = yExpert - 78
      const bx = plantX - badgeW / 2
      const by = badgeY - badgeH / 2

      this.ctx.fillStyle = '#f58220'
      this.ctx.beginPath()
      this.ctx.moveTo(bx, by)
      this.ctx.lineTo(bx + badgeW, by)
      // Right zigzag
      this.ctx.lineTo(bx + badgeW - 6, by + badgeH * 0.25)
      this.ctx.lineTo(bx + badgeW, by + badgeH * 0.5)
      this.ctx.lineTo(bx + badgeW - 6, by + badgeH * 0.75)
      this.ctx.lineTo(bx + badgeW, by + badgeH)
      // Bottom
      this.ctx.lineTo(bx, by + badgeH)
      // Left zigzag
      this.ctx.lineTo(bx + 6, by + badgeH * 0.75)
      this.ctx.lineTo(bx, by + badgeH * 0.5)
      this.ctx.lineTo(bx + 6, by + badgeH * 0.25)
      this.ctx.closePath()
      this.ctx.fill()

      this.ctx.fillStyle = '#ffffff'
      this.ctx.font = '900 20px "Fredoka", "Arial Rounded MT Bold", "Nunito", sans-serif'
      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.ctx.fillText(s.category, plantX, badgeY + 1)

      // One-Time Staggered Growth Progress (Grows once and stays grown)
      const progress = this.plantGrowths[idx] || 0
      // Smooth organic cubic easing
      const easeGrowth = progress === 0 ? 0 : 1 - Math.pow(1 - progress, 3)

      // Only render plant if it has started growing out of the ground
      if (easeGrowth > 0 && plantSkillImg.complete && plantSkillImg.naturalWidth > 0) {
        const imgW = plantSkillImg.naturalWidth || 160
        const imgH = plantSkillImg.naturalHeight || 250
        const plantW = 175
        const plantH = 275

        // Target fully grown top position
        const targetTopY = (s.leafCount === 4 ? yLevels[0].y : yLevels[1].y) - 48
        const totalTravel = gY - targetTopY
        // Current animated top position of the plant
        const currentPlantTopY = gY - totalTravel * easeGrowth

        // 1. Continuous Brown stalk from head base down to ground
        this.ctx.fillStyle = '#8d5b2d'
        this.ctx.fillRect(plantX - 3, currentPlantTopY + 45, 6, Math.max(0, gY - (currentPlantTopY + 45)))

        // 2. Plant Head & Leaves (Clipped at ground level so plant emerges from lawn)
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.rect(plantX - plantW, 0, plantW * 2, gY)
        this.ctx.clip()

        if (s.leafCount === 4) {
          // Full 4-leaf plant rising up
          this.ctx.drawImage(plantSkillImg, plantX - plantW / 2, currentPlantTopY, plantW, plantH)
        } else {
          // 3-leaf plant rising up
          const headH = 110
          const leavesH = 124

          this.ctx.drawImage(
            plantSkillImg,
            0, 0, imgW, imgH * 0.40,
            plantX - plantW / 2, currentPlantTopY, plantW, headH
          )
          this.ctx.drawImage(
            plantSkillImg,
            0, imgH * 0.55, imgW, imgH * 0.45,
            plantX - plantW / 2, currentPlantTopY + headH, plantW, leavesH
          )
        }
        this.ctx.restore()
      }
    })

    this.ctx.restore()
  }

  // Exact Robby Leonardi 1:1 Elevated Jump Platform Step, Background Pyramid Mountain & Tree Row
  drawJumpPlatform(startX, groundY) {
    const screenX = startX - this.cameraX
    if (screenX < -1200 || screenX > this.width + 1200) return

    const platW = 420
    const platH = 120
    const platTopY = groundY - platH

    this.ctx.save()

    // Soil Body under the step with groundImg texture clipped within step
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.rect(screenX, platTopY, platW, groundY - platTopY)
    this.ctx.clip()

    if (groundImg.complete && groundImg.naturalWidth > 0) {
      const gTileW = 181
      const gTileH = 70
      const startGX = -((this.cameraX) % gTileW)
      for (let gx = startGX - gTileW; gx < this.width + gTileW; gx += gTileW) {
        for (let gy = platTopY; gy < groundY + gTileH; gy += gTileH) {
          this.ctx.drawImage(groundImg, gx, gy, gTileW, gTileH)
        }
      }
    } else {
      this.ctx.fillStyle = '#795548'
      this.ctx.fillRect(screenX, platTopY + 28, platW, groundY - (platTopY + 28))

      // 3 Zig-zag chevron soil bands under platform
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
      for (let row = 0; row < 3; row++) {
        const rowY = platTopY + 40 + row * 24
        if (rowY + 14 < groundY) {
          for (let zx = screenX; zx < screenX + platW; zx += 36) {
            this.ctx.beginPath()
            this.ctx.moveTo(zx, rowY)
            this.ctx.lineTo(zx + 18, rowY + 10)
            this.ctx.lineTo(zx + 36, rowY)
            this.ctx.lineTo(zx + 36, rowY + 8)
            this.ctx.lineTo(zx + 18, rowY + 18)
            this.ctx.lineTo(zx, rowY + 8)
            this.ctx.closePath()
            this.ctx.fill()
          }
        }
      }
    }
    this.ctx.restore()

    // Top Lawn Grass of the Platform with grassEdgeImg asset
    if (grassEdgeImg.complete && grassEdgeImg.naturalWidth > 0) {
      const tileW = 100
      const tileH = tileW * (grassEdgeImg.naturalHeight / grassEdgeImg.naturalWidth)
      for (let gx = screenX; gx < screenX + platW; gx += tileW) {
        const drawW = Math.min(tileW, screenX + platW - gx)
        this.ctx.drawImage(
          grassEdgeImg,
          0, 0, (drawW / tileW) * grassEdgeImg.naturalWidth, grassEdgeImg.naturalHeight,
          gx, platTopY, drawW, tileH
        )
      }
    } else {
      this.ctx.fillStyle = '#8bc34a'
      this.ctx.fillRect(screenX, platTopY, platW, 28)

      this.ctx.fillStyle = '#7cb342'
      for (let zx = screenX; zx < screenX + platW; zx += 36) {
        this.ctx.beginPath()
        this.ctx.moveTo(zx, platTopY + 28)
        this.ctx.lineTo(zx + 18, platTopY + 40)
        this.ctx.lineTo(zx + 36, platTopY + 28)
        this.ctx.closePath()
        this.ctx.fill()
      }
    }

    // Left vertical step edge shadow
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'
    this.ctx.fillRect(screenX, platTopY, 6, groundY - platTopY)

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
    let screenX = this.width * 0.5
    if (!this.hasLanded) {
      screenX = this.width * 0.5 + 19.26 // Custom drop X position
    }

    const groundY = this.height * 0.80

    let avatarY = groundY - 93 - (this.charElevationY || 0)
    if (!this.hasLanded) {
      avatarY = this.characterDropY
    } else if (this.isSubmarine) {
      avatarY = groundY - 140 + Math.sin(this.animTimer * 2) * 12
    }

    this.ctx.save()
    this.ctx.translate(screenX, avatarY)

    if (this.isSubmarine) {
      if (this.facing === 'left') {
        this.ctx.scale(-1, 1)
      }
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
      const bounceY = (this.isMoving && this.hasLanded && !this.isJumping) ? Math.sin(this.stridePhase) * 3 : 0
      const isJumpingOrLanding = this.isJumping || !this.hasLanded
      drawRobbyCharacter(this.ctx, bounceY, this.isMoving, this.stridePhase, this.isFlying, isJumpingOrLanding, this.facing)
    }

    this.ctx.restore()
  }
}

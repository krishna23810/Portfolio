// Multi-Biome Mario & Dive Game Engine (Robby Leonardi style)

import { Player } from '../entities/Player'
import { Collectible } from '../entities/Collectible'
import { QuestionBlock } from '../entities/QuestionBlock'
import { InteractivePortal } from '../entities/InteractivePortal'
import { ParallaxBackground } from './ParallaxBackground'
import { LEVEL_DATA, BIOMES, WORLD_LENGTH, GROUND_Y } from '../levels/levelData'
import { soundManager } from '../audio/SoundManager'

export class GameEngine {
  constructor(canvas, callbacks = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.callbacks = callbacks

    this.width = canvas.width
    this.height = canvas.height

    this.score = 0
    this.currentBiomeIndex = 0
    this.isPaused = false
    this.cameraX = 0

    // Entities (Start centered in front of 3D Title Name)
    this.player = new Player(520, GROUND_Y - 60)
    this.bg = new ParallaxBackground()

    this.collectibles = LEVEL_DATA.collectibles.map((c) => new Collectible(c))
    this.questionBlocks = LEVEL_DATA.questionBlocks.map((q) => new QuestionBlock(q))
    this.portals = LEVEL_DATA.portals.map((p) => new InteractivePortal(p))
    this.platforms = LEVEL_DATA.platforms
    this.groundSegments = LEVEL_DATA.groundSegments
    this.pipes = LEVEL_DATA.pipes
    this.scenery = LEVEL_DATA.scenery

    // Input state
    this.inputs = {
      left: false,
      right: false,
      jump: false,
      action: false,
    }

    this.nearbyPortal = null
    this.animationFrameId = null

    // Listeners
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleWheel = this.handleWheel.bind(this)

    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
    window.addEventListener('wheel', this.handleWheel, { passive: false })
  }

  resize(width, height) {
    this.width = width
    this.height = height
    this.canvas.width = width
    this.canvas.height = height
  }

  handleKeyDown(e) {
    if (this.isPaused) return

    if (e.code === 'ArrowRight' || e.code === 'KeyD') {
      this.inputs.right = true
    }
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
      this.inputs.left = true
    }
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
      if (!this.inputs.jump) {
        soundManager.playJump()
      }
      this.inputs.jump = true
    }
    if (e.code === 'KeyE' || e.code === 'Enter') {
      this.triggerAction()
    }
  }

  handleKeyUp(e) {
    if (e.code === 'ArrowRight' || e.code === 'KeyD') {
      this.inputs.right = false
    }
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
      this.inputs.left = false
    }
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
      this.inputs.jump = false
    }
  }

  handleWheel(e) {
    if (this.isPaused) return
    e.preventDefault()

    const scrollDelta = e.deltaY
    if (scrollDelta > 5) {
      this.player.vx = this.player.speed
      this.player.facing = 'right'
      this.player.isMoving = true
    } else if (scrollDelta < -5) {
      this.player.vx = -this.player.speed
      this.player.facing = 'left'
      this.player.isMoving = true
    }
  }

  setVirtualInput(type, active) {
    if (type === 'left') this.inputs.left = active
    if (type === 'right') this.inputs.right = active
    if (type === 'jump') {
      if (active && !this.inputs.jump) {
        soundManager.playJump()
      }
      this.inputs.jump = active
    }
    if (type === 'action' && active) {
      this.triggerAction()
    }
  }

  triggerAction() {
    if (this.nearbyPortal) {
      soundManager.playPowerup()
      if (this.callbacks.onOpenModal) {
        this.callbacks.onOpenModal({
          type: this.nearbyPortal.type,
          data: this.nearbyPortal.data,
        })
      }
    }
  }

  jumpToLevel(biomeId) {
    const target = BIOMES.find((b) => b.id === biomeId)
    if (target) {
      this.player.x = target.startX + 90
      this.player.y = GROUND_Y - 60
      this.player.vx = 0
      this.player.vy = 0
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
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
    window.removeEventListener('wheel', this.handleWheel)
  }

  update() {
    if (this.isPaused) return

    // Update player
    this.player.update(this.inputs, this.platforms, this.groundSegments, this.pipes)

    // Clamp player within world track
    if (this.player.x < 10) this.player.x = 10
    if (this.player.x > WORLD_LENGTH - 60) this.player.x = WORLD_LENGTH - 60

    // Smooth camera lerping
    const targetCameraX = this.player.x - this.width * 0.35
    this.cameraX += (targetCameraX - this.cameraX) * 0.08
    if (this.cameraX < 0) this.cameraX = 0
    if (this.cameraX > WORLD_LENGTH - this.width) this.cameraX = WORLD_LENGTH - this.width

    // Background update
    this.bg.update()

    // Question Blocks bump
    for (const block of this.questionBlocks) {
      block.update()
      if (block.checkBump(this.player)) {
        soundManager.playBlockHit()
        this.score += block.xp
        if (this.callbacks.onScoreUpdate) {
          this.callbacks.onScoreUpdate(this.score)
        }
        if (this.callbacks.onOpenModal) {
          this.callbacks.onOpenModal({
            type: 'skill',
            data: {
              tech: block.tech,
              category: block.category,
              desc: block.desc,
              xp: block.xp,
            },
          })
        }
      }
    }

    // Collectibles check
    for (const item of this.collectibles) {
      item.update()
      if (item.checkCollect(this.player)) {
        soundManager.playCoin()
        this.score += item.xp
        if (this.callbacks.onScoreUpdate) {
          this.callbacks.onScoreUpdate(this.score)
        }
      }
    }

    // Interactive Portals
    let foundNearby = null
    for (const portal of this.portals) {
      portal.update(this.player)
      if (portal.isPlayerNearby) {
        foundNearby = portal
      }
    }

    if (this.nearbyPortal !== foundNearby) {
      this.nearbyPortal = foundNearby
      if (this.callbacks.onNearbyPortal) {
        this.callbacks.onNearbyPortal(this.nearbyPortal)
      }
    }

    // Determine current biome based on player X
    const currentBiomeIdx = BIOMES.findIndex(
      (b) => this.player.x >= b.startX && this.player.x < b.endX
    )
    if (currentBiomeIdx !== -1 && currentBiomeIdx !== this.currentBiomeIndex) {
      this.currentBiomeIndex = currentBiomeIdx
      if (this.callbacks.onLevelChange) {
        this.callbacks.onLevelChange(BIOMES[currentBiomeIdx])
      }
    }
  }

  draw() {
    const currentBiome = BIOMES[this.currentBiomeIndex] || BIOMES[0]

    // 1. Draw Multi-Biome Parallax Background
    this.bg.draw(this.ctx, this.width, this.height, this.cameraX, currentBiome)

    // 2. Draw Mario Scenery & Flagpoles
    this.ctx.save()
    for (const sc of this.scenery) {
      const screenX = sc.x - this.cameraX
      if (screenX < -200 || screenX > this.width + 200) continue

      if (sc.type === 'flagpole') {
        // Mario Victory Flagpole
        // Pole
        ctx.fillStyle = '#cbd5e1'
        ctx.fillRect(screenX + 18, sc.y, 8, 220)
        // Gold ball top
        ctx.fillStyle = '#facc15'
        ctx.beginPath()
        ctx.arc(screenX + 22, sc.y, 10, 0, Math.PI * 2)
        ctx.fill()
        // Green Flag
        ctx.fillStyle = '#22c55e'
        ctx.beginPath()
        ctx.moveTo(screenX + 26, sc.y + 12)
        ctx.lineTo(screenX + 70, sc.y + 32)
        ctx.lineTo(screenX + 26, sc.y + 52)
        ctx.closePath()
        ctx.fill()
      } else if (sc.type === 'castle_building') {
        // Mario Brick Castle
        this.ctx.fillStyle = '#991b1b' // Brick red
        this.ctx.fillRect(screenX, sc.y, 140, 140)
        // Castle crenellations / battlements
        for (let bx = screenX; bx < screenX + 140; bx += 28) {
          this.ctx.fillRect(bx, sc.y - 18, 18, 18)
        }
        // Castle Arch Door
        this.ctx.fillStyle = '#0f172a'
        this.ctx.beginPath()
        this.ctx.arc(screenX + 70, sc.y + 80, 24, Math.PI, 0)
        this.ctx.fillRect(screenX + 46, sc.y + 80, 48, 60)
        this.ctx.fill()
      }
    }
    this.ctx.restore()

    // 3. Draw Ground Segments (Robby Leonardi Grassland with Zig-Zag Trim)
    this.ctx.save()
    for (const g of this.groundSegments) {
      const screenX = g.x - this.cameraX
      if (screenX + g.width < -50 || screenX > this.width + 50) continue

      // Top Grass Lawn (Vibrant Green)
      this.ctx.fillStyle = currentBiome.groundGrass
      this.ctx.fillRect(screenX, g.y, g.width, 24)

      // Zig-zag / Chevron Sawtooth Grass Trim
      ctx.fillStyle = currentBiome.groundGrass
      for (let zx = screenX; zx < screenX + g.width; zx += 32) {
        ctx.beginPath()
        ctx.moveTo(zx, g.y + 24)
        ctx.lineTo(zx + 16, g.y + 38)
        ctx.lineTo(zx + 32, g.y + 24)
        ctx.closePath()
        ctx.fill()
      }

      // Soil / Body below grass
      this.ctx.fillStyle = currentBiome.groundSoil
      this.ctx.fillRect(screenX, g.y + 24, g.width, g.height)

      // Redraw Chevrons for sharp boundary
      this.ctx.fillStyle = currentBiome.groundGrass
      for (let zx = screenX; zx < screenX + g.width; zx += 32) {
        this.ctx.beginPath()
        this.ctx.moveTo(zx, g.y + 24)
        this.ctx.lineTo(zx + 16, g.y + 38)
        this.ctx.lineTo(zx + 32, g.y + 24)
        this.ctx.closePath()
        this.ctx.fill()
      }

      // Earthy chevron textured rows in the soil
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.12)'
      for (let zy = g.y + 55; zy < g.y + g.height; zy += 40) {
        for (let zx = screenX; zx < screenX + g.width; zx += 32) {
          this.ctx.beginPath()
          this.ctx.moveTo(zx, zy)
          this.ctx.lineTo(zx + 16, zy + 14)
          this.ctx.lineTo(zx + 32, zy)
          this.ctx.closePath()
          this.ctx.fill()
        }
      }
    }
    this.ctx.restore()

    // Robby Leonardi Start Screen Instruction Banner (Centered on start screen)
    if (this.cameraX < 800) {
      const instructionX = 520 - this.cameraX
      this.ctx.save()
      this.ctx.font = 'bold 15px sans-serif'
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = '#ffffff'
      this.ctx.shadowColor = 'rgba(0,0,0,0.6)'
      this.ctx.shadowBlur = 4
      this.ctx.fillText(
        'Scroll down mouse OR press keyboard\'s [D] / Right-arrow',
        instructionX,
        GROUND_Y + 70
      )
      this.ctx.restore()
    }

    // 4. Draw Mario Green Warp Pipes
    this.ctx.save()
    for (const pipe of this.pipes) {
      const screenX = pipe.x - this.cameraX
      if (screenX < -100 || screenX > this.width + 100) continue

      // Main Pipe Body
      this.ctx.fillStyle = '#16a34a'
      this.ctx.strokeStyle = '#14532d'
      this.ctx.lineWidth = 3
      this.ctx.fillRect(screenX + 4, pipe.y + 20, pipe.width - 8, pipe.height - 20)
      this.ctx.strokeRect(screenX + 4, pipe.y + 20, pipe.width - 8, pipe.height - 20)

      // Top Pipe Rim / Collar
      this.ctx.fillRect(screenX, pipe.y, pipe.width, 22)
      this.ctx.strokeRect(screenX, pipe.y, pipe.width, 22)

      // Pipe Highlight Line
      this.ctx.fillStyle = '#4ade80'
      this.ctx.fillRect(screenX + 8, pipe.y + 2, 6, 18)
      this.ctx.fillRect(screenX + 10, pipe.y + 22, 6, pipe.height - 24)

      // Label
      this.ctx.font = 'bold 9px monospace'
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = '#ffffff'
      this.ctx.fillText(pipe.label, screenX + pipe.width / 2, pipe.y - 8)
    }
    this.ctx.restore()

    // 5. Draw Mario Brick & Cloud Platforms
    this.ctx.save()
    for (const p of this.platforms) {
      const screenX = p.x - this.cameraX
      if (screenX + p.width < -50 || screenX > this.width + 50) continue

      if (p.type === 'cloud') {
        // Fluffy Mario Cloud Platform
        this.ctx.fillStyle = '#ffffff'
        this.ctx.strokeStyle = '#93c5fd'
        this.ctx.lineWidth = 2
        this.ctx.beginPath()
        this.ctx.roundRect(screenX, p.y, p.width, p.height, 12)
        this.ctx.fill()
        this.ctx.stroke()
      } else {
        // Classic Mario Orange-Brown Brick Blocks
        this.ctx.fillStyle = '#b45309'
        this.ctx.strokeStyle = '#451a03'
        this.ctx.lineWidth = 2
        this.ctx.fillRect(screenX, p.y, p.width, p.height)
        this.ctx.strokeRect(screenX, p.y, p.width, p.height)

        // Brick mortar lines
        this.ctx.fillStyle = '#78350f'
        for (let bx = screenX + 24; bx < screenX + p.width; bx += 32) {
          this.ctx.fillRect(bx, p.y + 2, 3, p.height - 4)
        }
      }

      // Platform text label
      this.ctx.fillStyle = '#ffffff'
      this.ctx.strokeStyle = '#000000'
      this.ctx.lineWidth = 2.5
      this.ctx.font = 'bold 10px monospace'
      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.ctx.strokeText(p.label, screenX + p.width / 2, p.y + p.height / 2)
      this.ctx.fillText(p.label, screenX + p.width / 2, p.y + p.height / 2)
    }
    this.ctx.restore()

    // 6. Draw Interactive Portals
    for (const portal of this.portals) {
      portal.draw(this.ctx, this.cameraX)
    }

    // 7. Draw Question Blocks
    for (const block of this.questionBlocks) {
      block.draw(this.ctx, this.cameraX)
    }

    // 8. Draw Collectibles
    for (const item of this.collectibles) {
      item.draw(this.ctx, this.cameraX)
    }

    // 9. Draw Player
    this.player.draw(this.ctx, this.cameraX)
  }
}

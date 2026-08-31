// Authentic Mario Question Block & Brick Block Entity (Robby Leonardi style)

export class QuestionBlock {
  constructor(data) {
    this.id = data.id
    this.x = data.x
    this.y = data.y
    this.width = 44
    this.height = 44
    this.tech = data.tech
    this.category = data.category
    this.desc = data.desc
    this.xp = data.xp || 250
    this.isHit = false

    this.bounceOffset = 0
    this.bounceVy = 0
    this.animTimer = Math.random() * 10
    this.spawnedParticles = []
  }

  update() {
    this.animTimer += 0.06

    if (this.bounceOffset < 0 || this.bounceVy !== 0) {
      this.bounceOffset += this.bounceVy
      this.bounceVy += 1.3
      if (this.bounceOffset >= 0) {
        this.bounceOffset = 0
        this.bounceVy = 0
      }
    }

    // Update coin / star particles
    for (let i = this.spawnedParticles.length - 1; i >= 0; i--) {
      const p = this.spawnedParticles[i]
      p.x += p.vx
      p.y += p.vy
      p.alpha -= 0.025
      if (p.alpha <= 0) {
        this.spawnedParticles.splice(i, 1)
      }
    }
  }

  checkBump(player) {
    if (this.isHit) return false

    const playerHeadY = player.y
    const blockBottomY = this.y + this.height

    if (
      player.vy < 0 &&
      player.x + player.width > this.x + 4 &&
      player.x < this.x + this.width - 4 &&
      playerHeadY <= blockBottomY &&
      playerHeadY >= blockBottomY - 18
    ) {
      this.isHit = true
      this.bounceVy = -8
      player.vy = 2

      // Spawn gold sparkle stars
      for (let i = 0; i < 12; i++) {
        this.spawnedParticles.push({
          x: this.x + this.width / 2,
          y: this.y,
          vx: (Math.random() - 0.5) * 6,
          vy: -Math.random() * 6 - 2,
          alpha: 1,
          color: '#facc15',
          size: Math.random() * 5 + 3,
        })
      }

      return true
    }
    return false
  }

  draw(ctx, cameraX) {
    const screenX = this.x - cameraX
    const screenY = this.y + this.bounceOffset

    // Draw particle sparkles
    for (const p of this.spawnedParticles) {
      ctx.save()
      ctx.globalAlpha = p.alpha
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x - cameraX, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    ctx.save()

    if (!this.isHit) {
      // ==========================================
      // AUTHENTIC MARIO GOLDEN [?] QUESTION BLOCK
      // ==========================================
      const pulse = Math.sin(this.animTimer * 4) * 2

      // Outer Golden Body with Bevel
      ctx.fillStyle = '#f59e0b'
      ctx.strokeStyle = '#78350f'
      ctx.lineWidth = 2.5
      ctx.fillRect(screenX, screenY, this.width, this.height)
      ctx.strokeRect(screenX, screenY, this.width, this.height)

      // Light Top/Left Bevel
      ctx.fillStyle = '#fef08a'
      ctx.fillRect(screenX + 2, screenY + 2, this.width - 4, 4)
      ctx.fillRect(screenX + 2, screenY + 2, 4, this.height - 4)

      // Dark Bottom/Right Bevel
      ctx.fillStyle = '#b45309'
      ctx.fillRect(screenX + 2, screenY + this.height - 6, this.width - 4, 4)
      ctx.fillRect(screenX + this.width - 6, screenY + 2, 4, this.height - 4)

      // 4 Corner Screws / Bolts
      ctx.fillStyle = '#451a03'
      ctx.fillRect(screenX + 4, screenY + 4, 3, 3)
      ctx.fillRect(screenX + this.width - 7, screenY + 4, 3, 3)
      ctx.fillRect(screenX + 4, screenY + this.height - 7, 3, 3)
      ctx.fillRect(screenX + this.width - 7, screenY + this.height - 7, 3, 3)

      // Bold Mario Question Mark symbol
      ctx.fillStyle = '#451a03'
      ctx.font = '900 24px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('?', screenX + this.width / 2, screenY + this.height / 2 + 1)
    } else {
      // ==========================================
      // HIT / EMPTY MARIO BLOCK (BROWN/BRONZE METAL)
      // ==========================================
      ctx.fillStyle = '#854d0e'
      ctx.strokeStyle = '#451a03'
      ctx.lineWidth = 2
      ctx.fillRect(screenX, screenY, this.width, this.height)
      ctx.strokeRect(screenX, screenY, this.width, this.height)

      // 4 Corner Bolts
      ctx.fillStyle = '#451a03'
      ctx.fillRect(screenX + 4, screenY + 4, 3, 3)
      ctx.fillRect(screenX + this.width - 7, screenY + 4, 3, 3)
      ctx.fillRect(screenX + 4, screenY + this.height - 7, 3, 3)
      ctx.fillRect(screenX + this.width - 7, screenY + this.height - 7, 3, 3)
    }

    // Technology Label Badge Above Block
    ctx.font = 'bold 11px monospace'
    ctx.textAlign = 'center'
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 3
    ctx.strokeText(this.tech, screenX + this.width / 2, screenY - 8)
    ctx.fillText(this.tech, screenX + this.width / 2, screenY - 8)

    ctx.restore()
  }
}

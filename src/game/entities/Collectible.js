// Mario & Dive Collectibles (Gold Coins, Super Stars, 1-UP Mushrooms, Ocean Pearls)

export class Collectible {
  constructor(data) {
    this.id = data.id
    this.x = data.x
    this.y = data.y
    this.type = data.type // 'coin' | 'star' | 'mushroom' | 'pearl' | 'trophy'
    this.xp = data.xp || 100
    this.label = data.label || ''
    this.title = data.title || ''
    this.isCollected = false
    this.width = 30
    this.height = 30

    this.animTimer = Math.random() * 10
    this.floatOffset = 0
    this.particles = []
  }

  update() {
    this.animTimer += 0.07
    this.floatOffset = Math.sin(this.animTimer) * 4

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      p.x += p.vx
      p.y += p.vy
      p.alpha -= 0.03
      p.size *= 0.96
      if (p.alpha <= 0) {
        this.particles.splice(i, 1)
      }
    }
  }

  checkCollect(player) {
    if (this.isCollected) return false

    if (
      player.x + player.width > this.x - 8 &&
      player.x < this.x + this.width + 8 &&
      player.y + player.height > this.y - 8 &&
      player.y < this.y + this.height + 8
    ) {
      this.isCollected = true

      const color = this.type === 'star' ? '#facc15' : this.type === 'mushroom' ? '#22c55e' : '#fbbf24'
      for (let i = 0; i < 14; i++) {
        this.particles.push({
          x: this.x + this.width / 2,
          y: this.y + this.height / 2,
          vx: (Math.random() - 0.5) * 6,
          vy: -Math.random() * 6 - 2,
          alpha: 1,
          size: Math.random() * 5 + 3,
          color: color,
        })
      }

      return true
    }
    return false
  }

  draw(ctx, cameraX) {
    const screenX = this.x - cameraX
    const screenY = this.y + this.floatOffset

    // Draw collection burst sparkles
    for (const p of this.particles) {
      ctx.save()
      ctx.globalAlpha = p.alpha
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x - cameraX, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    if (this.isCollected) return

    ctx.save()
    ctx.translate(screenX + this.width / 2, screenY + this.height / 2)

    if (this.type === 'coin') {
      // 3D Spinning Mario Gold Coin
      const scaleX = Math.cos(this.animTimer * 3)
      ctx.scale(scaleX, 1)

      ctx.fillStyle = '#facc15'
      ctx.strokeStyle = '#ca8a04'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.ellipse(0, 0, 11, 14, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Inner Coin Line
      ctx.fillStyle = '#ca8a04'
      ctx.fillRect(-2, -8, 4, 16)
    } else if (this.type === 'star') {
      // Mario Invincible Super Star with Cute Eyes
      ctx.fillStyle = '#facc15'
      ctx.strokeStyle = '#a16207'
      ctx.lineWidth = 2

      // Draw 5-pointed star
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          Math.cos(((18 + i * 72) * Math.PI) / 180) * 16,
          -Math.sin(((18 + i * 72) * Math.PI) / 180) * 16
        )
        ctx.lineTo(
          Math.cos(((54 + i * 72) * Math.PI) / 180) * 7,
          -Math.sin(((54 + i * 72) * Math.PI) / 180) * 7
        )
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Star Eyes
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(-3, -4, 2, 6)
      ctx.fillRect(2, -4, 2, 6)
    } else if (this.type === 'mushroom') {
      // Mario 1-UP Green Mushroom
      // Cap
      ctx.fillStyle = '#22c55e'
      ctx.strokeStyle = '#15803d'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(0, -2, 14, Math.PI, 0)
      ctx.fill()
      ctx.stroke()

      // White Spots
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(0, -9, 4, 0, Math.PI * 2)
      ctx.arc(-8, -4, 3, 0, Math.PI * 2)
      ctx.arc(8, -4, 3, 0, Math.PI * 2)
      ctx.fill()

      // Stem
      ctx.fillStyle = '#fed7aa'
      ctx.fillRect(-7, -2, 14, 10)
      ctx.strokeRect(-7, -2, 14, 10)

      // Eyes
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(-3, 0, 2, 4)
      ctx.fillRect(2, 0, 2, 4)
    } else if (this.type === 'pearl') {
      // Underwater Deep Sea Pearl
      ctx.fillStyle = '#e0f2fe'
      ctx.strokeStyle = '#38bdf8'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(0, 0, 12, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Gleam
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(-4, -4, 3, 0, Math.PI * 2)
      ctx.fill()
    } else {
      // Trophy
      ctx.fillStyle = '#facc15'
      ctx.fillRect(-8, -10, 16, 12)
      ctx.fillRect(-3, 2, 6, 8)
      ctx.fillRect(-8, 10, 16, 4)
    }

    ctx.restore()

    // Floating Label
    if (this.label) {
      ctx.save()
      ctx.font = 'bold 10px monospace'
      ctx.textAlign = 'center'
      ctx.fillStyle = '#ffffff'
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2.5
      ctx.strokeText(this.label, screenX + this.width / 2, screenY - 8)
      ctx.fillText(this.label, screenX + this.width / 2, screenY - 8)
      ctx.restore()
    }
  }
}

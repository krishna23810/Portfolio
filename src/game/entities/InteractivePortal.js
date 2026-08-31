// Mario & Dive Interactive Portal Entity (Robby Leonardi style)

export class InteractivePortal {
  constructor(data) {
    this.id = data.id
    this.x = data.x
    this.y = data.y
    this.width = data.width || 140
    this.height = data.height || 140
    this.type = data.type
    this.title = data.title
    this.category = data.category
    this.badge = data.badge
    this.color = data.color || '#facc15'
    this.data = data

    this.animTimer = Math.random() * 10
    this.isPlayerNearby = false
  }

  update(player) {
    this.animTimer += 0.06
    const portalCenterX = this.x + this.width / 2
    const playerCenterX = player.x + player.width / 2
    this.isPlayerNearby = Math.abs(portalCenterX - playerCenterX) < 95
  }

  draw(ctx, cameraX) {
    const screenX = this.x - cameraX
    const screenY = this.y
    const centerX = screenX + this.width / 2
    const centerY = screenY + this.height / 2

    ctx.save()

    // Portal Station Arch (Mario / Dive Arcade Housing)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)'
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.isPlayerNearby ? 4 : 2.5
    ctx.shadowColor = this.color
    ctx.shadowBlur = this.isPlayerNearby ? 25 : 10

    ctx.beginPath()
    ctx.roundRect(screenX, screenY, this.width, this.height, 16)
    ctx.fill()
    ctx.stroke()
    ctx.shadowBlur = 0

    // Top Badge Pill
    ctx.fillStyle = this.color
    ctx.font = 'bold 9px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(`★ ${this.badge} ★`, centerX, screenY + 20)

    // Center Station Icon
    let icon = '⭐'
    if (this.type === 'project') icon = '🌊'
    else if (this.type === 'experience') icon = '🏭'
    else if (this.type === 'download') icon = '✈️'
    else if (this.type === 'contact') icon = '🏰'

    ctx.font = '32px sans-serif'
    ctx.textBaseline = 'middle'
    ctx.fillText(icon, centerX, centerY - 6)

    // Station Title
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 12px monospace'
    ctx.fillText(this.title, centerX, screenY + this.height - 20)

    // Category
    ctx.fillStyle = '#94a3b8'
    ctx.font = '8px sans-serif'
    ctx.fillText(this.category.substring(0, 22), centerX, screenY + this.height - 8)

    // Action banner when avatar is near
    if (this.isPlayerNearby) {
      const bannerY = screenY - 28 + Math.sin(this.animTimer * 4) * 3
      ctx.fillStyle = '#facc15'
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.roundRect(centerX - 70, bannerY, 140, 24, 8)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = '#000000'
      ctx.font = 'black 10px monospace'
      ctx.fillText('▶ TAP / PRESS [E]', centerX, bannerY + 16)
    }

    ctx.restore()
  }
}

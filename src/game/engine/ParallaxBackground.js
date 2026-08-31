// Robby Leonardi Exact 1:1 Parallax Scene Engine

export class ParallaxBackground {
  constructor() {
    this.animTimer = 0
    this.clouds = [
      { x: 120, y: 75, scale: 1.2 },
      { x: 500, y: 45, scale: 1.0 },
      { x: 920, y: 80, scale: 1.35 },
      { x: 1350, y: 55, scale: 1.1 },
      { x: 1800, y: 70, scale: 1.25 },
      { x: 2250, y: 45, scale: 1.0 },
    ]

    this.bubbles = []
    for (let i = 0; i < 30; i++) {
      this.bubbles.push({
        x: 2500 + Math.random() * 2500,
        y: Math.random() * 550,
        r: Math.random() * 5 + 2,
        speedY: Math.random() * 0.7 + 0.3,
      })
    }
  }

  update() {
    this.animTimer += 0.035
    for (const b of this.bubbles) {
      b.y -= b.speedY
      if (b.y < 20) b.y = 580
    }
  }

  draw(ctx, width, height, cameraX, currentBiome) {
    const groundY = height * 0.80
    const isUnderwater = cameraX >= 2400 && cameraX < 5000
    const isFactory = cameraX >= 5000 && cameraX < 7400
    const isSky = cameraX >= 7400 && cameraX < 9300
    const isCastle = cameraX >= 9300

    // 1. EXACT ROBBY CYAN SKY BACKGROUND (#00bff3)
    if (isUnderwater) {
      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, '#02182b')
      grad.addColorStop(1, '#0b4f6c')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Light Caustic Rays
      ctx.save()
      ctx.globalAlpha = 0.15
      for (let bx = 0; bx < width + 200; bx += 140) {
        const beam = ctx.createLinearGradient(bx, 0, bx + 80, height)
        beam.addColorStop(0, '#ffffff')
        beam.addColorStop(1, 'transparent')
        ctx.fillStyle = beam
        ctx.beginPath()
        ctx.moveTo(bx + Math.sin(this.animTimer + bx) * 15, 0)
        ctx.lineTo(bx + 70 + Math.sin(this.animTimer + bx) * 15, 0)
        ctx.lineTo(bx + 160, height)
        ctx.lineTo(bx + 90, height)
        ctx.fill()
      }
      ctx.restore()

      // Bubbles
      ctx.save()
      for (const b of this.bubbles) {
        const sx = b.x - cameraX
        if (sx < -40 || sx > width + 40) continue
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(sx, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      }
      ctx.restore()
    } else if (isFactory) {
      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, '#3a1c71')
      grad.addColorStop(0.6, '#d76d77')
      grad.addColorStop(1, '#ffaf7b')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)
    } else if (isSky) {
      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, '#2e1065')
      grad.addColorStop(1, '#c084fc')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)
    } else if (isCastle) {
      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, '#090d16')
      grad.addColorStop(1, '#1e293b')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)
    } else {
      // Robby Leonardi authentic bright cyan sky (#00bff3)
      ctx.fillStyle = '#00bff3'
      ctx.fillRect(0, 0, width, height)
    }

    // 2. PUFFY CARTOON CLOUDS
    if (!isUnderwater) {
      ctx.save()
      for (const c of this.clouds) {
        const cloudX = (c.x - cameraX * 0.25) % (width + 400)
        const drawX = cloudX < -150 ? cloudX + width + 400 : cloudX
        this.drawRobbyCloud(ctx, drawX, c.y, c.scale)
      }
      ctx.restore()
    }

    // 3. TITLE SCENE BACKGROUND (Trees, Mountain, Ribbon, Giant 3D Title)
    if (cameraX < 1600) {
      this.drawTitleScene(ctx, width, height, cameraX, groundY)
    }
  }

  drawRobbyCloud(ctx, x, y, scale = 1) {
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(scale, scale)
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(-28, 12, 18, 0, Math.PI * 2)
    ctx.arc(0, 0, 28, 0, Math.PI * 2)
    ctx.arc(30, 8, 22, 0, Math.PI * 2)
    ctx.arc(52, 14, 16, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillRect(-28, 12, 80, 16)
    ctx.restore()
  }

  drawTitleScene(ctx, width, height, cameraX, groundY) {
    const titleCenterX = width * 0.5 - cameraX

    // -------------------------------------------------------------
    // A. GEOMETRIC MOUNTAIN (Right Background)
    // -------------------------------------------------------------
    const mtnBaseX = titleCenterX + 280
    ctx.save()
    // Light brown front facet
    ctx.fillStyle = '#c68a4c'
    ctx.beginPath()
    ctx.moveTo(mtnBaseX, groundY)
    ctx.lineTo(mtnBaseX + 180, groundY - 370)
    ctx.lineTo(mtnBaseX + 180, groundY)
    ctx.closePath()
    ctx.fill()

    // Dark brown shadow facet
    ctx.fillStyle = '#9b642f'
    ctx.beginPath()
    ctx.moveTo(mtnBaseX + 180, groundY - 370)
    ctx.lineTo(mtnBaseX + 460, groundY)
    ctx.lineTo(mtnBaseX + 180, groundY)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    // -------------------------------------------------------------
    // B. ROBBY LEONARDI EXACT TREES & BUSHES
    // -------------------------------------------------------------
    // Far-left medium dome tree
    this.drawCapsuleTree(ctx, titleCenterX - 580, groundY, 140, 310, '#558b2b', '#457223', '#8d6e63')

    // Giant center-left rounded pill tree (2-tone split)
    this.drawCapsuleTree(ctx, titleCenterX - 450, groundY, 180, 420, '#7bc043', '#689f38', '#8d6e63')

    // Front-left small green bush
    this.drawRoundBush(ctx, titleCenterX - 320, groundY, 140, 160, '#7bc043', '#689f38')

    // Right side trees
    this.drawCapsuleTree(ctx, titleCenterX + 340, groundY, 140, 270, '#7bc043', '#689f38', '#8d6e63')
    this.drawRoundBush(ctx, titleCenterX + 210, groundY, 130, 145, '#7bc043', '#689f38')

    // -------------------------------------------------------------
    // C. RED RIBBON BANNER ("Interactive Resume of")
    // -------------------------------------------------------------
    ctx.save()
    const ribbonY = groundY - 420
    const ribbonW = 380
    const ribbonH = 50
    const ribbonX = titleCenterX - ribbonW / 2

    // Ribbon Fold Tails (Behind at left & right)
    ctx.fillStyle = '#b91c1c'
    // Left tail
    ctx.beginPath()
    ctx.moveTo(ribbonX - 32, ribbonY + 16)
    ctx.lineTo(ribbonX + 10, ribbonY + 16)
    ctx.lineTo(ribbonX + 10, ribbonY + ribbonH + 16)
    ctx.lineTo(ribbonX - 32, ribbonY + ribbonH + 16)
    ctx.lineTo(ribbonX - 16, ribbonY + ribbonH / 2 + 16)
    ctx.closePath()
    ctx.fill()

    // Right tail
    ctx.beginPath()
    ctx.moveTo(ribbonX + ribbonW + 32, ribbonY + 16)
    ctx.lineTo(ribbonX + ribbonW - 10, ribbonY + 16)
    ctx.lineTo(ribbonX + ribbonW - 10, ribbonY + ribbonH + 16)
    ctx.lineTo(ribbonX + ribbonW + 32, ribbonY + ribbonH + 16)
    ctx.lineTo(ribbonX + ribbonW + 16, ribbonY + ribbonH / 2 + 16)
    ctx.closePath()
    ctx.fill()

    // Ribbon Body (#ed1c24)
    ctx.fillStyle = '#ed1c24'
    ctx.fillRect(ribbonX, ribbonY, ribbonW, ribbonH)
    ctx.fillStyle = '#f87171'
    ctx.fillRect(ribbonX, ribbonY, ribbonW, 4) // Top highlight
    ctx.fillStyle = '#b91c1c'
    ctx.fillRect(ribbonX, ribbonY + ribbonH - 4, ribbonW, 4) // Bottom shadow

    // Text: "Interactive Resume of"
    ctx.fillStyle = '#ffffff'
    ctx.font = 'italic bold 23px "Georgia", "Times New Roman", serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Interactive Resume of', titleCenterX, ribbonY + ribbonH / 2 + 1)
    ctx.restore()

    // -------------------------------------------------------------
    // D. 3D ISOMETRIC EXTRUDED TITLE (KRISHNAKANT / AGRAWAL)
    // -------------------------------------------------------------
    ctx.save()
    const titleY1 = groundY - 295
    const titleY2 = groundY - 190

    // 1. Massive 3D Drop Shadow Extrusion in Deep Crimson (#6b0b2e)
    for (let offset = 140; offset >= 1; offset -= 2) {
      const shadowColor = offset > 60 ? '#4a0b22' : '#6b0b2e'
      ctx.fillStyle = shadowColor
      ctx.font = '900 94px "Impact", "Arial Black", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('KRISHNAKANT', titleCenterX + offset * 0.95, titleY1 + offset * 0.95)
      ctx.fillText('AGRAWAL', titleCenterX + offset * 0.95, titleY2 + offset * 0.95)
    }

    // 2. Beveled Extrusion Layer for KRISHNAKANT (Orange Side Faces)
    for (let s = 14; s >= 1; s--) {
      ctx.fillStyle = '#d85f16'
      ctx.font = '900 94px "Impact", "Arial Black", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('KRISHNAKANT', titleCenterX + s, titleY1 + s)
    }

    // Front Face of KRISHNAKANT (Warm Robby Orange #ff981f)
    ctx.fillStyle = '#ff981f'
    ctx.font = '900 94px "Impact", "Arial Black", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('KRISHNAKANT', titleCenterX, titleY1)

    // 3. Beveled Extrusion Layer for AGRAWAL (Magenta/Crimson Side Faces)
    for (let s = 14; s >= 1; s--) {
      ctx.fillStyle = '#9e1b32'
      ctx.font = '900 94px "Impact", "Arial Black", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('AGRAWAL', titleCenterX + s, titleY2 + s)
    }

    // Front Face of AGRAWAL (Vibrant Coral Rose #f26d7d)
    ctx.fillStyle = '#f26d7d'
    ctx.fillText('AGRAWAL', titleCenterX, titleY2)
    ctx.restore()
  }

  drawCapsuleTree(ctx, x, groundY, width, height, colorLight, colorDark, trunkColor) {
    ctx.save()
    const trunkW = width * 0.22
    const trunkH = height * 0.42
    ctx.fillStyle = trunkColor
    ctx.fillRect(x + (width - trunkW) / 2, groundY - trunkH, trunkW, trunkH)

    ctx.fillStyle = colorLight
    ctx.beginPath()
    ctx.roundRect(x, groundY - height, width, height - trunkH + 20, width / 2)
    ctx.fill()

    ctx.fillStyle = colorDark
    ctx.beginPath()
    ctx.roundRect(x + width * 0.5, groundY - height, width * 0.5, height - trunkH + 20, [0, width / 2, width / 2, 0])
    ctx.fill()
    ctx.restore()
  }

  drawRoundBush(ctx, x, groundY, width, height, colorLight, colorDark) {
    ctx.save()
    const radius = width / 2
    ctx.fillStyle = colorLight
    ctx.beginPath()
    ctx.arc(x + radius, groundY - height + radius, radius, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = colorDark
    ctx.beginPath()
    ctx.arc(x + radius, groundY - height + radius, radius, Math.PI * 1.5, Math.PI * 0.5)
    ctx.fill()
    ctx.restore()
  }
}

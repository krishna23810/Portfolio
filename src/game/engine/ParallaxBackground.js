// Robby Leonardi 1:1 Parallax Scene Engine with Real Asset Images
// Multi-layer parallax: Clouds (0.2x) -> Mountains (0.5x) -> Mid Trees (0.8x) -> Foreground (1.0x)

import mountainSrc from '../../assets/mountain.png'
import treePillSrc from '../../assets/tree-pill.png'
import treeMedSrc from '../../assets/tree-medium.png'
import treeBushSrc from '../../assets/tree-bush.png'
import treeSrc from '../../assets/tree.png'
import plantSkillSrc from '../../assets/plant-skill.png'
import darkgreen from '../../assets/tree-dark.png'
// import titleKKSrc from '../../assets/Frame 1.png'
import titleKKSrc from '../../assets/image-Photoroom (1).png'
import titleAgrawalSrc from '../../assets/agrawal.png'

// Preload image assets
const mountainImg = new Image()
mountainImg.src = mountainSrc

const treePillImg = new Image()
treePillImg.src = treePillSrc

const treeMedImg = new Image()
treeMedImg.src = treeMedSrc

const treeBushImg = new Image()
treeBushImg.src = treeBushSrc

const treeImg = new Image()
treeImg.src = treeSrc

const plantSkillImg = new Image()
plantSkillImg.src = plantSkillSrc

const darkgreenImg = new Image()
darkgreenImg.src = darkgreen

const titleKKImg = new Image()
titleKKImg.src = titleKKSrc

const titleAgrawalImg = new Image()
titleAgrawalImg.src = titleAgrawalSrc

export class ParallaxBackground {
  constructor() {
    this.animTimer = 0
    this.clouds = [
      { x: 120, y: 75, scale: 1.2 },
      { x: 520, y: 45, scale: 1.0 },
      { x: 960, y: 80, scale: 1.35 },
      { x: 1450, y: 55, scale: 1.1 },
      { x: 1950, y: 70, scale: 1.25 },
      { x: 2450, y: 45, scale: 1.0 },
      { x: 3000, y: 65, scale: 1.3 },
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

    // 1. SKY / BIOME GRADIENTS
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
      // Robby authentic cyan sky
      ctx.fillStyle = '#00bff3'
      ctx.fillRect(0, 0, width, height)
    }

    // 2. PARALLAX LAYER 1: FAR CLOUDS (0.2x Parallax Speed)
    if (!isUnderwater) {
      ctx.save()
      for (const c of this.clouds) {
        const cloudX = (c.x - cameraX * 0.20) % (width + 500)
        const drawX = cloudX < -160 ? cloudX + width + 500 : cloudX
        this.drawRobbyCloud(ctx, drawX, c.y, c.scale)
      }
      ctx.restore()
    }

    // 3. PARALLAX LAYER 2: MOUNTAINS (0.45x Parallax Speed)
    if (!isUnderwater && !isFactory && !isSky && !isCastle) {
      this.drawParallaxMountains(ctx, width, height, cameraX, groundY)
    }

    // 4. PARALLAX LAYER 3: TITLE SCENE & FOREGROUND ASSETS (1.0x Speed)
    if (cameraX < 2400) {
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

  drawParallaxMountains(ctx, width, height, cameraX, groundY) {
    if (!mountainImg.complete || mountainImg.naturalWidth === 0) return

    ctx.save()
    // Mountains move at 0.45x camera speed for deep background parallax
    const mtnParallaxX = -cameraX * 0.45

    // Mountain 1 (Large main mountain behind Level 1)
    const mtn1X = width * 0.5 + 280 + mtnParallaxX
    const mtn1W = 540
    const mtn1H = mtn1W * (mountainImg.naturalHeight / mountainImg.naturalWidth)
    ctx.drawImage(mountainImg, mtn1X, groundY - mtn1H, mtn1W, mtn1H)

    // Mountain 2 (Smaller distant mountain)
    const mtn2X = width * 0.5 + 1100 + mtnParallaxX
    const mtn2W = 420
    const mtn2H = mtn2W * (mountainImg.naturalHeight / mountainImg.naturalWidth)
    ctx.drawImage(mountainImg, mtn2X, groundY - mtn2H, mtn2W, mtn2H)

    // Mountain 3 (Third distant peak before ocean)
    const mtn3X = width * 0.5 + 2000 + mtnParallaxX
    const mtn3W = 480
    const mtn3H = mtn3W * (mountainImg.naturalHeight / mountainImg.naturalWidth)
    ctx.drawImage(mountainImg, mtn3X, groundY - mtn3H, mtn3W, mtn3H)

    ctx.restore()
  }

  drawTitleScene(ctx, width, height, cameraX, groundY) {
    const titleCenterX = width * 0.5 - cameraX

    // -------------------------------------------------------------
    // A. FOREGROUND TREES & BUSHES (Using User's Image Assets)
    // -------------------------------------------------------------
    ctx.save()




    // 3. Front-left round bush (treeBushImg)


    // 4. Right-side pill tree & bush

    ctx.restore()

    // -------------------------------------------------------------
    // B. ROBBY LEONARDI 1:1 RED RIBBON BANNER
    // -------------------------------------------------------------
    ctx.save()
    const ribbonW = 390
    const ribbonH = 46
    const ribbonCenterX = titleCenterX - 10
    const ribbonY = groundY - 460
    const ribbonX = ribbonCenterX - ribbonW / 2

    // Left Ribbon Tail Fold
    ctx.fillStyle = '#9b111e'
    ctx.beginPath()
    ctx.moveTo(ribbonX - 32, ribbonY + 14)
    ctx.lineTo(ribbonX + 10, ribbonY + 14)
    ctx.lineTo(ribbonX + 10, ribbonY + ribbonH + 14)
    ctx.lineTo(ribbonX - 32, ribbonY + ribbonH + 14)
    ctx.lineTo(ribbonX - 16, ribbonY + ribbonH / 2 + 14)
    ctx.closePath()
    ctx.fill()

    // Right Ribbon Tail Fold
    ctx.beginPath()
    ctx.moveTo(ribbonX + ribbonW + 32, ribbonY + 14)
    ctx.lineTo(ribbonX - 10 + ribbonW, ribbonY + 14)
    ctx.lineTo(ribbonX - 10 + ribbonW, ribbonY + ribbonH + 14)
    ctx.lineTo(ribbonX + ribbonW + 32, ribbonY + ribbonH + 14)
    ctx.lineTo(ribbonX + ribbonW + 16, ribbonY + ribbonH / 2 + 14)
    ctx.closePath()
    ctx.fill()

    // Main Ribbon Body (#ed1c24)
    ctx.fillStyle = '#ed1c24'
    ctx.fillRect(ribbonX, ribbonY, ribbonW, ribbonH)

    // Ribbon Top Highlight & Bottom Shadow
    ctx.fillStyle = '#f87171'
    ctx.fillRect(ribbonX, ribbonY, ribbonW, 3)
    ctx.fillStyle = '#b91c1c'
    ctx.fillRect(ribbonX, ribbonY + ribbonH - 3, ribbonW, 3)

    // Ribbon Text: "Interactive Resume of"
    ctx.fillStyle = '#ffffff'
    ctx.font = 'italic bold 21px "Georgia", "Times New Roman", serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Interactive Resume of', ribbonCenterX, ribbonY + ribbonH / 2 + 1)
    ctx.restore()

    // -------------------------------------------------------------
    // C. ROBBY LEONARDI 1:1 AUTHENTIC 3D TITLE ASSETS (Layered)
    // -------------------------------------------------------------
    ctx.save()

    // 1. KRISHNAKANT 3D Graphic (Top-Left Stagger)
    if (titleKKImg.complete && titleKKImg.naturalWidth > 0) {
      const w1 = 1020
      const h1 = w1 * (titleKKImg.naturalHeight / titleKKImg.naturalWidth)
      const x1 = titleCenterX - w1 * 0.7
      const y1 = groundY - h1 * 0.99
      ctx.drawImage(titleKKImg, x1, y1, w1, h1)
    }
    // right round bush (treeBushImg)
    if (darkgreenImg.complete && darkgreenImg.naturalWidth > 0) {
      const bushW = 100
      const bushH = bushW * (darkgreenImg.naturalHeight / darkgreenImg.naturalWidth)
      ctx.drawImage(darkgreenImg, titleCenterX + 250, groundY - bushH, bushW, bushH)
    }

    // Right pill tree (treePillImg)
    if (treePillImg.complete && treePillImg.naturalWidth > 0) {
      const treeW = 200
      const treeH = treeW * (treePillImg.naturalHeight / treePillImg.naturalWidth) * 0.8
      ctx.drawImage(treePillImg, titleCenterX + 260, groundY - treeH, treeW, treeH)
    }
    // 2. AGRAWAL 3D Graphic (Bottom-Right Stagger, In Front with Full Visibility)
    if (titleAgrawalImg.complete && titleAgrawalImg.naturalWidth > 0) {
      const w2 = 920
      const h2 = w2 * (titleAgrawalImg.naturalHeight / titleAgrawalImg.naturalWidth)
      const x2 = titleCenterX - w2 * 0.55
      const y2 = groundY - h2 * 0.9
      ctx.drawImage(titleAgrawalImg, x2, y2, w2, h2)
    }

    // Far-left medium dome tree (treeMedImg)
    if (darkgreenImg.complete && treeMedImg.naturalWidth > 0) {
      const treeW = 150
      const treeH = treeW * (treeMedImg.naturalHeight / treeMedImg.naturalWidth)
      ctx.drawImage(treeMedImg, titleCenterX - 380, groundY - treeH, treeW, treeH)
    }


    // Left classic dome tree (treeImg) have to remove black background in this image  
    if (treeImg.complete && treeImg.naturalWidth > 0) {
      const treeW = 200
      const treeH = treeW * (treeImg.naturalHeight / treeImg.naturalWidth) * 1.1
      // use cuttreeImg for remove black background with mix bland mode
      ctx.drawImage(treeImg, titleCenterX - 700, groundY - treeH, treeW, treeH)
    }
    // Left pill tree (treePillImg)
    if (treePillImg.complete && treePillImg.naturalWidth > 0) {
      const treeW = 220
      const treeH = treeW * (treePillImg.naturalHeight / treePillImg.naturalWidth)
      ctx.drawImage(treePillImg, titleCenterX - 560, groundY - treeH, treeW, treeH)
    }

    // Left round bush (treeBushImg)
    // if (darkgreenImg.complete && darkgreenImg.naturalWidth > 0) {
    //   const bushW = 145
    //   const bushH = bushW * (darkgreenImg.naturalHeight / darkgreenImg.naturalWidth)
    //   ctx.drawImage(darkgreenImg, titleCenterX - 450, groundY - bushH, bushW, bushH)
    // }

    // Right round bush (treeBushImg)
    if (treeBushImg.complete && treeBushImg.naturalWidth > 0) {
      const bushW = 130
      const bushH = bushW * (treeBushImg.naturalHeight / treeBushImg.naturalWidth)
      ctx.drawImage(treeBushImg, titleCenterX + 180, groundY - bushH, bushW, bushH)
    }


    // Right classic dome tree (treeImg)
    if (treeImg.complete && treeImg.naturalWidth > 0) {
      const treeW = 140
      const treeH = treeW * (treeImg.naturalHeight / treeImg.naturalWidth)
      ctx.drawImage(treeImg, titleCenterX + 420, groundY - treeH, treeW, treeH)
    }


    // 5. Level 1 Skill Stalk Plants (plantSkillImg)
    if (plantSkillImg.complete && plantSkillImg.naturalWidth > 0) {
      const plantW = 48
      const plantH = plantW * (plantSkillImg.naturalHeight / plantSkillImg.naturalWidth)
      ctx.drawImage(plantSkillImg, titleCenterX + 720, groundY - plantH, plantW, plantH)
      ctx.drawImage(plantSkillImg, titleCenterX + 840, groundY - plantH * 0.85, plantW * 0.85, plantH * 0.85)
      ctx.drawImage(plantSkillImg, titleCenterX + 960, groundY - plantH * 1.1, plantW * 1.1, plantH * 1.1)
    }
    ctx.restore()
  }
}

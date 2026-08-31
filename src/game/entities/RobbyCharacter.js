// Pixel-Perfect Robby Leonardi Vector Superhero Character

export function drawRobbyCharacter(
  ctx,
  bounceY = 0,
  isMoving = false,
  stridePhase = 0
) {
  const RED = '#e52d27'
  const DARK_RED = '#b91c1c'
  const ORANGE = '#f39c12'
  const SKIN = '#fed7aa'
  const BLACK = '#111827'
  const WHITE = '#ffffff'

  const y = bounceY
  const legAngle = isMoving ? Math.sin(stridePhase) * 0.6 : 0
  const armSwing = isMoving ? Math.sin(stridePhase) * 0.5 : 0

  ctx.save()

  // 1. Drop Shadow on Ground
  ctx.fillStyle = 'rgba(0, 0, 0, 0.22)'
  ctx.beginPath()
  ctx.ellipse(0, 52, 28, 7, 0, 0, Math.PI * 2)
  ctx.fill()

  // 2. Red Superhero Cape (Flows dynamically behind back on the left)
  ctx.fillStyle = RED
  ctx.beginPath()
  ctx.moveTo(-16, -10 + y)
  ctx.lineTo(-38, 14 + y)
  ctx.lineTo(-24, 34 + y)
  ctx.lineTo(-6, 8 + y)
  ctx.closePath()
  ctx.fill()

  // 3. Two Legs & 3D Red Block Boots
  // Left Leg & Boot (Rear in 3/4 view)
  ctx.save()
  ctx.translate(-8, 22 + y)
  ctx.rotate(-legAngle)
  ctx.fillStyle = ORANGE
  ctx.fillRect(-5, 0, 10, 20)
  ctx.fillStyle = RED
  ctx.fillRect(-9, 18, 18, 11) // Red block boot
  ctx.restore()

  // Right Leg & Boot (Front in 3/4 view)
  ctx.save()
  ctx.translate(8, 22 + y)
  ctx.rotate(legAngle)
  ctx.fillStyle = ORANGE
  ctx.fillRect(-5, 0, 10, 20)
  ctx.fillStyle = RED
  ctx.fillRect(-8, 18, 19, 11) // Red block boot
  ctx.restore()

  // 4. Red Shorts / Trunks
  ctx.fillStyle = RED
  ctx.fillRect(-18, 14 + y, 36, 12)

  // 5. Clean Orange Torso
  ctx.fillStyle = ORANGE
  ctx.beginPath()
  ctx.roundRect(-18, -14 + y, 36, 30, 6)
  ctx.fill()

  // 6. Bold Red Block Emblem 'KK' on Chest
  ctx.fillStyle = RED
  ctx.font = '900 17px "Impact", "Arial Black", sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('KK', 0, 1 + y)

  // 7. Left Arm & Round Hand (Natural curve to left)
  ctx.save()
  ctx.translate(-18, -6 + y)
  ctx.rotate(0.38 - armSwing)
  ctx.fillStyle = ORANGE
  ctx.beginPath()
  ctx.roundRect(-5, 0, 10, 24, 5)
  ctx.fill()
  ctx.fillStyle = SKIN
  ctx.beginPath()
  ctx.arc(0, 27, 6.5, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // 8. Right Arm & Round Hand (Natural curve to right)
  ctx.save()
  ctx.translate(18, -6 + y)
  ctx.rotate(-0.38 + armSwing)
  ctx.fillStyle = ORANGE
  ctx.beginPath()
  ctx.roundRect(-5, 0, 10, 24, 5)
  ctx.fill()
  ctx.fillStyle = SKIN
  ctx.beginPath()
  ctx.arc(0, 27, 6.5, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // 9. Single Round Ear (Left Profile)
  ctx.fillStyle = SKIN
  ctx.beginPath()
  ctx.arc(-20, -28 + y, 6.5, 0, Math.PI * 2)
  ctx.fill()

  // 10. Head Base & Skin
  ctx.fillStyle = SKIN
  ctx.beginPath()
  ctx.arc(0, -30 + y, 20, 0, Math.PI * 2)
  ctx.fill()

  // 11. Jet Black Hair Cut (Smooth modern curve)
  ctx.fillStyle = BLACK
  ctx.beginPath()
  ctx.arc(0, -33 + y, 20, Math.PI * 0.85, Math.PI * 2.15)
  ctx.fill()
  ctx.fillRect(-20, -33 + y, 8, 16) // Hair sideburn

  // 12. Red Glasses Temple Arm (Connecting eye to ear)
  ctx.fillStyle = RED
  ctx.fillRect(-20, -30 + y, 16, 4)

  // 13. Red Glasses Frames & Eyes (3/4 angle)
  // Left Frame & Lens
  ctx.fillStyle = WHITE
  ctx.strokeStyle = RED
  ctx.lineWidth = 4.5
  ctx.beginPath()
  ctx.arc(-8, -28 + y, 10, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = BLACK
  ctx.beginPath()
  ctx.arc(-6, -28 + y, 4.5, 0, Math.PI * 2)
  ctx.fill()

  // Eye reflection highlight
  ctx.fillStyle = WHITE
  ctx.beginPath()
  ctx.arc(-8, -31 + y, 1.8, 0, Math.PI * 2)
  ctx.fill()

  // Right Frame & Lens
  ctx.fillStyle = WHITE
  ctx.beginPath()
  ctx.arc(9, -28 + y, 10, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = BLACK
  ctx.beginPath()
  ctx.arc(11, -28 + y, 4.5, 0, Math.PI * 2)
  ctx.fill()

  // Eye reflection highlight
  ctx.fillStyle = WHITE
  ctx.beginPath()
  ctx.arc(9, -31 + y, 1.8, 0, Math.PI * 2)
  ctx.fill()

  // 14. Iconic Robby Leonardi Capsule Lips
  ctx.fillStyle = '#ff7675'
  ctx.beginPath()
  ctx.roundRect(-12, -16 + y, 24, 8, 4)
  ctx.fill()

  // Dark central smile line
  ctx.strokeStyle = '#c0392b'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(-9, -12 + y)
  ctx.lineTo(9, -12 + y)
  ctx.stroke()

  ctx.restore()
}
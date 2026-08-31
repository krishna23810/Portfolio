// Player Entity with Mario Runner & Underwater Submarine Modes (Robby Leonardi style)

export class Player {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 36
    this.height = 50

    // Physics
    this.vx = 0
    this.vy = 0
    this.speed = 7.5
    this.jumpForce = -15.5
    this.gravity = 0.65
    this.isGrounded = false
    this.facing = 'right'

    // Mode
    this.isSubmarine = false
    this.propellerAngle = 0

    // Animation timers
    this.animTimer = 0
    this.stridePhase = 0
    this.isMoving = false
    this.particles = []
  }

  update(inputs, platforms, groundSegments, pipes) {
    this.animTimer += 0.08

    // Check if in underwater zone (X: 2500 to 5000)
    this.isSubmarine = this.x >= 2500 && this.x < 5000

    if (this.isSubmarine) {
      // SUBMARINE UNDERWATER CONTROLS
      this.speed = 6.5
      this.propellerAngle += 0.45

      if (inputs.left && !inputs.right) {
        this.vx = -this.speed
        this.facing = 'left'
        this.isMoving = true
      } else if (inputs.right && !inputs.left) {
        this.vx = this.speed
        this.facing = 'right'
        this.isMoving = true
      } else {
        this.vx *= 0.85
        if (Math.abs(this.vx) < 0.1) this.vx = 0
        this.isMoving = false
      }

      // Swimming upward / downward
      if (inputs.jump) {
        this.vy = -6.5 // Swim up
        this.spawnBubble(1)
      } else {
        this.vy = Math.sin(this.animTimer * 2) * 1.2 // Gentle submarine buoyancy
      }

      this.x += this.vx
      this.y += this.vy

      // Keep submarine within water vertical bounds (Y: 100 to 450)
      if (this.y < 110) this.y = 110
      if (this.y > 440) this.y = 440

      if (this.isMoving && Math.random() < 0.3) {
        this.spawnBubble(1)
      }
    } else {
      // LAND MARIO PLATFORMER CONTROLS
      this.speed = 7.5

      if (inputs.left && !inputs.right) {
        this.vx = -this.speed
        this.facing = 'left'
        this.isMoving = true
      } else if (inputs.right && !inputs.left) {
        this.vx = this.speed
        this.facing = 'right'
        this.isMoving = true
      } else {
        this.vx *= 0.78
        if (Math.abs(this.vx) < 0.1) this.vx = 0
        this.isMoving = false
      }

      if (inputs.jump && this.isGrounded) {
        this.vy = this.jumpForce
        this.isGrounded = false
        this.spawnDust(6, '#ffffff')
      }

      this.vy += this.gravity
      if (this.vy > 18) this.vy = 18

      this.x += this.vx
      this.y += this.vy

      if (this.isGrounded && Math.abs(this.vx) > 0.5) {
        this.stridePhase += 0.28
        if (Math.random() < 0.25) {
          this.spawnDust(1, 'rgba(255,255,255,0.6)')
        }
      } else {
        this.stridePhase = 0
      }

      // Collision checks
      this.isGrounded = false

      // 1. Ground Segments
      for (const ground of groundSegments) {
        if (
          this.x + this.width > ground.x &&
          this.x < ground.x + ground.width &&
          this.y + this.height >= ground.y &&
          this.y + this.height <= ground.y + 30 &&
          this.vy >= 0
        ) {
          this.y = ground.y - this.height
          this.vy = 0
          this.isGrounded = true
        }
      }

      // 2. Floating Platforms
      for (const p of platforms) {
        if (
          this.x + this.width > p.x &&
          this.x < p.x + p.width &&
          this.y + this.height >= p.y &&
          this.y + this.height <= p.y + 26 &&
          this.vy >= 0
        ) {
          this.y = p.y - this.height
          this.vy = 0
          this.isGrounded = true
        }
      }

      // 3. Green Warp Pipes
      if (pipes) {
        for (const pipe of pipes) {
          if (
            this.x + this.width > pipe.x &&
            this.x < pipe.x + pipe.width &&
            this.y + this.height >= pipe.y &&
            this.y + this.height <= pipe.y + 26 &&
            this.vy >= 0
          ) {
            this.y = pipe.y - this.height
            this.vy = 0
            this.isGrounded = true
          }
        }
      }
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i]
      pt.x += pt.vx
      pt.y += pt.vy
      pt.alpha -= pt.type === 'bubble' ? 0.02 : 0.04
      pt.size *= 0.96
      if (pt.alpha <= 0) {
        this.particles.splice(i, 1)
      }
    }
  }

  spawnDust(count, color) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.x + this.width / 2 + (Math.random() - 0.5) * 12,
        y: this.y + this.height,
        vx: (Math.random() - 0.5) * 3,
        vy: -Math.random() * 2 - 0.5,
        size: Math.random() * 4 + 2,
        alpha: 0.8,
        color: color,
        type: 'dust',
      })
    }
  }

  spawnBubble(count) {
    for (let i = 0; i < count; i++) {
      const exhaustX = this.facing === 'right' ? this.x - 12 : this.x + this.width + 12
      this.particles.push({
        x: exhaustX,
        y: this.y + this.height / 2 + (Math.random() - 0.5) * 10,
        vx: this.facing === 'right' ? -Math.random() * 2 - 1 : Math.random() * 2 + 1,
        vy: -Math.random() * 1.5 - 0.5,
        size: Math.random() * 5 + 3,
        alpha: 0.9,
        color: '#ffffff',
        type: 'bubble',
      })
    }
  }

  draw(ctx, cameraX) {
    const screenX = this.x - cameraX
    const screenY = this.y

    // Draw trailing particles
    for (const pt of this.particles) {
      ctx.save()
      ctx.globalAlpha = pt.alpha
      ctx.fillStyle = pt.color
      ctx.strokeStyle = 'rgba(255,255,255,0.8)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(pt.x - cameraX, pt.y, pt.size, 0, Math.PI * 2)
      ctx.fill()
      if (pt.type === 'bubble') ctx.stroke()
      ctx.restore()
    }

    ctx.save()
    ctx.translate(screenX + this.width / 2, screenY + this.height / 2)
    if (this.facing === 'left') {
      ctx.scale(-1, 1)
    }

    if (this.isSubmarine) {
      // ==========================================
      // ROBBY LEONARDI YELLOW SUBMARINE SPRITE
      // ==========================================
      const subTilt = this.vy * 0.05
      ctx.rotate(subTilt)

      // Submarine Hull (Bright Yellow)
      ctx.fillStyle = '#facc15'
      ctx.strokeStyle = '#ca8a04'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.ellipse(0, 4, 26, 18, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Top Glass Dome / Cockpit
      ctx.fillStyle = '#67e8f9'
      ctx.strokeStyle = '#0891b2'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(0, -6, 12, Math.PI, 0)
      ctx.fill()
      ctx.stroke()

      // KA Head inside cockpit
      ctx.fillStyle = '#ef4444' // Red cap
      ctx.beginPath()
      ctx.arc(0, -9, 6, 0, Math.PI * 2)
      ctx.fill()

      // Periscope
      ctx.fillStyle = '#ef4444'
      ctx.fillRect(4, -20, 4, 10)
      ctx.fillRect(4, -20, 8, 4)

      // Rear Propeller
      ctx.save()
      ctx.translate(-26, 4)
      ctx.rotate(this.propellerAngle)
      ctx.fillStyle = '#ef4444'
      ctx.fillRect(-2, -12, 4, 24)
      ctx.restore()

      // Porthole Window
      ctx.fillStyle = '#0891b2'
      ctx.beginPath()
      ctx.arc(8, 6, 5, 0, Math.PI * 2)
      ctx.fill()
    } else {
      // =========================================================================
      // ROBBY LEONARDI SIGNATURE CARTOON DEVELOPER AVATAR
      // =========================================================================
      const bounceY = this.isGrounded && this.isMoving ? Math.sin(this.stridePhase) * 4 : Math.sin(this.animTimer * 2) * 1.5
      const legAngle = this.isGrounded && this.isMoving ? Math.sin(this.stridePhase) * 0.7 : 0

      // Shadow on Ground
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
      ctx.beginPath()
      ctx.ellipse(0, this.height / 2 - 1, 14, 5, 0, 0, Math.PI * 2)
      ctx.fill()

      // Back Leg (Red superhero pants & Red Boots)
      ctx.save()
      ctx.translate(4, 8)
      ctx.rotate(-legAngle)
      ctx.fillStyle = '#dc2626'
      ctx.fillRect(-4, 0, 8, 14)
      ctx.fillStyle = '#991b1b'
      ctx.fillRect(-5, 12, 12, 6)
      ctx.restore()

      // Front Leg
      ctx.save()
      ctx.translate(-4, 8)
      ctx.rotate(legAngle)
      ctx.fillStyle = '#ef4444'
      ctx.fillRect(-4, 0, 8, 14)
      ctx.fillStyle = '#b91c1c'
      ctx.fillRect(-5, 12, 12, 6)
      ctx.restore()

      // Torso / Outfit (Bright Red with Gold Crest)
      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.roundRect(-12, -12 + bounceY, 24, 24, 4)
      ctx.fill()

      // Golden Belt
      ctx.fillStyle = '#f59e0b'
      ctx.fillRect(-12, 4 + bounceY, 24, 6)

      // KA Gold Shield Crest on Chest
      ctx.fillStyle = '#fef08a'
      ctx.strokeStyle = '#d97706'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(0, -9 + bounceY)
      ctx.lineTo(8, -5 + bounceY)
      ctx.lineTo(6, 2 + bounceY)
      ctx.lineTo(0, 6 + bounceY)
      ctx.lineTo(-6, 2 + bounceY)
      ctx.lineTo(-8, -5 + bounceY)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = '#b45309'
      ctx.font = 'bold 8px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('KA', 0, 1 + bounceY)

      // Head (Cute round cartoon head with black hair)
      ctx.fillStyle = '#fed7aa' // Skin tone
      ctx.beginPath()
      ctx.arc(0, -19 + bounceY, 12, 0, Math.PI * 2)
      ctx.fill()

      // Hair (Black stylish crop on top)
      ctx.fillStyle = '#1e1b4b'
      ctx.beginPath()
      ctx.arc(0, -22 + bounceY, 12, Math.PI, 0)
      ctx.fill()

      // Signature Robby Leonardi Round White Glasses & Big Eyes
      // Left Eye & White Rim
      ctx.fillStyle = '#ffffff'
      ctx.strokeStyle = '#dc2626'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(-4, -18 + bounceY, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Left Pupil
      ctx.fillStyle = '#0f172a'
      ctx.beginPath()
      ctx.arc(-3, -18 + bounceY, 2.5, 0, Math.PI * 2)
      ctx.fill()

      // Right Eye & White Rim
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(5, -18 + bounceY, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Right Pupil
      ctx.fillStyle = '#0f172a'
      ctx.beginPath()
      ctx.arc(6, -18 + bounceY, 2.5, 0, Math.PI * 2)
      ctx.fill()

      // Glasses Bridge
      ctx.fillStyle = '#dc2626'
      ctx.fillRect(0, -19 + bounceY, 2, 2)

      // Cute Cartoon Smile / Mouth
      ctx.fillStyle = '#f87171'
      ctx.beginPath()
      ctx.arc(0, -11 + bounceY, 4, 0, Math.PI)
      ctx.fill()

      // Arms & Hands (Red sleeves with skin-toned hands)
      const armSwing = this.isGrounded && this.isMoving ? Math.sin(this.stridePhase) * 0.6 : 0
      ctx.save()
      ctx.translate(-7, -6 + bounceY)
      ctx.rotate(-armSwing)
      ctx.fillStyle = '#ef4444'
      ctx.fillRect(-3, 0, 6, 13)
      ctx.fillStyle = '#fed7aa'
      ctx.beginPath()
      ctx.arc(0, 14, 3.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    ctx.restore()
  }
}

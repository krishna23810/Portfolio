// Robby Leonardi Character — Sprite Sheet Renderer
// Uses actual sprite sheet image (robby-slides.png) just like the original site
// Maps animation states to frame positions in the sheet

import spriteSheetUrl from '../../assets/user.png'
import eyesCloseUrl from '../../assets/eyes-closed.png'

// Sprite sheet configuration for user.png (192x192 per cell: 9 cols x 2 rows)
const COLS = 9
const ROWS = 2

// Animation frames from user.png (Row 0: 0-8, Row 1: 9-17)
// 0: Stand 3/4 right, 1: Run step 1, 2: Walk stride, 3: Fly1, 4: Fly2, 5: Fly3, 6: Jump arms out, 7: Jump cape, 8: Cheer
// 9: Stand front, 10: Run step 2, 11: Walk front, 12: Fly, 13: Fly, 14: Fly, 15: Jump, 16: Jump, 17: Cheer
const IDLE_FRAME = 0
const REVERSED_IDLE_FRAME = 9
const WALK_CYCLE = [1, 2]
const REVERSED_WALK_CYCLE = [10, 11]
const FLY_FRAME = [3, 4, 5]
const REVERSED_FLY_FRAME = [12, 13, 14]
const JUMP_FRAME = [6, 7, 8]
const REVERSED_JUMP_FRAME = [15, 16, 17]

// Pre-load images
const spriteSheet = new Image()
spriteSheet.src = spriteSheetUrl

const eyesCloseImg = new Image()
eyesCloseImg.src = eyesCloseUrl

// Blink timer
let lastBlinkTime = 0
let isBlinking = false
const blinkDuration = 150 // ms

export function drawRobbyCharacter(
  ctx,
  bounceY = 0,
  isMoving = false,
  stridePhase = 0,
  isFlying = false,
  isJumping = false,
  facing = 'right'
) {
  if (!spriteSheet.complete || spriteSheet.naturalWidth === 0) return

  const frameW = spriteSheet.naturalWidth / COLS
  const frameH = spriteSheet.naturalHeight / ROWS

  const isLeft = facing === 'left'
  const idleFrame = isLeft ? REVERSED_IDLE_FRAME : IDLE_FRAME
  const walkCycle = isLeft ? REVERSED_WALK_CYCLE : WALK_CYCLE
  const flyFrame = isLeft ? REVERSED_FLY_FRAME : FLY_FRAME
  const jumpFrame = isLeft ? REVERSED_JUMP_FRAME : JUMP_FRAME

  // Helper to pick frame from array or single number
  const animPhase = isMoving ? stridePhase : (performance.now() * 0.008)
  const cycle = ((animPhase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
  const getCycleFrame = (cycleArr) => {
    if (Array.isArray(cycleArr)) {
      const idx = Math.floor((cycle / (Math.PI * 2)) * cycleArr.length) % cycleArr.length
      return cycleArr[idx]
    }
    return cycleArr
  }

  // Pick the correct frame
  let frameIdx = idleFrame
  if (isFlying) {
    frameIdx = getCycleFrame(flyFrame)
  } else if (isJumping) {
    frameIdx = getCycleFrame(jumpFrame)
  } else if (isMoving) {
    frameIdx = getCycleFrame(walkCycle)
  }

  // Calculate source rectangle from sprite sheet
  const col = frameIdx % COLS
  const row = Math.floor(frameIdx / COLS)
  const sx = col * frameW

  // Exact pixel bounds from user.png analysis:
  // Row 0 (facing right): hair y=10 to feet y=185 (height 176px)
  // Row 1 (facing left): hair y=201 to feet y=376 (height 176px)
  const sy = row === 0 ? 10 : 201
  const srcH = 176
  const srcW = frameW

  // Display size — zoomed hero presence matching Robby Leonardi 1:1 scale
  const displayW = 210
  const displayH = srcH * (displayW / srcW)

  ctx.save()

  // Draw the sprite frame centered at origin
  ctx.drawImage(
    spriteSheet,
    sx, sy, srcW, srcH,                                          // Source rectangle
    -displayW / 2, -displayH / 2 + bounceY, displayW, displayH  // Destination
  )

  // Eye blink overlay (every ~3.8s, blinks for 150ms when idle)
  const now = performance.now()
  if (!isBlinking && now - lastBlinkTime > 3000) {
    lastBlinkTime = now
    isBlinking = true
  }

  if (isBlinking) {
    const elapsed = now - lastBlinkTime
    if (elapsed < blinkDuration && (frameIdx === 0 || frameIdx === 9)) {
      if (eyesCloseImg.complete && eyesCloseImg.naturalWidth > 0) {
        // Correctly center closed-eye overlay directly on top of the glasses
        const eyeW = displayW * 0.25
        const eyeH = eyeW * (eyesCloseImg.naturalHeight / eyesCloseImg.naturalWidth)
        const eyeX = -eyeW / 2 + (isLeft ? displayW * 0.0114 : displayW * 0.145)
        const eyeY = -displayH / 2 + displayH * 0.23 + bounceY
        ctx.drawImage(eyesCloseImg, eyeX, eyeY, eyeW, eyeH)
      }
    } else if (elapsed >= blinkDuration) {
      isBlinking = false
      lastBlinkTime = now
    }
  }

  ctx.restore()
}
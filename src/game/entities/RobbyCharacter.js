// Robby Leonardi Character — Sprite Sheet Renderer
// Uses actual sprite sheet image (robby-slides.png) just like the original site
// Maps animation states to frame positions in the sheet

import spriteSheetUrl from '../../assets/image1.png'
import eyesCloseUrl from '../../assets/image copy 2.png'

// Sprite sheet configuration for image1.png (2048x397: 12 cols x 2 rows)
const COLS = 12
const ROWS = 2

// Animation frames from image1.png (Row 0: 0-11, Row 1: 12-23)
// 0: front, 1: 3/4 stand, 2: run right, 3: walk step, 4: fly1, 5: fly2, 6: fly3, 7: fly4, 8: arms out, 9: split1, 10: split2, 11: cheer
const IDLE_FRAME = 1
const WALK_CYCLE = [1, 2, 3, 2]
const FLY_FRAME = 5

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
  isFlying = false
) {
  if (!spriteSheet.complete || spriteSheet.naturalWidth === 0) return

  const frameW = spriteSheet.naturalWidth / COLS
  const frameH = spriteSheet.naturalHeight / ROWS

  // Pick the correct frame
  let frameIdx = IDLE_FRAME
  if (isFlying) {
    frameIdx = FLY_FRAME
  } else if (isMoving) {
    const cycle = ((stridePhase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
    const walkIdx = Math.floor((cycle / (Math.PI * 2)) * WALK_CYCLE.length) % WALK_CYCLE.length
    frameIdx = WALK_CYCLE[walkIdx]
  }

  // Calculate source rectangle from sprite sheet
  const col = frameIdx % COLS
  const row = Math.floor(frameIdx / COLS)
  const sx = col * frameW
  const sy = row * frameH

  // Display size — match Robby Leonardi's hero character proportions
  const displayW = 160
  const displayH = frameH * (displayW / frameW)

  ctx.save()

  // Draw the sprite frame centered at origin
  ctx.drawImage(
    spriteSheet,
    sx, sy, frameW, frameH,            // Source rectangle
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
    if (elapsed < blinkDuration && frameIdx === IDLE_FRAME) {
      if (eyesCloseImg.complete && eyesCloseImg.naturalWidth > 0) {
        // Correctly center closed-eye overlay directly on top of the glasses
        const eyeW = displayW * 0.3
        const eyeH = eyeW * (eyesCloseImg.naturalHeight / eyesCloseImg.naturalWidth)
        const eyeX = -eyeW / 2 + displayW * 0.09
        const eyeY = -displayH / 2 + displayH * 0.22 + bounceY
        ctx.drawImage(eyesCloseImg, eyeX, eyeY, eyeW, eyeH)
      }
    } else if (elapsed >= blinkDuration) {
      isBlinking = false
      lastBlinkTime = now
    }
  }

  ctx.restore()
}
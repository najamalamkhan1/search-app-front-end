import React, { useEffect, useRef } from 'react'
import "../ErrorPage404/ErrorPage404.css"

const ErrorPage404 = () => {

  const visorRef = useRef(null)
  const cordRef = useRef(null)

  useEffect(() => {
    // 🔹 VISOR DRAW
    const visorCanvas = visorRef.current
    const vCtx = visorCanvas.getContext("2d")

    function drawVisor() {
      vCtx.beginPath()
      vCtx.moveTo(5, 45)
      vCtx.bezierCurveTo(15, 64, 45, 64, 55, 45)

      vCtx.lineTo(55, 20)
      vCtx.bezierCurveTo(55, 15, 50, 10, 45, 10)

      vCtx.lineTo(15, 10)

      vCtx.bezierCurveTo(15, 10, 5, 10, 5, 20)
      vCtx.lineTo(5, 45)

      vCtx.fillStyle = '#2f3640'
      vCtx.strokeStyle = '#f5f6fa'
      vCtx.fill()
      vCtx.stroke()
    }

    // 🔹 CORD ANIMATION
    const cordCanvas = cordRef.current
    const ctx = cordCanvas.getContext("2d")

    let y1 = 160
    let y2 = 100
    let y3 = 100

    let y1Forward = true
    let y2Forward = false
    let y3Forward = true

    function animate() {
      ctx.clearRect(0, 0, cordCanvas.width, cordCanvas.height)

      ctx.beginPath()
      ctx.moveTo(130, 170)
      ctx.bezierCurveTo(250, y1, 345, y2, 400, y3)

      ctx.strokeStyle = 'white'
      ctx.lineWidth = 8
      ctx.stroke()

      if (y1 === 100) y1Forward = true
      if (y1 === 300) y1Forward = false

      if (y2 === 100) y2Forward = true
      if (y2 === 310) y2Forward = false

      if (y3 === 100) y3Forward = true
      if (y3 === 317) y3Forward = false

      y1Forward ? y1++ : y1--
      y2Forward ? y2++ : y2--
      y3Forward ? y3++ : y3--

      requestAnimationFrame(animate)
    }

    drawVisor()
    animate()

  }, [])

  return (
    <>
      <div className="moon"></div>
      <div className="moon__crater moon__crater1"></div>
      <div className="moon__crater moon__crater2"></div>
      <div className="moon__crater moon__crater3"></div>

      <div className="star star1"></div>
      <div className="star star2"></div>
      <div className="star star3"></div>
      <div className="star star4"></div>
      <div className="star star5"></div>

      <div className="error">
        <div className="error__title">404</div>
        <div className="error__subtitle">Hmmm...</div>
        <div className="error__description">
          It looks like one of the developers fell asleep
        </div>
        <button className="error__button error__button--active">LOGIN</button>
        <button className="error__button">CONTACT</button>
      </div>

      <div className="astronaut">
        <div className="astronaut__backpack"></div>
        <div className="astronaut__body"></div>
        <div className="astronaut__body__chest"></div>
        <div className="astronaut__arm-left1"></div>
        <div className="astronaut__arm-left2"></div>
        <div className="astronaut__arm-right1"></div>
        <div className="astronaut__arm-right2"></div>
        <div className="astronaut__arm-thumb-left"></div>
        <div className="astronaut__arm-thumb-right"></div>
        <div className="astronaut__leg-left"></div>
        <div className="astronaut__leg-right"></div>
        <div className="astronaut__foot-left"></div>
        <div className="astronaut__foot-right"></div>
        <div className="astronaut__wrist-left"></div>
        <div className="astronaut__wrist-right"></div>

        <div className="astronaut__cord">
          <canvas ref={cordRef} height="500" width="500"></canvas>
        </div>

        <div className="astronaut__head">
          <canvas ref={visorRef} width="60" height="60"></canvas>
          <div className="astronaut__head-visor-flare1"></div>
          <div className="astronaut__head-visor-flare2"></div>
        </div>
      </div>
    </>
  )
}

export default ErrorPage404
import React, { useEffect, useRef } from 'react';
import { neonCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js';

const NeonCursorComponent = () => {
  const appRef = useRef(null);

  useEffect(() => {
    if (appRef.current) {
      neonCursor({
        el: appRef.current,
        shaderPoints: 16,
        curvePoints: 80,
        curveLerp: 0.5,
        radius1: 5,
        radius2: 30,
        velocityTreshold: 10,
        sleepRadiusX: 100,
        sleepRadiusY: 100,
        sleepTimeCoefX: 0.0025,
        sleepTimeCoefY: 0.0025
      });
    }
  }, []);

  return (
    <div id="app" ref={appRef}>
      <div id="hero">
        <h1>
          NEON<br />CURSOR
        </h1>
      </div>
      <style>{`
        body, html, #app {
          margin: 0;
          width: 100%;
          height: 100%;
        }
        #app {
          overflow: hidden;
          touch-action: pan-up;
          color: #ffffff;
          font-family: 'Montserrat', sans-serif;
          text-align: center;
          text-shadow: 0 0 5px #ffffff, 0 0 20px #000, 0 0 30px #000;
        }
        #app h1 {
          --fontSize: 60px;
          --lineHeight: 80px;
          width: auto;
          height: calc(2 * var(--lineHeight));
          line-height: var(--lineHeight);
          margin: calc(50vh - var(--lineHeight)) auto 0;
          font-size: var(--fontSize);
          text-transform: uppercase;
        }
        #app a {
          margin-top: 10px;
          display: inline-block;
          text-decoration: none;
          color: #fff;
        }
        #app canvas {
          display: block;
          position: fixed;
          z-index: -1;
          top: 0;
        }
      `}</style>
    </div>
  );
};

export default NeonCursorComponent;

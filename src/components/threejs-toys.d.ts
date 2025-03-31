declare module 'threejs-toys' {
    export function neonCursor(options: {
      el: HTMLElement;
      shaderPoints: number;
      curvePoints: number;
      curveLerp: number;
      radius1: number;
      radius2: number;
      velocityTreshold: number;
      sleepRadiusX: number;
      sleepRadiusY: number;
      sleepTimeCoefX: number;
      sleepTimeCoefY: number;
    }): void;
  }
  
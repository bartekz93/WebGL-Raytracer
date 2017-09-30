export class AnimationLoop {
    
    private startTime = null
    private lastTime = null
    private isPaused = false;
    private framesPerSecond = 0;
    private msInSecond = 0;

    private stepAction: (dt: number, start: number, now: number) => void;
    private onChangeFPS: (fps: number) => void;

    togglePause() {
        this.isPaused = !this.isPaused;

        if (!this.isPaused) {
            requestAnimationFrame(this.step.bind(this));
        }
    }

    pause() {
        this.isPaused = true;
    }

    start(stepAction: (dt: number, start: number, now: number) => void, onChangeFps?: (fps: number) => void) {
        this.isPaused = false;

        this.stepAction = stepAction;
        this.onChangeFPS = onChangeFps;

        requestAnimationFrame(this.step.bind(this));
    }

    step(now) {
        if (!this.start) {
            this.startTime = now;
            this.lastTime = now;
        }
    
        if (this.isPaused == true) {
            return;
        }
    
        var dt = now - this.lastTime;
        this.msInSecond += dt;
        this.lastTime = now;

        this.stepAction(dt, this.startTime, now);
    
        this.framesPerSecond++;
        if (this.msInSecond > 1000) {
            this.onChangeFPS(this.framesPerSecond);
            this.framesPerSecond = 0;
            this.msInSecond = 0;
        }
        
        requestAnimationFrame(this.step.bind(this));
    }
}
import { Pose } from '@tensorflow-models/pose-detection';

export class Skeleton {
    constructor(private ctx: CanvasRenderingContext2D) {}

    private drawHead(pose: Pose) {
        const leftEye = pose.keypoints.find((keypoint) => keypoint.name === 'left_eye');
        const rightEye = pose.keypoints.find((keypoint) => keypoint.name == 'right_eye');
        const leftMouth = pose.keypoints.find((keypoint) => keypoint.name === 'mouth_left');
        const rightMouth = pose.keypoints.find((keypoint) => keypoint.name === 'mouth_right');
        const nose = pose.keypoints.find((keypoint) => keypoint.name === 'nose');

        this.ctx.fillStyle = 'red';
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 5;
        if (leftEye) {
            this.ctx.beginPath();
            this.ctx.arc(leftEye.x - 10, leftEye.y - 10, 10, 0, 2 * Math.PI);
            this.ctx.fill();
        }
        if (rightEye) {
            this.ctx.beginPath();
            this.ctx.arc(rightEye.x - 10, rightEye.y - 10, 10, 0, 2 * Math.PI);
            this.ctx.fill();
        }
        if (nose) {
            this.ctx.beginPath();
            this.ctx.arc(nose.x - 10, nose.y - 10, 10, 0, 2 * Math.PI);
            this.ctx.fill();
        }

        if (leftMouth && rightMouth) {
            this.ctx.beginPath();
            this.ctx.moveTo(leftMouth.x, leftMouth.y);
            this.ctx.lineTo(rightMouth.x, rightMouth.y);
            this.ctx.stroke();
        }
    }

    public draw(pose: Pose) {
        this.drawHead(pose);
    }
}
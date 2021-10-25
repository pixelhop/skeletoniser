import { Pose } from '@tensorflow-models/pose-detection';
import { getAngle, getDistance, getMiddle } from './vectors';

// Skeleton parts
import Head from './assets/skeleton/Head.png';
import Body from './assets/skeleton/Body.png';
import LeftUpperArm from './assets/skeleton/LeftUpperArm.png';
import RightUpperArm from './assets/skeleton/RightUpperArm.png';
import RightForearm from './assets/skeleton/RightLowerArm.png';
import LeftForearm from './assets/skeleton/LeftLowerArm.png';
import LeftHand from './assets/skeleton/LeftHand.png';
import RightHand from './assets/skeleton/RightHand.png';
import LeftThigh from './assets/skeleton/LeftUpperLeg.png';
import RightThigh from './assets/skeleton/RightUpperLeg.png';
import LeftLowerLeg from './assets/skeleton/LeftLowerLeg.png';
import RightLowerLeg from './assets/skeleton/RightLowerLeg.png';

// Load the skeleton parts
const head = new Image();
head.src = Head;
const body = new Image();
body.src = Body;
const leftUpperArm = new Image();
leftUpperArm.src = LeftUpperArm;
const rightUpperArm = new Image();
rightUpperArm.src = RightUpperArm;
const rightForearm = new Image();
rightForearm.src = RightForearm;
const leftForearm = new Image();
leftForearm.src = LeftForearm;
const rightHand = new Image();
rightHand.src = RightHand;
const leftHand = new Image();
leftHand.src = LeftHand;
const rightThigh = new Image();
rightThigh.src = RightThigh;
const leftThigh = new Image();
leftThigh.src = LeftThigh;
const rightLowerLeg = new Image();
rightLowerLeg.src = RightLowerLeg;
const leftLowerLeg = new Image();
leftLowerLeg.src = LeftLowerLeg;

export class Skeleton {
    constructor(private ctx: CanvasRenderingContext2D) {}

    private drawHead(pose: Pose) {
        const leftEye = pose.keypoints.find((keypoint) => keypoint.name === 'left_eye');
        const rightEye = pose.keypoints.find((keypoint) => keypoint.name == 'right_eye');
        const leftMouth = pose.keypoints.find((keypoint) => keypoint.name === 'mouth_left');
        const rightMouth = pose.keypoints.find((keypoint) => keypoint.name === 'mouth_right');
        const nose = pose.keypoints.find((keypoint) => keypoint.name === 'nose');

        // The real dimensions of keypoints in our head image
        const eyeWidth = 205;
        const eyesToMouth = 220;

        // If we are missing any parts return early
        if (!leftEye || !rightEye || !leftMouth || !rightMouth || !nose) {
            return;
        }

        const eyeAngleDeg = getAngle(leftEye, rightEye);
        const distance = getDistance(leftEye, rightEye);
        const xScale = distance / eyeWidth;

        const middleEye = getMiddle(leftEye, rightEye);
        const middleMouth = getMiddle(leftMouth, rightMouth);
        const mouthToEyeDistance = getDistance(middleEye, middleMouth);
        const yScale = mouthToEyeDistance / eyesToMouth;

        this.drawImage({
            image: head,
            x: nose.x,
            y: nose.y,
            height: head.height * yScale,
            width: head.width * xScale,
            rotation: eyeAngleDeg,
            offsetX: 0.55,
            offsetY: 0.8,
        });
    }

    private drawBody(pose: Pose) {
        const leftShoulder = pose.keypoints.find(keypoint => keypoint.name === 'left_shoulder');
        const rightShoulder = pose.keypoints.find(keypoint => keypoint.name === 'right_shoulder');
        const leftHip = pose.keypoints.find(keypoint => keypoint.name === 'left_hip');
        const rightHip = pose.keypoints.find(keypoint => keypoint.name === 'right_hip');
    
        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) {
          return;
        }
    
        const shoulderWidth = 517;
        const hipToShoulderHeight = 745;
    
        if (leftShoulder && rightShoulder && leftHip && rightHip) {
          const angle = getAngle(leftShoulder, rightShoulder);
          const distance = getDistance(leftShoulder, rightShoulder);
          const xScale = distance / shoulderWidth;
    
          const middleShoulder = getMiddle(leftShoulder, rightShoulder);
          const middleHip = getMiddle(leftHip!, rightHip!);
          const shoulderToHipDistance = getDistance(middleShoulder, middleHip);
          const yScale = shoulderToHipDistance / hipToShoulderHeight;
    
          this.drawImage({
            image: body,
            x: middleShoulder.x,
            y: middleShoulder.y,
            height: body.height * yScale,
            width: body.width * xScale,
            rotation: angle,
            offsetX: 0.5,
            offsetY: 0.1,
          });
        }
      }
    
      private drawLeftUpperArm(pose: Pose) {
        const leftShoulder = pose.keypoints.find(keypoint => keypoint.name === 'left_shoulder');
        const leftElbow = pose.keypoints.find(keypoint => keypoint.name === 'left_elbow');
        const upperArmLength = 327;
    
        if (!leftShoulder || !leftElbow) {
          return;
        }
    
        if (leftShoulder && leftElbow) {
          const angle = getAngle(leftElbow, leftShoulder);
          const distance = getDistance(leftShoulder, leftElbow);
          const xScale = distance / upperArmLength;
          const yScale = xScale;
    
          this.drawImage({
            image: leftUpperArm,
            x: leftShoulder.x,
            y: leftShoulder.y,
            height: leftUpperArm.height * yScale,
            width: leftUpperArm.width * xScale,
            rotation: angle - 90,
            offsetX: 0.5,
            offsetY: 0,
          });
        }
      }
    
      private drawRightUpperArm(pose: Pose) {
        const rightShoulder = pose.keypoints.find(keypoint => keypoint.name === 'right_shoulder');
        const rightElbow = pose.keypoints.find(keypoint => keypoint.name === 'right_elbow');
        const upperArmLength = 327;
    
        if (!rightShoulder || !rightElbow) {
          return;
        }
    
        if (rightShoulder && rightElbow) {
          const angle = getAngle(rightElbow, rightShoulder);
          const distance = getDistance(rightShoulder, rightElbow);
          const xScale = distance / upperArmLength;
          const yScale = xScale;
    
          this.drawImage({
            image: rightUpperArm,
            x: rightShoulder.x,
            y: rightShoulder.y,
            height: rightUpperArm.height * yScale,
            width: rightUpperArm.width * xScale,
            rotation: angle - 90,
            offsetX: 0.5,
            offsetY: 0,
          });
        }
      }
    
      private drawLeftForearm(pose: Pose) {
        const leftElbow = pose.keypoints.find(keypoint => keypoint.name === 'left_elbow');
        const leftWrist = pose.keypoints.find(keypoint => keypoint.name === 'left_wrist');
    
        if (!leftElbow || !leftWrist) {
          return;
        }
    
        const forearmLength = 386;
    
        if (leftElbow && leftWrist) {
          const angle = getAngle(leftWrist, leftElbow);
          const distance = getDistance(leftElbow, leftWrist);
          const xScale = distance / forearmLength;
          const yScale = xScale;
    
          this.drawImage({
            image: leftForearm,
            x: leftElbow.x,
            y: leftElbow.y,
            height: leftForearm.height * yScale,
            width: leftForearm.width * xScale,
            rotation: angle - 90,
            offsetX: 0.5,
            offsetY: 0,
          });
        }
      }
    
      private drawRightForearm(pose: Pose) {
        const rightElbow = pose.keypoints.find(keypoint => keypoint.name === 'right_elbow');
        const rightWrist = pose.keypoints.find(keypoint => keypoint.name === 'right_wrist');
        const forearmLength = 407;
    
        if (!rightElbow || !rightWrist){
          return;
        }
    
        const angle = getAngle(rightWrist, rightElbow);
        const distance = getDistance(rightElbow, rightWrist);
        const xScale = distance / forearmLength;
        const yScale = xScale;
  
        this.drawImage({
          image: rightForearm,
          x: rightElbow.x,
          y: rightElbow.y,
          height: rightForearm.height * yScale,
          width: rightForearm.width * xScale,
          rotation: angle - 90,
          offsetX: 0.5,
          offsetY: 0,
        });
        
      }
    
      private drawLeftHand(pose: Pose) {
        const leftWrist = pose.keypoints.find(keypoint => keypoint.name === 'left_wrist');
        const leftIndex = pose.keypoints.find(keypoint => keypoint.name === 'left_index');
        const leftPinky = pose.keypoints.find(keypoint => keypoint.name === 'left_pinky');
    
        if (!leftWrist || !leftIndex || !leftPinky) {
          return;
        }
    
        const length = 125;
    
        if (leftWrist && leftIndex && leftPinky) {
          const middleFingers = getMiddle(leftIndex, leftPinky);
          const angle = getAngle(middleFingers, leftWrist);
          const distance = getDistance(leftWrist, middleFingers);
          const xScale = distance / length;
          const yScale = xScale;
    
          this.drawImage({
            image: rightHand,
            x: leftWrist.x,
            y: leftWrist.y,
            height: rightHand.height * yScale,
            width: rightHand.width * xScale,
            rotation: angle + 270,
            offsetX: 0.5,
            offsetY: 0,
          });
        }
      }
    
      private drawRightHand(pose: Pose) {
        const rightWrist = pose.keypoints.find(keypoint => keypoint.name === 'right_wrist');
        const rightIndex = pose.keypoints.find(keypoint => keypoint.name === 'right_index');
        const rightPinky = pose.keypoints.find(keypoint => keypoint.name === 'right_pinky');
    
        if (!rightWrist || !rightIndex || !rightPinky) {
          return;
        }
    
        const length = 125;
    
        if (rightWrist && rightIndex && rightPinky) {
          const middleFingers = getMiddle(rightIndex, rightPinky);
          const angle = getAngle(middleFingers, rightWrist);
          const distance = getDistance(rightWrist, middleFingers);
          const xScale = distance / length;
          const yScale = xScale;
    
          this.drawImage({
            image: leftHand,
            x: rightWrist.x,
            y: rightWrist.y,
            height: leftHand.height * yScale,
            width: leftHand.width * xScale,
            rotation: angle + 270,
            offsetX: 0.5,
            offsetY: 0,
          });
        }
      }
    
      private drawLeftThigh(pose: Pose) {
        const leftHip = pose.keypoints.find(keypoint => keypoint.name === 'left_hip');
        const leftKnee = pose.keypoints.find(keypoint => keypoint.name === 'left_knee');
    
        if (!leftHip || !leftKnee) {
          return;
        }
    
        const length = 482;
    
        if (leftHip && leftKnee) {
          const angle = getAngle(leftKnee, leftHip);
          const distance = getDistance(leftHip, leftKnee);
          const xScale = distance / length;
          const yScale = xScale;
    
          this.drawImage({
            image: leftThigh,
            x: leftHip.x,
            y: leftHip.y,
            height: leftThigh.height * yScale,
            width: leftThigh.width * xScale,
            rotation: angle - 90,
            offsetX: 0.5,
            offsetY: 0.1,
          });
        }
      }
    
      private drawRightThigh(pose: Pose) {
        const rightHip = pose.keypoints.find(keypoint => keypoint.name === 'right_hip');
        const rightKnee = pose.keypoints.find(keypoint => keypoint.name === 'right_knee');
    
        if (!rightHip || !rightKnee) {
          return;
        }
    
        const length = 482;
    
        if (rightHip && rightKnee) {
          const angle = getAngle(rightKnee, rightHip);
          const distance = getDistance(rightHip, rightKnee);
          const xScale = distance / length;
          const yScale = xScale;
    
          this.drawImage({
            image: rightThigh,
            x: rightHip.x,
            y: rightHip.y,
            height: rightThigh.height * yScale,
            width: rightThigh.width * xScale,
            rotation: angle - 90,
            offsetX: 0.5,
            offsetY: 0,
          });
        }
      }
    
      private drawLeftLowerLeg(pose: Pose) {
        const leftKnee = pose.keypoints.find(keypoint => keypoint.name === 'left_knee');
        const leftAnkle = pose.keypoints.find(keypoint => keypoint.name === 'left_ankle');
    
        if (!leftKnee || !leftAnkle) {
          return;
        }
    
        const length = 464;
    
        if (leftAnkle && leftKnee) {
          const angle = getAngle(leftKnee, leftAnkle);
          const distance = getDistance(leftAnkle, leftKnee);
          const xScale = distance / length;
          const yScale = xScale;
    
          this.drawImage({
            image: leftLowerLeg,
            x: leftKnee.x,
            y: leftKnee.y,
            height: leftLowerLeg.height * yScale,
            width: leftLowerLeg.width * xScale,
            rotation: angle - 270,
            offsetX: 0.5,
            offsetY: 0.1,
          }, false);
        }
      }
    
      private drawRightLowerLeg(pose: Pose) {
        const rightKnee = pose.keypoints.find(keypoint => keypoint.name === 'right_knee');
        const rightAnkle = pose.keypoints.find(keypoint => keypoint.name === 'right_ankle');
    
        if (!rightKnee || rightAnkle) {
          return;
        }
    
        const length = 464;
    
        if (rightAnkle && rightKnee) {
          const angle = getAngle(rightKnee, rightAnkle);
          const distance = getDistance(rightAnkle, rightKnee);
          const xScale = distance / length;
          const yScale = xScale;
    
          this.drawImage({
            image: rightLowerLeg,
            x: rightKnee.x,
            y: rightKnee.y,
            height: rightLowerLeg.height * yScale,
            width: rightLowerLeg.width * xScale,
            rotation: angle - 270,
            offsetX: 0.5,
            offsetY: 0.1,
          });
        }
      }

    private drawImage(options: {
        image: HTMLImageElement,
        x: number,
        y: number,
        height: number,
        width: number,
        rotation: number,
        offsetX: number,
        offsetY: number,
      }): void {
        const {
          image,
          x,
          y,
          height,
          width,
          rotation,
          offsetX,
          offsetY,
        } = options;
        // save the unrotated context of the canvas so we can restore it later
        this.ctx.save();
    
        // move to the center of the canvas
        this.ctx.translate(x, y);
    
        // rotate the canvas to the specified angle
        this.ctx.rotate(((180 + rotation) * Math.PI) / 180);
    
        // draw the image because ctx is rotated, the image will be rotated also
        this.ctx.drawImage(image, 0 - (width * offsetX), 0 - (height * offsetY), width, height);
        
        // restore the unrotated ctx
        this.ctx.restore();
    }

    public draw(pose: Pose) {
        this.drawHead(pose);
        this.drawBody(pose);
        this.drawLeftUpperArm(pose);
        this.drawRightUpperArm(pose);
        this.drawLeftForearm(pose);
        this.drawRightForearm(pose);
        this.drawLeftHand(pose);
        this.drawRightHand(pose);
        this.drawLeftThigh(pose);
        this.drawRightThigh(pose);
        this.drawLeftLowerLeg(pose);
        this.drawRightLowerLeg(pose);
    }
}
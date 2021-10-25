import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import { Skeleton } from './skeleton';
import './style.css';

const videoEl = document.querySelector<HTMLVideoElement>('video')!;
const canvasEl = document.querySelector<HTMLCanvasElement>('canvas')!;
const ctx = canvasEl.getContext('2d')!;

async function initCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'user',
      width: { ideal: 640 },
      height: { ideal: 480 },
    },
    audio: false,
  });

  
  let onVideoReady: (ready: boolean) => void;
  const videoReadyPromise = new Promise((resolve) => onVideoReady = resolve);
  videoEl.onloadedmetadata = () => onVideoReady(true);

  videoEl.srcObject = stream;

  return videoReadyPromise;
}

async function initPoseDetection() {
  const model = poseDetection.SupportedModels.BlazePose;
  const detector = await poseDetection.createDetector(model, {
    runtime: 'tfjs',
      modelType: 'lite',
      maxPoses: 1,
  } as poseDetection.BlazePoseTfjsModelConfig);

  return detector;
}

async function start() {
  await initCamera();
  const detector = await initPoseDetection();
  const skeleton = new Skeleton(ctx);

  async function render() {
    const poses = await detector.estimatePoses(videoEl!, {
      maxPoses: 1,
      flipHorizontal: false,
      scoreThreshold: 0.4,
    });

    ctx.clearRect(0, 0, 640, 480);

    if (poses[0]) {
      skeleton.draw(poses[0]);
    }

    requestAnimationFrame(render);
  }

  render();
}

start();
const videoEl = document.querySelector<HTMLVideoElement>('video');

async function initCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'user',
      width: { ideal: 640 },
      height: { ideal: 480 },
    },
    audio: false,
  });

  if (videoEl) {
    videoEl.srcObject = stream;
  }
}

initCamera();
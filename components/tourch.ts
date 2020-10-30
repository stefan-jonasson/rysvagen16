import { useState } from "react";

//Test browser support
export function useTourch() {
  const SUPPORTS_MEDIA_DEVICES =
    typeof window !== "undefined" && typeof window.navigator !== "undefined" && "mediaDevices" in navigator;
  const [state, setstate] = useState<[boolean, (b: boolean) => void, string | undefined]>([
    false,
    () => undefined,
    "Camera API not supported, use a better browser.",
  ]);
  if (SUPPORTS_MEDIA_DEVICES) {
    //Get the environment camera (usually the second one)
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameras = devices.filter((device) => device.kind === "videoinput");

      if (cameras.length === 0) {
        return [false, () => undefined, "No camera found on this device."];
      }
      const camera = cameras[cameras.length - 1];

      // Create stream and get video track
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: camera.deviceId,
            facingMode: ["environment"],
            height: { ideal: 1080 },
            width: { ideal: 1920 },
          },
        })
        .then((stream) => {
          const track = stream.getVideoTracks()[0];
            
          //Create image capture object and get camera capabilities
          const imageCapture = new ImageCapture(track);
          imageCapture.getPhotoCapabilities().then((photoCapabilities) => {
            setstate([
              photoCapabilities.fillLightMode && photoCapabilities.fillLightMode.some((flm) => flm === "flash"),
              (torch: boolean) => {
                track.applyConstraints({
                  advanced: [{ torch }],
                });
              },
              undefined,
            ]);
          });
        });
    });
  }
  return state;
}

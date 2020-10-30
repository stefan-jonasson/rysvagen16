import { useEffect, useState } from "react";

//Test browser support
export function useTourch() {
  const SUPPORTS_MEDIA_DEVICES =
    typeof window !== "undefined" && typeof window.navigator !== "undefined" && "mediaDevices" in navigator;
  const [enabled, setEnabled] = useState<boolean>(false);
  const [state, setstate] = useState<[boolean, boolean, (b: boolean) => void, string | undefined]>([
    false,
    enabled,
    () => undefined,
    "Camera API not supported, use a better browser.",
  ]);
  useEffect(() => {
    console.log("here!");
    let track: MediaStreamTrack | undefined;

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
            track = stream.getVideoTracks()[0];
            //Create image capture object and get camera capabilities
            const imageCapture = new ImageCapture(track);
            imageCapture.getPhotoCapabilities().then((photoCapabilities) => {
              setstate([
                photoCapabilities.fillLightMode && photoCapabilities.fillLightMode.some((flm) => flm === "flash"),
                track.getConstraints()?.advanced?.some((flag) => flag.torch ?? false),
                (torch: boolean) => {
                  setEnabled(torch);
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
    return () => {
      track.stop();
      track = undefined;
    };
  }, [navigator, setstate, setEnabled, SUPPORTS_MEDIA_DEVICES]);
  // Update result when Enabled state changes!
  useEffect(() => {
      setstate(oldState => [oldState[0], enabled, oldState[2], oldState[3]]);
  }, [setstate, enabled])
  return state;
}

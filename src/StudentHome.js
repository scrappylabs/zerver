import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";

function StudentHome() {
  const webcamRef = useRef(null);
  const [scanResults, setScanResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    checkPermissions();
    const interval = setInterval(() => {
      capture();
    }, 1000); // continuously capture every 1000 milliseconds (1 second)

    return () => {
      clearInterval(interval); // clear the interval when the component unmounts
      stopWebcam();
    };
  }, []);

  // check for camera access permissions and handle errors
  const checkPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      // permissions granted
      setError("");
    } catch (err) {
      console.error("Error accessing the camera: ", err);
      setError(
        "Camera access was denied. Please allow camera permissions in your browser settings."
      );
    }
  };

  const stopWebcam = () => {
    if (webcamRef.current && webcamRef.current.video.srcObject) {
      const tracks = webcamRef.current.video.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      decodeQRFromImage(imageSrc);
    }
  };

  const decodeQRFromImage = (imageSrc) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        setScanResults((prevResults) => [
          ...prevResults,
          `QR Code Detected: ${code.data}`,
        ]);
      }
    };
  };

  return (
    <div style={{ position: "relative" }}>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <Webcam
          className="webcam"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode:
              window.innerWidth < 768 ? { exact: "environment" } : "user",
          }}
        />
      )}
      <div>
        {scanResults.map((result, index) => (
          <p key={index}>{result}</p> // display each successful QR code detection
        ))}
      </div>
    </div>
  );
}

export default StudentHome;
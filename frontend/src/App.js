import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

// Map object names to emojis and links
const objectLinks = {
  Cricket: {
    emoji: "🏏",
    url: "https://en.wikipedia.org/wiki/Cricket",
  },
  Kabaddi: {
    emoji: "🤼",
    url: "https://en.wikipedia.org/wiki/Kabaddi",
  },
  Dance: {
    emoji: "💃",
    url: "https://en.wikipedia.org/wiki/Dance",
  },
  // Add more as needed
};

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [detections, setDetections] = useState([]);

  // Start camera
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch((err) => {
              console.error("Autoplay error:", err);
            });
          };
        }
      })
      .catch((err) => {
        console.error("Camera error:", err);
      });
  }, []);

  // Capture and detect
  const captureAndDetect = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      try {
        const res = await axios.post("http://127.0.0.1:8000/detect/", formData);
        setDetections(res.data.detections);
      } catch (err) {
        console.error("Error during detection:", err);
      }
    }, "image/jpeg");
  };

  // Auto capture every 3 seconds
  useEffect(() => {
    const interval = setInterval(captureAndDetect, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h2>Live Object Detection</h2>

      <div className="video-wrapper" style={{ position: "relative", width: "640px", height: "480px" }}>
        <video
          ref={videoRef}
          width="640"
          height="480"
          autoPlay
          muted
          playsInline
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ display: "none" }}
        />

        {/* Simple labels over detected objects */}
        <div className="overlay-container" style={{ position: "absolute", top: 0, left: 0 }}>
          {detections.map((det, i) => {
            const [x1, y1] = det.bbox;
            const link = objectLinks[det.class];
            const label = `${link?.emoji || "🔍"} ${det.class}`;

            return (
              <div
                key={i}
                className="label-overlay"
                style={{
                  position: "absolute",
                  top: `${y1}px`,
                  left: `${x1}px`,
                  background: "rgba(0,0,0,0.6)",
                  color: "white",
                  fontSize: "14px",
                  padding: "4px 6px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
                onClick={() => window.open(link?.url || "#", "_blank")}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>

      <div className="detections">
        {detections.map((det, i) => (
          <div key={i}>
            <strong>{det.class}</strong> - {(det.confidence * 100).toFixed(2)}%
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

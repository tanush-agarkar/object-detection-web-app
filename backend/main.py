from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from ultralytics import YOLO
import io

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("yolov8s.pt")  # use custom model if needed

@app.post("/detect/")
async def detect(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    results = model.predict(image)
    data = results[0].boxes.data.cpu().numpy()

    detections = []
    for box in data:
        x1, y1, x2, y2, score, cls_id = box
        detections.append({
            "bbox": [float(x1), float(y1), float(x2), float(y2)],
            "confidence": float(score),
            "class": model.names[int(cls_id)]
        })
    return {"detections": detections}

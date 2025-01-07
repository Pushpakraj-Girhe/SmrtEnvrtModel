from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import random
import time

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Environmental Monitoring System"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Simulate sensor data
            data = {
                "temperature": 25.0 + random.uniform(-1, 1),
                "humidity": 60.0 + random.uniform(-2, 2),
                "pressure": 1013.0 + random.uniform(-1.5, 1.5),
                "timestamp": time.time()
            }
            await websocket.send_json(data)
            await asyncio.sleep(1)
    except Exception as e:
        print(f"Error: {e}")
# for runing the code 
#first start the backend
# cd backend
# venv\Scripts\activate
# python -m uvicorn main:app --reload
#second the start frontend
# cd frontend
# npm run dev

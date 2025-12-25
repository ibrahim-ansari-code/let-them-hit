# Neural Arena Backend

The AI-Powered "Who Would Win?" Simulator API.

## Quick Start

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the development server
uvicorn app.main:app --reload --port 8000
```

## API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/health` | Detailed health check |
| POST | `/api/v1/battle/simulate` | Simulate a battle between two images |

## Testing the Battle Endpoint

```bash
curl -X POST http://localhost:8000/api/v1/battle/simulate \
  -F "fighter_1_image=@cat.jpg" \
  -F "fighter_2_image=@toaster.jpg"
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app + endpoints
│   ├── schemas.py           # Pydantic models
│   ├── config.py            # Configuration settings
│   └── services/
│       ├── __init__.py
│       ├── vision_service.py    # Image analysis (mock)
│       └── game_engine.py       # Battle simulation (mock)
├── requirements.txt
└── README.md
```

## Environment Variables

Create a `.env` file in the backend directory with the following:

```env
# API Settings
APP_NAME="Neural Arena"
APP_VERSION="1.0.0"
DEBUG=false

# Server Settings
HOST=0.0.0.0
PORT=8000

# AI Model Configuration (Future Implementation)
# Options: "mock", "clip", "gpt4-vision"
VISION_MODEL=mock

# Options: "mock", "gpt-4", "claude-3"
LLM_MODEL=mock

# API Keys (Required for non-mock models)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
```

## Current Status

⚠️ **Scaffolding Mode**: All AI services currently return mock data for testing purposes.

- `vision_service.py` - Returns hardcoded labels based on file size
- `game_engine.py` - Returns themed stats and pre-written battle narratives

## Next Steps

1. Implement real vision analysis with CLIP or GPT-4 Vision
2. Integrate LLM for dynamic stat generation and narrative
3. Add battle history storage
4. Implement WebSocket for real-time battle updates

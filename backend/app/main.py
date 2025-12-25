"""
Neural Arena - FastAPI Application
Main entry point for the AI-powered battle simulator API.
"""

import uuid

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.schemas import BattleResponse, HealthCheckResponse
from app.services import vision_service, game_engine


# Initialize FastAPI application
app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
    version=settings.app_version,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=settings.cors_allow_credentials,
    allow_methods=settings.cors_allow_methods,
    allow_headers=settings.cors_allow_headers,
)


# ============================================================================
# Health Check Endpoints
# ============================================================================

@app.get("/", response_model=HealthCheckResponse, tags=["Health"])
async def root():
    """Root endpoint - API health check."""
    return HealthCheckResponse()


@app.get("/health", response_model=HealthCheckResponse, tags=["Health"])
async def health_check():
    """Health check endpoint for monitoring."""
    return HealthCheckResponse(
        status="healthy",
        version=settings.app_version,
        service=settings.app_name,
    )


# ============================================================================
# Battle Simulation Endpoints
# ============================================================================

@app.post(
    f"{settings.api_v1_prefix}/battle/simulate",
    response_model=BattleResponse,
    tags=["Battle"],
    summary="Simulate a battle between two entities",
    description="""
    Upload two images to simulate an AI-powered battle.
    
    The system will:
    1. Analyze each image to identify the entity
    2. Generate RPG-style stats and moves for each combatant
    3. Simulate the battle with physics-based logic
    4. Return a detailed narrative of the fight
    """,
)
async def simulate_battle(
    fighter_1_image: UploadFile = File(..., description="Image of the first combatant"),
    fighter_2_image: UploadFile = File(..., description="Image of the second combatant"),
) -> BattleResponse:
    """
    Simulate a battle between two uploaded images.
    
    Args:
        fighter_1_image: Image file for the first fighter
        fighter_2_image: Image file for the second fighter
        
    Returns:
        BattleResponse containing match details, stats, and narrative
    """
    # Validate file types
    allowed_types = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    
    if fighter_1_image.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Fighter 1: Invalid file type. Allowed: {', '.join(allowed_types)}",
        )
    
    if fighter_2_image.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Fighter 2: Invalid file type. Allowed: {', '.join(allowed_types)}",
        )
    
    # Read image bytes
    fighter_1_bytes = await fighter_1_image.read()
    fighter_2_bytes = await fighter_2_image.read()
    
    # Stage 1: Vision Analysis - Identify entities
    label_1 = vision_service.analyze_image_content(fighter_1_bytes)
    label_2 = vision_service.analyze_image_content(fighter_2_bytes)
    
    # Stage 2: Game Engine - Generate fighter profiles
    fighter_1 = game_engine.generate_fighter_stats(label_1)
    fighter_2 = game_engine.generate_fighter_stats(label_2)
    
    # Stage 3: Battle Simulation - Determine winner and narrative
    winner, narrative = game_engine.simulate_battle(fighter_1, fighter_2)
    
    # Generate unique match ID
    match_id = str(uuid.uuid4())
    
    # Construct response
    return BattleResponse(
        match_id=match_id,
        winner=winner,
        fighter_1=fighter_1,
        fighter_2=fighter_2,
        narrative=narrative,
    )


# ============================================================================
# Development Entry Point
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=True,
    )


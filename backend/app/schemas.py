"""
Neural Arena - Pydantic Schemas
Defines the "Battle Contract" for API request/response structures.
"""

from enum import Enum
from typing import Literal
from pydantic import BaseModel, Field


class MoveType(str, Enum):
    """Classification of attack/ability types."""
    PHYSICAL = "Physical"
    ELEMENTAL = "Elemental"
    SPECIAL = "Special"


class FighterStats(BaseModel):
    """Core combat statistics for a fighter."""
    hp: int = Field(..., ge=1, le=200, description="Health Points (1-200)")
    attack: int = Field(..., ge=1, le=100, description="Attack Power (1-100)")
    defense: int = Field(..., ge=1, le=100, description="Defense Rating (1-100)")
    agility: int = Field(..., ge=1, le=100, description="Speed/Agility (1-100)")


class Move(BaseModel):
    """A single attack or ability that a fighter can perform."""
    name: str = Field(..., min_length=1, max_length=50, description="Name of the move")
    type: MoveType = Field(..., description="Category of the move")
    damage: int = Field(..., ge=0, le=100, description="Base damage dealt (0-100)")
    description: str = Field(..., max_length=200, description="Flavor text describing the move")


class Fighter(BaseModel):
    """Complete fighter profile with stats and abilities."""
    label: str = Field(..., min_length=1, max_length=100, description="Identified entity name")
    stats: FighterStats = Field(..., description="Combat statistics")
    moves: list[Move] = Field(..., min_length=1, max_length=5, description="Available attacks/abilities")
    movement_type: str = Field(..., min_length=1, max_length=50, description="How the entity moves (e.g., 'Quadruped', 'Stationary')")


class BattleResponse(BaseModel):
    """Complete battle simulation result returned to the client."""
    match_id: str = Field(..., description="Unique identifier for this battle (UUID)")
    winner: Literal[1, 2] = Field(..., description="Which fighter won (1 or 2)")
    fighter_1: Fighter = Field(..., description="Complete profile of the first combatant")
    fighter_2: Fighter = Field(..., description="Complete profile of the second combatant")
    narrative: list[str] = Field(..., min_length=1, description="Round-by-round combat log")


class HealthCheckResponse(BaseModel):
    """API health check response."""
    status: str = Field(default="healthy")
    version: str = Field(default="1.0.0")
    service: str = Field(default="Neural Arena API")


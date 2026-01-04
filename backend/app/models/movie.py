from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from app.database.session import Base  # Теперь Base импортируется правильно

class Movie(Base):
    __tablename__ = "movies"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text)
    rating = Column(Float)
    genres = Column(JSONB, default=list)  # Храним как список: ["драма", "комедия"]
    release_year = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<Movie(id={self.id}, title='{self.title}', rating={self.rating})>"
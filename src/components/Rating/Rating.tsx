// StarRating.tsx
import React, { useState } from 'react';

interface StarRatingProps {
    onRatingChange: (rating: number) => void;
}

const Rating: React.FC<StarRatingProps> = ({ onRatingChange }) => {
    const [rating, setRating] = useState<number | null>(null);

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating);
        onRatingChange(selectedRating);
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => handleStarClick(star)}
                    style={{ cursor: 'pointer', color: star <= (rating || 0) ? 'gold' : 'gray' }}
                >
                    &#9733; {/* Estrela Unicode */}
                </span>
            ))}
        </div>
    );
};

export default Rating;

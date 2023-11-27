// StarRating.js
import React from 'react';

const StarRating = ({ nota }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < nota; i++) {
            stars.push(<span key={i}>⭐</span>);
        }
        return stars;
    };

    return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;

// StarRating.js
interface StarRatingProps {
    nota: number; // Adicione um tipo explícito para 'nota'
}

const StarRating: React.FC<StarRatingProps> = ({ nota }) => {
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

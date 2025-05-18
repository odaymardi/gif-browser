import './GifCard.css';

interface GifCardProps {
  imageUrl: string;
  title: string;
}

const GifCard = ({ imageUrl, title }: GifCardProps) => {
  return (
    <div className="gif-card">
      <div className="gif-image-container">
        <img
          src={imageUrl}
          alt={title}
          className="gif-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.png';
          }}
        />
      </div>
      <h3 className="gif-title">{title}</h3>
    </div>
  );
};

export default GifCard;

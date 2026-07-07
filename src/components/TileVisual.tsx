interface TileVisualProps {
  src: string;
  alt: string;
}

export function TileVisual({ src, alt }: TileVisualProps) {
  return (
    <figure className="tile-visual">
      <div className="tile-visual__frame">
        <img src={src} alt={alt} className="tile-visual__photo" />
      </div>
    </figure>
  );
}

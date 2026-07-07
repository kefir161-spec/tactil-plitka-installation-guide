interface ImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
  wide?: boolean;
  className?: string;
  objectPosition?: string;
}

export function ImageBlock({
  src,
  alt,
  caption,
  wide,
  className,
  objectPosition,
}: ImageBlockProps) {
  const classes = [
    'image-block',
    wide ? 'image-block--wide' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <figure className={classes}>
      <img
        src={src}
        alt={alt}
        style={objectPosition ? { objectPosition } : undefined}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

import Image from "next/image";

export default function (props) {
  const { src, alt = '', width = 0, height = 0, className = '', priority = true } = props;
  const image_key = Math.random().toString(36).substring(7);
  if (!src) return null;

  return (
    <Image
      key={image_key}
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
    />
  );
}

type ImgProps = {
  src: string;
  alt: string;
  cn: string;
  draggable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
};

const Img = ({ src, alt, cn, ...props }: ImgProps) => {
  return <img src={src} alt={alt} className={cn} {...props} />;
};

export default Img;

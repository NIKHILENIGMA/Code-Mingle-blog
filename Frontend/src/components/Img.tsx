type ImgProps = {
  src: string;
  alt: string;
  cn: string;
};

const Img = ({ src, alt, cn }: ImgProps) => {
  return <img src={src} alt={alt} className={cn} />;
};

export default Img;

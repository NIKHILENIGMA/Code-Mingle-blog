// Desc: Card component for displaying posts
import Img from "./Img";

type CardProps = {
  img: string;
  alt: string;
  cn?: string;
  title: string;
  description: string;
};

const Card = ({ img, alt, cn, title, description }: CardProps) => {
  return (
    <div className="w-[20vw] p-2 rounded-md shadow-md card h-[20vw]">
      <div className="w-full h-[20vh]">
        <Img src={img} alt={alt} cn={`${cn} w-full h-full object-cover`} />
      </div>
      <div>
        <h3 className="font-semibold text-md text-slate-800">{title}</h3>
      </div>
      <div>
        <p className="text-sm font-normal text-slate-800/70">{description}</p> 
      </div>
    </div>
  );
};

export default Card;

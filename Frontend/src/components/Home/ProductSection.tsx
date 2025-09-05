import { FC } from "react";

const ProductSection: FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div>
            <p className="text-sm text-primary uppercase tracking-wider mb-2">
              Explore Our Product
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-tight">
              Boost your productivity. <br /> Start using our app today
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-6">
              A platform designed for developers to express ideas, share
              insights and collaborate. Connect with a global community that
              values your expertise.
            </p>
            <button className="inline-flex items-center px-6 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300">
              Learn More
              <span className="ml-2 text-lg">&#8594;</span>
            </button>
          </div>

          {/* Placeholder for Image/Illustration */}
          <div className="h-64 sm:h-80 md:h-96 lg:h-120 bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Add an image or illustration here */}
            <video
              src="https://cdn.pixabay.com/video/2019/07/08/25059-347958040_large.mp4"
              loop
              autoPlay
              muted
                className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

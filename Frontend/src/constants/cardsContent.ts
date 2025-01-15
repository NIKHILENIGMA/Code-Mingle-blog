export interface Cards {
  id: string;
  type: string;
  title: string;
  description: string;
}

export const cards = [
  {
    id: "xrZq1O",
    type: "Article",
    title: "Boost your conversion rate",
    description: `
  <main>
    <section>
      <h2>Introduction</h2>
      <p>
        In the ever-evolving landscape of web development, developers are constantly seeking tools and frameworks to boost productivity and streamline workflows. 
        <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>, a utility-first CSS framework, has quickly become a favorite among developers for its flexibility and efficiency.
      </p>
    </section>

    <section>
      <h2>What is Tailwind CSS?</h2>
      <p>
        Tailwind CSS is a modern, utility-first CSS framework that allows you to design directly in your HTML. Unlike traditional CSS frameworks like Bootstrap, Tailwind provides utility classes that you can mix and match to build custom designs without writing any custom CSS.
      </p>
    </section>

    <section>
      <h2>Key Benefits of Tailwind CSS</h2>

      <h3>1. Rapid Development</h3>
      <p>
        With Tailwind CSS, you can quickly style elements by adding utility classes to your HTML. This approach eliminates the need to write separate CSS files, significantly speeding up the development process.
      </p>

      <h3>2. Highly Customizable</h3>
      <p>
        Tailwind's configuration file allows developers to customize the framework to meet the specific needs of their project. Whether you need custom colors, spacing, or typography, Tailwind gives you complete control.
      </p>

      <h3>3. No More Naming CSS Classes</h3>
      <p>
        One of the most frustrating aspects of traditional CSS is coming up with meaningful class names. Tailwind eliminates this problem entirely by using utility-first classes that are self-explanatory, like <code>p-4</code>, <code>text-center</code>, and <code>bg-blue-500</code>.
      </p>

      <h3>4. Small Bundle Size</h3>
      <p>
        Tailwind CSS uses <a href="https://tailwindcss.com/docs/optimizing-for-production" target="_blank" rel="noopener noreferrer">tree-shaking</a> to remove unused CSS, ensuring that your production build is as small as possible.
      </p>
    </section>

    <section>
      <h2>How to Get Started with Tailwind CSS</h2>
      <p>
        Getting started with Tailwind CSS is simple. You can install it via npm or include it via a CDN for quick prototyping. Follow the official <a href="https://tailwindcss.com/docs/installation" target="_blank" rel="noopener noreferrer">installation guide</a> to set it up for your project.
      </p>
    </section>

    <section>
      <h2>Conclusion</h2>
      <p>
        Tailwind CSS has revolutionized the way developers approach styling in web development. Its utility-first approach, combined with customization and performance optimization, makes it a must-have tool in any developer's toolkit. If you haven’t tried Tailwind yet, now is the perfect time to dive in and experience its benefits firsthand.
      </p>
      <p>Happy coding!</p>
    </section>
  </main>

  <footer>
    <p>
      For more tutorials and tips, visit my personal blog at 
      <a href="https://nikhilenigma.dev" target="_blank" rel="noopener noreferrer">nikhilenigma.dev</a>.
    </p>
  </footer>`,
    author: {
      name: "Roel Aufderehar",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    date: "Mar 16, 2020",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsb2d8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "WwclCUobZRfTUWJN9plV",
    type: "Video",
    title: "How to use search engine optimization to drive sales",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro...",
    author: {
      name: "Brenna Goyette",
      image:
        "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    },
    date: "Mar 10, 2020",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "mt5jAdhR",
    type: "Case Study",
    title: "Improve your customer experience",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem...",
    author: {
      name: "Daniela Metz",
      image:
        "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    },
    date: "Feb 12, 2020",
    readTime: "11 min read",
    image:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsb2d8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "xrZq1O",
    type: "Article",
    title: "Boost your conversion rate",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium...",
    author: {
      name: "Roel Aufderehar",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    date: "Mar 16, 2020",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsb2d8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "WwclCUobZRfTUWJN9plV",
    type: "Video",
    title: "How to use search engine optimization to drive sales",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro...",
    author: {
      name: "Brenna Goyette",
      image:
        "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    },
    date: "Mar 10, 2020",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "mt5jAdhR",
    type: "Case Study",
    title: "Improve your customer experience",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem...",
    author: {
      name: "Daniela Metz",
      image:
        "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    },
    date: "Feb 12, 2020",
    readTime: "11 min read",
    image:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsb2d8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "xrZq1O",
    type: "Article",
    title: "Boost your conversion rate",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium...",
    author: {
      name: "Roel Aufderehar",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    date: "Mar 16, 2020",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsb2d8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "WwclCUobZRfTUWJN9plV",
    type: "Video",
    title: "How to use search engine optimization to drive sales",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro...",
    author: {
      name: "Brenna Goyette",
      image:
        "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    },
    date: "Mar 10, 2020",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "mt5jAdhR",
    type: "Case Study",
    title: "Improve your customer experience",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem...",
    author: {
      name: "Daniela Metz",
      image:
        "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    },
    date: "Feb 12, 2020",
    readTime: "11 min read",
    image:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsb2d8ZW58MHx8MHx8fDA%3D",
  },
];

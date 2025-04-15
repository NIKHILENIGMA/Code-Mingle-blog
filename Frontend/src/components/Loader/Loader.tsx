
/**
 * Loader component to show a loading spinner.
 * @param {number} size - The size of the loader in pixels.
 */
interface LoaderProps {
  size: number;
}

/**
 * 
 * @description - This component renders a loading spinner with a specified size.
 * @param params - The props for the Loader component.
 * @returns {JSX.Element} - The Loader component.
 * It uses Tailwind CSS for styling and is centered within its parent container.
 */
function Loader({ size }: LoaderProps): JSX.Element {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className={`w-${size} h-${size} ease-linear border-8 border-t-8 border-gray-200 rounded-full loader`}
      ></div>
    </div>
  );
}

export default Loader;

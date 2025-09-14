
export default function Input({ type = "text", ...props }) {
  return (
    <input
      type={type}
      className="w-full mb-2 p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
      {...props}
    />
  );
}

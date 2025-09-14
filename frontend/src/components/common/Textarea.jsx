
export default function Textarea({ ...props }) {
  return (
    <textarea
      className="w-full mb-2 p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
      {...props}
    />
  );
}

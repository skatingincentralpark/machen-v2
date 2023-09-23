"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="text-red-500">
      <div>Error: {error.message}</div>
    </div>
  );
}

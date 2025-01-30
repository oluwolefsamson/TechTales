import React from "react";

const NotFoundPage = () => {
  console.log("Rendering NotFoundPage");
  return (
    <div className="flex flex-col items-center justify-center h-screen p-1 text-center">
      <h1 className="text-red-700 text-6xl font-bold mb-4">ERROR 404</h1>
      <a href="/" className="text-blue-500 text-lg">
        Go back to Home
      </a>
    </div>
  );
};

export default NotFoundPage;

import { useState } from "react";

export const useColour = () => {
  const [color, setColour] = useState<string>("");

  const colours = [
    { name: "White", className: "bg-white", changeFunction: () => setColour("text-white") },
    { name: "Blue", className: "bg-blue-600", changeFunction: () => setColour("text-blue-600") },
    { name: "Red", className: "bg-red-600", changeFunction: () => setColour("text-red-600") },
    { name: "Yellow", className: "bg-yellow-600", changeFunction: () => setColour("text-yellow-600") },
    { name: "Green", className: "bg-green-600", changeFunction: () => setColour("text-green-600") },
    { name: "Purple", className: "bg-purple-600", changeFunction: () => setColour("text-purple-600") },
    { name: "Pink", className: "bg-pink-600", changeFunction: () => setColour("text-pink-600") },
    { name: "Orange", className: "bg-orange-600", changeFunction: () => setColour("text-orange-600") },
    { name: "Teal", className: "bg-teal-600", changeFunction: () => setColour("text-teal-600") },
  ];

  const Container = () => (
    <div className="grid grid-cols-2 gap-2 mb-2">
      {colours.map((color, index) => (
        <button
          key={index}
          onClick={color.changeFunction}
          className={`flex items-center rounded bg-slate-400 hover:text-black hover:bg-slate-50 px-2`}
        >
          <span className="mr-1">{color.name}</span>
          <span className={`w-4 h-4 ${color.className} border border-gray-300 rounded-lg`}></span>
        </button>
      ))}
    </div>
  );

  return {
    color,
    Container,
  };
};

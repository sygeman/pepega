import React from "react";

export const Input = (
  properties: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => (
  <input
    className="p-2 my-2 border-none bg-background rounded outline-none w-full text-sm"
    {...properties}
  />
);

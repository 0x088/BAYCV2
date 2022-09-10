import React from "react";

type Props = {
  value?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  type: string;
  max: number;
  min: number;
};

const Input: React.FC<Props> = (props) => {
  return (
    <input
      className="error my-1 w-24 rounded-[10px] bg-white py-2 px-5 text-lg text-black focus:outline-none focus:outline-secondary invalid:focus:outline-red-500 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200"
      {...props}
      required
    />
  );
};

export default Input;

import { FC } from "react";

type TProps = {
  message: string | undefined;
};

const ErrorMessage: FC<TProps> = ({ message }) => {
  return (
    <span className="w-full flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#F04444"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        stroke="white"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      <p className="text-red-500 text-xs font-semibold">{message}</p>
    </span>
  );
};
export default ErrorMessage;

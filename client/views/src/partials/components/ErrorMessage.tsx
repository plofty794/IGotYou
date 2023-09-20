import { FC } from "react";

type TProps = {
  message: string | undefined;
};

const ErrorMessage: FC<TProps> = ({ message }) => {
  return <p className="text-red-500 text-xs font-semibold">{message}</p>;
};
export default ErrorMessage;

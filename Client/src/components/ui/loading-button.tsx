import { ButtonHTMLAttributes } from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading: boolean;
}

const LoadingButton = ({
  children,
  isLoading,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? <Loader2 className="size-5 animate-spin" /> : children}
    </Button>
  );
};

export default LoadingButton;

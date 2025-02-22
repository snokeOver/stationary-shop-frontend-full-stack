import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface IPrimaryActionButtonProps {
  isLoading: boolean;
  onClick?: () => void;
  loadingText: string;
  btnText: string;
  className?: string;
  Icon?: React.ElementType;
  type?: "submit" | "button";
}

const PrimaryActionButton = ({
  isLoading,
  onClick,
  loadingText,
  btnText,
  className = "",
  Icon,
  type = "submit",
}: IPrimaryActionButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`w-full uppercase text-black ${className}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader className="h-5 w-5 animate-spin" />
          <span>{loadingText}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="!h-5 !w-5" />}
          <span>{btnText}</span>
        </div>
      )}
    </Button>
  );
};

export default PrimaryActionButton;

import { Button } from "@/components/ui/button";

interface IPrimaryNavButtonProps {
  onClick?: () => void;
  btnText: string;
  className?: string;
  btnType?: "submit" | "button";
}

const PrimaryNavButton = ({
  onClick,
  btnText,
  className = "",
  btnType = "button",
}: IPrimaryNavButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type={btnType}
      className={`w-full uppercase text-white ${className}`}
    >
      {btnText}
    </Button>
  );
};

export default PrimaryNavButton;

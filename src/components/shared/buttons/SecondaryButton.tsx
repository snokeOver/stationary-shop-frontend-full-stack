import { Button } from "@/components/ui/button";

interface ISecondaryButtonProps {
  onClick?: () => void;
  btnText: string;
  className?: string;
  type?: "submit" | "button";
}

const SecondaryButton = ({
  onClick,
  btnText,
  type = "submit",
  className = "",
}: ISecondaryButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`w-full bg-[#81818f] uppercase text-white hover:bg-[#81818f]/80 ${className}`}
    >
      {btnText}
    </Button>
  );
};

export default SecondaryButton;

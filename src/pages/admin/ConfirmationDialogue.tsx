import PrimaryActionButton from "@/components/shared/buttons/PrimaryActionButton";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type IConfirmationDialogueProps = {
  onConfirm: () => void;
  onOpenChange: (state: boolean) => void;
  isOpen: boolean;
  bodyText: string;
  isLoading?: boolean;
};

export function ConfirmationDialogue({
  isOpen,
  onOpenChange,
  onConfirm,
  bodyText,
  isLoading = false,
}: IConfirmationDialogueProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DialogTrigger className="w-full"></DialogTrigger>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">🚨 Alert 🚨</DialogTitle>

          <DialogDescription className="text-center">
            {bodyText}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <SecondaryButton
            type="button"
            onClick={() => onOpenChange(false)}
            btnText="Cancel"
          />

          <PrimaryActionButton
            isLoading={isLoading}
            loadingText="Confirming..."
            btnText="Confirm"
            onClick={onConfirm}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

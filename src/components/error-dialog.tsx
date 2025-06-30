import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
}

export default function ErrorDialog({ open, onOpenChange, message }: ErrorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark">
        <DialogHeader>
          <DialogTitle>An Error Occurred</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
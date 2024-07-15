import { Button, ButtonProps } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

interface CollapseButtonProps extends ButtonProps {
  label: string;
  isOpen: boolean;
}

const ICON_SIZE = 16;

const CollapseButton = ({ isOpen, label, ...props }: CollapseButtonProps) => {
  return (
    <div className="flex items-center">
      <Button variant="outline" size="iconSm" {...props}>
        {isOpen ? (
          <ChevronDown size={ICON_SIZE} />
        ) : (
          <ChevronRight size={ICON_SIZE} />
        )}
      </Button>
      {label}
    </div>
  );
};

export default CollapseButton;

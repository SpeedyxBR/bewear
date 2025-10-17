import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ContinueWithoutLoginButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ContinueWithoutLoginButton = ({
  className = "text-muted-foreground w-full text-sm",
  disabled = false,
  onClick,
}: ContinueWithoutLoginButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    onClick?.();
    router.push("/");
  };

  return (
    <Button
      variant="ghost"
      className={className}
      onClick={handleClick}
      type="button"
      disabled={disabled}
    >
      Continuar sem login
    </Button>
  );
};

export default ContinueWithoutLoginButton;

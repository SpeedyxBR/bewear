import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import GoogleIcon from "@/components/ui/google-icon";
import { useGoogleAuth } from "@/hooks/use-google-auth";

interface GoogleButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  disabled?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
  successMessage?: string;
}

const GoogleButton = ({
  children = "Entrar com Google",
  className = "w-full",
  variant = "outline",
  size = "default",
  disabled = false,
  onSuccess,
  onError,
  successMessage,
}: GoogleButtonProps) => {
  const { signInWithGoogle, isLoading } = useGoogleAuth({
    onSuccess,
    onError,
    successMessage,
  });

  return (
    <Button
      variant={variant}
      className={className}
      onClick={signInWithGoogle}
      disabled={disabled || isLoading}
      type="button"
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <GoogleIcon />
      )}
      {children}
    </Button>
  );
};

export default GoogleButton;

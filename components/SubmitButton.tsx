"use client";

import { useFormStatus } from "react-dom";
import LinkButton from "@/components/LinkButton";

type SubmitButtonProps = {
  children: React.ReactNode;
  pendingText?: string;
  disabled?: boolean;
};

export default function SubmitButton({
  children,
  pendingText = "Updating...",
  disabled,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <LinkButton
      type="submit"
      disabled={disabled || pending}
      className="flex items-center justify-center gap-3 px-8 py-4 font-semibold disabled:cursor-not-allowed disabled:bg-primary-700 disabled:text-primary-400"
    >
      {pending && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}

      {pending ? pendingText : children}
    </LinkButton>
  );
}

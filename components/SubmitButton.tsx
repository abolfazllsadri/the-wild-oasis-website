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
      className="px-8 py-4 font-semibold disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? pendingText : children}
    </LinkButton>
  );
}

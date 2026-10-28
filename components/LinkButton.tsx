import { cn } from "@/lib/utils";
import Link from "next/link";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
};

type BaseLinkProps = BaseProps &
  Omit<React.ComponentPropsWithRef<typeof Link>, keyof BaseProps | "href"> & {
    href: string;
  };

type BaseButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

type LinkButtonProps = BaseLinkProps | BaseButtonProps;

const initClasses =
  "inline-block rounded-xl bg-accent-500 text-primary-800 transition-all hover:scale-[1.01] active:scale-100 disabled:hover:scale-100 disabled:active:scale-100";

export default function LinkButton(props: LinkButtonProps) {
  if (typeof props.href === "string") {
    const { href, children, className, ...linkProps } = props;

    return (
      <Link href={href} className={cn(initClasses, className)} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { href: _href, children, className, ...buttonProps } = props;

  return (
    <button className={cn(initClasses, className)} {...buttonProps}>
      {children}
    </button>
  );
}

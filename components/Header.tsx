import Navigation from "@/components/Navigation";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="relative z-40 border-b border-primary-600/20">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-8">
        <Logo />
        <Navigation />
      </nav>
    </header>
  );
}

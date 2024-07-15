import { ThemeToggle } from "@/components/molecules/ThemeToggle";

export const Header = () => {
  return (
    <header className="z-10 sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
      <h1 className="text-2xl font-bold text-primary">AI-Dataviz</h1>
      <ThemeToggle />
    </header>
  );
};

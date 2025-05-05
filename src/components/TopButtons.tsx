import ThemeToggle from "@/components/ThemeToggle";


export default function TopButtons() {
  return (
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
        <ThemeToggle />
      </div>
  );
}
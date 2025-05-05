import ThemeToggle from "@/components/ThemeToggle";
import {siGithub} from "simple-icons";
import {Button} from "@/components/ui/button";
import SiIcon from "@/components/SiIcon";

export default function TopButtons() {
  return (
      <div className="flex gap-2 absolute top-4 right-4 sm:top-8 sm:right-8">
        <a href="https://github.com/EarthCow/pocket-monster-gallery">
          <Button variant="outline" className="cursor-pointer">
            <SiIcon icon={siGithub} />
          </Button>
        </a>
        <ThemeToggle />
      </div>
  );
}
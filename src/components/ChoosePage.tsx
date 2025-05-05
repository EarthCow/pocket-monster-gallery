import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Ellipsis } from "lucide-react";
import {useState} from "react";

interface choosePageProps {
  currentPage: number;
  maxPage: number;
  goToPage: (page: number) => void;
}

export function ChoosePage({ currentPage, maxPage, goToPage }: choosePageProps) {
  const [pageSelectOpen, setPageSelectOpen] = useState(false);

  return (
      <Popover open={pageSelectOpen} onOpenChange={setPageSelectOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            <Ellipsis />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Page Select</h4>
              <p className="text-sm text-muted-foreground">
                Browse to a specific page.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="pageSelect">Page</Label>
                <Input
                    id="pageSelect"
                    type="number"
                    defaultValue={currentPage + 1}
                    className="col-span-2 h-8"
                    onKeyUp={e => {
                      if (e.key === "Enter") {
                        const newPage = e.currentTarget.valueAsNumber - 1;
                        if (newPage >= 0 && newPage <= maxPage) {
                          goToPage(newPage);
                          setPageSelectOpen(false);
                        }
                      }
                    }}
                />
              </div>
              <Button variant="outline" onClick={() => {
                  const newPage = (document.getElementById("pageSelect") as HTMLInputElement).valueAsNumber - 1;
                  if (newPage >= 0 && newPage <= maxPage) {
                    goToPage(newPage);
                    setPageSelectOpen(false);
                  }
                }
              }>
                Go
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
  )
}

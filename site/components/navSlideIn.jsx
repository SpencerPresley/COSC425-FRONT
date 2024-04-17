import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { X } from "lucide-react"

export const SheetSideComponent = ({ isOpen, onRequestClose }) => {
  return (
    <Sheet open={isOpen}>
      <SheetContent side="left" showCloseButton={false}>
        <SheetHeader>
          <SheetTitle className="text-left">Pages</SheetTitle>
          {/* Custom close button */}
          <button
  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
  onClick={onRequestClose}>
  <X className="h-4 w-4" />
</button>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Link href="/">Home</Link>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Link href="/Catalog">Catalog</Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
  

export const SideNav = () => {

    return (
      <div className="md:w-full bg-suMaroon h-full flex-1 border-r border-zinc-200 hidden md:flex">
        <div className="flex flex-col space-y-6 w-full">
            <Link
                href="/"
                className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full"
            >
                <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
                <span className="font-bold text-xl hidden md:flex">Logo</span>
            </Link>
            <div className="flex flex-col space-y-2 md:px-6">
                <div className="border-dashed border w-full h-24">

                </div>
            </div> 
        </div>
      </div>
    );
};
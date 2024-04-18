"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const BoxesCore = ({ className, ...rest }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  let colors = [
    "--sky-300",
    "--pink-300",
    "--green-300",
    "--yellow-300",
    "--red-300",
    "--purple-300",
    "--blue-300",
    "--indigo-300",
    "--violet-300",
  ];
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={cn("fixed inset-0 z-0 pointer-events-none", className)}
      {...rest}
    >
      {rows.map((_, rowIndex) => (
        <motion.div key={`row-${rowIndex}`} className="flex">
          {cols.map((_, colIndex) => (
            <motion.div
              key={`col-${colIndex}`}
              className="w-16 h-8 border border-slate-700"
              whileHover={{
                backgroundColor: `var(${getRandomColor()})`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
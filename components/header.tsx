"use client";
import React from "react";
import ColourfulText from "@/components/ui/colourful-text";

export function ColourfulTextHeader() {
  return (
    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
      Water the <ColourfulText text="roses" />. <br />
    </h1>
  );
}

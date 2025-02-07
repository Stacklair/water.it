"use client";

import React from "react";
import ColourfulText from "./ui/colourful-text";
import { getNextEventTime } from "@/utils/utilities";

function NextAt() {
  return (
    <div className="text-white font-bold">
      : <ColourfulText text={getNextEventTime()} />
    </div>
  );
}

export default NextAt;

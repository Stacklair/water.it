"use client";

import React, { useState, useEffect } from "react";

function Clock() {
  const [ctime, setCtime] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loader state

  const updateTime = () => {
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    setCtime(time);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      updateTime();
      setIsLoading(false); // Hide loader after first time update
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-full text-white font-bold font-sans text-4xl md:text-5xl lg:text-7xl">
      {isLoading ? (
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
      ) : (
        ctime
      )}
    </div>
  );
}

export default Clock;

"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

function Logout() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div>
      <Button
        className="bg-slate-50 text-black hover:text-white"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}

export default Logout;

"use client";

import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { getLatestStatus } from "@/app/service";

function LastAt({ refreshKey }: { refreshKey: number }) {
  const [statusData, setStatusData] = useState<{
    status: string;
    createdAt: string;
    user: { name: string };
  } | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getLatestStatus();
        setStatusData(data.latestWateringLog);
        console.log(data);
      } catch (err: any) {
        toast({
          title: "Error fetching status!",
          description: err.message,
        });
      }
    };

    fetchStatus();
  }, [refreshKey]);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="text-white font-bold space-y-2 border p-2 rounded-md">
      {statusData ? (
        <>
          <div>
            <span className="font-light">Last status: </span>
            <span className="text-green-200">{statusData.status}</span>
          </div>
          <div>
            <span className="font-light">Updated At: </span>
            <span className="text-green-200">
              {formatDate(statusData.createdAt)}
            </span>
          </div>
          <div className="font-light">By: {statusData.user?.name}</div>
        </>
      ) : (
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
      )}
    </div>
  );
}

export default LastAt;

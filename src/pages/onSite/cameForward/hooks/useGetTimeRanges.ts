import { useQuery } from "@tanstack/react-query";
import React from "react";
import { timeRanges } from "services/onSite";

export default function useGetTimeRanges(day: number | undefined) {
  const { data } = useQuery({
    queryKey: ["time-ranges", day],
    queryFn: timeRanges,
    enabled: !!day,
  });
  return { timeRanges: data };
}

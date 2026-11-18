"use client";

import { useEffect, useState } from "react";
import { formatElapsedDuration } from "../lib/formatters";

export function CheckInTimer({ checkedInAt }: { checkedInAt: string }) {
  const [elapsed, setElapsed] = useState(() =>
    formatElapsedDuration(checkedInAt),
  );

  useEffect(() => {
    const updateElapsed = () => setElapsed(formatElapsedDuration(checkedInAt));
    updateElapsed();
    const timer = window.setInterval(updateElapsed, 1_000);

    return () => window.clearInterval(timer);
  }, [checkedInAt]);

  return <time dateTime={checkedInAt}>{elapsed}</time>;
}

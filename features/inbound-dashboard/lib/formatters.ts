export function formatClock(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

/** Formats the time since check-in as HH:MM:SS. Never goes negative. */
export function formatElapsedDuration(
  checkedInAt: string,
  now: number = Date.now(),
): string {
  const elapsedSeconds = Math.max(
    0,
    Math.floor((now - new Date(checkedInAt).getTime()) / 1000),
  );
  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}

/** Maps an estimated wait (minutes) to a display colour. */
export function waitColor(minutes: number): string {
  if (minutes <= 10) return "#70d94f";
  if (minutes <= 20) return "#ffc928";
  return "#45c1ff";
}

export function getNextEventTime() {
  const now = new Date();
  const today = now.toDateString();

  // Set the target times for today
  const today7PM = new Date(`${today} 19:00:00`);
  const today11AM = new Date(`${today} 11:00:00`);

  // Check if the current time is before 11 AM today
  if (now < today11AM) {
    return "today, 11 AM";
  }

  // Check if the current time is before 7 PM today
  if (now < today7PM) {
    return "today, 7 PM";
  }

  // If it's past 7 PM, return tomorrow at 11 AM
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrow11AM = new Date(`${tomorrow.toDateString()} 11:00:00`);

  return `tomorrow, 11 AM`;
}

// Utility function to get the subject and message body
export function getMessageContent(
  type: "scheduled" | "moist-check" | "watered",
  body?: string
) {
  const messageBody =
    type === "scheduled"
      ? "🌹 Time for regular plant check! Please check the plant moisture and water if needed!"
      : type === "moist-check"
      ? "⚠️ Moist soil recheck needed! 3 hours have passed since the last moisture check. Please recheck the soil status!"
      : `🌹 Roses just got watered! 🌱☺️ ${body}`;

  return messageBody;
}

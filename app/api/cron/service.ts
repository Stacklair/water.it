// Helper function to check IST time
export function isISTTime(targetHours: number) {
  const now = new Date();
  const istOffset = 330; // IST is UTC+5:30 (5*60 + 30 = 330 minutes)
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  const istTime = new Date(utcTime + istOffset * 60000);
  return istTime.getHours() === targetHours;
}

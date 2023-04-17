export function formatDuration(durationInMillis: number): string {
  if (durationInMillis < 0) {
    throw Error(`Negative duration passed to formatDuration: ${durationInMillis}`);
  }

  const seconds = Math.floor((durationInMillis / 1000) % 60);
  const minutes = Math.floor((durationInMillis / (1000 * 60)) % 60);
  const hours = Math.floor(durationInMillis / (1000 * 60 * 60));

  const components: string[] = [];
  if (hours > 0) components.push(`${hours}h`);
  if (minutes > 0) components.push(`${minutes}m`);
  components.push(`${seconds}s`);
  return components.join(" ");
}

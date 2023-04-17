import { formatDuration } from "./format-duration";

function durationInMs({
  hours = 0,
  minutes = 0,
  seconds = 0,
}: {
  hours?: number;
  minutes?: number;
  seconds?: number;
}): number {
  const secondMs = 1000;
  const minuteMs = secondMs * 60;
  const hourMs = minuteMs * 60;
  return hourMs * hours + minuteMs * minutes + secondMs * seconds;
}

describe("formatDuration", () => {
  test("returns human-readable string for duration in milliseconds", () => {
    expect(formatDuration(durationInMs({ seconds: 0 }))).toBe("0s");
    expect(formatDuration(durationInMs({ seconds: 0.5 }))).toBe("0s");
    expect(formatDuration(durationInMs({ seconds: 1 }))).toBe("1s");
    expect(formatDuration(durationInMs({ seconds: 59 }))).toBe("59s");
    expect(formatDuration(durationInMs({ minutes: 1 }))).toBe("1m 0s");
    expect(formatDuration(durationInMs({ minutes: 1, seconds: 1 }))).toBe("1m 1s");
    expect(formatDuration(durationInMs({ minutes: 59 }))).toBe("59m 0s");
    expect(formatDuration(durationInMs({ hours: 1 }))).toBe("1h 0s");
    expect(formatDuration(durationInMs({ hours: 1, minutes: 1 }))).toBe("1h 1m 0s");
    expect(formatDuration(durationInMs({ hours: 5, minutes: 1, seconds: 12 }))).toBe("5h 1m 12s");
    expect(formatDuration(durationInMs({ hours: 32, minutes: 12, seconds: 59 }))).toBe(
      "32h 12m 59s",
    );
  });

  test("throws error if given duration is negative", () => {
    expect(() => formatDuration(-1)).toThrowError("Negative duration passed to formatDuration: -1");
  });
});

import { BizEvent, createRandomBizEvents, SampleDataOptions } from "./generate-sample-data";

function daysInMs(days: number): number {
  return 1000 * 60 * 60 * 24 * days;
}

type BizEventsPerDay = { [date: string]: BizEvent[] };

function groupPerDay(bizEvents: BizEvent[]): BizEventsPerDay {
  return bizEvents.reduce((prevValue, currValue) => {
    const date = currValue.data.run_started_at.toISOString().split("T")[0];
    if (prevValue[date]) {
      prevValue[date].push(currValue);
    } else {
      prevValue[date] = [currValue];
    }
    return prevValue;
  }, {});
}

const anyOptions: SampleDataOptions = {};

describe("createRandomBizEvents", () => {
  test("returns biz events with given event type", () => {
    const eventType = "event-type";

    const bizEvents = createRandomBizEvents({ eventType });

    bizEvents.forEach((bizEvent) => {
      expect(bizEvent.type).toEqual(eventType);
    });
  });

  test("returns biz events with run_started_at between startOfToday and startOfTodayMinusNumberOfDays", () => {
    const numberOfDays = 30;

    const bizEvents = createRandomBizEvents({ numberOfDays });

    const startOfToday = new Date().setHours(0, 0, 0, 0);
    const startOfTodayMinusNumberOfDays = startOfToday - daysInMs(numberOfDays);
    bizEvents.forEach((bizEvent) => {
      const runStartedAt = bizEvent.data.run_started_at.getTime();
      expect(runStartedAt).toBeGreaterThanOrEqual(startOfTodayMinusNumberOfDays);
      expect(runStartedAt).toBeLessThanOrEqual(startOfToday);
    });
  });

  test("returns not more than ${maxRunsPerDay} biz events per day", () => {
    const maxRunsPerDay = 5;

    const bizEvents = createRandomBizEvents({ maxRunsPerDay });

    const eventsPerDay = groupPerDay(bizEvents);
    Object.entries(eventsPerDay).forEach(([_, events]) => {
      expect(events.length).toBeLessThanOrEqual(maxRunsPerDay);
    });
  });

  test("returns biz events with expected properties", () => {
    const bizEvents = createRandomBizEvents(anyOptions);

    bizEvents.forEach((bizEvent) => {
      expect(bizEvent.id).toMatch(/^demobatch_run_.*/);
      expect(bizEvent.source).toEqual("github-actions-profiler");
      expect(bizEvent.specversion).toEqual("1.0");
      expect(bizEvent.data.repository).toEqual('{"full_name" : "demo"}');
    });
  });

  test("returns biz events with unique IDs", () => {
    const bizEvents = createRandomBizEvents(anyOptions);

    const uniqueIds = new Set(bizEvents.map((bizEvent) => bizEvent.id));
    expect(uniqueIds.size).toEqual(bizEvents.length);
  });
});

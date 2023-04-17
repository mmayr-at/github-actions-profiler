import { normalizeTimeseriesLabels } from "./timeseries";

describe("timeseries-util", () => {
  describe("normalizeTimeseriesLabels", () => {
    test("removes _value suffix from timeseries name", () => {
      const normalizedTimeseries = normalizeTimeseriesLabels({
        datapoints: [],
        name: "success_value",
      });

      expect(normalizedTimeseries.name).toEqual("success");
    });

    test("removes _value suffix from timeseries name array", () => {
      const normalizedTimeseries = normalizeTimeseriesLabels({
        datapoints: [],
        name: ["success_value", "failure_value"],
      });

      expect(normalizedTimeseries.name).toEqual(["success", "failure"]);
    });

    test("does not modify timeseries name if it does not end with _value", () => {
      const normalizedTimeseries = normalizeTimeseriesLabels({
        datapoints: [],
        name: ["success", "failure"],
      });

      expect(normalizedTimeseries.name).toEqual(["success", "failure"]);
    });
  });
});

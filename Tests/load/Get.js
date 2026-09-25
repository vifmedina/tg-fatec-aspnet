import http from "k6/http";
import { sleep, check, group } from "k6";
import { Trend } from "k6/metrics";
const BASE_URL = __ENV.BASE_URL || "http://localhost/api/";

export const options = {
  stages: [
    { duration: "30s", target: 50 }, // Ramp up to 2000 users over 30 seconds
    { duration: "2m", target: 100 }, // Stay at 2000 users for 1 minute
    { duration: "30s", target: 0 }, // Ramp down to 0 users over 30 seconds
  ],
};

const getDuration = new Trend("get_duration");

export default () => {

  group("List Users", function () {
    const res = http.get(BASE_URL + "users");
    getDuration.add(res.timings.duration);
    check(res, {
      "status is 200": (r) => r.status === 200,
    });
  });
};

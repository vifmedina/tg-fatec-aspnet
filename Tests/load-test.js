import http from "k6/http";
import { sleep, check, group } from "k6";
import faker from "k6/x/faker";
import { Trend } from "k6/metrics";
const BASE_URL = __ENV.BASE_URL || "http://localhost/api/";

export const options = {
  stages: [
    { duration: "30s", target: 500 }, // Ramp up to 2000 users over 30 seconds
    { duration: "2m", target: 1000 }, // Stay at 2000 users for 1 minute
    { duration: "30s", target: 0 }, // Ramp down to 0 users over 30 seconds
  ],
};

const postDuration = new Trend("post_duration");
const getDuration = new Trend("get_duration");

export default () => {
  group("Post User", function () {
    const payload = JSON.stringify({
      name: "User" + Math.floor(Math.random() * 1000),
      age: Math.floor(Math.random() * 100).toString(),
    });
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = http.post(BASE_URL + "users", payload, params);
    sleep(1);
    postDuration.add(res.timings.duration);

    const checkResult = check(res, {
      "status is 201": (r) => r.status === 201,
    });

    if (!checkResult) {
      console.log(
        JSON.stringify({
          status: res.status,
          error: res.error,
          error_code: res.error_code,
          body: res.body,
        }),
      );
    }
  });

  group("List Users", function () {
    const res = http.get(BASE_URL + "users");
    getDuration.add(res.timings.duration);
    check(res, {
      "status is 200": (r) => r.status === 200,
    });
  });
};

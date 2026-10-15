import http from "k6/http";
import { sleep, check, group } from "k6";
import { Trend } from "k6/metrics";
const BASE_URL = __ENV.BASE_URL || "http://localhost/api/";

export const options = {
  stages: [
    { duration: "30s", target: 300 }, // Ramp up to 300 users over 30 seconds
    { duration: "1m", target: 300 }, // Stay at 300 users for 30 seconds
    { duration: "10s", target: 0 }, // Ramp down to 0 users over 30 seconds
  ],
};

const postDuration = new Trend("post_duration");
const getDuration = new Trend("get_duration");
const getByIdDuration = new Trend("get_by_id_duration");
const updateDuration = new Trend("update_duration");
const deleteDuration = new Trend("delete_duration");

export default () => {
  group("Post User", function () {
    const payload = JSON.stringify({
      name: "User" + Math.floor(Math.random() * 1000),
      age: Math.floor(Math.random() * 100),
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

  group("Get user by id", function () {
    const res = http.get(BASE_URL + "users/1");
    getDuration.add(res.timings.duration);

    check(res, {
      "status is 200 get": (res) => res.status === 200,
    });
    sleep(1);
  });

  group("List Users", function () {
    const res = http.get(BASE_URL + "users");
    getByIdDuration.add(res.timings.duration);
    sleep(1);
    check(res, {
      "status is 200 list": (r) => r.status === 200,
    });
  });

  group("Update User", function () {
    const payload = JSON.stringify({
      name: "Updated User" + Math.floor(Math.random() * 1000),
      age: Math.floor(Math.random() * 100),
    });
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = http.patch(BASE_URL + "users/2", payload, params);
    updateDuration.add(res.timings.duration);

    const checkResult = check(res, {
      "status is 200 update": (r) => r.status === 200,
    });

    sleep(1);
  });

  group("Delete user by id", function () {
    const id = Math.floor(Math.random() * 1000) + 1;
    const res = http.del(BASE_URL + "users/" + id);
    deleteDuration.add(res.timings.duration);

    check(res, {
      "status is 200 delete": (res) => res.status === 200,
    });
    sleep(1);
  });
};

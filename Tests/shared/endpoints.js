import http from "k6/http";
import { sleep, check, group } from "k6";
import { Trend } from "k6/metrics";
const BASE_URL = __ENV.BASE_URL || "http://localhost/api/";

const params = {
  headers: {
    "Content-Type": "application/json",
  },
};

const postDuration = new Trend("post_duration");
const getDuration = new Trend("get_duration");
const getByIdDuration = new Trend("get_by_id_duration");
const updateDuration = new Trend("update_duration");
const deleteDuration = new Trend("delete_duration");

const newUserPayload = (prefix) =>
  JSON.stringify({
    name: prefix + Math.floor(Math.random() * 1000),
    age: Math.floor(Math.random() * 100),
  });

// Creates a user without recording metrics, for tests that need an existing id
export function createUser() {
  const res = http.post(BASE_URL + "users", newUserPayload("User"), params);
  return res.status === 201 ? res.json("id") : undefined;
}

export function postUser() {
  let id;
  group("Post User", function () {
    const res = http.post(BASE_URL + "users", newUserPayload("User"), params);
    postDuration.add(res.timings.duration);

    const checkResult = check(res, {
      "status is 201 post": (r) => r.status === 201,
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
    } else {
      id = res.json("id");
    }
    sleep(1);
  });
  return id;
}

export function listUsers() {
  group("List Users", function () {
    const res = http.get(BASE_URL + "users");
    getDuration.add(res.timings.duration);

    check(res, {
      "status is 200 list": (r) => r.status === 200,
    });
    sleep(1);
  });
}

export function getUserById(id) {
  group("Get user by id", function () {
    const res = http.get(BASE_URL + "users/" + id);
    getByIdDuration.add(res.timings.duration);

    check(res, {
      "status is 200 get": (r) => r.status === 200,
    });
    sleep(1);
  });
}

export function updateUser(id) {
  group("Update User", function () {
    const res = http.patch(BASE_URL + "users/" + id, newUserPayload("Updated User"), params);
    updateDuration.add(res.timings.duration);

    check(res, {
      "status is 200 update": (r) => r.status === 200,
    });
    sleep(1);
  });
}

export function deleteUser(id) {
  group("Delete user by id", function () {
    const res = http.del(BASE_URL + "users/" + id);
    deleteDuration.add(res.timings.duration);

    check(res, {
      "status is 200 delete": (r) => r.status === 200,
    });
    sleep(1);
  });
}

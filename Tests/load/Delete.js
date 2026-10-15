import http from "k6/http";
import { sleep, check, group } from "k6";
import { Trend } from "k6/metrics";
const BASE_URL = __ENV.BASE_URL || "http://localhost/api/";

export const options = {
  stages: [
    { duration: "30s", target: 300 }, // Ramp up to 2000 users over 30 seconds
    { duration: "1m", target: 300 }, // Stay at 2000 users for 1 minute
    { duration: "10s", target: 0 }, // Ramp down to 0 users over 30 seconds
  ],
};

const deleteDuration = new Trend("delete_duration");

export default() => {
    group("Delete user by id", function () {
        const id = Math.floor(Math.random() * 1000) + 1; 
        const res = http.del(BASE_URL + "users/" + id);
        deleteDuration.add(res.timings.duration);

        check(res, {
            "status is 200": (res) => res.status === 200,
        });
        sleep(1);
    });
}
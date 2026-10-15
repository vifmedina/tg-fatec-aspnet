import http from "k6/http";
import { sleep, check, group } from "k6";
import { Trend } from "k6/metrics";
const BASE_URL = __ENV.BASE_URL || "http://localhost/api/";

export const options = {
    stages: [
        { duration: "30s", target: 300 }, // Ramp up to 300 users over 30 seconds
        { duration: "1m", target: 300 }, // Stay at 300 users for 1 minute
        { duration: "0s", target: 0 }, // Ramp down to 0 users over 30 seconds
    ],
};

const updateDuration = new Trend("update_duration");

export default () => {
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
            "status is 200": (r) => r.status === 200,
        });

        sleep(1);
    });
}
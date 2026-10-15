export const smoke = {
  vus: 1, // 1 user
  duration: "10s", // for 10 seconds
};

export const soak = {
  stages: [
    { duration: "1m", target: 50 }, // Ramp up to 50 users over 1 minute
    { duration: "10m", target: 250 }, // Ramp up to 250 users over 10 minutes
    { duration: "1m", target: 0 }, // Ramp down to 0 users over 1 minute
  ],
};

export const spike = {
  stages: [
    { duration: "2m", target: 1000 }, // Spike to 1000 users over 2 minutes
    { duration: "1m", target: 0 }, // Ramp down to 0 users over 1 minute
  ],
};

export const stress = {
  stages: [
    { duration: "30s", target: 600 }, // Ramp up to 600 users over 30 seconds
    { duration: "2m", target: 600 }, // Stay at 600 users for 2 minutes
    { duration: "20s", target: 0 }, // Ramp down to 0 users over 20 seconds
  ],
};

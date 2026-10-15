import { soak } from "../shared/options.js";
import { listUsers } from "../shared/endpoints.js";

export const options = soak;

export default () => {
  listUsers();
};

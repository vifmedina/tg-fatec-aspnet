import { smoke } from "../shared/options.js";
import { listUsers } from "../shared/endpoints.js";

export const options = smoke;

export default () => {
  listUsers();
};

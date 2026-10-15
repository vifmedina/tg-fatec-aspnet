import { spike } from "../shared/options.js";
import { listUsers } from "../shared/endpoints.js";

export const options = spike;

export default () => {
  listUsers();
};

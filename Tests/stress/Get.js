import { stress } from "../shared/options.js";
import { listUsers } from "../shared/endpoints.js";

export const options = stress;

export default () => {
  listUsers();
};

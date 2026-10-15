import { stress } from "../shared/options.js";
import { createUser, updateUser } from "../shared/endpoints.js";

export const options = stress;

export function setup() {
  return { id: createUser() };
}

export default (data) => {
  updateUser(data.id);
};

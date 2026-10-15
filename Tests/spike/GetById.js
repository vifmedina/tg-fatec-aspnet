import { spike } from "../shared/options.js";
import { createUser, getUserById } from "../shared/endpoints.js";

export const options = spike;

export function setup() {
  return { id: createUser() };
}

export default (data) => {
  getUserById(data.id);
};

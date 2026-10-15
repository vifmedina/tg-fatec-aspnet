import { stress } from "../shared/options.js";
import { createUser, getUserById } from "../shared/endpoints.js";

export const options = stress;

export function setup() {
  return { id: createUser() };
}

export default (data) => {
  getUserById(data.id);
};

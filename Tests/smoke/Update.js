import { smoke } from "../shared/options.js";
import { createUser, updateUser } from "../shared/endpoints.js";

export const options = smoke;

export function setup() {
  return { id: createUser() };
}

export default (data) => {
  updateUser(data.id);
};

import { soak } from "../shared/options.js";
import { createUser, updateUser } from "../shared/endpoints.js";

export const options = soak;

export function setup() {
  return { id: createUser() };
}

export default (data) => {
  updateUser(data.id);
};

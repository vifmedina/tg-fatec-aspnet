import { stress } from "../shared/options.js";
import { postUser, listUsers, getUserById, updateUser, deleteUser } from "../shared/endpoints.js";

export const options = stress;

export default () => {
  const id = postUser();
  listUsers();
  if (!id) return;

  getUserById(id);
  updateUser(id);
  deleteUser(id);
};

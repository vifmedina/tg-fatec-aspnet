import { spike } from "../shared/options.js";
import { createUser, deleteUser } from "../shared/endpoints.js";

export const options = spike;

// Each iteration creates its own user so there is always something to delete
export default () => {
  const id = createUser();
  if (id) deleteUser(id);
};

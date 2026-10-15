import { spike } from "../shared/options.js";
import { postUser } from "../shared/endpoints.js";

export const options = spike;

export default () => {
  postUser();
};

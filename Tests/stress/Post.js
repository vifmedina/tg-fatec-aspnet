import { stress } from "../shared/options.js";
import { postUser } from "../shared/endpoints.js";

export const options = stress;

export default () => {
  postUser();
};

import { smoke } from "../shared/options.js";
import { postUser } from "../shared/endpoints.js";

export const options = smoke;

export default () => {
  postUser();
};

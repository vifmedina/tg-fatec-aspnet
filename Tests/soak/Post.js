import { soak } from "../shared/options.js";
import { postUser } from "../shared/endpoints.js";

export const options = soak;

export default () => {
  postUser();
};

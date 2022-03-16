/* eslint-disable import/no-anonymous-default-export */
import mock from "../mock.json";

export default {
  list: () => {
    return Promise.resolve(mock);
  },
};

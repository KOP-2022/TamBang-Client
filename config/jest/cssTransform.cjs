"use strict";

// style imports를 빈 객체로 변환하는 custom Jest transformer
// https://jestjs.io/docs/webpack

module.exports = {
  process() {
    return { code: "module.exports = {};" };
  },
  getCacheKey() {
    return "cssTransform";
  },
};

export const replacer = function (key, value) {
  const originalObject = this[key];
  if (originalObject instanceof Map) {
    return {
      dataType: "Map",
      value: [...originalObject],
    };
  } else {
    return value;
  }
};

export const reviver = function (key, value) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }

  return value;
};

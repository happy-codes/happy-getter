const REG_KEY = /\[(['"a-zA-Z0-9]*)\]|\./gi;

/**
 * getter
 * @param {object} data the object data
 * @param {string} path the key path you want to get
 * @param {object} options another options
 */
function getter(data, path, options = {}) {
  const pathArr = path.split(REG_KEY).filter(item => !!item);
  const result = pathArr.reduce(
    (result, currentPath, currentIndex) => {
      if (!result.errorPath) {
        // get value
        let key = currentPath.replace(/[\'\"]/gi, '');
        result.value = result.value[key];

        // check value
        if (currentIndex !== pathArr.length - 1) {
          // can not get the next value
          const currentValueType = Object.prototype.toString.call(result.value);
          if (/String|Number|Boolean|Null|Undefined/.test(currentValueType)) {
            result.errorPath = currentPath;
          }
        }
      }

      return result;
    },
    { value: data, errorPath: null }
  );

  // throw error
  if (
    options.errorCallback &&
    Object.prototype.toString.call(options.errorCallback) ===
      '[object Function]'
  ) {
    options.errorCallback(result.errorPath, pathArr);
  }
  return result.value;
}

/**
 * put the happy getter to all object
 * @param {string} name custom getter function name
 */
function attachGetter(name = 'getter') {
  if (Object.prototype.hasOwnProperty(name)) {
    throw new Error(
      `\`${name}\` is a built-in property of your object, using it will make you unhappy.`
    );
  }

  Object.defineProperty(Object.prototype, name, {
    value: function(path, options) {
      return getter(this, path, options);
    }
  });
}

export default getter;
// attachToObject will be removed in next break change version
export { attachGetter, attachGetter as attachToObject };

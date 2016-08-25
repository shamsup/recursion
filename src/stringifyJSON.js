// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // function to stringify individual items
  // created the scope to handle edge cases for undefined items in arrays,
  // but it can be used to handle edge cases for any type
  var toJSON = function(item, scope) {
    if (item === null) {
      // string version of null
      return 'null';
    }

    // cache type
    var type = typeof item;

    // skip functions and undefined values by returning an empty string
    if (item === undefined || type === 'function') {
      // if we're in an array, return 'null', otherwise empty string
      return scope === 'array' ? 'null' : '';
    }

    // return string value of numbers and booleans for concatenation without coercion
    if (type === 'number' || type ==='boolean') {
      return item.toString();
    }

    // wrap strings in double quotes
    if (type === 'string') {
      return '"' + item + '"';
    }

    // either objects or arrays
    if (type === 'object') {

      // arrays get contents comma-separated and wrapped with []
      // fancy reduce function to pull off stringifying each element
      if (Array.isArray(item)){
        return (
          _.reduce(item, function(str, item, key){
            // stringify each value with the "scope" of "array"
            return str + (key ? ',' : '') + toJSON(item, 'array');
          }, '[') + ']'
        );
      }

      // for objects we are going to push '"key": value' strings to an array
      // and of course stringify the keys and values
      var keyvals = [];
      _.each(item, function(value, key) {
        // stringify each key/value with the "scope" of "object"
        // if jsonVal of item is
        var jsonVal = toJSON(value, type);
        var jsonKey = toJSON(key, type);
        if (jsonVal && jsonKey){
          keyvals.push(jsonKey + ':' + jsonVal);
        }
      });

      // then we join the array with comma separation and wrap it with '{}'
      return '{' + keyvals.join(',') + '}';
    }
    // if it hasn't been handled, just try the toString value of the object (Dates?)
    return item.toString();
  }
  // start with our main object
  return toJSON(obj, typeof obj);
};

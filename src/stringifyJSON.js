// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var toJSON = function(item) {
    if (item === null) {
      // string version of null
      return 'null';
    }

    // cache type
    var type = typeof item;

    // skip functions and undefined values by returning an empty string
    if (item === undefined || type === 'function') {
      return '';
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
            return str + (key ? ',' : '') + toJSON(item);
          }, '[') + ']'
        );
      }

      // for objects we are going to push '"key": value' strings to an array
      // and of course stringify the keys and values
      var keyvals = [];
      _.each(item, function(value, key) {
        var jsonVal = toJSON(value);
        if (jsonVal !== ''){
          keyvals.push(toJSON(key) + ':' + jsonVal);
        }
      });

      // then we join the array with comma separation and wrap it with '{}'
      return '{' + keyvals.join(',') + '}';
    }
    // if it hasn't been handled, just try the toString value of the object (Dates?)
    return '"' + item.toString() + '"';
  }
  // start with our main object
  return toJSON(obj);
};

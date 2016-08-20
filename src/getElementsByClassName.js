// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // your code here
  var result = [];
  var checkElement = function(element) {

    if (element.classList && [].slice.apply(element.classList).includes(className)) {
      // add it to our result set
      result.push(element);
    }
    return element.childNodes && element.childNodes.length && checkElement(element.childNodes[0]),
      element.nextElementSibling && checkElement(element.nextElementSibling);
  };
  checkElement(document.body);
  return result;
};

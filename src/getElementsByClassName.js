// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // your code here
  var result = [];
  var checkElement = function(element) {

    // function to recursively check children
    var checkChild = function (i){
      // start with the element, then recurses for each of its children,
      // then if it has a sibling after it, we do the same thing for that element
      // then we return.
      return checkElement(element.childNodes[i]),
        (i < element.childNodes.length - 1) && checkChild(i+1);
    };

    // if the element has the class we are checking for
    if (element.classList && [].slice.apply(element.classList).includes(className)) {
      // add it to our result set
      result.push(element);
    }
    // if there are children, check them as well
    return element.childNodes && element.childNodes.length && checkChild(0);
  };
  checkElement(document.body);
  return result;
};

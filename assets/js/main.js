// get the element
var div1 = document.getElementById('one');

// set an event listener for it
div1.addEventListener('click',function(){
//   create a new div
  var div2 =  document.createElement('div');
//   giv that div an id of two
  div2.setAttribute("id", "two");
//   append the new div to the dom
  this.parentNode.appendChild(div2);
//   remove the clicked div
  this.parentNode.removeChild(this);
});
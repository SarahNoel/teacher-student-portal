app.directive("flipPanel",function(){return{restrict:"E",require:"^flip",link:function(n,a,s,e){e.front?e.back?console.error("FLIP: Too many panels."):e.back=a:e.front=a}}}),app.directive("flip",function(n){function a(n,a,s){a&&(n.style.width=a),s&&(n.style.height=s)}return{restrict:"E",controller:function(a,s,e){function i(){o.front.removeClass(n.classNames.hideFront),o.back.addClass(n.classNames.hideBack)}function c(){o.back.removeClass(n.classNames.hideBack),o.front.addClass(n.classNames.hideFront)}e.$observe("flipShow",function(n){"front"===n?i():"back"===n?c():console.warn("FLIP: Unknown side.")});var o=this;o.front=null,o.back=null,o.init=function(){o.front.addClass(n.classNames.panel),o.back.addClass(n.classNames.panel),i(),n.flipsOnClick&&(o.front.on("click",c),o.back.on("click",i))}},link:function(s,e,i,c){var o=i.flipWidth,l=i.flipHeight;e.addClass(n.classNames.base),c.front&&c.back?([e,c.front,c.back].forEach(function(n){a(n[0],o,l)}),c.init()):console.error("FLIP: 2 panels required.")}}});
// app.directive("flipPanel", function() {
//   return {
//     restrict: "E",
//     require: "^flip",
//     link: function(scope, element, attrs, flipCtr) {
//       if (!flipCtr.front) {
//         flipCtr.front = element;
//       } else if (!flipCtr.back) {
//         flipCtr.back = element;
//       } else {
//         console.error("FLIP: Too many panels.");
//       }
//     }
//   };
// });


// app.directive("flip", function(flipConfig) {

//   function setDim(element, width, height) {
//     if (width) {
//       element.style.width = width;
//     }
//     if (height) {
//       element.style.height = height;
//     }
//   }

//   return {
//     restrict: "E",
//     controller: function($scope, $element, $attrs) {

//       $attrs.$observe("flipShow", function(newValue){
//         if(newValue === "front"){
//           showFront();
//         }
//         else if(newValue === "back"){
//           showBack();
//         }
//         else {
//           console.warn("FLIP: Unknown side.");
//         }
//       });

//       var self = this;
//       self.front = null;
//       self.back = null;


//       function showFront() {
//         self.front.removeClass(flipConfig.classNames.hideFront);
//         self.back.addClass(flipConfig.classNames.hideBack);
//       }

//       function showBack() {
//         self.back.removeClass(flipConfig.classNames.hideBack);
//         self.front.addClass(flipConfig.classNames.hideFront);
//       }

//       self.init = function() {
//         self.front.addClass(flipConfig.classNames.panel);
//         self.back.addClass(flipConfig.classNames.panel);

//         showFront();

//         if(flipConfig.flipsOnClick){
//           self.front.on("click", showBack);
//           self.back.on("click", showFront);
//         }
//       };

//     },

//     link: function(scope, element, attrs, ctrl) {

//       var width = attrs.flipWidth,
//         height = attrs.flipHeight;

//       element.addClass(flipConfig.classNames.base);

//       if (ctrl.front && ctrl.back) {
//         [element, ctrl.front, ctrl.back].forEach(function(el) {
//           setDim(el[0], width, height);
//         });
//         ctrl.init();
//       } else {
//         console.error("FLIP: 2 panels required.");
//       }
//     }
//   };

// });

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jQuery UI
================================= */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $window = $(window);
var $document = $(document);
var $contents = $('.contents');
var $moduleSp = $('.module__space');
var $sortSp = $('.build__inner');

var $module = $('.module');

function sizeAppend() {
  var Height = $window.height();
  var mdWidth = $moduleSp.width();
  $contents.css('height', Height);
  $module.css('width', mdWidth);
}

$document.on('ready', function () {
  return sizeAppend();
});
$window.on('load resize', function () {
  return sizeAppend();
});

$module.draggable({
  snap: $sortSp,
  connectToSortable: $sortSp,
  helper: 'clone',
  scroll: false,
  opacity: 0.7
});

$sortSp.droppable({
  accept: $module,
  deactivate: function deactivate(e, ui) {
    var $dropModule = ui.helper;

    $dropModule.addClass('droped');
    $dropModule.append('<i class="fa fa-close"></i>');

    var $closeBtn = ui.helper.children('.fa-close');
    $closeBtn.on('click', function () {
      $dropModule.fadeOut(300, function () {
        $dropModule.remove();
      });
    });
  }
});

$sortSp.sortable({
  // containment: $sortSp,
  opacity: 0.7,
  scroll: false
});

/* ES5 
================================= */
// 'this' is 4 methods.
// 1. callback => method
var myExam_01 = {
  value: 10,
  show: function show() {
    console.log(this.value);
  }
};
myExam_01.show(); // method
// show(); <= function

// 2. callback => function
var myExam_02 = {
  value: 1,
  show: function show() {
    var self = this;
    console.log(self.value);
    function show() {
      console.log(self.value);
    }
    show();
  }
};
myExam_02.show();

// 3. callback => constructor
function MyExam_03(value) {
  this.value = value;
  this.increment = function () {
    this.value++;
  };
}

// this is constructor
var myExam_03 = new MyExam_03(0);

myExam_03.increment();
console.log(myExam_03.value);

// 4. apply, call
var myExam_04 = {
  value: 1,
  show: function show() {
    console.log(this.value);
  },
  add: function add(value1, value2) {
    console.log(this.value + value1 + value2);
  }
};
var yourExam = {
  value: 3
};

myExam_04.show();
myExam_04.show.apply(yourExam);
myExam_04.show.call(yourExam);

myExam_04.add.apply(yourExam, [2, 10]);
myExam_04.add.call(yourExam, 2, 10);

// constructor base study
function Dog(name, cry) {
  // var this = {};
  this.name = name;
  this.bark = function () {
    console.log(cry);
  };
  // return this;
}
var dog = new Dog('mame', 'wow wow');
console.log(dog.name);
dog.bark();

console.log(dog.constructor === Dog);

// prototype base study
// 'function foo...' is class constructor.
function Cat(name, cry) {
  // this.propaty => menber variable(instance variable)
  this.name = name;
  this.cry = cry;
}

// prototype method
Cat.prototype.yourName = function () {
  console.log(this.name);
};
Cat.prototype.bark = function () {
  console.log(this.cry);
};

// creat instance
var tama = new Cat('tama', 'nya');

// access instance's menber variable
console.log(tama.name);
console.log(tama.cry);

// access instance's prototype method
tama.yourName();
tama.bark();

/* ES6
================================ */
// arrow function
$('button').on('click', function (e) {
  return console.log('ok');
});

// class (prototype)

var Human = (function () {
  function Human(message) {
    _classCallCheck(this, Human);

    this.message = message;
  }

  _createClass(Human, [{
    key: 'hello',
    value: function hello() {
      console.log(this.message);
    }
  }]);

  return Human;
})();

var kotaro = new Human('Kotaro');
kotaro.hello();

// promise
new Promise(function (resolve, reject) {
  resolve(10);
}).then(function (value) {
  return value * 10;
}).then(function (value) {
  console.log(value);
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva290YS9hZ2lsZS9qYXZhc2NyaXB0X3N0dWR5L2Rldi9zcmMvZGV2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNFQSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNwQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRWpDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFM0IsU0FBUyxVQUFVLEdBQUc7QUFDcEIsTUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzlCLE1BQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNoQyxXQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNoQyxTQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztDQUMvQjs7QUFFRCxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtTQUFNLFVBQVUsRUFBRTtDQUFBLENBQUUsQ0FBQztBQUMzQyxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRTtTQUFNLFVBQVUsRUFBRTtDQUFBLENBQUUsQ0FBQzs7QUFFL0MsT0FBTyxDQUFDLFNBQVMsQ0FBQztBQUNoQixNQUFJLEVBQUUsT0FBTztBQUNiLG1CQUFpQixFQUFFLE9BQU87QUFDMUIsUUFBTSxFQUFFLE9BQU87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QUFJLENBQUMsQ0FBQztBQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7O0FBR3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNoQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7O0FBUVosQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDO1NBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7Q0FBQSxDQUFDLENBQUM7Ozs7SUFHNUMsS0FBSztBQUNFLFdBRFAsS0FBSyxDQUNHLE9BQU8sRUFBRTswQkFEakIsS0FBSzs7QUFFUCxRQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztHQUN4Qjs7ZUFIRyxLQUFLOztXQUlKLGlCQUFHO0FBQ04sYUFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0I7OztTQU5HLEtBQUs7OztBQVFYLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7O0FBR2YsSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQ3JDLFNBQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUNiLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUU7QUFDdkIsU0FBTyxLQUFLLEdBQUcsRUFBRSxDQUFDO0NBQ25CLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUU7QUFDdkIsU0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNwQixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogalF1ZXJ5IFVJXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xudmFyICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xudmFyICRjb250ZW50cyA9ICQoJy5jb250ZW50cycpO1xudmFyICRtb2R1bGVTcCA9ICQoJy5tb2R1bGVfX3NwYWNlJyk7XG52YXIgJHNvcnRTcCA9ICQoJy5idWlsZF9faW5uZXInKTtcblxudmFyICRtb2R1bGUgPSAkKCcubW9kdWxlJyk7XG5cbmZ1bmN0aW9uIHNpemVBcHBlbmQoKSB7XG4gIHZhciBIZWlnaHQgPSAkd2luZG93LmhlaWdodCgpO1xuICB2YXIgbWRXaWR0aCA9ICRtb2R1bGVTcC53aWR0aCgpO1xuICAkY29udGVudHMuY3NzKCdoZWlnaHQnLCBIZWlnaHQpO1xuICAkbW9kdWxlLmNzcygnd2lkdGgnLCBtZFdpZHRoKTtcbn1cblxuJGRvY3VtZW50Lm9uKCdyZWFkeScsICgpID0+IHNpemVBcHBlbmQoKSApO1xuJHdpbmRvdy5vbignbG9hZCByZXNpemUnLCAoKSA9PiBzaXplQXBwZW5kKCkgKTtcblxuJG1vZHVsZS5kcmFnZ2FibGUoe1xuICBzbmFwOiAkc29ydFNwLFxuICBjb25uZWN0VG9Tb3J0YWJsZTogJHNvcnRTcCxcbiAgaGVscGVyOiAnY2xvbmUnLFxuICBzY3JvbGw6IGZhbHNlLFxuICBvcGFjaXR5OiAwLjdcbn0pO1xuXG4kc29ydFNwLmRyb3BwYWJsZSh7XG4gIGFjY2VwdDogJG1vZHVsZSxcbiAgZGVhY3RpdmF0ZTogZnVuY3Rpb24oZSwgdWkpIHtcbiAgICB2YXIgJGRyb3BNb2R1bGUgPSB1aS5oZWxwZXI7XG5cbiAgICAkZHJvcE1vZHVsZS5hZGRDbGFzcygnZHJvcGVkJyk7XG4gICAgJGRyb3BNb2R1bGUuYXBwZW5kKCc8aSBjbGFzcz1cImZhIGZhLWNsb3NlXCI+PC9pPicpO1xuXG4gICAgdmFyICRjbG9zZUJ0biA9IHVpLmhlbHBlci5jaGlsZHJlbignLmZhLWNsb3NlJyk7XG4gICAgJGNsb3NlQnRuLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICRkcm9wTW9kdWxlLmZhZGVPdXQoMzAwLCAoKSA9PiB7XG4gICAgICAgICRkcm9wTW9kdWxlLnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgfVxufSk7XG5cbiRzb3J0U3Auc29ydGFibGUoe1xuICAvLyBjb250YWlubWVudDogJHNvcnRTcCxcbiAgb3BhY2l0eTogMC43LFxuICBzY3JvbGw6IGZhbHNlXG59KTtcblxuXG4vKiBFUzUgXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbi8vICd0aGlzJyBpcyA0IG1ldGhvZHMuXG4vLyAxLiBjYWxsYmFjayA9PiBtZXRob2RcbnZhciBteUV4YW1fMDEgPSB7XG4gIHZhbHVlOiAxMCxcbiAgc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2codGhpcy52YWx1ZSk7XG4gIH1cbn07XG5teUV4YW1fMDEuc2hvdygpOyAvLyBtZXRob2Rcbi8vIHNob3coKTsgPD0gZnVuY3Rpb25cblxuLy8gMi4gY2FsbGJhY2sgPT4gZnVuY3Rpb25cbnZhciBteUV4YW1fMDIgPSB7XG4gIHZhbHVlOiAxLFxuICBzaG93OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgY29uc29sZS5sb2coc2VsZi52YWx1ZSk7XG4gICAgZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgIGNvbnNvbGUubG9nKHNlbGYudmFsdWUpO1xuICAgIH1cbiAgICBzaG93KCk7XG4gIH1cbn07XG5teUV4YW1fMDIuc2hvdygpO1xuXG4vLyAzLiBjYWxsYmFjayA9PiBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gTXlFeGFtXzAzKHZhbHVlKSB7XG4gIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgdGhpcy5pbmNyZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnZhbHVlKys7XG4gIH1cbn1cblxuLy8gdGhpcyBpcyBjb25zdHJ1Y3RvclxudmFyIG15RXhhbV8wMyA9IG5ldyBNeUV4YW1fMDMoMCk7XG5cbm15RXhhbV8wMy5pbmNyZW1lbnQoKTtcbmNvbnNvbGUubG9nKG15RXhhbV8wMy52YWx1ZSk7XG5cbi8vIDQuIGFwcGx5LCBjYWxsXG52YXIgbXlFeGFtXzA0ID0ge1xuICB2YWx1ZTogMSxcbiAgc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2codGhpcy52YWx1ZSk7XG4gIH0sXG4gIGFkZDogZnVuY3Rpb24odmFsdWUxLCB2YWx1ZTIpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnZhbHVlICsgdmFsdWUxICsgdmFsdWUyKTtcbiAgfVxufTtcbnZhciB5b3VyRXhhbSA9IHtcbiAgdmFsdWU6IDNcbn07XG5cbm15RXhhbV8wNC5zaG93KCk7XG5teUV4YW1fMDQuc2hvdy5hcHBseSh5b3VyRXhhbSk7XG5teUV4YW1fMDQuc2hvdy5jYWxsKHlvdXJFeGFtKTtcblxubXlFeGFtXzA0LmFkZC5hcHBseSh5b3VyRXhhbSwgWzIsIDEwXSk7XG5teUV4YW1fMDQuYWRkLmNhbGwoeW91ckV4YW0sIDIsIDEwKTtcblxuXG4vLyBjb25zdHJ1Y3RvciBiYXNlIHN0dWR5XG5mdW5jdGlvbiBEb2cobmFtZSwgY3J5KSB7XG4gIC8vIHZhciB0aGlzID0ge307XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuYmFyayA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKGNyeSk7XG4gIH07XG4gIC8vIHJldHVybiB0aGlzO1xufVxudmFyIGRvZyA9IG5ldyBEb2coJ21hbWUnLCAnd293IHdvdycpO1xuY29uc29sZS5sb2coZG9nLm5hbWUpO1xuZG9nLmJhcmsoKTtcblxuY29uc29sZS5sb2coZG9nLmNvbnN0cnVjdG9yID09PSBEb2cpO1xuXG4vLyBwcm90b3R5cGUgYmFzZSBzdHVkeVxuLy8gJ2Z1bmN0aW9uIGZvby4uLicgaXMgY2xhc3MgY29uc3RydWN0b3IuXG5mdW5jdGlvbiBDYXQobmFtZSwgY3J5KSB7XG4gIC8vIHRoaXMucHJvcGF0eSA9PiBtZW5iZXIgdmFyaWFibGUoaW5zdGFuY2UgdmFyaWFibGUpXG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuY3J5ID0gY3J5O1xufVxuXG4vLyBwcm90b3R5cGUgbWV0aG9kXG5DYXQucHJvdG90eXBlLnlvdXJOYW1lID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKHRoaXMubmFtZSk7XG59XG5DYXQucHJvdG90eXBlLmJhcmsgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2codGhpcy5jcnkpO1xufTtcblxuLy8gY3JlYXQgaW5zdGFuY2VcbnZhciB0YW1hID0gbmV3IENhdCgndGFtYScsJ255YScpO1xuXG4vLyBhY2Nlc3MgaW5zdGFuY2UncyBtZW5iZXIgdmFyaWFibGVcbmNvbnNvbGUubG9nKHRhbWEubmFtZSk7XG5jb25zb2xlLmxvZyh0YW1hLmNyeSk7XG5cbi8vIGFjY2VzcyBpbnN0YW5jZSdzIHByb3RvdHlwZSBtZXRob2RcbnRhbWEueW91ck5hbWUoKTtcbnRhbWEuYmFyaygpO1xuXG5cblxuXG4vKiBFUzZcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG4vLyBhcnJvdyBmdW5jdGlvblxuJCgnYnV0dG9uJykub24oJ2NsaWNrJywgKGUpID0+IGNvbnNvbGUubG9nKCdvaycpKTtcblxuLy8gY2xhc3MgKHByb3RvdHlwZSlcbmNsYXNzIEh1bWFuIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cbiAgaGVsbG8oKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5tZXNzYWdlKTtcbiAgfVxufVxudmFyIGtvdGFybyA9IG5ldyBIdW1hbignS290YXJvJyk7XG5rb3Rhcm8uaGVsbG8oKTtcblxuLy8gcHJvbWlzZVxubmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICByZXNvbHZlKDEwKTtcbn0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAqIDEwO1xufSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgY29uc29sZS5sb2codmFsdWUpO1xufSk7Il19

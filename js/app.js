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
  $contents.css('height', Height / 2 + 'px');
  $module.css('width', mdWidth + 'px');
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
  accept: $module
});

$sortSp.on('dropdeactivate', function (e, ui) {
  var $dropModule = ui.helper;

  $dropModule.addClass('droped');
  $dropModule.append('<i class="fa fa-close"></i>');

  var $closeBtn = ui.helper.children('.fa-close');
  $closeBtn.on('click', function () {
    $dropModule.fadeOut(300, function () {
      $dropModule.remove();
    });
  });
});

$sortSp.sortable({
  // containment: $sortSp,
  opacity: 0.7,
  scroll: false
});

/* validation study (ES6)
================================= */

var ValidateModel = (function () {
  // observer

  function ValidateModel(attrs) {
    _classCallCheck(this, ValidateModel);

    this.val = '';
    this.attrs = {
      required: attrs.required || false,
      maxlength: attrs.maxlength || 8,
      minlength: attrs.minlength || 4
    };
    this.listeners = {
      valid: [],
      invalid: []
    };
  }

  // compare argument val and this.val

  _createClass(ValidateModel, [{
    key: 'set',
    value: function set(val) {
      // no chnage => return
      if (this.val === val) return;
      // changed => it substitutes arg val to this.val
      this.val = val;
      this.validate();
    }
  }, {
    key: 'validate',
    value: function validate() {
      var val;
      this.errors = [];

      for (var key in this.attrs) {
        val = this.attrs[key];
        if (val && !this[key](val)) this.errors.push(key);
      }
      this.trigger(!this.errors.length ? 'valid' : 'invalid');
    }

    // add listeners to event funciton
  }, {
    key: 'on',
    value: function on(event, func) {
      this.listeners[event].push(func);
    }

    // iterative prossesing foreach listeners
  }, {
    key: 'trigger',
    value: function trigger(event) {
      $.each(this.listeners[event], function () {
        this();
      });
    }

    // determines whether this.val and null
  }, {
    key: 'required',
    value: function required() {
      return this.val !== '';
    }
  }, {
    key: 'maxlength',
    value: function maxlength(num) {
      return num >= this.val.length;
    }
  }, {
    key: 'minlength',
    value: function minlength(num) {
      return num <= this.val.length;
    }
  }]);

  return ValidateModel;
})();

var ValidateView = (function () {
  function ValidateView(el) {
    _classCallCheck(this, ValidateView);

    this.initialize(el);
    this.handleEvents();
  }

  _createClass(ValidateView, [{
    key: 'initialize',
    value: function initialize(el) {
      this.$el = $(el);
      this.$list = this.$el.next().children();

      var obj = this.$el.data();

      if (this.$el.prop('required')) {
        obj['required'] = true;
      }
      this.model = new ValidateModel(obj);
    }
  }, {
    key: 'handleEvents',
    value: function handleEvents() {
      var self = this;

      this.$el.on('keyup', function (e) {
        self.onKeyup(e);
      });

      this.model.on('invalid', function () {
        self.onValid();
      });
      this.model.on('invalid', function () {
        self.onInvalid();
      });
    }
  }, {
    key: 'onKeyup',
    value: function onKeyup(e) {
      var $target = $(e.currentTarget);
      this.model.set($target.val());
    }
  }, {
    key: 'onValid',
    value: function onValid() {
      this.$el.removeClass('error');
      this.$list.hide();
    }
  }, {
    key: 'onInvalid',
    value: function onInvalid() {
      var self = this;
      this.$el.addClass('error');
      this.$list.hide();

      $.each(this.model.errors, function (index, val) {
        self.$list.filter('[data-error=\'' + val + '\']').show();
      });
    }
  }]);

  return ValidateView;
})();

$('input').each(function () {
  new ValidateView('input');
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

// each forEach
$(function () {
  var arr = [1, 2, 3, 4, 5];
  $.each(arr, function () {
    console.log(undefined);
  });

  arr.forEach(function (val) {
    console.log(undefined);
  });
});

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva290YS9hZ2lsZS9qYXZhc2NyaXB0X3N0dWR5L2Rldi9zcmMvZGV2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNFQSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNwQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRWpDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFM0IsU0FBUyxVQUFVLEdBQUc7QUFDcEIsTUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzlCLE1BQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNoQyxXQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzNDLFNBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztDQUN0Qzs7QUFFRCxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtTQUFNLFVBQVUsRUFBRTtDQUFBLENBQUUsQ0FBQztBQUMzQyxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRTtTQUFNLFVBQVUsRUFBRTtDQUFBLENBQUUsQ0FBQzs7QUFFL0MsT0FBTyxDQUFDLFNBQVMsQ0FBQztBQUNoQixNQUFJLEVBQUUsT0FBTztBQUNiLG1CQUFpQixFQUFFLE9BQU87QUFDMUIsUUFBTSxFQUFFLE9BQU87QUFDZixRQUFNLEVBQUUsS0FBSztBQUNiLFNBQU8sRUFBRSxHQUFHO0NBQ2IsQ0FBQyxDQUFDOztBQUVILE9BQU8sQ0FBQyxTQUFTLENBQUM7QUFDaEIsUUFBTSxFQUFFLE9BQU87Q0FDaEIsQ0FBQyxDQUFDOztBQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFLO0FBQ3BDLE1BQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7O0FBRTVCLGFBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsYUFBVyxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDOztBQUVsRCxNQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNoRCxXQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFNO0FBQzFCLGVBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFlBQU07QUFDN0IsaUJBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN0QixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDTixDQUFDLENBQUM7O0FBRUgsT0FBTyxDQUFDLFFBQVEsQ0FBQzs7QUFFZixTQUFPLEVBQUUsR0FBRztBQUNaLFFBQU0sRUFBRSxLQUFLO0NBQ2QsQ0FBQyxDQUFDOzs7OztJQUlHLGFBQWE7OztBQUVOLFdBRlAsYUFBYSxDQUVMLEtBQUssRUFBRTswQkFGZixhQUFhOztBQUdmLFFBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2QsUUFBSSxDQUFDLEtBQUssR0FBRztBQUNYLGNBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUs7QUFDakMsZUFBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLElBQUksQ0FBQztBQUMvQixlQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDO0tBQ2hDLENBQUM7QUFDRixRQUFJLENBQUMsU0FBUyxHQUFHO0FBQ2YsV0FBSyxFQUFFLEVBQUU7QUFDVCxhQUFPLEVBQUUsRUFBRTtLQUNaLENBQUM7R0FDSDs7OztlQWJHLGFBQWE7O1dBZWQsYUFBQyxHQUFHLEVBQUU7O0FBRVAsVUFBRyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRyxPQUFPOztBQUU3QixVQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNmLFVBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNqQjs7O1dBQ08sb0JBQUc7QUFDVCxVQUFJLEdBQUcsQ0FBQztBQUNSLFVBQUksQ0FBQyxNQUFNLEdBQUUsRUFBRSxDQUFDOztBQUVoQixXQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDM0IsV0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEIsWUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDbkQ7QUFDRCxVQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0tBQ3pEOzs7OztXQUVDLFlBQUMsS0FBSyxFQUFFLElBQUksRUFBRTtBQUNkLFVBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xDOzs7OztXQUVNLGlCQUFDLEtBQUssRUFBRTtBQUNiLE9BQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxZQUFZO0FBQ3hDLFlBQUksRUFBRSxDQUFDO09BQ1IsQ0FBQyxDQUFDO0tBQ0o7Ozs7O1dBRU8sb0JBQUc7QUFDVCxhQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDO0tBQ3hCOzs7V0FDUSxtQkFBQyxHQUFHLEVBQUU7QUFDYixhQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztLQUMvQjs7O1dBQ1EsbUJBQUMsR0FBRyxFQUFFO0FBQ2IsYUFBTyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7S0FDL0I7OztTQW5ERyxhQUFhOzs7SUFzRGIsWUFBWTtBQUNMLFdBRFAsWUFBWSxDQUNKLEVBQUUsRUFBRTswQkFEWixZQUFZOztBQUVkLFFBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEIsUUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0dBQ3JCOztlQUpHLFlBQVk7O1dBS04sb0JBQUMsRUFBRSxFQUFFO0FBQ2IsVUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDakIsVUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOztBQUV4QyxVQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUUxQixVQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQzdCLFdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7T0FDeEI7QUFDRCxVQUFJLENBQUMsS0FBSyxHQUFHLElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3JDOzs7V0FDVyx3QkFBRztBQUNiLFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFaEIsVUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQyxFQUFLO0FBQzFCLFlBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDakIsQ0FBQyxDQUFDOztBQUVILFVBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFNO0FBQzdCLFlBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztPQUNoQixDQUFDLENBQUM7QUFDSCxVQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBTTtBQUM3QixZQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7T0FDbEIsQ0FBQyxDQUFDO0tBQ0o7OztXQUNNLGlCQUFDLENBQUMsRUFBRTtBQUNULFVBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDakMsVUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDL0I7OztXQUNNLG1CQUFHO0FBQ1IsVUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUIsVUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNuQjs7O1dBQ1EscUJBQUc7QUFDVixVQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsVUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsVUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFbEIsT0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQUssRUFBRSxHQUFHLEVBQUs7QUFDeEMsWUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO09BQzFELENBQUMsQ0FBQztLQUNKOzs7U0E5Q0csWUFBWTs7O0FBaURsQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQU07QUFDcEIsTUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDM0IsQ0FBQyxDQUFDOzs7Ozs7QUFPSCxJQUFJLFNBQVMsR0FBRztBQUNkLE9BQUssRUFBRSxFQUFFO0FBQ1QsTUFBSSxFQUFFLGdCQUFXO0FBQ2YsV0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDekI7Q0FDRixDQUFDO0FBQ0YsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDOzs7O0FBSWpCLElBQUksU0FBUyxHQUFHO0FBQ2QsT0FBSyxFQUFFLENBQUM7QUFDUixNQUFJLEVBQUUsZ0JBQVc7QUFDZixRQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsV0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEIsYUFBUyxJQUFJLEdBQUc7QUFDZCxhQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6QjtBQUNELFFBQUksRUFBRSxDQUFDO0dBQ1I7Q0FDRixDQUFDO0FBQ0YsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDOzs7QUFHakIsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFO0FBQ3hCLE1BQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLE1BQUksQ0FBQyxTQUFTLEdBQUcsWUFBVztBQUMxQixRQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7R0FDZCxDQUFBO0NBQ0Y7OztBQUdELElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVqQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7OztBQUc3QixJQUFJLFNBQVMsR0FBRztBQUNkLE9BQUssRUFBRSxDQUFDO0FBQ1IsTUFBSSxFQUFFLGdCQUFXO0FBQ2YsV0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDekI7QUFDRCxLQUFHLEVBQUUsYUFBUyxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQzVCLFdBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUM7R0FDM0M7Q0FDRixDQUFDO0FBQ0YsSUFBSSxRQUFRLEdBQUc7QUFDYixPQUFLLEVBQUUsQ0FBQztDQUNULENBQUM7O0FBRUYsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUU5QixTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN2QyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7QUFJcEMsU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTs7QUFFdEIsTUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsTUFBSSxDQUFDLElBQUksR0FBRyxZQUFXO0FBQ3JCLFdBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7R0FDbEIsQ0FBQzs7Q0FFSDtBQUNELElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxLQUFLLEdBQUcsQ0FBQyxDQUFDOzs7O0FBSXJDLFNBQVMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7O0FBRXRCLE1BQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLE1BQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0NBQ2hCOzs7QUFHRCxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxZQUFXO0FBQ2xDLFNBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3hCLENBQUE7QUFDRCxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxZQUFXO0FBQzlCLFNBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3ZCLENBQUM7OztBQUdGLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBQyxLQUFLLENBQUMsQ0FBQzs7O0FBR2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7QUFHdEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2hCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O0FBR1osQ0FBQyxDQUFDLFlBQU07QUFDTixNQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUN0QixHQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxZQUFNO0FBQ2hCLFdBQU8sQ0FBQyxHQUFHLFdBQU0sQ0FBQztHQUNuQixDQUFDLENBQUM7O0FBRUgsS0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBSztBQUNuQixXQUFPLENBQUMsR0FBRyxXQUFNLENBQUM7R0FDbkIsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDOzs7OztBQU1ILENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQztTQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0NBQUEsQ0FBQyxDQUFDOzs7O0lBRzVDLEtBQUs7QUFDRSxXQURQLEtBQUssQ0FDRyxPQUFPLEVBQUU7MEJBRGpCLEtBQUs7O0FBRVAsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7R0FDeEI7O2VBSEcsS0FBSzs7V0FJSixpQkFBRztBQUNOLGFBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzNCOzs7U0FORyxLQUFLOzs7QUFRWCxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7OztBQUdmLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUNyQyxTQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDYixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFO0FBQ3ZCLFNBQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQztDQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFO0FBQ3ZCLFNBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDcEIsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGpRdWVyeSBVSVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG52YXIgJHdpbmRvdyA9ICQod2luZG93KTtcbnZhciAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcbnZhciAkY29udGVudHMgPSAkKCcuY29udGVudHMnKTtcbnZhciAkbW9kdWxlU3AgPSAkKCcubW9kdWxlX19zcGFjZScpO1xudmFyICRzb3J0U3AgPSAkKCcuYnVpbGRfX2lubmVyJyk7XG5cbnZhciAkbW9kdWxlID0gJCgnLm1vZHVsZScpO1xuXG5mdW5jdGlvbiBzaXplQXBwZW5kKCkge1xuICB2YXIgSGVpZ2h0ID0gJHdpbmRvdy5oZWlnaHQoKTtcbiAgdmFyIG1kV2lkdGggPSAkbW9kdWxlU3Aud2lkdGgoKTtcbiAgJGNvbnRlbnRzLmNzcygnaGVpZ2h0JywgSGVpZ2h0IC8gMiArICdweCcpO1xuICAkbW9kdWxlLmNzcygnd2lkdGgnLCBtZFdpZHRoICsgJ3B4Jyk7XG59XG5cbiRkb2N1bWVudC5vbigncmVhZHknLCAoKSA9PiBzaXplQXBwZW5kKCkgKTtcbiR3aW5kb3cub24oJ2xvYWQgcmVzaXplJywgKCkgPT4gc2l6ZUFwcGVuZCgpICk7XG5cbiRtb2R1bGUuZHJhZ2dhYmxlKHtcbiAgc25hcDogJHNvcnRTcCxcbiAgY29ubmVjdFRvU29ydGFibGU6ICRzb3J0U3AsXG4gIGhlbHBlcjogJ2Nsb25lJyxcbiAgc2Nyb2xsOiBmYWxzZSxcbiAgb3BhY2l0eTogMC43XG59KTtcblxuJHNvcnRTcC5kcm9wcGFibGUoe1xuICBhY2NlcHQ6ICRtb2R1bGVcbn0pO1xuXG4kc29ydFNwLm9uKCdkcm9wZGVhY3RpdmF0ZScsIChlLCB1aSkgPT4ge1xuICAgIHZhciAkZHJvcE1vZHVsZSA9IHVpLmhlbHBlcjtcblxuICAgICRkcm9wTW9kdWxlLmFkZENsYXNzKCdkcm9wZWQnKTtcbiAgICAkZHJvcE1vZHVsZS5hcHBlbmQoJzxpIGNsYXNzPVwiZmEgZmEtY2xvc2VcIj48L2k+Jyk7XG5cbiAgICB2YXIgJGNsb3NlQnRuID0gdWkuaGVscGVyLmNoaWxkcmVuKCcuZmEtY2xvc2UnKTtcbiAgICAkY2xvc2VCdG4ub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgJGRyb3BNb2R1bGUuZmFkZU91dCgzMDAsICgpID0+IHtcbiAgICAgICAgJGRyb3BNb2R1bGUucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbn0pO1xuXG4kc29ydFNwLnNvcnRhYmxlKHtcbiAgLy8gY29udGFpbm1lbnQ6ICRzb3J0U3AsXG4gIG9wYWNpdHk6IDAuNyxcbiAgc2Nyb2xsOiBmYWxzZVxufSk7XG5cbi8qIHZhbGlkYXRpb24gc3R1ZHkgKEVTNilcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuY2xhc3MgVmFsaWRhdGVNb2RlbCB7XG4gIC8vIG9ic2VydmVyXG4gIGNvbnN0cnVjdG9yKGF0dHJzKSB7XG4gICAgdGhpcy52YWwgPSAnJztcbiAgICB0aGlzLmF0dHJzID0ge1xuICAgICAgcmVxdWlyZWQ6IGF0dHJzLnJlcXVpcmVkIHx8IGZhbHNlLFxuICAgICAgbWF4bGVuZ3RoOiBhdHRycy5tYXhsZW5ndGggfHwgOCxcbiAgICAgIG1pbmxlbmd0aDogYXR0cnMubWlubGVuZ3RoIHx8IDRcbiAgICB9O1xuICAgIHRoaXMubGlzdGVuZXJzID0ge1xuICAgICAgdmFsaWQ6IFtdLFxuICAgICAgaW52YWxpZDogW11cbiAgICB9O1xuICB9XG4gIC8vIGNvbXBhcmUgYXJndW1lbnQgdmFsIGFuZCB0aGlzLnZhbFxuICBzZXQodmFsKSB7XG4gICAgLy8gbm8gY2huYWdlID0+IHJldHVyblxuICAgIGlmKHRoaXMudmFsID09PSB2YWwgKSByZXR1cm47XG4gICAgLy8gY2hhbmdlZCA9PiBpdCBzdWJzdGl0dXRlcyBhcmcgdmFsIHRvIHRoaXMudmFsXG4gICAgdGhpcy52YWwgPSB2YWw7XG4gICAgdGhpcy52YWxpZGF0ZSgpO1xuICB9XG4gIHZhbGlkYXRlKCkge1xuICAgIHZhciB2YWw7XG4gICAgdGhpcy5lcnJvcnMgPVtdO1xuXG4gICAgZm9yICggdmFyIGtleSBpbiB0aGlzLmF0dHJzKSB7XG4gICAgICB2YWwgPSB0aGlzLmF0dHJzW2tleV07XG4gICAgICBpZiAodmFsICYmICF0aGlzW2tleV0odmFsKSkgdGhpcy5lcnJvcnMucHVzaChrZXkpO1xuICAgIH1cbiAgICB0aGlzLnRyaWdnZXIoIXRoaXMuZXJyb3JzLmxlbmd0aCA/ICd2YWxpZCcgOiAnaW52YWxpZCcpO1xuICB9XG4gIC8vIGFkZCBsaXN0ZW5lcnMgdG8gZXZlbnQgZnVuY2l0b25cbiAgb24oZXZlbnQsIGZ1bmMpIHtcbiAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0ucHVzaChmdW5jKTtcbiAgfVxuICAvLyBpdGVyYXRpdmUgcHJvc3Nlc2luZyBmb3JlYWNoIGxpc3RlbmVyc1xuICB0cmlnZ2VyKGV2ZW50KSB7XG4gICAgJC5lYWNoKHRoaXMubGlzdGVuZXJzW2V2ZW50XSwgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcygpO1xuICAgIH0pO1xuICB9XG4gIC8vIGRldGVybWluZXMgd2hldGhlciB0aGlzLnZhbCBhbmQgbnVsbFxuICByZXF1aXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy52YWwgIT09ICcnO1xuICB9XG4gIG1heGxlbmd0aChudW0pIHtcbiAgICByZXR1cm4gbnVtID49IHRoaXMudmFsLmxlbmd0aDtcbiAgfVxuICBtaW5sZW5ndGgobnVtKSB7XG4gICAgcmV0dXJuIG51bSA8PSB0aGlzLnZhbC5sZW5ndGg7XG4gIH1cbn1cblxuY2xhc3MgVmFsaWRhdGVWaWV3IHtcbiAgY29uc3RydWN0b3IoZWwpIHtcbiAgICB0aGlzLmluaXRpYWxpemUoZWwpO1xuICAgIHRoaXMuaGFuZGxlRXZlbnRzKCk7XG4gIH1cbiAgaW5pdGlhbGl6ZShlbCkge1xuICAgIHRoaXMuJGVsID0gJChlbCk7XG4gICAgdGhpcy4kbGlzdCA9IHRoaXMuJGVsLm5leHQoKS5jaGlsZHJlbigpO1xuXG4gICAgdmFyIG9iaiA9IHRoaXMuJGVsLmRhdGEoKTtcblxuICAgIGlmICh0aGlzLiRlbC5wcm9wKCdyZXF1aXJlZCcpKSB7XG4gICAgICBvYmpbJ3JlcXVpcmVkJ10gPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLm1vZGVsID0gbmV3IFZhbGlkYXRlTW9kZWwob2JqKTtcbiAgfVxuICBoYW5kbGVFdmVudHMoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy4kZWwub24oJ2tleXVwJywgKGUpID0+IHtcbiAgICAgIHNlbGYub25LZXl1cChlKTtcbiAgICB9KTtcblxuICAgIHRoaXMubW9kZWwub24oJ2ludmFsaWQnLCAoKSA9PiB7XG4gICAgICBzZWxmLm9uVmFsaWQoKTtcbiAgICB9KTtcbiAgICB0aGlzLm1vZGVsLm9uKCdpbnZhbGlkJywgKCkgPT4ge1xuICAgICAgc2VsZi5vbkludmFsaWQoKTtcbiAgICB9KTtcbiAgfVxuICBvbktleXVwKGUpIHtcbiAgICB2YXIgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICB0aGlzLm1vZGVsLnNldCgkdGFyZ2V0LnZhbCgpKTtcbiAgfVxuICBvblZhbGlkKCkge1xuICAgIHRoaXMuJGVsLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgIHRoaXMuJGxpc3QuaGlkZSgpO1xuICB9XG4gIG9uSW52YWxpZCgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy4kZWwuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgdGhpcy4kbGlzdC5oaWRlKCk7XG5cbiAgICAkLmVhY2godGhpcy5tb2RlbC5lcnJvcnMsIChpbmRleCwgdmFsKSA9PiB7XG4gICAgICBzZWxmLiRsaXN0LmZpbHRlcignW2RhdGEtZXJyb3I9XFwnJyArIHZhbCArICdcXCddJykuc2hvdygpO1xuICAgIH0pO1xuICB9XG59XG5cbiQoJ2lucHV0JykuZWFjaCgoKSA9PiB7XG4gIG5ldyBWYWxpZGF0ZVZpZXcoJ2lucHV0Jyk7XG59KTtcblxuXG4vKiBFUzUgXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbi8vICd0aGlzJyBpcyA0IG1ldGhvZHMuXG4vLyAxLiBjYWxsYmFjayA9PiBtZXRob2RcbnZhciBteUV4YW1fMDEgPSB7XG4gIHZhbHVlOiAxMCxcbiAgc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2codGhpcy52YWx1ZSk7XG4gIH1cbn07XG5teUV4YW1fMDEuc2hvdygpOyAvLyBtZXRob2Rcbi8vIHNob3coKTsgPD0gZnVuY3Rpb25cblxuLy8gMi4gY2FsbGJhY2sgPT4gZnVuY3Rpb25cbnZhciBteUV4YW1fMDIgPSB7XG4gIHZhbHVlOiAxLFxuICBzaG93OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgY29uc29sZS5sb2coc2VsZi52YWx1ZSk7XG4gICAgZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgIGNvbnNvbGUubG9nKHNlbGYudmFsdWUpO1xuICAgIH1cbiAgICBzaG93KCk7XG4gIH1cbn07XG5teUV4YW1fMDIuc2hvdygpO1xuXG4vLyAzLiBjYWxsYmFjayA9PiBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gTXlFeGFtXzAzKHZhbHVlKSB7XG4gIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgdGhpcy5pbmNyZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnZhbHVlKys7XG4gIH1cbn1cblxuLy8gdGhpcyBpcyBjb25zdHJ1Y3RvclxudmFyIG15RXhhbV8wMyA9IG5ldyBNeUV4YW1fMDMoMCk7XG5cbm15RXhhbV8wMy5pbmNyZW1lbnQoKTtcbmNvbnNvbGUubG9nKG15RXhhbV8wMy52YWx1ZSk7XG5cbi8vIDQuIGFwcGx5LCBjYWxsXG52YXIgbXlFeGFtXzA0ID0ge1xuICB2YWx1ZTogMSxcbiAgc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2codGhpcy52YWx1ZSk7XG4gIH0sXG4gIGFkZDogZnVuY3Rpb24odmFsdWUxLCB2YWx1ZTIpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnZhbHVlICsgdmFsdWUxICsgdmFsdWUyKTtcbiAgfVxufTtcbnZhciB5b3VyRXhhbSA9IHtcbiAgdmFsdWU6IDNcbn07XG5cbm15RXhhbV8wNC5zaG93KCk7XG5teUV4YW1fMDQuc2hvdy5hcHBseSh5b3VyRXhhbSk7XG5teUV4YW1fMDQuc2hvdy5jYWxsKHlvdXJFeGFtKTtcblxubXlFeGFtXzA0LmFkZC5hcHBseSh5b3VyRXhhbSwgWzIsIDEwXSk7XG5teUV4YW1fMDQuYWRkLmNhbGwoeW91ckV4YW0sIDIsIDEwKTtcblxuXG4vLyBjb25zdHJ1Y3RvciBiYXNlIHN0dWR5XG5mdW5jdGlvbiBEb2cobmFtZSwgY3J5KSB7XG4gIC8vIHZhciB0aGlzID0ge307XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuYmFyayA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKGNyeSk7XG4gIH07XG4gIC8vIHJldHVybiB0aGlzO1xufVxudmFyIGRvZyA9IG5ldyBEb2coJ21hbWUnLCAnd293IHdvdycpO1xuY29uc29sZS5sb2coZG9nLm5hbWUpO1xuZG9nLmJhcmsoKTtcblxuY29uc29sZS5sb2coZG9nLmNvbnN0cnVjdG9yID09PSBEb2cpO1xuXG4vLyBwcm90b3R5cGUgYmFzZSBzdHVkeVxuLy8gJ2Z1bmN0aW9uIGZvby4uLicgaXMgY2xhc3MgY29uc3RydWN0b3IuXG5mdW5jdGlvbiBDYXQobmFtZSwgY3J5KSB7XG4gIC8vIHRoaXMucHJvcGF0eSA9PiBtZW5iZXIgdmFyaWFibGUoaW5zdGFuY2UgdmFyaWFibGUpXG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuY3J5ID0gY3J5O1xufVxuXG4vLyBwcm90b3R5cGUgbWV0aG9kXG5DYXQucHJvdG90eXBlLnlvdXJOYW1lID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKHRoaXMubmFtZSk7XG59XG5DYXQucHJvdG90eXBlLmJhcmsgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2codGhpcy5jcnkpO1xufTtcblxuLy8gY3JlYXQgaW5zdGFuY2VcbnZhciB0YW1hID0gbmV3IENhdCgndGFtYScsJ255YScpO1xuXG4vLyBhY2Nlc3MgaW5zdGFuY2UncyBtZW5iZXIgdmFyaWFibGVcbmNvbnNvbGUubG9nKHRhbWEubmFtZSk7XG5jb25zb2xlLmxvZyh0YW1hLmNyeSk7XG5cbi8vIGFjY2VzcyBpbnN0YW5jZSdzIHByb3RvdHlwZSBtZXRob2RcbnRhbWEueW91ck5hbWUoKTtcbnRhbWEuYmFyaygpO1xuXG4vLyBlYWNoIGZvckVhY2hcbiQoKCkgPT4ge1xuICB2YXIgYXJyID0gWzEsMiwzLDQsNV07XG4gICQuZWFjaChhcnIsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgfSk7XG5cbiAgYXJyLmZvckVhY2goKHZhbCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICB9KTtcbn0pO1xuXG5cbi8qIEVTNlxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbi8vIGFycm93IGZ1bmN0aW9uXG4kKCdidXR0b24nKS5vbignY2xpY2snLCAoZSkgPT4gY29uc29sZS5sb2coJ29rJykpO1xuXG4vLyBjbGFzcyAocHJvdG90eXBlKVxuY2xhc3MgSHVtYW4ge1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgfVxuICBoZWxsbygpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm1lc3NhZ2UpO1xuICB9XG59XG52YXIga290YXJvID0gbmV3IEh1bWFuKCdLb3Rhcm8nKTtcbmtvdGFyby5oZWxsbygpO1xuXG4vLyBwcm9taXNlXG5uZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gIHJlc29sdmUoMTApO1xufSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICogMTA7XG59KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICBjb25zb2xlLmxvZyh2YWx1ZSk7XG59KTsiXX0=

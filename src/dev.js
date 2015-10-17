/* jQuery UI
================================= */
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

$document.on('ready', () => sizeAppend() );
$window.on('load resize', () => sizeAppend() );

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

$sortSp.on('dropdeactivate', (e, ui) => {
    var $dropModule = ui.helper;

    $dropModule.addClass('droped');
    $dropModule.append('<i class="fa fa-close"></i>');

    var $closeBtn = ui.helper.children('.fa-close');
    $closeBtn.on('click', () => {
      $dropModule.fadeOut(300, () => {
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
class ValidateModel {
  // observer
  constructor(attrs) {
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
  set(val) {
    // no chnage => return
    if(this.val === val ) return;
    // changed => it substitutes arg val to this.val
    this.val = val;
    this.validate();
  }
  validate() {
    var val;
    this.errors =[];

    for ( var key in this.attrs) {
      val = this.attrs[key];
      if (val && !this[key](val)) this.errors.push(key);
    }
    this.trigger(!this.errors.length ? 'valid' : 'invalid');
  }
  // add listeners to event funciton
  on(event, func) {
    this.listeners[event].push(func);
  }
  // iterative prossesing foreach listeners
  trigger(event) {
    $.each(this.listeners[event], function () {
      this();
    });
  }
  // determines whether this.val and null
  required() {
    return this.val !== '';
  }
  maxlength(num) {
    return num >= this.val.length;
  }
  minlength(num) {
    return num <= this.val.length;
  }
}

class ValidateView {
  constructor(el) {
    this.initialize(el);
    this.handleEvents();
  }
  initialize(el) {
    this.$el = $(el);
    this.$list = this.$el.next().children();

    var obj = this.$el.data();

    if (this.$el.prop('required')) {
      obj['required'] = true;
    }
    this.model = new ValidateModel(obj);
  }
  handleEvents() {
    var self = this;

    this.$el.on('keyup', (e) => {
      self.onKeyup(e);
    });

    this.model.on('invalid', () => {
      self.onValid();
    });
    this.model.on('invalid', () => {
      self.onInvalid();
    });
  }
  onKeyup(e) {
    var $target = $(e.currentTarget);
    this.model.set($target.val());
  }
  onValid() {
    this.$el.removeClass('error');
    this.$list.hide();
  }
  onInvalid() {
    var self = this;
    this.$el.addClass('error');
    this.$list.hide();

    $.each(this.model.errors, (index, val) => {
      self.$list.filter('[data-error=\'' + val + '\']').show();
    });
  }
}

$('input').each(() => {
  new ValidateView('input');
});


/* ES5 
================================= */
// 'this' is 4 methods.
// 1. callback => method
var myExam_01 = {
  value: 10,
  show: function() {
    console.log(this.value);
  }
};
myExam_01.show(); // method
// show(); <= function

// 2. callback => function
var myExam_02 = {
  value: 1,
  show: function() {
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
  this.increment = function() {
    this.value++;
  }
}

// this is constructor
var myExam_03 = new MyExam_03(0);

myExam_03.increment();
console.log(myExam_03.value);

// 4. apply, call
var myExam_04 = {
  value: 1,
  show: function() {
    console.log(this.value);
  },
  add: function(value1, value2) {
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
  this.bark = function() {
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
Cat.prototype.yourName = function() {
  console.log(this.name);
}
Cat.prototype.bark = function() {
  console.log(this.cry);
};

// creat instance
var tama = new Cat('tama','nya');

// access instance's menber variable
console.log(tama.name);
console.log(tama.cry);

// access instance's prototype method
tama.yourName();
tama.bark();

// each forEach
$(() => {
  var arr = [1,2,3,4,5];
  $.each(arr, () => {
    console.log(this);
  });

  arr.forEach((val) => {
    console.log(this);
  });
});


/* ES6
================================ */
// arrow function
$('button').on('click', (e) => console.log('ok'));

// class (prototype)
class Human {
  constructor(message) {
    this.message = message;
  }
  hello() {
    console.log(this.message);
  }
}
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
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
  $contents.css('height', Height);
  $module.css('width', mdWidth);
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
  accept: $module,
  deactivate: function(e, ui) {
    var $dropModule = ui.helper;

    $dropModule.addClass('droped');
    $dropModule.append('<i class="fa fa-close"></i>');

    var $closeBtn = ui.helper.children('.fa-close');
    $closeBtn.on('click', () => {
      $dropModule.fadeOut(300, () => {
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
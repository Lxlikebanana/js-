//出自网道（WangDoc.com）的《JavaScript 教程》https://wangdoc.com/javascript/oop/object.html 个人笔记
//这里就是记录一些Object对象的方法
//Object.getPrototypeOf()方法,返回的是参数的对象原型,这是获取原型对象的标准方法.
var F = function(){};//F是构造函数 里面有个prototype属性,F.prototype就是以F()构造函数为模板创建的实例对象的原型
var f = new F();//利用F()来构造新的实例对象f
Object.getPrototypeOf(f) === F.prototype//true  实例对象f的原型对象就是F.prototype;
//但是F的原型对象Object.getPrototypeOf(F) !== F.prototype F.prototype是F构造函数的一个属性
Object.getPrototypeOf(F) === Function.prototype //true

//几种特殊对象的原型
Object.getPrototypeOf({}) === Object.prototype//true 空对象的原型是Object.prototype

Object.getPrototypeOf(Object.prototype) === null //true  Object.prototype的原型是null原型链的终点关于原型链会有新的专门的笔记

function f(){}
Object.getPrototypeOf(f) === Function.prototype //true  函数的原型是Function.prototype

//Object.setPrototypeOf()方法为参数对象设置原型,返回该参数对象. 接受两个参数,第一个是现有对象,第二个是原型对象
var a = {};
var b = {x: 1};
Object.setPrototypeOf(a,b);
Object.getPrototypeOf(a) === b //true
a.x// 1
//方法将对象a的原型设置成对象b,而原型对象的属性和方法可以被所有实例对象所共享,所以a中有b的x属性
//new命令可以使用Object.setPrototypeOf()方法模拟
var F = function(){
	this.foo = 'bar';
};
var f = new F();
//等同于
var f = Object.setPrototypeOf({},F.prototype);//空对象,加上F构造的prototype属性;把f的原型设置成了F.prototype
F.call(f);//构造在f环境上运行,call和apply会直接执行
//new命令新建实例对象,其实可以分成两步.
//第一步,将一个空对象的原型设为构造函数的prototype属性(F.prototype);
//第二步,将构造函数内部的this绑定这个空对象,然后执行构造函数,使得定义在this上面的方法和属性(this.foo),都转移到这个空对象上;


//Object.create()
//生成实例对象的方法,通常是使用new命令,使用构造函数返回一个实例; 但是很多时候只能拿到一个实例对象,(莫得构造)它可能根本不是由构造函数生成的
//js提供Object.create方法,用来满足利用一个对象作为参数,然后以它为原型,返回一个实例对象,这个实例对象完全继承原型对象的属性

//原型对象
var A = {
	print: function(){
		console.log('no bad');
	}
};
 //实例对象
var B = Object.create(A);

Object.getPrototypeOf(B) === A //true
B.print()//no bad
B.print === A.print//true 这里就知道js里函数是单独放在内存里的,对象里的有函数的地址
//这里Object.create()方法以A为模板生成了B对象
//B继承了A的所有属性和方法

//实际上Object.create方法可以用下面的代码代替
if(typeof Object.create !== 'function'){
	Object.create = function(obj){
		function F(){}
		F.prototype = obj;
		return new F();
	}
}
//这里表明了create实质是新建了一个空的构造函数F,然后让F.prototype属性指向参数对象obj,最后返回一个F的实例从而实现让实例继承obj的属性
//下面三种生成的新对象是等价的
var obj1 = Object.create({});
var obj2 = Object.create(Object.prototype);
var obj3 = new Object();
//如果想要生成一个不继承任何属性的(比如没有toString valueOf方法)的对象,可以
var obj = Object.create(null);
//这样obj的原型就是null这些在Object.prototype上的方法就不会继承

//使用Objec.create()时一定要提供对象原型,参数不能是空或者不是对象是基本数据类型,否则会报错
Object.create()//报错
Object.create(124)//报错
//Object.create方法生成的新对象,动态继承了原型.在原型上添加或修改任何方法,会立即反映在新对象上
var obj4 = {p: 1};
var obj5 = Object.create(obj4);

obj4.p = 4;
obj5.p//4
//修改obj4会影响到实例对象obj5

//除了对象原型Object.create方法还可以接受第二个参数,该参数是属性描述对象,其所描述的对象属性,会添加到实例对象,作为对象的自身属性
var obj = Object.create({},{
	p1:{
		value: 123,
		enumerable: true,
		configurable: true,
		writable: true,
	},
	p2:{
		value:'abc',
		enumerable: true,
		configurable: true,
		writable: true,
	}
});
//其实没必要这样写直接生成新的实例后直接添加属性进去
var obj = Object.create({});
obj.p1 = 123;
obj.p2 = 'abc';
//其实就是告诉你Object.create可以接受第二个参数具体使用的话自己看着来吧

//Object.create方法生成的对象,继承了它的原型对象的构造函数
function A(){}
var a = new A();
var b = Object.create(a);

b.constructor === A //true 
b instanceof A //true

//Object.prototype.isPrototypeOf(),在Object原型上的实例对象的方法isPrototypeOf()用来判断该对象是否为参数对象的原型
var o1 = {};
var o2 = Object.create(o1);
var o3 = Object.create(o2);
o1.isPrototypeOf(o2);//true
o1.isPrototypeOf(o3);//true
o2.isPrototypeOf(o3);//true

Object.prototype.isPrototypeOf({})//true
Object.prototype.isPrototypeOf([])//true
Object.prototype.isPrototypeOf(/xyz/)//true
Object.prototype.isPrototypeOf(Object.create(null))//false
//Object.prototype处于原型链的最顶端,除了直接继承自null对象的

//Object.prototype.__proto__
//实例对象的__proto__属性(前后各两个下划线),返回该对象的原型.该属性可读写
var obj = {};
var p = {};
obj.__proto__ = p;
Object.getPrototypeOf(obj) === p;//true
//通过__proto__属性,将p对象设为obj对象的原型
//根据语言标准,__proto__属性只有浏览器才需要部署,其他环境可以没有这个属性. 它的前后两个下划线表明它的本质是一个内部属性,不应该对使用者暴露.因此,应该少用这个属性,而是用静态方法Object.getPrototypeOf()和Object.setPrototypeOf(),进行原型对象的读写操作
//尽量不用__proto__(8过这个可以直观的看见原型链我喜欢)
//修改了原型对象的属性,实例的属性也会修改

//获取原型对象方法的比较
//__proto__属性指向当前对象的原型对象,即构造函数prototype属性
var obj = new Object();
obj.__proto__ === Object.prototype;//true
obj.__proto__ === obj.constructor.prototype//true
//上面代码新建了一个对象obj,它的__proto__属性,指向构造函数(Object 或 obj.constructor)的prototype属性
//所以获取实例对象obj的原型对象,就有三种方法
//obj.__proto__
//obj.constructor.prototype
//Object.getPrototypeOf(obj)
//这三种获取原型对象的方法,其中前两种不是很可靠,__proto__属性只有浏览器才需要部署,其他环境可以不部署.
//而obj.constructor.prototype在手动改变原型对象时可能会失效
var P = function(){};
var p = new P();

var C = function(){};
C.prototype = p;
var c = new C();
c.constructor.prototype === p//false
//prototype和__proto__的不同,见专门笔记
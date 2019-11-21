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
C.prototype = p;//生成实例的原型对象就是p
var c = new C();
c.constructor.prototype === p//false
//出现这种情况是因为c.constructor通常会在原型对象上找到constructor属性而这里c实例的原型对象被修改成一个实例对象p
//这个实例对象p上也没有constructor属性,会继续向上找找到实例p的原型对象里面的constructor属性
//这时才找到constructor属性而constructor属性是p的构造P,P的prototype属性是存在的所以会等于P.prototype

//通常: c.constructor ——> C.prototype.constructor ——> C();接下来是c.constructor.prototype ——> C.prototype
//这里: c.constructor ——> p.__proto__(.constructor) ——> P.prototype.constructor ——> P();接下来c.constructor.prototype ——> P.prototype

//简单的来讲就是你的原型对象修改之后可能没有constructor属性需要去向原型链上找所以constructor.prototype不一定是指向你的原型对象

//首先c是个实例对象里面的constructor属性是向原型链上的原型对象找的,是c的原型对象c.__proto__指向的C.prototype里面的
//但是C.prototype也是一个实例p,那么会继续向p的原型链上找p.__proto__是P.prototype里的constructor里指向的是P
//c.constructor.prototype相当于P.prototype === p.__proto__
//通常情况下:
//实例对象o.__proto__就是对象o的原型对象;生成o的构造函数O的prototype属性里指向的也是o的原型对象(在O.prototype没修改时)
//而o.constructor.prototype,绕一圈也是o的原型对象(但是当原型对象修改了这里的值就不对了就不指向c的原型对象了)
//prototype和__proto__的不同,见专门笔记
//综上__proto__内部属性且只有浏览器才需要部署不推荐使用;而obj.constructor.prototype可能在修改后指向的不是原型对象会失效
//重要的来了说了这么多就是这句,推荐使用Object.getPrototypeOf()方法来获取原型对象

//那怎么才能让obj.constructor.prototype正确指向原型对象呢
var P = function(){};
var p = new P();

var C = function(){};
C.prototype = p;
C.prototype.constructor = C;//通常在改变原型对象的时候同时要设置constructor属性,指向原来构造函数就行了这样

var c = new C();
c.constructor.prototype === p;//true 这里c去原型找constructor,c的原型是C.prototype,这个里面有里constructor因为之前设置过了是C这样C.prototype就是p了
//对原型对象进行修改的时候,通常也要设置constructor属性


/*Object.getOwnPropertyNames(),别忘了s*/
//这个Object静态方法返回一个数组,成员是参数对象本身的所有属性的键名
Object.getOwnPropertyNames(Date)//["parse","arguements","UTC","caller","name","prototype","now","length"]
//Object.getOwnPropertyNames方法返回Date所有自身的属性名
//对象本身的属性之中,有的是可遍历的(enumerable),有的是不可遍历的;Object.getOwnPropertyNames方法能返回所有键名不管是否是可遍历的;
//如果只需要获取那些可以遍历的属性,需要使用Object.keys方法,
Object.keys(Date)//[]
//上面代码表明,Date对象所有自身的属性,都是不可遍历的


/*Object.prototype.hasOwnProperty()*/
//对象实例的hasOwnProperty方法返回一个布尔值,用于判断某个属性定义在对象身上还是定义在原型链上
Date.hasOwnProperty('length')//true 是自身属性,构造函数Date可以接受多少个参数
Date.hasOwnProperty('toString')//false 是继承的属性
//重点来了!!!参考材料里指出hasOwnProperty方法是js中唯一一个处理对象属性时不会遍历原型链的方法
//那Object.getOwnPropertyNames()这个好像也不遍历原型链因为这个是Object自己的静态方法,不会遍历原型链


/*in运算符和for in循环*/
//in运算符返回一个布尔值,表示一个对象是否具有某个属性.它不区分这个属性时自己的还是继承的
//要分辨请使用上面说的hasOwnProperty方法
'length' in Date//true
'toString' in Date//true
//in运算符常用于检查一个属性是否存在
//获得对象的可遍历属性(不管是自身的还是继承的),可以使用for...in..循环(可遍历才行) 
var o1 = {p1: 123};
var o2 = Object.create(o1,{
	p2:{
		value: 'abc',
		enumerable: true
	}
	});
for (p in o2){    //p里面是键名,类型是string
	console.info(p)
}	
//输出p2 p1
//上面可以看出for in可以遍历出继承的属性
//如果只要自身的属性那就加个判断用hasOwnProperty()方法先判断在输出

//下面函数获取对象所有属性名,不论是不是自身的还是继承的(遍历了原型链),不管是不是可枚举的(getOwnProperty)
function inheritedPropertyNames(obj){
	var props = {};
	while(obj){
		Object.getOwnPropertyNames(obj).forEach(function(p){//forEach方法对数组遍历操作的方法详细见其他还有map方法的区别
			props[p] = true;//你随意赋值只要属性名的
		});
		obj = Object.getPrototypeOf(obj);
	}
	return Object.getOwnPropertyNames(props);
}

//对象拷贝,详见其他深浅拷贝
//如果要拷贝一个对象,需要做到下面两件事
//1.确保拷贝后的对象,与原对象具有同样的原型
//2.确保拷贝后的对象,与原对象具有同样的实例属性
function copyOwnPropertiesFrom(target, source){
	Object.getOwnPropertyNames(source).forEach(function(propKey){   //拿到自身的属性名
		var desc = Object.getOwnPropertyDescriptor(source, propKey); //拿到属性名对的属性值
		Object.defineProperty(target, propKey, desc);                //把属性放进被拷贝的对象里
	});
	return target;
}

function copyObject(orig){
	var copy = Object.create(Object.getPrototypeOf(orig));//一样的原型对象create里第一个参数就是原型对象,orig里的自身属性还没有
	copyOwnPropertiesFrom(copy,orig);    //相同的实例属性
	return copy;
}

//更简便的方法
//利用Object.getOwnPropertyDescriptors方法比上面多个s
function copyObject(orig){
	return Object.create(Object.getPrototypeOf(orig),Object.getOwnPropertyDescriptors(orig))//create第二个参数
}
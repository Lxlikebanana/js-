//出自网道（WangDoc.com）的《JavaScript 教程》个人笔记
//模块 模块化编程,开发者只需要实现核心的业务逻辑,然后其他的可以加载别人写好的模块
//但js不是模块化编程语言,ES6才支持'类'和'模块'
//在ES5的传统做法,利用对象来实现模块化的效果
//首先模块是指把实现某特定功能的属性和方法封装在一起
//那第一种简单的做法就是把模块写成一个对象,所有的模块成员都放在这个对象里面
var moduel1 = new Object({
	_count : 0,
	m1 : function(){
		//m1 code
	},
	m2 : function(){
		//m2 code
	}
});
//调用函数m1() m2()就是调用moduel1的属性
moduel1.m1();
//但是这样会暴露所有模块成员,内部的状态可以被外部改写了,如:
moduel1._count = 1;//可以直接修改内部成员,没有私有
//那么第二种方法就是封装私有变量,构造函数的写法,利用构造函数封装私有变量
function StringBuilder(){
	var buffer = [];
	this.add = function(str){
		buffer.push(str);
	};
	this.toString = function(){
		return buffer.join('');
	};
}
//这里的buffer就是构造函数私有的,这个模块私有的变量,一旦生成实例对象,外部是无法直接访问buffer,作用域是函数里
//这种方法把私有变量封装在构造函数里面,会导致构造函数和实例对象是一体的,总是存在于内存之中,无法在使用完成后清除.
//这会造成,构造函数有双重作用,既用来塑造实例对象,又用来保持实例对象的数据,违背了构造函数和实例对象在数据上相分离的原则
//实例对象的数据不应保存在实例对象以外.并且非常耗费内存
function StringBuilder(){
	this._buffer = [];
}
StringBuilder.prototype = {
	constructor: StringBuilder,
	add: function(str){
		this._buffer.push(str);
	},
	toString: function(){
		return this._buffer.join('');
	}
}
//这种在变量放进实例对象里,还是变成了第一种情况外部直接访问内部私有变量;

//第三种方式封装私有变量:立即执行函数的写法(推荐的正确的写法)(前面介绍那么多是告诉大家为啥不对,只用记住这种方法就行了)
//立即执行函数(Immediately-Invoked Function Expression,IIFE),将相关的属性和方法封装在一个函数作用域里面,可以达到不暴露私有成员的目的
var moduel2 = (function(){
	var _count = 0;
	var m1 = function(){
		//
	};
	var m2 = function(){
		//
	};
	return {
		m1: m1,
		m2: m2
	};
})();
//这样_count变量就是在内部的外部代码无法读取内部的_count变量
//这种使用iife立即执行函数的写法就是js模块的基本写法,接下来是对这种写法的加工

//模块的放大模式
//如果一个模块很大,必须分成几个部分,或者一个模块需要继承另一个模块,这时就有必要使用'放大模式'(augmentation)
var module3 = (function(mod){
	mod.m3 = function(){
		//code
	};
	return mod;
})(module3);
//立即执行了function(module3){添加了m3方法返回新的}
//浏览器环境里面模块通常从网上获取,有时无法知道哪个部分会先加载.如果采用上面的放大模式的写法,
//可能会出现第一个执行的部分会加载一个不存在的空对象,这里要使用'宽放大模式'(Loose augmentation)
var module4 = (function(mod){
	//
	return mod;
})(window.module4 || {});//这里发现了Window对象和window对象,window使用typeof后返回Object,而Window使用typeof返回的是function
			//window.constructor === Window 返回true,Window是window对象的构造函数关于window和Window会有专门的笔记
//且发现闭包[[Scopes]]带着环境局部变量的函数这里闭包也会用专门的笔记不过后面框架Vue的this React的class都使用对象没有闭包啥事

//就是比放大模式多了一个参数是空对象,而且参数变成Window.module4如果模块存在或者放进空对象生成module4

//输入全局变量
//独立性是模块的重要特点,模块内部最后不要和程序的其他部分直接交互
//为了在模块内部调用全局变量,必须显式的把其他变量传入模块
var module5 = (function($,YAHOO){
	//code
})(jq,YAHOO);
//模块需要使用jq库和YUI库,就把这两库(两个模块)当作参数传入module5.这样除了保证模块的独立性,还使得模块之间的依赖关系变得明显
//讲真没有实际例子很难完全搞懂以后碰上再重新添上吧如果还记得的话

//立即执行函数还可以起到命名空间的作用namespace
(function($,window,document){
	function go(num){
		
	}
	function handleEvents(){
		
	}
	function initialize(){
		
	}
	function dieCarouseDie(){
		
	}
	//attach to the global scope
	window.finalCarousel = {//window就是js运行的全局环境
		init: initialize,
		destroy: dieCarouseDie
	}
})(jQuery,window,document);
//代码中的finalCarousel对象输出到全局,对外暴露init和destroy接口,内部方法go handleEvents initialize dieCarouselDie都是外部无法调用的
//能使用的是window全局变量finalCarousel对象的init方法和destroy方法
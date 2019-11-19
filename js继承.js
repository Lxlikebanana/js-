//构造函数的继承 来自https://wangdoc.com/javascript/oop/prototype.html对象的继承笔记
//让一个构造函数来继承另一个构造函数
//分成两步来实现;第一步是在子类的构造函数中,调用父类的构造函数;ps.es5里没有类的概念只是文法上这么描述
function Super(){
	this.p = 123321;
}//父类构造
function Sub(value){//子类构造

	Super.call(this);//Super是Sub的父类构造,call让父类构造函数运行在子类实例对象环境,
					 //在实例上调用父类构造会让子类实例具有父类实例的属性
	
	this.prop = value;//构造函数this指向构造出的实例对象
}
//第二步,让子类原型指向父类原型,这样子类就可以继承父类原型
Sub.prototype = Object.create(Super.prototype);//这里创建一个新的对象而不是直接把Super.prototype直接等于上去,
										//如果那样干那下面的代码对原型构造操作的时候就会把父类的原型prototype里的构造一道改变
Sub.prototype.constructor = Sub;//这里修改了子类原型prototype,需要把这个原型对象里的构造指向Sub,不然构造就变成了指向的原型构造Super()
// Sub.prototype.method =  子类原型方法
//或者第二步这样子写Sub.prototype = new Super();
//用一个Super父类的实例来当作原型,这样也会有继承,但是这里直接用实例的话子类就会有父类实例的方法,这个可能不需要
//单个方法继承
ClassB.prototype.print = function(){
	ClassA.prototype.print.call(this);
	//这样子类B的方法print继承了父类的print方法
	//这里可以部署自己的代码
}
//多重继承
function M1(){
	this.hello = 'hello';
}
function M2(){
	this.world = 'world';
}
function S(){
	M1.call(this);
	M2.call(this);
	//继承实例
}
S.prototype = Object.create(M1.prototype);//继承M1原型
//利用Object的静态方法assign()把M2原型里的可枚举属性复制到S原型上Object.assign()
//参考https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
Object.assign(S.prototype,M2.prototype);//加上了M2
S.prototype.constructor = S;
s.hello === 'hello';
s.world === 'world';
//子类S同时继承了父类M1和M2.这种模式又称为Mixin(混入)
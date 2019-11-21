//部分来自https://www.jianshu.com/p/7d58f8f45557 感谢作者
//部分来自https://www.cnblogs.com/lyraLee/p/11617712.html 感谢作者
//普通对象和函数
//prototype和__proto__的区别,以及它们直接有什么联系
//首先来看prototype,这个是函数特有的属性,函数特有的,函数特有,是的这个是函数特有的属性是Function的静态属性
//每个函数都会有一个prototype属性，这个属性是一个指针，指向一个对象，记住只有函数才有,并且通过bind()绑定的也没有。
//而__proto__是对象特有的属性,其实函数也是对象,是对象,对象;所以这个属性函数也有也有也有
//__proto__这个属性只有浏览器才需要部署,其他环境可能没有,但是没有关系因为都在浏览器上肯定有的
//所以对于这两个属性的区别只有在对象是函数的情况下我们需要区分,因为不是函数的普通对象没有prototype这个属性
//一开始什么原型链什么继承搞的脑子乱乱的,现在直接告诉大家现在先搞懂对象是函数的情况下,最后把普通对象给拼上,这样是不是就比较容易学习了;
//当函数作为构造函数使用时,函数会使用prototype属性;函数使用prototype属性时,是做构造函数的情况
//当函数作为普通对象使用时,函数会使用__proto__属性;函数使用__proto__属性时,是做普通对象使用
//还有就是之前在Object对象的方法的笔记里提到过__proto__是一个内部属性,最好不要使用,可以用Object.getPrototypeOf()和Object.setPrototypeOf()
function P(){}
console.log(P.prototype);//这里是P作为构造时的情况,
//这个属性里存放的是一个原型对象,谁的原型对象?P的吗?
P.prototype === P.__proto__//false
//这里就解释了我一直以来的问题,prototype和__proto__里都是原型对象给我脑子搞的糊糊的,
//现在prototype里只是函数的属性在做构造函数时使用的,里面放的是用这个函数作为构造而创建出来的实例对象的原型对象,有点拗口
//就是函数的prototype属性里放的不是自己的原型对象,是以自己为模板创建的实例对象(它儿子)的原型
//而__proto__指向的是这个对象(不论是函数还是普通对象)本身的原型对象所以可以直观看原型链

var p1 = new P();//p1是用P做构造函数创建的一个实例对象
var p2 = new P();//p2也是用P作为构造函数创建的一个实例对象

p1.__proto__ === P.prototype//true
p2.__proto__ === P.prototype//true

//p1 p2都是由P作为构造函数而创建的实例对象,它们的原型对象就是构造函数P的prototype属性指向的对象

//这里来说说__proto__里放的是什么了,有些资料里只是说了句__proto__指向了这个对象的原型对象,那这个原型对象里有什么东西?
//简单来说__proto__里放的是创建这个对象的构造函数的prototype,这两个属性间就出现联系了,那prototype里又是什么东西呢?
//那就多了prototype里又原型对象的各种属性方法,其中有个关键的属性构造函数,这个构造函数是谁的构造函数呢?
//难道是自己prototype的构造函数?
P.prototype.constructor === P//true
//还真是它自己的构造函数,这里大家会发现好像形成了一个环,构造函数P自己的prototype属性里的constructor属性是它自己本身的地址
//现我们知道了由构造函数P来创建的实例p1 p2它们的__proto__指向它们的原型对象,而构造函数P里的prototype也指向p1p2的原型对象
//那么构造函数P自己的原型对象是什么呢P.__proto__是什么
P.__proto__ === Function.prototype;//true
P.constructor === Function;//true

p1.__proto__.__proto__ === Object.prototype;//true
p1.__proto__ === P.prototype;//true
P.prototype.__proto__ === Object.prototype;//true
//普通的对象的原型链顶点是Object.prototype;
//Object.prototype.__proto__ === null,Object.prototype的原型是null
//现在已知,普通对象的原型链顶点是Object.prototype;(Object是构造函数)
//Object.prototype的原型是null
//函数的原型是Function.prototype(Function是构造函数)
Object.__proto__ === Function.prototype;//true Object是构造函数
Function.__proto__ === Function.prototype;//true
Function.prototype === Function.__proto__;//Function自己的原型是自己的到Function与Object不同它成环了
//总结prototype是函数特有的在做构造创建实例时,指向的是创建实例的原型对象,__proto__是对象有的直观显示原型链,因为它直接指向自己的原型
//普通对象的最终原型对象是Object.prototype,而Object.prototype的原型是null;
//函数对象的原型是Function.prototype,而Function.__proto__ === Function.prototype
//总是把prototype当作是构造函数本身的原型对象这个是我之前遇上的坑

//上述应该大家分清了prototype和__proto__,现在再来补充几点
//不论是prototype和__proto__都是可读写的属性
function A(){this.x = 1}
function B(){this.x = 2}

var obj = new B();
var a1 = new A();
a1.__proto__ === A.prototype;   //改变原型对象会影响到构造函数
A.prototype = obj;//把A.prototype改成 obj这样的实例对象
//之前说的prototype里面会有constructor,但是obj是个普通对象莫得constructor会去向原型链上找obj的原型对象是B.prototype,
//这里的constructor是B()
//多一句嘴constructor属性是在哪的?,是在构造函数的prototype属性指向的原型对象里的constructor属性



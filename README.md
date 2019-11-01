# js-
想到什么写什么,遇上什么写什么,就这样子

js实现翻页

jsCheckBox全选 使用了jq 思路：1.全选来设置下面各复选框的checked属性值2.下面的复选框值影响上面全选的值

on('click') 和 click() 还有 $(document).on('click')不同的地方$(document).on('click')对应动态生成的元素能够生效；而另外on 和 click只能对已经加载完的元素进行，这是很重要的;这里$(document).on('click')是on()的一种情况$().on('click','childNode',function(){})对前面选择器选择的元素内部子元素是动态生成的也会触发click事件而$(document)则是整个文档里面的子元素动态生成后会触发，这样什么子元素动态生成都能触发点击事件

Vue v-if 中当数组array.length > 0判断时当数组array未定义undefined会出现TypeError: Cannot read property 'length' of undefined
需要在判断长度前再加上array !==undefined && 先判断是否是undefined; &&当前面的判断为false就直接返回不会执行到后面

git 在git推送本地分支到远程分支时记得 git push -u origin/分支名,这样可以把本地分支和远程分支关联起来,如果出现Everything up-to-date有可能是没有提交add commit 或者直接commit -am‘’,但是还有种可能就是本地分支对远程没更新

var arr = [0,1,0,2,1,0,1,3,2,1,2,1];
var jishui = 0;
var arr1 = []
for(i=0;i<arr.length;i++){
	for(j=i+1;j<arr.length;j++){
		if(arr[i] >= arr[i+1] && arr[i]<=arr[j]){
			arr1[i]={start:i,end:j};
			i = j;
		}
		
	}
}
console.log(arr1);
arr1.forEach(function(item){
	for(i=item.start;i<item.end;i++){
		if(arr[i]<=arr[item.start]){
			jishui += arr[item.start] - arr[i];
		}
	}
});
console.log(jishui);

function jishuishu(arr){
	var jishui = 0;
	var arr1 = []
	for(i=0;i<arr.length;i++){
		for(j=i+1;j<arr.length;j++){
			if(arr[i] >= arr[i+1] && arr[i]<=arr[j]){
				arr1[i]={start:i,end:j};
				i = j;
			}
			
		}
	}
	console.log(arr1);
	arr1.forEach(function(item){
		for(i=item.start;i<item.end;i++){
			if(arr[i]<=arr[item.start]){
				jishui += arr[item.start] - arr[i];
			}
		}
	});
	return jishui;
}
var max = {index:0,val:arr[0]};
var maxs = [];
for(i = 0; i<arr.length-1; i++){
	if(arr[i] > max.val){
		max = {index:i,val:arr[i]};
	}
}
maxs.push(max);
for(i=0;i<max.index){
	
}
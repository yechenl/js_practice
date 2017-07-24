var circles=document.querySelectorAll(".picFoot p span");
var slide=document.querySelector(".slide");
var imgWidth=parseInt(getComputedStyle(slide.querySelector("span")).width);	//这里不能用offsetWidth去取宽度，因为一上来span标签是display:none的，所以取不到
var imgWrap=slide.children[0];			//小图的父级
var timer;

slide.style.left=circles[0].offsetLeft-imgWidth/2+'px';
for(var i=0;i<circles.length;i++){
	circles[i].index=i;
	circles[i].onmouseover=function(){
		clearTimeout(timer);
		slide.style.display='block';
		slide.style.left=this.offsetLeft-imgWidth/2+'px';
		imgWrap.style.left=-this.index*imgWidth+'px';
	};
	circles[i].onmouseout=function(){
		timer=setTimeout(function(){
			slide.style.display='none';
		},200);
	};
	
	//圆点点击
	circles[i].onclick=function(){
		if(!canClick){
			return;
		}
		canClick=false;
		
		cn=this.index;
		//如果当前的索引小于上一个索引就往左走，否则往右走
		if(cn<ln){
			createDom(h);
		}else{
			createDom(-h);
		}
	};
}



//图片运动功能
var next=document.querySelector(".next");
var prev=document.querySelector(".prev");
var imgBox=document.querySelector(".imgBox");
var text=document.querySelector(".text");
var textArr=['《天才捕手》定档3.10 科林·费斯调教裘德·洛','《西游记》的N种可能','《爱乐之城》 - 北京147家影院上映1122场','《极限特工：终极回归》 - 北京152家影院上映1623场','《非凡任务》曝预告海报 黄轩变身硬汉大秀肌肉'];


var col=15;						//列数
var w=imgBox.offsetWidth/col;	//一个方块的宽度
var h=imgBox.offsetHeight;		//一个方块的高度
var ln=0;						//上一张图片的索引
var cn=0;						//当前图片的索引
var divs=null;					//所有的方块
var canClick=true;				//能否进行下次点击


//下一张
next.onclick=function(){
	if(!canClick){
		return;
	}
	canClick=false;
	
	cn++;
	if(cn==circles.length){
		cn=0;
	}
	
	createDom(-h);
}
//上一张
prev.onclick=function(){
	if(!canClick){
		return;
	}
	canClick=false;
	
	cn--;
	if(cn==-1){
		cn=circles.length-1;
	}
	
	createDom(h);
}

function createDom(t){
	var str='';						//放方块
	var img=imgBox.children[0];		//图片
	
	img.src='images/'+ln+'.jpg';	//初始化把图片设置成上一张图
	for(var i=0;i<col;i++){
		var l=i*w;					//每个方块的left值
		
		str+='<div style="width:'+w+'px;height:'+h+'px;left:'+l+'px;top:'+t+'px;opacity:0;background:url(images/'+cn+'.jpg) -'+l+'px;" data-num="'+Math.abs(i-Math.floor(col/2))+'"></div>';
	}
	
	imgBox.innerHTML+=str;
	move();
}

function move(){
	divs=imgBox.getElementsByTagName('div');
	//0   1  2  3  4  5  6 7 8 9 10 11 12 13 14
	//-7 -6 -5 -4 -3 -2 -1 0 1 2 3  4  5  6  7
	var newDivs=Array.prototype.slice.call(divs);
	
	//把方块按从中间到两边的顺序排列
	newDivs.sort(function(a,b){
		return a.dataset.num-b.dataset.num;
	});
	
	circles[ln].className='';
	circles[cn].className='active';
	text.style.bottom='-40px';
	
	//运动
	for(var i=0;i<newDivs.length;i++){
		(function(i){
			setTimeout(function(){
				newDivs[i].style.top=0;
				newDivs[i].style.opacity=1;
			},i*50);
		})(i);
	}
	
	//运动完成
	var n=0;
	newDivs[newDivs.length-1].addEventListener('transitionend',function(){
		n++;
		if(n==1){
			imgBox.innerHTML='<img src="images/'+cn+'.jpg" alt="" />';		//内容变成一张图
			ln=cn;			
			text.style.bottom=0;			//文字回来
			text.innerHTML=textArr[cn];		//文字内容变一下
			canClick=true;					//可以再次点击
		}
	});
}


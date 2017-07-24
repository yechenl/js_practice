//alert("hello!");
window.onload=function(){
	var wrap=document.getElementById("wrap");
				var divs=document.querySelectorAll("#wrap>div");
				var refs=document.querySelectorAll("#wrap div div");
				var rotate=360/divs.length;
				
				for(var i=0;i<divs.length;i++){
					refs[i].style.background='linear-gradient(rgb(0,0,0) 40%,rgba(0,0,0,0)),url(images/'+(i+1)+'.jpg)';
					
					(function(i){
						setTimeout(function(){
							divs[i].style.transform='rotateY('+i*rotate+'deg) translateZ(400px)';
						},(divs.length-i)*200);
					})(i);
				}
				
				divs[0].addEventListener('transitionend',function(){
					drag();
				});
				
				function drag(){
					var curX=0;			//最初的圆环转的值
					var curY=-10;		//最初的圆环转的值
					var timer;
					
					document.onmousedown=function(ev){
						clearInterval(timer);
						var startTime=new Date().getTime();		//按下的时候记录一个时间点
						var disX=ev.clientX;	//拖拽的起点
						var disY=ev.clientY;	//拖拽的起点
						
						/*
						 * 上次停下来的坐标（为了第二次再拖动的时候能从上一次停的地方接着走）
						 * 他的位置放在这里的原因是，每次鼠标按下的时候都要知道上次停的位置，所以只要按下就要让他的值取一次，放在外面的话只会取一次
						 */
						var lastX=curX;
						var lastY=curY;
						
						/*鼠标按下的时候要记录一个点*/
						var speedX=0;
						var speedY=0;
						
						document.onmousemove=function(ev){
							curX=lastX+(ev.clientX-disX)/10;
							curY=lastY+(disY-ev.clientY)/10;
							
							wrap.style.transform='perspective(1000px) rotateX('+curY+'deg) rotateY('+curX+'deg)';
							
							//扔的距离是由鼠标滑动的距离决定的(也就是拖拽的距离)
							speedX=(ev.clientX-disX)/100;
							speedY=(disY-ev.clientY)/100;
						};
						
						document.onmouseup=function(){
							document.onmousemove=null;
							var endTime=new Date().getTime();			//记录一下抬起的时间点
							
							if(endTime-startTime<300){
								timer=setInterval(function(){
									curX+=speedX;
									curY+=speedY;
									
									//摩擦力
									speedX*=0.95;
									speedY*=0.95;
									
									//停止条件
									if(Math.abs(speedX)<0.1 && Math.abs(speedY)<0.1){
										clearInterval(timer);
									}
									
									wrap.style.transform='perspective(1000px) rotateX('+curY+'deg) rotateY('+curX+'deg)';
								},16);
							}
						};
						
						return false;
					};
				}
			};
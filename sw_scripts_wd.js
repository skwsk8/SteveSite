// JavaScript - Steve Westhoff (c)2013

// Init
function initCanvases()
{
	canvas2.addEventListener("mousedown",enableDrag,false);
	canvas2.addEventListener("mousemove",doDrag,false);
	canvas2.addEventListener("mouseup",disableDrag,false);
	/*canvas2.addEventListener("touchstart",touchHandler,false);
    canvas2.addEventListener("touchmove",touchHandler,false);
    canvas2.addEventListener("touchend",touchHandler,false);*/
	startDraw2();
}
/*
function touchHandler(event)
{
	var touches = event.changedTouches;
	var first = touches[0];
	var type = "";
	switch(event.type)
	{
		case "touchstart": type = "mousedown"; break;
		case "touchmove": type="mousemove"; break;
		case "touchend": type="mouseup"; break;
		default: return;
	}
	var simulatedEvent = document.createEvent("MouseEvent");
	//initMouseEvent(type, canBubble, cancelable, view, clickCount, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget);
	simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);
	first.target.dispatchEvent(simulatedEvent);
	event.preventDefault();
}*/

function asimoStart()
{
	asimoCurtains.className = "running";
	asimoArmFront.className = "running";
	asimoArmBack.className = "running";
	asimoLegFront.className = "running";
	asimoFootFront.className = "running";
	asimoLegBack.className = "running";
	asimoFootBack.className = "running";
	asimoStartBtn.disabled = true;
	asimoStopBtn.disabled = false;
	asimoStartBtn.value = "Resume";
	asimoStopBtn.value = "Pause";
}

function asimoStop()
{
	asimoCurtains.className = "paused";
	asimoArmFront.className = "paused";
	asimoArmBack.className = "paused";
	asimoLegFront.className = "paused";
	asimoFootFront.className = "paused";
	asimoLegBack.className = "paused";
	asimoFootBack.className = "paused";
	asimoStopBtn.disabled = true;
	asimoStartBtn.disabled = false;
}

// Canvas1
var loopDelay1 = null;
var xDir1 = 0;
var yDir1 = 0;
var xStep1 = 1;
var yStep1 = 1;
var r1 = 0;
var g1 = 0;
var b1 = 0;

function startDraw1()
{
	//random position and direction
	if (loopDelay1)
	{
		window.clearTimeout(loopDelay1);
	}
	var x = Math.round(Math.random()*150);
	var y = Math.round(Math.random()*150);
	xStep1 = Math.round(Math.random()*2)+1;
	yStep1 = Math.round(Math.random()*2)+1;
	r1 = Math.round(Math.random()*255);
	g1 = Math.round(Math.random()*255);
	b1 = Math.round(Math.random()*255);
	if (r1==255 && g1==255 && b1==255){g1=0;}
	draw1(x,y);
	bounceStopBtn.disabled = false;
}

function stopDraw1()
{
	if (loopDelay1)
	{
		window.clearTimeout(loopDelay1);
		bounceStopBtn.disabled = true;
		var ctx1 = canvas1.getContext("2d");
		ctx1.clearRect(0,0,200,200);
	}
}

function draw1(x,y)
{
	var xDirOld = xDir1;
	var yDirOld = yDir1;
	var ctx1 = canvas1.getContext("2d");
	ctx1.clearRect(0,0,200,200);
	ctx1.fillStyle="rgb("+r1+","+g1+","+b1+")";
	ctx1.fillRect(x,y,50,50);
	x = (xDir1==0) ? x+xStep1 : x-xStep1;
	y = (yDir1==0) ? y+yStep1 : y-yStep1;
	if (x < 0){xDir1 = 0; x = 0;}
	if (x > 150){xDir1 = 1; x = 150;}
	if (y < 0){yDir1 = 0; y = 0;}
	if (y > 150){yDir1 = 1; y = 150;}
	if (xDir1 != xDirOld || yDir1 != yDirOld)
	{
		r1 = Math.round(Math.random()*255);
		g1 = Math.round(Math.random()*255);
		b1 = Math.round(Math.random()*255);
		if (r1 == 255 && g1 == 255 && b1 == 255){g1 = 0;}
	}
	loopDelay1 = setTimeout("draw1("+x+","+y+")",10);
}

// Canvas2
var mouseX = null;
var mouseY = null;
var numChunks = 600;
var chunkLength = 5;
var magnetStrength = 6;
var mouseDrag = false;
var northX = new Array();
var northY = new Array();
var southX = new Array();
var southY = new Array();

function startDraw2()
{
	//creates magnet chunks
	if (window.devicePixelRatio >= 1.5)
	{
		magnetStrength *= 2;
	}
	else
	{
		magnetDesc.innerHTML = "(Click and drag your cursor around the canvas box below)";
	}
	if (document.body.clientWidth <= 480 || window.devicePixelRatio >= 1.5)
	{
		canvas2.width = 300;
		canvas2.height = 300;
	}
	if (document.body.clientWidth > 480)
	{
		canvas2.width = 400;
		canvas2.height = 400;
	}
	for (var i=0; i<numChunks; i++)
	{
		var angle = Math.random()*Math.PI*2;
		northX[i] = Math.round(Math.random()*(canvas2.width-1-2*chunkLength))+chunkLength+1;
		northY[i] = Math.round(Math.random()*(canvas2.height-1-2*chunkLength))+chunkLength+1;
		southX[i] = northX[i] + Math.round(Math.cos(angle)*chunkLength)
		southY[i] = northY[i] + Math.round(Math.sin(angle)*chunkLength)
	}
	draw2();
}

function doResize()
{
	if (document.body.clientWidth <= 480 && canvas2.width == 400)
	{
		canvas2.width = 300;
		canvas2.height = 300;
		for (var i=0; i<numChunks; i++)
		{
			northX[i] = Math.round(northX[i]*0.75)
			northY[i] = Math.round(northY[i]*0.75)
			southX[i] = Math.round(southX[i]*0.75)
			southY[i] = Math.round(southY[i]*0.75)
		}
	}
	else if (document.body.clientWidth > 480 && canvas2.width == 300)
	{
		canvas2.width = 400;
		canvas2.height = 400;
		for (var i=0; i<numChunks; i++)
		{
			northX[i] = Math.round(northX[i]*(4/3))
			northY[i] = Math.round(northY[i]*(4/3))
			southX[i] = Math.round(southX[i]*(4/3))
			southY[i] = Math.round(southY[i]*(4/3))
		}
	}
	else
	{
		return;
	}
	draw2();
}

function draw2()
{
	//draws magnet chunks
	var ctx2 = canvas2.getContext("2d");
	ctx2.clearRect(0,0,canvas2.width,canvas2.height);
	ctx2.fillStyle="rgb(0,0,0)";
	for (var i=0; i<numChunks; i++)
	{
		ctx2.beginPath();
		ctx2.moveTo(northX[i],northY[i]);
		ctx2.lineTo(southX[i],southY[i]);
		ctx2.stroke();
		ctx2.closePath();
	}
}

function enableDrag()
{
	arguments[0].preventDefault();
	mouseDrag = true;
}

function disableDrag()
{
	mouseDrag = false;
}

function doDrag(event)
{
	if (mouseDrag)
	{
		var oldMouseX = mouseX;
		var oldMouseY = mouseY;
		if (!event) {event = window.event;}
		var rect = document.getElementById('canvas2').getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
		if (mouseX < 1) {mouseX = 1;}
		if (mouseX > canvas2.width) {mouseX = canvas2.width;}
		if (mouseY < 1) {mouseY = 1;}
		if (mouseY > canvas2.height) {mouseY = canvas2.height;}
		
		for (var i=0; i<numChunks; i++)
		{
			var xDiff = mouseX - northX[i];
			var yDiff = mouseY - northY[i];
			//if cursor close to chunk
			if ((Math.sqrt(xDiff*xDiff+yDiff*yDiff) < magnetStrength))
			{
				//adjust north point
				northX[i] = northX[i] + Math.round(xDiff/2);
				northY[i] = northY[i] + Math.round(yDiff/2);
				//adjust south point
				var slope = (!oldMouseX || !oldMouseY) ? yDiff/xDiff : (oldMouseY - mouseY)/(oldMouseX - mouseX);
				if (slope > chunkLength){slope = chunkLength;}
				if (slope < -chunkLength){slope = -chunkLength;}					
				//x = D/sqrt(1+m^2) and y = mD/sqrt(1+m^2) 
				//x = -D/sqrt(1+m^2) and y = -mD/sqrt(1+m^2) 
				if (mouseX > oldMouseX)
				{
					southX[i] = northX[i] - Math.round(chunkLength/Math.sqrt(1+slope*slope));
				}
				else
				{
					southX[i] = northX[i] + Math.round(chunkLength/Math.sqrt(1+slope*slope));
				}
				if (mouseY > oldMouseY) //greater value is down
				{
					southY[i] = northY[i] - Math.round((slope*chunkLength)/Math.sqrt(1+slope*slope));
				}
				else
				{
					southY[i] = northY[i] + Math.round((slope*chunkLength)/Math.sqrt(1+slope*slope));
				}
			}
		}
		draw2();
	}
}
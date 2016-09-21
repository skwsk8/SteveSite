// JavaScript - Steve Westhoff (c)2013

var interval = null;
var angle = 0;

function toggleDiv(divTarget,textBox)
{
	if (!interval)
	{
		var divToToggle=document.getElementById(divTarget);
		if (divToToggle)
		{
			if (divToToggle.style.display=="none")
			{
				divToToggle.style.display="block"
				document.getElementById(textBox).innerHTML="Less Work Experience";
				startRotation(true);
			}
			else
			{
				divToToggle.style.display="none"
				document.getElementById(textBox).innerHTML="More Work Experience";
				startRotation(false);
			}
		}
	}
}

function startRotation(openDir)
{
	if (openDir)
	{
		interval = setInterval(rotateOpen,30);
	}
	else
	{
		interval = setInterval(rotateClosed,30);
	}
}

function rotateOpen()
{
	angle += 5;
	document.getElementById("expandIcon").style.MozTransform="rotate("+angle+"deg)";
	document.getElementById("expandIcon").style.webkitTransform="rotate("+angle+"deg)";
	if (angle == 45) {endRotation();}
}

function rotateClosed()
{
	angle -= 5;
	document.getElementById("expandIcon").style.MozTransform="rotate("+angle+"deg)";
	document.getElementById("expandIcon").style.webkitTransform="rotate("+angle+"deg)";
	if (angle == 0) {endRotation();}
}

function endRotation()
{
	clearInterval(interval);
	interval = null;
}
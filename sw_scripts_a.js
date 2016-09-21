// JavaScript - Steve Westhoff (c)2013
var i = 0;
var len = 4;
var aboutTimer = null;

function updateAboutImg()
{
	i++;
	if (i > len){i = 1;}
	setImage();
	aboutTimer = setTimeout(updateAboutImg,5000);
}

function setImage()
{
	document.getElementById("aboutImg"+i).className = "fullOpac";
	document.getElementById("aboutImgText"+i).className = "fullOpac";
	for (var j = 1; j <= len; j++)
	{
		if (j != i && document.getElementById("aboutImg"+j).className == "fullOpac")
		{
			document.getElementById("aboutImg"+j).className = "";
			document.getElementById("aboutImgText"+j).className = "";
		}
	}
}

function prevImg()
{
	if (aboutTimer){clearTimeout(aboutTimer);}
	i -= 1;
	if (i < 1){i = len;}
	setImage();
	aboutTimer = setTimeout(updateAboutImg,8000);
}

function nextImg()
{
	if (aboutTimer){clearTimeout(aboutTimer);}
	i += 1;
	if (i > len){i = 1;}
	setImage();
	aboutTimer = setTimeout(updateAboutImg,8000);
}

function showArrows()
{
	aboutImgPrev.style.visibility = "visible";
	aboutImgNext.style.visibility = "visible";
}

function hideArrows()
{
	aboutImgPrev.style.visibility = "hidden";
	aboutImgNext.style.visibility = "hidden";
}
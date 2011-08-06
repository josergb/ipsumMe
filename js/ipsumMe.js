/* UTF-8/RT4 */

Array.prototype.unique = function() {
	var a = [];
	var l = this.length;
	for(var i=0; i<l; i++) {
		for(var j=i+1; j<l; j++) {
			if (this[i] === this[j])
				j = ++i;
		}
		a.push(this[i]);
	}
	return a;
};

var contentText = 'donec molestie purus non iaculis consectetur ante ante hendrerit nulla cursus dignissim metus neque eu erat aliquam dapibus diam gravida dapibus sollicitudin odio nisl pharetra sem a sodales ante lorem et diam pellentesque fermentum venenatis augue placerat tincidunt nisl lobortis sed aliquam ultricies sem tellus id condimentum eros in in elit adipiscing sapien viverra commodo nam imperdiet augue a odio facilisis quis posuere lectus ultricies curabitur lacinia mauris non risus varius sollicitudin curabitur placerat placerat euismod etiam id nisl erat vivamus non velit quam taliquet dolor etiam lacinia dignissim consequat vivamus quis nisi elit mauris scelerisque nulla eget mollis dictum erat lorem sollicitudin neque nec consequat purus tortor non dui maecenas aliquet feugiat lacus vitae pharetra lectus rutrum id';

var arrayWords	 			= contentText.split(' ').unique();
var textOut					= new String;
var numberMaxWordList		= 8;
var numberMaxWordParragraph = 100;
var numberMaxWordHead		= 5;

var debug = function(message) {
	var indentation = '   ';
	console.info(message);
};

var setOpacity = function(div, value) {
	div.style.opacity = value;
	div.style.MozOpacity = value;
	div.style.KhtmlOpacity = value;
	div.style.filter = 'alpha(opacity=' + value*100 + ')';
	div.style.zoom = 1;
};

var transicion = function(start, end, seconds) {
	var _this = this;
	this.test = 0;
	if (_this.interval)
		clearInterval(_this.interval);
	if (this.val && Math.abs(end - _this.val) < 0.01)
		return;
	this.val =! this.val?start < 1 ?start + .0001:start:this.val;
	setOpacity(this, this.val);
	this.steps = (end-start) / 10;
	this.pausa = seconds * 10;
	this.interval = setInterval(
		function() {
			if(_this.test > 99 || Math.abs(end-_this.val) < 0.01)
				clearInterval(_this.interval);
			_this.test++;
			//document.getElementById("log").innerHTML = _this.test;
			_this.val = _this.val + _this.steps;
			if(_this.val <= .01)
				_this.style.display='none';
			else
				_this.style.display='block';
			setOpacity(_this, _this.val);
		} ,this.pausa);
};

var createWord = function(userText, start) {
	if (!userText) return arrayWords[Math.floor(Math.random() * arrayWords.length)] + ' ';
	if (start) return uppercase(userText) + ' ipsum dolor sit amet ';
	else return noUppercase(userText);
};

var uppercase = function(string) {
	return string.substr(0, 1).toUpperCase() + string.substr(1, string.length).toLowerCase();
};

var noUppercase = function(string) {
	return string.substr(0, 1).toLowerCase() + string.substr(1, string.length).toLowerCase();
};

var isPoint = function(ultimate) {
	if (!ultimate) return (createWord().trim() + '. ' + uppercase(createWord()));
	else return (createWord().trim() + '.');
};

var isComma = function(userText) {
	return (createWord().trim() + ', ' + createWord(userText));
};

var isHtml = function(typeElement, stringHtml, levelHead) {
	switch(typeElement) {
		case numberMaxWordList:
			return stringHtml = '<li>' + stringHtml + '</li>';
			break;
		case numberMaxWordParragraph:
			return stringHtml = '<p>' + stringHtml + '</p>';
			break;
		case numberMaxWordHead:
			return stringHtml = '<h' + levelHead + '>' + stringHtml + '</h' + levelHead + '>'
			break;
	}
};

var addDom = function(nameDiv, nameDivFather, addText) {
	var insertElement = document.createElement('textarea');
	insertElement.setAttribute ('id', nameDiv);
	insertElement.setAttribute ('cols', 100);
	insertElement.setAttribute ('rows', 20);
	insertElement.innerHTML = addText;
	document.getElementById(nameDivFather).appendChild(insertElement);
	transicion.call(document.getElementById(nameDiv), 0, 1, 3);
};

var removeDom = function(nameDiv, nameDivFather) {
	var removeFather = document.getElementById(nameDivFather);
	transicion.call(document.getElementById(nameDiv), 1, 0, 3);
	removeFather.removeChild(document.getElementById(nameDiv));
};

var insert = function(string, nameWorkDiv, nameWorkDivFather) {
	if (document.getElementById(nameWorkDiv)) {
		removeDom (nameWorkDiv, nameWorkDivFather);
		addDom (nameWorkDiv, nameWorkDivFather, string);
	} else {
		addDom (nameWorkDiv, nameWorkDivFather, string);
	};
};

var constructorIpsum = function() {
	confOut = {
		forRelative: {
			html			: document.userConf.html[0].checked 		? true : '',
			thisStart		: document.userConf.thisStart[0].checked	? true : '',
			numberRepeat	: document.userConf.numberRepeat.value,
			userText		: document.userConf.userText.value,
			head			: document.userConf.lineHead.value,
			typeElement 	: {
				isList  	: document.userConf.typeElement.value == 'list' 		? numberMaxWords = numberMaxWordList  		: false,
				isParragraph: document.userConf.typeElement.value == 'parragraph' 	? numberMaxWords = numberMaxWordParragraph	: false,
				isHead  	: document.userConf.typeElement.value == 'head'			? numberMaxWords = numberMaxWordHead	 	: false
			}
		},
		forStatic: {
			textParraf		: new String,
			numberPoint 	: 8.8,
			numberComma		: 8,
			numberView		: 3,
			numberFrecuency	: 4,
			nameFatherDiv	: 'resultado',
			nameDivResult	: 'contenido'
		}
	};

	confRelative 	 = confOut.forRelative;
	confStatic	 	 = confOut.forStatic; 
	typeElementendal = confRelative.typeElement.isList || confRelative.typeElement.isParragraph || confRelative.typeElement.isHead

	for (i = 0; i < confRelative.numberRepeat; i++) {
		if (!i && confRelative.thisStart) {
			confStatic.textParraf 	+= createWord(confRelative.userText, true);
			var thisStart			= 0;
			confStatic.numberView	-= 1;
		}
		for (j = 0; j < numberMaxWords - 1; j++) {
			var randomNumber = Math.floor(Math.random() * arrayWords.length);
			if (!j) {
				if (!thisStart && confRelative.thisStart) {
					confStatic.textParraf += createWord();
					thisStart++;
				} else {
					confStatic.textParraf += uppercase(createWord());	
				}
			} else {
				if (randomNumber % confStatic.numberPoint == confStatic.numberFrecuency && !confRelative.typeElement.isList && !confRelative.typeElement.isHead) confStatic.textParraf += isPoint();
				if (randomNumber % confStatic.numberPoint == confStatic.numberFrecuency + 2 && confStatic.numberView) {
					confStatic.textParraf 	+= createWord(confRelative.userText) + ' ';
					confStatic.numberView	-= 1;
				}
				if (randomNumber % confStatic.numberView == confStatic.numberFrecuency && !confRelative.typeElement.isList && !confRelative.typeElement.isHead) confStatic.textParraf += isComma();
				else confStatic.textParraf += createWord();
			};
		};

		confStatic.textParraf += isPoint(true);

		if (confRelative.html && confRelative.typeElement.isHead) textOut += isHtml(typeElementendal, confStatic.textParraf, confRelative.head) + '\n\n';
		else if (confRelative.html) textOut += isHtml(typeElementendal, confStatic.textParraf) + '\n\n';
		else textOut += confStatic.textParraf + '\n\n';

		confStatic.textParraf = '';
	}

	insert(textOut, confStatic.nameDivResult, confStatic.nameFatherDiv);
	textOut = '';	
};
/*
* Potfolio
*/

function init() 
{
	/*
	* Create links
	* @Obj: arg1 name, arg2, url
	*/

	var s_aElements = {
		'Blogg': '#',
		'Cv' : '#Cv'
	};
	
	for (var i in s_aElements) {

		var c_oEleLi = document.createElement('li');
		var c_oEleA = document.createElement('a');
		var c_oText = document.createTextNode(i);
		
		c_oEleA.setAttribute('href', s_aElements[i]);
		c_oEleA.setAttribute('id', i);
		c_oEleA.appendChild(c_oText);
		c_oEleLi.appendChild(c_oEleA);
		
		document.getElementById('menu').appendChild(c_oEleLi);
	
	}

}

/*
* Target link
*/

function initSmoothScrolling() {

    var duration = 400;
    var pageUrl = location.hash
        ? stripHash(location.href)
        : location.href
    ;
    
    delegatedLinkHijacking();
    //directLinkHijacking();
    
    function delegatedLinkHijacking() {
        document.body.addEventListener('click', onClick, false);
        
        function onClick(e) {
            if (!isInPageLink(e.target))
                return;
            
            e.stopPropagation();
            e.preventDefault();
            
            jump(e.target.hash, {
                duration: duration,
                callback: function() {
                    setFocus(e.target.hash);
                }
            });
        }
    }

    function directLinkHijacking() {
        [].slice.call(document.querySelectorAll('a'))
            .filter(isInPageLink)
            .forEach(function(a) { a.addEventListener('click', onClick, false); })
        ;
            
        function onClick(e) {
            e.stopPropagation();
            e.preventDefault();
            
            jump(e.target.hash, {
                duration: duration
            });
        }
        
    }

    function isInPageLink(n) {
        return n.tagName.toLowerCase() === 'a' 
            && n.hash.length > 0
            && stripHash(n.href) === pageUrl
        ;
    }
        
    function stripHash(url) {
        return url.slice(0, url.lastIndexOf('#'));
    }
    
    function isCssSmoothSCrollSupported() {
        return 'scrollBehavior' in document.documentElement.style;
    }

    // Adapted from:
    // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
    function setFocus(hash) {
        var element = document.getElementById(hash.substring(1));

        if (element) {
            if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
                element.tabIndex = -1;
            }

            element.focus();
        }
    }
}

/*
* Smooth scrolling
*/

function jump(target, options) {
    var 
        start = window.pageYOffset,
        opt = {
            duration: options.duration,
            offset: options.offset || 0,
            callback: options.callback,
            easing: options.easing || easeInOutQuad
        },
        distance = typeof target === 'string'
            ? opt.offset + document.querySelector(target).getBoundingClientRect().top
            : target,
        duration = typeof opt.duration === 'function'
            ? opt.duration(distance)
            : opt.duration,
        timeStart, timeElapsed
    ;
    
    requestAnimationFrame(function(time) { timeStart = time; loop(time); });
    
    function loop(time) {
        timeElapsed = time - timeStart;

        window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

        if (timeElapsed < duration)
            requestAnimationFrame(loop)
        else
            end();
    }

    function end() {
        window.scrollTo(0, start + distance);

        if (typeof opt.callback === 'function')
            opt.callback();
    }
    
    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
    function easeInOutQuad(t, b, c, d)  {
        t /= d / 2
        if(t < 1) return c / 2 * t * t + b
        t--
        return -c / 2 * (t * (t - 2) - 1) + b
    }
 
}


document.addEventListener('DOMContentLoaded', function() {
	initSmoothScrolling();
	init();

	document.getElementById("Cv").onclick = function(){
  		window.open(
  			'http://'+window.location.host+'/Portfolio/wp-content/uploads/2016/09/Pontus.Pettersson.Cv_.pdf', '_blank'
		).focus();
	};
    
    var oFooter = document.querySelector("footer").offsetHeight;
    
    if(document.getElementById('push').clientHeight <= oFooter) {
        document.getElementById('push').style.height = oFooter*2+'px';
    }

    var oProjekt = document.querySelectorAll("#mina-projekt a");
    for (var i = 0; i < oProjekt.length; i++) {
        oProjekt[i].setAttribute('target', '_blank');
    }
      

});

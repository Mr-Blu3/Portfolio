document.addEventListener("DOMContentLoaded", function() {
	visualNavigation({
        'Work Experience': '#resume',
		'About me': '#team',
        'Portfolio': '#portfolio',
		'Contact': '#contact',
		'Resume/Cv': '#',
	});
	
	initSmoothScrolling();
	
    FadeInNav();
     
    
    /*
    * Run mob js
    */


    var Ele_oAresume = document.getElementsByClassName("resume-Cv");
    
    for (var i = 0; i < Ele_oAresume.length; i++) {
    
        Ele_oAresume[i].onclick = function(){
            window.open(
                'http://'+window.location.host+window.location.pathname+'wp-content/themes/enigma-parallax/images/resume-cv.pdf', '_blank'
            ).focus();
        }

    }


}, false);

function FadeInNav() 
{
	var h_li = document.getElementById('menu-nav').getElementsByTagName("li");
	var count = 0;
    	
    setInterval(function() { 
		
		
		for (var i = 0; i < h_li.length; i++) {
			
			if (i === count) {
		       h_li[i].style.opacity = '1';
               h_li[i].className = 'animated bounceInUp';
			}

		}
        
		if (h_li.length < count) return; 	

		count++;
	}, 250);
}

function visualNavigation(oNavBar)
{
	
	var aInsert = [];
	
	var oFrag = document.createDocumentFragment();
	var c_oUl = document.createElement('ul');
	
	c_oUl.id = 'menu-nav';
	c_oUl.className = 'nav navbar-nav';
	
	for (var i in oNavBar) {
		
		var c_oLi = document.createElement('li');
		var c_oA = document.createElement('a');
		var c_oText = document.createTextNode(i);
		
        if (oNavBar[i] === '#') {
            c_oA.className = 'resume-Cv';
            c_oA.target = '_blank';
        }


		c_oA.href = oNavBar[i];

		c_oA.appendChild(c_oText);
		c_oLi.appendChild(c_oA);
		c_oUl.appendChild(c_oLi);
		oFrag.appendChild(c_oUl);
	}

	document.getElementById('menu').appendChild(oFrag);

}

/*
* Remove classes when mob is going in
*/

function mobNavbar() 
{

}

/*
* Make it scroll down
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

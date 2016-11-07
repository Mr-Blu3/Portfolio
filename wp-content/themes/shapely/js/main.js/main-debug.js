(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * customizer.js
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

( function( $ ) {
	// Site title and description.
	wp.customize( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.site-title' ).text( to );
		} );
	} );
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		} );
	} );
	// Header text color.
	wp.customize( 'header_textcolor', function( value ) {
		value.bind( function( to ) {
			if ( 'blank' === to ) {
				$( '.site-title a, .site-description' ).css( {
					'clip': 'rect(1px, 1px, 1px, 1px)',
					'position': 'absolute'
				} );
			} else {
				$( '.site-title a, .site-description' ).css( {
					'clip': 'auto',
					'position': 'relative'
				} );
				$( '.site-title a, .site-description' ).css( {
					'color': to
				} );
			}
		} );
	} );
} )( jQuery );

},{}],2:[function(require,module,exports){
/*
 * jQuery FlexSlider v2.6.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
! function($) {
    var e = !0;
    $.flexslider = function(t, a) {
        var n = $(t);
        n.vars = $.extend({}, $.flexslider.defaults, a);
        var i = n.vars.namespace,
            s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            r = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && n.vars.touch,
            o = "click touchend MSPointerUp keyup",
            l = "",
            c, d = "vertical" === n.vars.direction,
            u = n.vars.reverse,
            v = n.vars.itemWidth > 0,
            p = "fade" === n.vars.animation,
            m = "" !== n.vars.asNavFor,
            f = {};
        $.data(t, "flexslider", n), f = {
            init: function() {
                n.animating = !1, n.currentSlide = parseInt(n.vars.startAt ? n.vars.startAt : 0, 10), isNaN(n.currentSlide) && (n.currentSlide = 0), n.animatingTo = n.currentSlide, n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last, n.containerSelector = n.vars.selector.substr(0, n.vars.selector.search(" ")), n.slides = $(n.vars.selector, n), n.container = $(n.containerSelector, n), n.count = n.slides.length, n.syncExists = $(n.vars.sync).length > 0, "slide" === n.vars.animation && (n.vars.animation = "swing"), n.prop = d ? "top" : "marginLeft", n.args = {}, n.manualPause = !1, n.stopped = !1, n.started = !1, n.startTimeout = null, n.transitions = !n.vars.video && !p && n.vars.useCSS && function() {
                    var e = document.createElement("div"),
                        t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var a in t)
                        if (void 0 !== e.style[t[a]]) return n.pfx = t[a].replace("Perspective", "").toLowerCase(), n.prop = "-" + n.pfx + "-transform", !0;
                    return !1
                }(), n.ensureAnimationEnd = "", "" !== n.vars.controlsContainer && (n.controlsContainer = $(n.vars.controlsContainer).length > 0 && $(n.vars.controlsContainer)), "" !== n.vars.manualControls && (n.manualControls = $(n.vars.manualControls).length > 0 && $(n.vars.manualControls)), "" !== n.vars.customDirectionNav && (n.customDirectionNav = 2 === $(n.vars.customDirectionNav).length && $(n.vars.customDirectionNav)), n.vars.randomize && (n.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }), n.container.empty().append(n.slides)), n.doMath(), n.setup("init"), n.vars.controlNav && f.controlNav.setup(), n.vars.directionNav && f.directionNav.setup(), n.vars.keyboard && (1 === $(n.containerSelector).length || n.vars.multipleKeyboard) && $(document).bind("keyup", function(e) {
                    var t = e.keyCode;
                    if (!n.animating && (39 === t || 37 === t)) {
                        var a = 39 === t ? n.getTarget("next") : 37 === t ? n.getTarget("prev") : !1;
                        n.flexAnimate(a, n.vars.pauseOnAction)
                    }
                }), n.vars.mousewheel && n.bind("mousewheel", function(e, t, a, i) {
                    e.preventDefault();
                    var s = 0 > t ? n.getTarget("next") : n.getTarget("prev");
                    n.flexAnimate(s, n.vars.pauseOnAction)
                }), n.vars.pausePlay && f.pausePlay.setup(), n.vars.slideshow && n.vars.pauseInvisible && f.pauseInvisible.init(), n.vars.slideshow && (n.vars.pauseOnHover && n.hover(function() {
                    n.manualPlay || n.manualPause || n.pause()
                }, function() {
                    n.manualPause || n.manualPlay || n.stopped || n.play()
                }), n.vars.pauseInvisible && f.pauseInvisible.isHidden() || (n.vars.initDelay > 0 ? n.startTimeout = setTimeout(n.play, n.vars.initDelay) : n.play())), m && f.asNav.setup(), r && n.vars.touch && f.touch(), (!p || p && n.vars.smoothHeight) && $(window).bind("resize orientationchange focus", f.resize), n.find("img").attr("draggable", "false"), setTimeout(function() {
                    n.vars.start(n)
                }, 200)
            },
            asNav: {
                setup: function() {
                    n.asNav = !0, n.animatingTo = Math.floor(n.currentSlide / n.move), n.currentItem = n.currentSlide, n.slides.removeClass(i + "active-slide").eq(n.currentItem).addClass(i + "active-slide"), s ? (t._slider = n, n.slides.each(function() {
                        var e = this;
                        e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function(e) {
                            e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                        }, !1), e.addEventListener("MSGestureTap", function(e) {
                            e.preventDefault();
                            var t = $(this),
                                a = t.index();
                            $(n.vars.asNavFor).data("flexslider").animating || t.hasClass("active") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : n.slides.on(o, function(e) {
                        e.preventDefault();
                        var t = $(this),
                            a = t.index(),
                            s = t.offset().left - $(n).scrollLeft();
                        0 >= s && t.hasClass(i + "active-slide") ? n.flexAnimate(n.getTarget("prev"), !0) : $(n.vars.asNavFor).data("flexslider").animating || t.hasClass(i + "active-slide") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    n.manualControls ? f.controlNav.setupManual() : f.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var e = "thumbnails" === n.vars.controlNav ? "control-thumbs" : "control-paging",
                        t = 1,
                        a, s;
                    if (n.controlNavScaffold = $('<ol class="' + i + "control-nav " + i + e + '"></ol>'), n.pagingCount > 1)
                        for (var r = 0; r < n.pagingCount; r++) {
                            if (s = n.slides.eq(r), void 0 === s.attr("data-thumb-alt") && s.attr("data-thumb-alt", ""), altText = "" !== s.attr("data-thumb-alt") ? altText = ' alt="' + s.attr("data-thumb-alt") + '"' : "", a = "thumbnails" === n.vars.controlNav ? '<img src="' + s.attr("data-thumb") + '"' + altText + "/>" : '<a href="#">' + t + "</a>", "thumbnails" === n.vars.controlNav && !0 === n.vars.thumbCaptions) {
                                var c = s.attr("data-thumbcaption");
                                "" !== c && void 0 !== c && (a += '<span class="' + i + 'caption">' + c + "</span>")
                            }
                            n.controlNavScaffold.append("<li>" + a + "</li>"), t++
                        }
                    n.controlsContainer ? $(n.controlsContainer).append(n.controlNavScaffold) : n.append(n.controlNavScaffold), f.controlNav.set(), f.controlNav.active(), n.controlNavScaffold.delegate("a, img", o, function(e) {
                        if (e.preventDefault(), "" === l || l === e.type) {
                            var t = $(this),
                                a = n.controlNav.index(t);
                            t.hasClass(i + "active") || (n.direction = a > n.currentSlide ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction))
                        }
                        "" === l && (l = e.type), f.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    n.controlNav = n.manualControls, f.controlNav.active(), n.controlNav.bind(o, function(e) {
                        if (e.preventDefault(), "" === l || l === e.type) {
                            var t = $(this),
                                a = n.controlNav.index(t);
                            t.hasClass(i + "active") || (a > n.currentSlide ? n.direction = "next" : n.direction = "prev", n.flexAnimate(a, n.vars.pauseOnAction))
                        }
                        "" === l && (l = e.type), f.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var e = "thumbnails" === n.vars.controlNav ? "img" : "a";
                    n.controlNav = $("." + i + "control-nav li " + e, n.controlsContainer ? n.controlsContainer : n)
                },
                active: function() {
                    n.controlNav.removeClass(i + "active").eq(n.animatingTo).addClass(i + "active")
                },
                update: function(e, t) {
                    n.pagingCount > 1 && "add" === e ? n.controlNavScaffold.append($('<li><a href="#">' + n.count + "</a></li>")) : 1 === n.pagingCount ? n.controlNavScaffold.find("li").remove() : n.controlNav.eq(t).closest("li").remove(), f.controlNav.set(), n.pagingCount > 1 && n.pagingCount !== n.controlNav.length ? n.update(t, e) : f.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var e = $('<ul class="' + i + 'direction-nav"><li class="' + i + 'nav-prev"><a class="' + i + 'prev" href="#">' + n.vars.prevText + '</a></li><li class="' + i + 'nav-next"><a class="' + i + 'next" href="#">' + n.vars.nextText + "</a></li></ul>");
                    n.customDirectionNav ? n.directionNav = n.customDirectionNav : n.controlsContainer ? ($(n.controlsContainer).append(e), n.directionNav = $("." + i + "direction-nav li a", n.controlsContainer)) : (n.append(e), n.directionNav = $("." + i + "direction-nav li a", n)), f.directionNav.update(), n.directionNav.bind(o, function(e) {
                        e.preventDefault();
                        var t;
                        ("" === l || l === e.type) && (t = $(this).hasClass(i + "next") ? n.getTarget("next") : n.getTarget("prev"), n.flexAnimate(t, n.vars.pauseOnAction)), "" === l && (l = e.type), f.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var e = i + "disabled";
                    1 === n.pagingCount ? n.directionNav.addClass(e).attr("tabindex", "-1") : n.vars.animationLoop ? n.directionNav.removeClass(e).removeAttr("tabindex") : 0 === n.animatingTo ? n.directionNav.removeClass(e).filter("." + i + "prev").addClass(e).attr("tabindex", "-1") : n.animatingTo === n.last ? n.directionNav.removeClass(e).filter("." + i + "next").addClass(e).attr("tabindex", "-1") : n.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var e = $('<div class="' + i + 'pauseplay"><a href="#"></a></div>');
                    n.controlsContainer ? (n.controlsContainer.append(e), n.pausePlay = $("." + i + "pauseplay a", n.controlsContainer)) : (n.append(e), n.pausePlay = $("." + i + "pauseplay a", n)), f.pausePlay.update(n.vars.slideshow ? i + "pause" : i + "play"), n.pausePlay.bind(o, function(e) {
                        e.preventDefault(), ("" === l || l === e.type) && ($(this).hasClass(i + "pause") ? (n.manualPause = !0, n.manualPlay = !1, n.pause()) : (n.manualPause = !1, n.manualPlay = !0, n.play())), "" === l && (l = e.type), f.setToClearWatchedEvent()
                    })
                },
                update: function(e) {
                    "play" === e ? n.pausePlay.removeClass(i + "pause").addClass(i + "play").html(n.vars.playText) : n.pausePlay.removeClass(i + "play").addClass(i + "pause").html(n.vars.pauseText)
                }
            },
            touch: function() {
                function e(e) {
                    e.stopPropagation(), n.animating ? e.preventDefault() : (n.pause(), t._gesture.addPointer(e.pointerId), T = 0, c = d ? n.h : n.w, f = Number(new Date), l = v && u && n.animatingTo === n.last ? 0 : v && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : v && n.currentSlide === n.last ? n.limit : v ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * c : (n.currentSlide + n.cloneOffset) * c)
                }

                function a(e) {
                    e.stopPropagation();
                    var a = e.target._slider;
                    if (a) {
                        var n = -e.translationX,
                            i = -e.translationY;
                        return T += d ? i : n, m = T, x = d ? Math.abs(T) < Math.abs(-n) : Math.abs(T) < Math.abs(-i), e.detail === e.MSGESTURE_FLAG_INERTIA ? void setImmediate(function() {
                            t._gesture.stop()
                        }) : void((!x || Number(new Date) - f > 500) && (e.preventDefault(), !p && a.transitions && (a.vars.animationLoop || (m = T / (0 === a.currentSlide && 0 > T || a.currentSlide === a.last && T > 0 ? Math.abs(T) / c + 2 : 1)), a.setProps(l + m, "setTouch"))))
                    }
                }

                function i(e) {
                    e.stopPropagation();
                    var t = e.target._slider;
                    if (t) {
                        if (t.animatingTo === t.currentSlide && !x && null !== m) {
                            var a = u ? -m : m,
                                n = a > 0 ? t.getTarget("next") : t.getTarget("prev");
                            t.canAdvance(n) && (Number(new Date) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > c / 2) ? t.flexAnimate(n, t.vars.pauseOnAction) : p || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0)
                        }
                        r = null, o = null, m = null, l = null, T = 0
                    }
                }
                var r, o, l, c, m, f, g, h, S, x = !1,
                    y = 0,
                    b = 0,
                    T = 0;
                s ? (t.style.msTouchAction = "none", t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", e, !1), t._slider = n, t.addEventListener("MSGestureChange", a, !1), t.addEventListener("MSGestureEnd", i, !1)) : (g = function(e) {
                    n.animating ? e.preventDefault() : (window.navigator.msPointerEnabled || 1 === e.touches.length) && (n.pause(), c = d ? n.h : n.w, f = Number(new Date), y = e.touches[0].pageX, b = e.touches[0].pageY, l = v && u && n.animatingTo === n.last ? 0 : v && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : v && n.currentSlide === n.last ? n.limit : v ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * c : (n.currentSlide + n.cloneOffset) * c, r = d ? b : y, o = d ? y : b, t.addEventListener("touchmove", h, !1), t.addEventListener("touchend", S, !1))
                }, h = function(e) {
                    y = e.touches[0].pageX, b = e.touches[0].pageY, m = d ? r - b : r - y, x = d ? Math.abs(m) < Math.abs(y - o) : Math.abs(m) < Math.abs(b - o);
                    var t = 500;
                    (!x || Number(new Date) - f > t) && (e.preventDefault(), !p && n.transitions && (n.vars.animationLoop || (m /= 0 === n.currentSlide && 0 > m || n.currentSlide === n.last && m > 0 ? Math.abs(m) / c + 2 : 1), n.setProps(l + m, "setTouch")))
                }, S = function(e) {
                    if (t.removeEventListener("touchmove", h, !1), n.animatingTo === n.currentSlide && !x && null !== m) {
                        var a = u ? -m : m,
                            i = a > 0 ? n.getTarget("next") : n.getTarget("prev");
                        n.canAdvance(i) && (Number(new Date) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > c / 2) ? n.flexAnimate(i, n.vars.pauseOnAction) : p || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0)
                    }
                    t.removeEventListener("touchend", S, !1), r = null, o = null, m = null, l = null
                }, t.addEventListener("touchstart", g, !1))
            },
            resize: function() {
                !n.animating && n.is(":visible") && (v || n.doMath(), p ? f.smoothHeight() : v ? (n.slides.width(n.computedW), n.update(n.pagingCount), n.setProps()) : d ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal")) : (n.vars.smoothHeight && f.smoothHeight(), n.newSlides.width(n.computedW), n.setProps(n.computedW, "setTotal")))
            },
            smoothHeight: function(e) {
                if (!d || p) {
                    var t = p ? n : n.viewport;
                    e ? t.animate({
                        height: n.slides.eq(n.animatingTo).height()
                    }, e) : t.height(n.slides.eq(n.animatingTo).height())
                }
            },
            sync: function(e) {
                var t = $(n.vars.sync).data("flexslider"),
                    a = n.animatingTo;
                switch (e) {
                    case "animate":
                        t.flexAnimate(a, n.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        t.playing || t.asNav || t.play();
                        break;
                    case "pause":
                        t.pause()
                }
            },
            uniqueID: function(e) {
                return e.filter("[id]").add(e.find("[id]")).each(function() {
                    var e = $(this);
                    e.attr("id", e.attr("id") + "_clone")
                }), e
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var e = f.pauseInvisible.getHiddenProp();
                    if (e) {
                        var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(t, function() {
                            f.pauseInvisible.isHidden() ? n.startTimeout ? clearTimeout(n.startTimeout) : n.pause() : n.started ? n.play() : n.vars.initDelay > 0 ? setTimeout(n.play, n.vars.initDelay) : n.play()
                        })
                    }
                },
                isHidden: function() {
                    var e = f.pauseInvisible.getHiddenProp();
                    return e ? document[e] : !1
                },
                getHiddenProp: function() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++)
                        if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(c), c = setTimeout(function() {
                    l = ""
                }, 3e3)
            }
        }, n.flexAnimate = function(e, t, a, s, o) {
            if (n.vars.animationLoop || e === n.currentSlide || (n.direction = e > n.currentSlide ? "next" : "prev"), m && 1 === n.pagingCount && (n.direction = n.currentItem < e ? "next" : "prev"), !n.animating && (n.canAdvance(e, o) || a) && n.is(":visible")) {
                if (m && s) {
                    var l = $(n.vars.asNavFor).data("flexslider");
                    if (n.atEnd = 0 === e || e === n.count - 1, l.flexAnimate(e, !0, !1, !0, o), n.direction = n.currentItem < e ? "next" : "prev", l.direction = n.direction, Math.ceil((e + 1) / n.visible) - 1 === n.currentSlide || 0 === e) return n.currentItem = e, n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), !1;
                    n.currentItem = e, n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), e = Math.floor(e / n.visible)
                }
                if (n.animating = !0, n.animatingTo = e, t && n.pause(), n.vars.before(n), n.syncExists && !o && f.sync("animate"), n.vars.controlNav && f.controlNav.active(), v || n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), n.atEnd = 0 === e || e === n.last, n.vars.directionNav && f.directionNav.update(), e === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()), p) r ? (n.slides.eq(n.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), n.slides.eq(e).css({
                    opacity: 1,
                    zIndex: 2
                }), n.wrapup(c)) : (n.slides.eq(n.currentSlide).css({
                    zIndex: 1
                }).animate({
                    opacity: 0
                }, n.vars.animationSpeed, n.vars.easing), n.slides.eq(e).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, n.vars.animationSpeed, n.vars.easing, n.wrapup));
                else {
                    var c = d ? n.slides.filter(":first").height() : n.computedW,
                        g, h, S;
                    v ? (g = n.vars.itemMargin, S = (n.itemW + g) * n.move * n.animatingTo, h = S > n.limit && 1 !== n.visible ? n.limit : S) : h = 0 === n.currentSlide && e === n.count - 1 && n.vars.animationLoop && "next" !== n.direction ? u ? (n.count + n.cloneOffset) * c : 0 : n.currentSlide === n.last && 0 === e && n.vars.animationLoop && "prev" !== n.direction ? u ? 0 : (n.count + 1) * c : u ? (n.count - 1 - e + n.cloneOffset) * c : (e + n.cloneOffset) * c, n.setProps(h, "", n.vars.animationSpeed), n.transitions ? (n.vars.animationLoop && n.atEnd || (n.animating = !1, n.currentSlide = n.animatingTo), n.container.unbind("webkitTransitionEnd transitionend"), n.container.bind("webkitTransitionEnd transitionend", function() {
                        clearTimeout(n.ensureAnimationEnd), n.wrapup(c)
                    }), clearTimeout(n.ensureAnimationEnd), n.ensureAnimationEnd = setTimeout(function() {
                        n.wrapup(c)
                    }, n.vars.animationSpeed + 100)) : n.container.animate(n.args, n.vars.animationSpeed, n.vars.easing, function() {
                        n.wrapup(c)
                    })
                }
                n.vars.smoothHeight && f.smoothHeight(n.vars.animationSpeed)
            }
        }, n.wrapup = function(e) {
            p || v || (0 === n.currentSlide && n.animatingTo === n.last && n.vars.animationLoop ? n.setProps(e, "jumpEnd") : n.currentSlide === n.last && 0 === n.animatingTo && n.vars.animationLoop && n.setProps(e, "jumpStart")), n.animating = !1, n.currentSlide = n.animatingTo, n.vars.after(n)
        }, n.animateSlides = function() {
            !n.animating && e && n.flexAnimate(n.getTarget("next"))
        }, n.pause = function() {
            clearInterval(n.animatedSlides), n.animatedSlides = null, n.playing = !1, n.vars.pausePlay && f.pausePlay.update("play"), n.syncExists && f.sync("pause")
        }, n.play = function() {
            n.playing && clearInterval(n.animatedSlides), n.animatedSlides = n.animatedSlides || setInterval(n.animateSlides, n.vars.slideshowSpeed), n.started = n.playing = !0, n.vars.pausePlay && f.pausePlay.update("pause"), n.syncExists && f.sync("play")
        }, n.stop = function() {
            n.pause(), n.stopped = !0
        }, n.canAdvance = function(e, t) {
            var a = m ? n.pagingCount - 1 : n.last;
            return t ? !0 : m && n.currentItem === n.count - 1 && 0 === e && "prev" === n.direction ? !0 : m && 0 === n.currentItem && e === n.pagingCount - 1 && "next" !== n.direction ? !1 : e !== n.currentSlide || m ? n.vars.animationLoop ? !0 : n.atEnd && 0 === n.currentSlide && e === a && "next" !== n.direction ? !1 : n.atEnd && n.currentSlide === a && 0 === e && "next" === n.direction ? !1 : !0 : !1
        }, n.getTarget = function(e) {
            return n.direction = e, "next" === e ? n.currentSlide === n.last ? 0 : n.currentSlide + 1 : 0 === n.currentSlide ? n.last : n.currentSlide - 1
        }, n.setProps = function(e, t, a) {
            var i = function() {
                var a = e ? e : (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo,
                    i = function() {
                        if (v) return "setTouch" === t ? e : u && n.animatingTo === n.last ? 0 : u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : n.animatingTo === n.last ? n.limit : a;
                        switch (t) {
                            case "setTotal":
                                return u ? (n.count - 1 - n.currentSlide + n.cloneOffset) * e : (n.currentSlide + n.cloneOffset) * e;
                            case "setTouch":
                                return u ? e : e;
                            case "jumpEnd":
                                return u ? e : n.count * e;
                            case "jumpStart":
                                return u ? n.count * e : e;
                            default:
                                return e
                        }
                    }();
                return -1 * i + "px"
            }();
            n.transitions && (i = d ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", a = void 0 !== a ? a / 1e3 + "s" : "0s", n.container.css("-" + n.pfx + "-transition-duration", a), n.container.css("transition-duration", a)), n.args[n.prop] = i, (n.transitions || void 0 === a) && n.container.css(n.args), n.container.css("transform", i)
        }, n.setup = function(e) {
            if (p) n.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === e && (r ? n.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + n.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(n.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : 0 == n.vars.fadeFirstSlide ? n.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(n.currentSlide).css({
                zIndex: 2
            }).css({
                opacity: 1
            }) : n.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(n.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, n.vars.animationSpeed, n.vars.easing)), n.vars.smoothHeight && f.smoothHeight();
            else {
                var t, a;
                "init" === e && (n.viewport = $('<div class="' + i + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(n).append(n.container), n.cloneCount = 0, n.cloneOffset = 0, u && (a = $.makeArray(n.slides).reverse(), n.slides = $(a), n.container.empty().append(n.slides))), n.vars.animationLoop && !v && (n.cloneCount = 2, n.cloneOffset = 1, "init" !== e && n.container.find(".clone").remove(), n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), n.newSlides = $(n.vars.selector, n), t = u ? n.count - 1 - n.currentSlide + n.cloneOffset : n.currentSlide + n.cloneOffset, d && !v ? (n.container.height(200 * (n.count + n.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    n.newSlides.css({
                        display: "block"
                    }), n.doMath(), n.viewport.height(n.h), n.setProps(t * n.h, "init")
                }, "init" === e ? 100 : 0)) : (n.container.width(200 * (n.count + n.cloneCount) + "%"), n.setProps(t * n.computedW, "init"), setTimeout(function() {
                    n.doMath(), n.newSlides.css({
                        width: n.computedW,
                        marginRight: n.computedM,
                        "float": "left",
                        display: "block"
                    }), n.vars.smoothHeight && f.smoothHeight()
                }, "init" === e ? 100 : 0))
            }
            v || n.slides.removeClass(i + "active-slide").eq(n.currentSlide).addClass(i + "active-slide"), n.vars.init(n)
        }, n.doMath = function() {
            var e = n.slides.first(),
                t = n.vars.itemMargin,
                a = n.vars.minItems,
                i = n.vars.maxItems;
            n.w = void 0 === n.viewport ? n.width() : n.viewport.width(), n.h = e.height(), n.boxPadding = e.outerWidth() - e.width(), v ? (n.itemT = n.vars.itemWidth + t, n.itemM = t, n.minW = a ? a * n.itemT : n.w, n.maxW = i ? i * n.itemT - t : n.w, n.itemW = n.minW > n.w ? (n.w - t * (a - 1)) / a : n.maxW < n.w ? (n.w - t * (i - 1)) / i : n.vars.itemWidth > n.w ? n.w : n.vars.itemWidth, n.visible = Math.floor(n.w / n.itemW), n.move = n.vars.move > 0 && n.vars.move < n.visible ? n.vars.move : n.visible, n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1), n.last = n.pagingCount - 1, n.limit = 1 === n.pagingCount ? 0 : n.vars.itemWidth > n.w ? n.itemW * (n.count - 1) + t * (n.count - 1) : (n.itemW + t) * n.count - n.w - t) : (n.itemW = n.w, n.itemM = t, n.pagingCount = n.count, n.last = n.count - 1), n.computedW = n.itemW - n.boxPadding, n.computedM = n.itemM
        }, n.update = function(e, t) {
            n.doMath(), v || (e < n.currentSlide ? n.currentSlide += 1 : e <= n.currentSlide && 0 !== e && (n.currentSlide -= 1), n.animatingTo = n.currentSlide), n.vars.controlNav && !n.manualControls && ("add" === t && !v || n.pagingCount > n.controlNav.length ? f.controlNav.update("add") : ("remove" === t && !v || n.pagingCount < n.controlNav.length) && (v && n.currentSlide > n.last && (n.currentSlide -= 1, n.animatingTo -= 1), f.controlNav.update("remove", n.last))), n.vars.directionNav && f.directionNav.update()
        }, n.addSlide = function(e, t) {
            var a = $(e);
            n.count += 1, n.last = n.count - 1, d && u ? void 0 !== t ? n.slides.eq(n.count - t).after(a) : n.container.prepend(a) : void 0 !== t ? n.slides.eq(t).before(a) : n.container.append(a), n.update(t, "add"), n.slides = $(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.added(n)
        }, n.removeSlide = function(e) {
            var t = isNaN(e) ? n.slides.index($(e)) : e;
            n.count -= 1, n.last = n.count - 1, isNaN(e) ? $(e, n.slides).remove() : d && u ? n.slides.eq(n.last).remove() : n.slides.eq(e).remove(), n.doMath(), n.update(t, "remove"), n.slides = $(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.removed(n)
        }, f.init()
    }, $(window).blur(function(t) {
        e = !1
    }).focus(function(t) {
        e = !0
    }), $.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        customDirectionNav: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    }, $.fn.flexslider = function(e) {
        if (void 0 === e && (e = {}), "object" == typeof e) return this.each(function() {
            var t = $(this),
                a = e.selector ? e.selector : ".slides > li",
                n = t.find(a);
            1 === n.length && e.allowOneSlide === !0 || 0 === n.length ? (n.fadeIn(400), e.start && e.start(t)) : void 0 === t.data("flexslider") && new $.flexslider(this, e)
        });
        var t = $(this).data("flexslider");
        switch (e) {
            case "play":
                t.play();
                break;
            case "pause":
                t.pause();
                break;
            case "stop":
                t.stop();
                break;
            case "next":
                t.flexAnimate(t.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                t.flexAnimate(t.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof e && t.flexAnimate(e, !0)
        }
    }
}(jQuery);
},{}],3:[function(require,module,exports){
/**
 * CloneYa!: Plugin to clone form elements in a nested manner
 * @author Saurabh Shukla <saurabh@yapapaya.com>
 * http://hookrefineandtinker.com
 * License GNU/GPL & MIT
 */

(function ($) {

    "use strict";

    var name = "cloneya", defaults = {
        cloneThis: '.toclone',
        cloneButton: '.clone',
        deleteButton: '.delete',
        clonePosition: 'after',
        minimum: 1,
        // renaming limit
        maximum: 999, //setting it to a high number, by default

        //limit: 999,

        valueClone: false,
        dataClone: false,
        deepClone: false,
        serializeID: true,
        ignore: 'label.error',
        preserveChildCount: false
    };
    /**
     * Create the class CloneYa
     *
     * @class CloneYa
     * @classdesc Adds cloning functionality to element
     *
     * @param {String | Object} element - the clone wrapper
     *
     * @param {Object} options - options to initialise with
     *
     * @param {String} options.cloneThis - Selector for the  clone element
     * @param {String} options.cloneButton - Selector for the  clone button
     * @param {String} options.deleteButton - Selector for the  delete button
     *
     * @param {String} options.clonePosition - Where should the clone be added 'before' or 'after'
     *
     * @param {Number} options.limit - The maximum number of clones
     *
     * @param {Boolean} options.valueClone - Clone the input values as well?
     * @param {Boolean} options.dataClone - Clone the data attributes?
     * @param {Boolean} options.deepClone - Clone other data added to the jQuery object
     *
     * @param {Boolean} options.serializeID - Whether to serialize the IDs, automatically
     * @param {String} options.ignore - Selectors for clonables' elements that should not be cloned
     * @param {Boolean} options.defaultRender - Start with this number of clones, by default
     * @param {Boolean} options.preserveChildCount - whether to preserve the initial number of clone's child clones, works with nesting as well.
     *
     * @returns {_L13.CloneYa}
     */
    function CloneYa(element, options) {
        /**
         * regex for recalculating the ids
         *
         * @type RegExp
         */
        this.regex = /^(.*)(\d)+$/i;


        this.elem = element;

        this.$elem = $(element);

	this.elemClass = name + '-wrap';

        /**
         * creating a jQuery object, just in case
         *
         * @type @call;$
         */
        //var elem = $(element);


        /**
         * Support deprecated parameters
         */
        if (typeof options !== 'undefined') {
            if (typeof options.limit !== 'undefined' && options.limit > 0) {
                options.maximum = options.limit;
            }
        }

        /**
         * merge the passed options object with defaults
         *
         * @type @exp;$@call;extend
         */
        this.config = $.extend({}, defaults, options);


        /**
         *
         * @type @exp;elem@call;closestChild
         */
        this.clones = this.$elem.closestChild(this.config.cloneThis);

        this.init();

    }

    CloneYa.prototype = {
        init: function () {

            var $this = this;


            // add our classes
            $this.$elem.addClass($this.elemClass);
            $this.clones.addClass(name);

            // save the sibling count into data attr
            $this.clones.data('initialCount', $this.clones.length);

            //Now, what if the clone button and delete button are not contained in
            //the clonable?
            // add a click handler for the clone buttons
            $this.$elem.on('click.' + name, $this.config.cloneThis + '>' + $this.config.cloneButton, function (event) {
                event.preventDefault();
                event.stopPropagation();

                var toClone = $(this).closest($this.config.cloneThis);

                // this is just a wrapper for the custom clone event
                $this.$elem.triggerAll('clone_clone clone.' + name, [toClone]);
            });


            // the custom clone event
            $this.$elem.on('clone.' + name, function (event, toClone) {

                $this._cloneAndAppend(toClone);

            });

            // click handler for delete button
            $this.$elem.on('click.' + name, $this.config.cloneThis + '>' + $this.config.deleteButton, function (event) {
                event.preventDefault();
                event.stopPropagation();

                var toDelete = $(this).closest($this.config.cloneThis);
                // just a wrapper for delclone event
                $this.$elem.triggerAll('clone_delete delete.' + name, [toDelete]);
            });

            //  the delete clone event
            $this.$elem.on('delete.' + name, function (event, toDelete) {

                // get the count of all the sibling clones
                /**
                 *
                 * @type @exp;$todelete@call;closest@call;closestChild@pro;length
                 */
                var cloneCount = toDelete.closest('.' + $this.elemClass).closestChild($this.config.cloneThis).length;

                if (cloneCount > $this.config.minimum) {
                    // trigger hook
                    $this.$elem.triggerAll('clone_before_delete before_delete.' + name, [toDelete, cloneCount]);
                    $this.$elem.triggerHandler('remove.' + name, [toDelete]);
                    $this.$elem.triggerAll('clone_after_delete after_delete.' + name);

                }
                else {

                    $this.$elem.triggerHandler('minimum.' + name, $this.config.minimum, [toDelete]);


                    // First clone form can't be deleted, but the values should be removed from first form
                    // is this expected behaviour? especially since we use minimum?
                    toDelete.find('input, textarea, select').each(function () {
                        $this._clearForm($(this));
                    });

                }
            });



            $this.$elem.on('remove.' + name, function (event, toDelete) {
                $(toDelete).remove();

            });

        },
        _clean: function () {
            var $this = this;
            $this.$elem.removeClass(name + '-wrap');
            $this.clones.removeClass(name);
            $this.$elem.off('click.' + name, $this.config.cloneThis + '>' + $this.config.cloneButton);
            $this.$elem.off('click.' + name, $this.config.cloneThis + '>' + $this.config.deleteButton);
            $this.$elem.off('clone_clone clone_delete clone_before_delete clone.' + name + ' delete.' + name + ' before_delete.' + name);

        },
        destroy: function () {
            this._clean();
            this.$elem.removeData(name);
        },
        getOption: function () {
            return this.config;
        },
        setOption: function (lateOptions) {
            $.extend(this.config, lateOptions || {});
            this._clean();
            this.init();

        },
        _cloneAndAppend: function (toClone) {


            // get the count of all the sibling clones
            /**
             *
             * @type @exp;$toclone@call;closest@call;closestChild@pro;length
             */
            var cloneCount = toClone.closest('.' + this.elemClass).closestChild(this.config.cloneThis).length;


            // check if we've reached the maximum limit
            if (cloneCount < this.config.maximum) {

                // trigger a custom event for hooking in
                this.$elem.triggerAll('clone_before_clone before_clone.' + name, [toClone]);

                var newClone = this._cloneItem(toClone);



                // trigger custom event on the original element
                this.$elem.triggerAll('clone_after_clone after_clone.' + name, [toClone, newClone]);

                // add to our clones object
                this.clones.add(newClone);

                // trigger custom event on the new clone
                this.$elem.triggerAll('clone_before_append before_append.' + name, [toClone, newClone]);

                // get the position where the clone has to be added
                // and add the newclone
                if (this.config.clonePosition !== 'after') {
                    toClone.before(newClone);
                } else {
                    toClone.after(newClone);

                }

                if (this.config.ignore) {
                    newClone.find(this.config.ignore).remove();
                }

                // reformat the id attributes
                this._redoIDs();

                // trigger custom event for hooking
                this.$elem.triggerAll('clone_after_append after_append.' + name, [toClone, newClone]);
            } else {
                // trigger a custom event for hooking
                this.$elem.triggerAll('clone_limit maximum.' + name, this.config.maximum, [toClone]);
            }

        },
        _cloneItem: function (toClone) {
            var $this = this;

            // clone it
            /**
             *
             * @type @exp;$toclone@call;clone
             */
            var newClone = toClone.clone($this.config.dataClone, $this.config.deepClone);

            // we want to preserve the initial child count
            if ($this.config.preserveChildCount !== false) {
                // the child count only needs preservation if they are clonable.

                var originalChildren = toClone.find('.' + name + '-wrap');

                // for each wrapper
                newClone.find('.' + name + '-wrap').each(function (index) {

                    /**
                     *
                     * @type @call;jquery-cloneya_L8.$@call;closestChild
                     */
                    var inNewClone = $(this).closestChild('.' + name);

                    var inOriginal = $(originalChildren[index]).closestChild('.' + name);

                    /**
                     *
                     * @type @exp;inOriginal@call;data
                     */
                    var originalCount = inOriginal.data('initialCount');

                    /**
                     *
                     * @type @exp;inNewClone@call;slice
                     */
                    var $extra = inNewClone.slice(originalCount, inNewClone.length);

                    $extra.remove();

                    inNewClone.data('initial-count', originalCount);
                });

            }

            // get the form input
            newClone.find('input, textarea, select').each(function () {

                // check if the values need to be copied, if not empty them
                $this._clearForm($(this));

                // removed the portion taking care of the index
                // each case is specific and I'd rather leave it to the developer

                // custom event hook for index handling
                $this.$elem.triggerAll('clone_form_input form_input.' + name, [$(this), toClone, newClone]);
            });

            return newClone;

        },
        /*
         * Clear Form will used to clear the values of the form
         */
        /**
         *
         * @param {type} $el
         * @returns {undefined}
         */
        _clearForm: function ($el) {

            if (!this.config.valueClone && !$el.hasClass('noEmpty')) {

                if ($el.is(':checkbox') || $el.is(':radio')) {

                    $el.prop('checked', false);
                }
                else {
                    $el.val('');
                }

            }

        },
        /**
         * Redo the id attribute, serially
         */
        /**
         *
         * @returns {undefined}
         */
        _redoIDs: function () {

            var $this = this;

            // check if this even needs to be done
            if ($this.config.serializeID !== true) {
                return;
            }

            // get the id of the first clone (hoping to increment the ids)
            /**
             *
             * @type @exp;elem@call;find@call;first@call;attr
             */
            var mainid = $this.$elem.find($this.config.cloneThis).first().attr('id');

            $this.$elem.find($this.config.cloneThis).each(function (i) {

                var j;
                // assign the index to a string var for appending to the ids
                // 0 index will have no number at the end
                if (i !== 0) {
                    j = i;
                } else {
                    j = '';
                }

                // first modify the clone id
                if ($(this).attr('id')) {
                    $(this).attr('id', mainid + j);
                }

                var id, nId;
                // take all the elements inside the clone
                $(this).find('*').each(function () {

                    id = $(this).attr('id');
                    if (id) {
                        // match the id with the regex to get the string part
                        // separate from the number part
                        var match = id.match($this.regex);

                        // if there was a number
                        if (match && match.length === 3) {
                            // just take the string part
                            // add the new number to it
                            nId = id.replace(/\d+$/, "") + j;

                            $(this).attr('id', nId);
                        } else {
                            // else there was no number,
                            // this was earlier the first element
                            // just add the number to its id
                            nId = id + j;
                            $(this).attr('id', nId);
                        }
                    }

                    //update label
                    $(this).closest($this.config.cloneThis).find("label[for='" + id + "']").attr('for', nId);

                    if ($this.config.serializeIndex) {
                        var name = $(this).attr('name');
                        // This will increment the numeric array index for cloned field names
                        if (name) {
                            var matches = name.match(/\[([^}]+)\]/);

                            if (matches && matches.length >= 1) {

                                var st = name;
                                name = [].map.call(st, function (s, n) {
                                    return (!isNaN(+s) && st[n - 1] === '[' && st[n + 1] === ']') ? i : s;
                                }).join('');

                                $(this).attr('name', name);
                            }
                        }
                    }

                });
            });

        }


    };

    // add the cloneya to the global object
    /**
     *
     * @param {type} options
     * @returns {jquery-cloneya_L8.$.fn@call;each}
     */
    $.fn[name] = function (options)
    {
        var args = arguments;

        if (options === undefined || typeof options === 'object') {
            // Creates a new plugin instance, for each selected element, and
            // stores a reference withint the element's data
            return this.each(function () {
                if (!$.data(this, name)) {
                    $.data(this, name, new CloneYa(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            // Call a public pluguin method (not starting with an underscore) for each
            // selected element.
            if (Array.prototype.slice.call(args, 1).length === 0 && $.inArray(options, $.fn[name].getters) !== -1) {
                // If the user does not pass any arguments and the method allows to
                // work as a getter then break the chainability so we can return a value
                // instead the element reference.
                var instance = $.data(this[0], name);
                return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
            } else {
                // Invoke the speficied method on each selected element
                return this.each(function () {
                    var instance = $.data(this, name);
                    if (instance instanceof CloneYa && typeof instance[options] === 'function') {
                        instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                    }
                });
            }
        }
    };

    $.fn[name].getters = ['getOption'];



    /*
     * jquery.closestchild 0.1.1
     *
     * Author: Andrey Mikhaylov aka lolmaus
     * Email: lolmaus@gmail.com
     *
     */
    /**
     *
     * @param {type} selector
     * @returns {$}
     */
    $.fn.closestChild = function (selector) {
        var $children, $results;

        $children = this.children();

        if ($children.length === 0) {
            return $();
        }

        $results = $children.filter(selector);

        if ($results.length > 0) {
            return $results;
        } else {
            return $children.closestChild(selector);
        }
    };

    /*
     * TriggerAll, modified from stackoverflow
     * http://stackoverflow.com/questions/11850625/jquery-trigger-multiple-events
     */
    $.fn.extend({
        triggerAll: function (events, params) {
            var el = this, i, evts = events.split(' ');
            for (i = 0; i < evts.length; i += 1) {
                el.triggerHandler(evts[i], params);
            }
            return el;
        }
    });

})(jQuery);

},{}],4:[function(require,module,exports){
/*!
 * parallax.js v1.4.2 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */

;(function ( $, window, document, undefined ) {

  // Polyfill for requestAnimationFrame
  // via: https://gist.github.com/paulirish/1579671

  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
        || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());


  // Parallax Constructor

  function Parallax(element, options) {
    var self = this;

    if (typeof options == 'object') {
      delete options.refresh;
      delete options.render;
      $.extend(this, options);
    }

    this.$element = $(element);

    if (!this.imageSrc && this.$element.is('img')) {
      this.imageSrc = this.$element.attr('src');
    }

    var positions = (this.position + '').toLowerCase().match(/\S+/g) || [];

    if (positions.length < 1) {
      positions.push('center');
    }
    if (positions.length == 1) {
      positions.push(positions[0]);
    }

    if (positions[0] == 'top' || positions[0] == 'bottom' || positions[1] == 'left' || positions[1] == 'right') {
      positions = [positions[1], positions[0]];
    }

    if (this.positionX != undefined) positions[0] = this.positionX.toLowerCase();
    if (this.positionY != undefined) positions[1] = this.positionY.toLowerCase();

    self.positionX = positions[0];
    self.positionY = positions[1];

    if (this.positionX != 'left' && this.positionX != 'right') {
      if (isNaN(parseInt(this.positionX))) {
        this.positionX = 'center';
      } else {
        this.positionX = parseInt(this.positionX);
      }
    }

    if (this.positionY != 'top' && this.positionY != 'bottom') {
      if (isNaN(parseInt(this.positionY))) {
        this.positionY = 'center';
      } else {
        this.positionY = parseInt(this.positionY);
      }
    }

    this.position =
      this.positionX + (isNaN(this.positionX)? '' : 'px') + ' ' +
      this.positionY + (isNaN(this.positionY)? '' : 'px');

    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      if (this.imageSrc && this.iosFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position
        });
      }
      return this;
    }

    if (navigator.userAgent.match(/(Android)/)) {
      if (this.imageSrc && this.androidFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position
        });
      }
      return this;
    }

    this.$mirror = $('<div />').prependTo('body');

    var slider = this.$element.find('>.parallax-slider');
    var sliderExisted = false;

    if (slider.length == 0)
      this.$slider = $('<img />').prependTo(this.$mirror);
    else {
      this.$slider = slider.prependTo(this.$mirror)
      sliderExisted = true;
    }

    this.$mirror.addClass('parallax-mirror').css({
      visibility: 'hidden',
      zIndex: this.zIndex,
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden'
    });

    this.$slider.addClass('parallax-slider').one('load', function() {
      if (!self.naturalHeight || !self.naturalWidth) {
        self.naturalHeight = this.naturalHeight || this.height || 1;
        self.naturalWidth  = this.naturalWidth  || this.width  || 1;
      }
      self.aspectRatio = self.naturalWidth / self.naturalHeight;

      Parallax.isSetup || Parallax.setup();
      Parallax.sliders.push(self);
      Parallax.isFresh = false;
      Parallax.requestRender();
    });

    if (!sliderExisted)
      this.$slider[0].src = this.imageSrc;

    if (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || slider.length > 0) {
      this.$slider.trigger('load');
    }

  };


  // Parallax Instance Methods

  $.extend(Parallax.prototype, {
    speed:    0.2,
    bleed:    0,
    zIndex:   -100,
    iosFix:   true,
    androidFix: true,
    position: 'center',
    overScrollFix: false,

    refresh: function() {
      this.boxWidth        = this.$element.outerWidth();
      this.boxHeight       = this.$element.outerHeight() + this.bleed * 2;
      this.boxOffsetTop    = this.$element.offset().top - this.bleed;
      this.boxOffsetLeft   = this.$element.offset().left;
      this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;

      var winHeight = Parallax.winHeight;
      var docHeight = Parallax.docHeight;
      var maxOffset = Math.min(this.boxOffsetTop, docHeight - winHeight);
      var minOffset = Math.max(this.boxOffsetTop + this.boxHeight - winHeight, 0);
      var imageHeightMin = this.boxHeight + (maxOffset - minOffset) * (1 - this.speed) | 0;
      var imageOffsetMin = (this.boxOffsetTop - maxOffset) * (1 - this.speed) | 0;

      if (imageHeightMin * this.aspectRatio >= this.boxWidth) {
        this.imageWidth    = imageHeightMin * this.aspectRatio | 0;
        this.imageHeight   = imageHeightMin;
        this.offsetBaseTop = imageOffsetMin;

        var margin = this.imageWidth - this.boxWidth;

        if (this.positionX == 'left') {
          this.offsetLeft = 0;
        } else if (this.positionX == 'right') {
          this.offsetLeft = - margin;
        } else if (!isNaN(this.positionX)) {
          this.offsetLeft = Math.max(this.positionX, - margin);
        } else {
          this.offsetLeft = - margin / 2 | 0;
        }
      } else {
        this.imageWidth    = this.boxWidth;
        this.imageHeight   = this.boxWidth / this.aspectRatio | 0;
        this.offsetLeft    = 0;

        var margin = this.imageHeight - imageHeightMin;

        if (this.positionY == 'top') {
          this.offsetBaseTop = imageOffsetMin;
        } else if (this.positionY == 'bottom') {
          this.offsetBaseTop = imageOffsetMin - margin;
        } else if (!isNaN(this.positionY)) {
          this.offsetBaseTop = imageOffsetMin + Math.max(this.positionY, - margin);
        } else {
          this.offsetBaseTop = imageOffsetMin - margin / 2 | 0;
        }
      }
    },

    render: function() {
      var scrollTop    = Parallax.scrollTop;
      var scrollLeft   = Parallax.scrollLeft;
      var overScroll   = this.overScrollFix ? Parallax.overScroll : 0;
      var scrollBottom = scrollTop + Parallax.winHeight;

      if (this.boxOffsetBottom > scrollTop && this.boxOffsetTop <= scrollBottom) {
        this.visibility = 'visible';
        this.mirrorTop = this.boxOffsetTop  - scrollTop;
        this.mirrorLeft = this.boxOffsetLeft - scrollLeft;
        this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed);
      } else {
        this.visibility = 'hidden';
      }

      this.$mirror.css({
        transform: 'translate3d(0px, 0px, 0px)',
        visibility: this.visibility,
        top: this.mirrorTop - overScroll,
        left: this.mirrorLeft,
        height: this.boxHeight,
        width: this.boxWidth
      });

      this.$slider.css({
        transform: 'translate3d(0px, 0px, 0px)',
        position: 'absolute',
        top: this.offsetTop,
        left: this.offsetLeft,
        height: this.imageHeight,
        width: this.imageWidth,
        maxWidth: 'none'
      });
    }
  });


  // Parallax Static Methods

  $.extend(Parallax, {
    scrollTop:    0,
    scrollLeft:   0,
    winHeight:    0,
    winWidth:     0,
    docHeight:    1 << 30,
    docWidth:     1 << 30,
    sliders:      [],
    isReady:      false,
    isFresh:      false,
    isBusy:       false,

    setup: function() {
      if (this.isReady) return;

      var $doc = $(document), $win = $(window);

      var loadDimensions = function() {
        Parallax.winHeight = $win.height();
        Parallax.winWidth  = $win.width();
        Parallax.docHeight = $doc.height();
        Parallax.docWidth  = $doc.width();
      };

      var loadScrollPosition = function() {
        var winScrollTop  = $win.scrollTop();
        var scrollTopMax  = Parallax.docHeight - Parallax.winHeight;
        var scrollLeftMax = Parallax.docWidth  - Parallax.winWidth;
        Parallax.scrollTop  = Math.max(0, Math.min(scrollTopMax,  winScrollTop));
        Parallax.scrollLeft = Math.max(0, Math.min(scrollLeftMax, $win.scrollLeft()));
        Parallax.overScroll = Math.max(winScrollTop - scrollTopMax, Math.min(winScrollTop, 0));
      };

      $win.on('resize.px.parallax load.px.parallax', function() {
          loadDimensions();
          Parallax.isFresh = false;
          Parallax.requestRender();
        })
        .on('scroll.px.parallax load.px.parallax', function() {
          loadScrollPosition();
          Parallax.requestRender();
        });

      loadDimensions();
      loadScrollPosition();

      this.isReady = true;
    },

    configure: function(options) {
      if (typeof options == 'object') {
        delete options.refresh;
        delete options.render;
        $.extend(this.prototype, options);
      }
    },

    refresh: function() {
      $.each(this.sliders, function(){ this.refresh() });
      this.isFresh = true;
    },

    render: function() {
      this.isFresh || this.refresh();
      $.each(this.sliders, function(){ this.render() });
    },

    requestRender: function() {
      var self = this;

      if (!this.isBusy) {
        this.isBusy = true;
        window.requestAnimationFrame(function() {
          self.render();
          self.isBusy = false;
        });
      }
    },
    destroy: function(el){
      var i,
          parallaxElement = $(el).data('px.parallax');
      parallaxElement.$mirror.remove();
      for(i=0; i < this.sliders.length; i+=1){
        if(this.sliders[i] == parallaxElement){
          this.sliders.splice(i, 1);
        }
      }
      $(el).data('px.parallax', false);
      if(this.sliders.length === 0){
        $(window).off('scroll.px.parallax resize.px.parallax load.px.parallax');
        this.isReady = false;
        Parallax.isSetup = false;
      }
    }
  });


  // Parallax Plugin Definition

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var options = typeof option == 'object' && option;

      if (this == window || this == document || $this.is('body')) {
        Parallax.configure(options);
      }
      else if (!$this.data('px.parallax')) {
        options = $.extend({}, $this.data(), options);
        $this.data('px.parallax', new Parallax(this, options));
      }
      else if (typeof option == 'object')
      {
        $.extend($this.data('px.parallax'), options);
      }
      if (typeof option == 'string') {
        if(option == 'destroy'){
            Parallax['destroy'](this);
        }else{
          Parallax[option]();
        }
      }
    })
  };

  var old = $.fn.parallax;

  $.fn.parallax             = Plugin;
  $.fn.parallax.Constructor = Parallax;


  // Parallax No Conflict

  $.fn.parallax.noConflict = function () {
    $.fn.parallax = old;
    return this;
  };


  // Parallax Data-API

  $(document).on('ready.px.parallax.data-api', function () {
    $('[data-parallax="scroll"]').parallax();
  });

}(jQuery, window, document));

},{}],5:[function(require,module,exports){
/*
* Libs
*/

require ('./libs/jquery-cloneya.min'); 
require ('./libs/flexslider.min'); 
require ('./libs/parallax.min'); 
 
/*
* dev
*/

require ('./dev/flexslider'); 
require ('./dev/jquery-cloneya'); 
require ('./dev/parallax'); 
//require ('./dev/smooth-scroll'); 

  
 
/* 
* visules modules 
*/ 

require ('./portfolio'); 
require ('./customizer'); 
require ('./navigation'); 
require ('./shapely-scripts'); 
require ('./skip-link-focus-fix'); 
require ('./widget'); 
 
},{"./customizer":1,"./dev/flexslider":2,"./dev/jquery-cloneya":3,"./dev/parallax":4,"./libs/flexslider.min":6,"./libs/jquery-cloneya.min":7,"./libs/parallax.min":8,"./navigation":9,"./portfolio":10,"./shapely-scripts":11,"./skip-link-focus-fix":12,"./widget":13}],6:[function(require,module,exports){
/*
 * jQuery FlexSlider v2.6.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */!function($){var e=!0;$.flexslider=function(t,a){var n=$(t);n.vars=$.extend({},$.flexslider.defaults,a);var i=n.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,r=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&n.vars.touch,o="click touchend MSPointerUp keyup",l="",c,d="vertical"===n.vars.direction,u=n.vars.reverse,v=n.vars.itemWidth>0,p="fade"===n.vars.animation,m=""!==n.vars.asNavFor,f={};$.data(t,"flexslider",n),f={init:function(){n.animating=!1,n.currentSlide=parseInt(n.vars.startAt?n.vars.startAt:0,10),isNaN(n.currentSlide)&&(n.currentSlide=0),n.animatingTo=n.currentSlide,n.atEnd=0===n.currentSlide||n.currentSlide===n.last,n.containerSelector=n.vars.selector.substr(0,n.vars.selector.search(" ")),n.slides=$(n.vars.selector,n),n.container=$(n.containerSelector,n),n.count=n.slides.length,n.syncExists=$(n.vars.sync).length>0,"slide"===n.vars.animation&&(n.vars.animation="swing"),n.prop=d?"top":"marginLeft",n.args={},n.manualPause=!1,n.stopped=!1,n.started=!1,n.startTimeout=null,n.transitions=!n.vars.video&&!p&&n.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var a in t)if(void 0!==e.style[t[a]])return n.pfx=t[a].replace("Perspective","").toLowerCase(),n.prop="-"+n.pfx+"-transform",!0;return!1}(),n.ensureAnimationEnd="",""!==n.vars.controlsContainer&&(n.controlsContainer=$(n.vars.controlsContainer).length>0&&$(n.vars.controlsContainer)),""!==n.vars.manualControls&&(n.manualControls=$(n.vars.manualControls).length>0&&$(n.vars.manualControls)),""!==n.vars.customDirectionNav&&(n.customDirectionNav=2===$(n.vars.customDirectionNav).length&&$(n.vars.customDirectionNav)),n.vars.randomize&&(n.slides.sort(function(){return Math.round(Math.random())-.5}),n.container.empty().append(n.slides)),n.doMath(),n.setup("init"),n.vars.controlNav&&f.controlNav.setup(),n.vars.directionNav&&f.directionNav.setup(),n.vars.keyboard&&(1===$(n.containerSelector).length||n.vars.multipleKeyboard)&&$(document).bind("keyup",function(e){var t=e.keyCode;if(!n.animating&&(39===t||37===t)){var a=39===t?n.getTarget("next"):37===t?n.getTarget("prev"):!1;n.flexAnimate(a,n.vars.pauseOnAction)}}),n.vars.mousewheel&&n.bind("mousewheel",function(e,t,a,i){e.preventDefault();var s=0>t?n.getTarget("next"):n.getTarget("prev");n.flexAnimate(s,n.vars.pauseOnAction)}),n.vars.pausePlay&&f.pausePlay.setup(),n.vars.slideshow&&n.vars.pauseInvisible&&f.pauseInvisible.init(),n.vars.slideshow&&(n.vars.pauseOnHover&&n.hover(function(){n.manualPlay||n.manualPause||n.pause()},function(){n.manualPause||n.manualPlay||n.stopped||n.play()}),n.vars.pauseInvisible&&f.pauseInvisible.isHidden()||(n.vars.initDelay>0?n.startTimeout=setTimeout(n.play,n.vars.initDelay):n.play())),m&&f.asNav.setup(),r&&n.vars.touch&&f.touch(),(!p||p&&n.vars.smoothHeight)&&$(window).bind("resize orientationchange focus",f.resize),n.find("img").attr("draggable","false"),setTimeout(function(){n.vars.start(n)},200)},asNav:{setup:function(){n.asNav=!0,n.animatingTo=Math.floor(n.currentSlide/n.move),n.currentItem=n.currentSlide,n.slides.removeClass(i+"active-slide").eq(n.currentItem).addClass(i+"active-slide"),s?(t._slider=n,n.slides.each(function(){var e=this;e._gesture=new MSGesture,e._gesture.target=e,e.addEventListener("MSPointerDown",function(e){e.preventDefault(),e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1),e.addEventListener("MSGestureTap",function(e){e.preventDefault();var t=$(this),a=t.index();$(n.vars.asNavFor).data("flexslider").animating||t.hasClass("active")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})})):n.slides.on(o,function(e){e.preventDefault();var t=$(this),a=t.index(),s=t.offset().left-$(n).scrollLeft();0>=s&&t.hasClass(i+"active-slide")?n.flexAnimate(n.getTarget("prev"),!0):$(n.vars.asNavFor).data("flexslider").animating||t.hasClass(i+"active-slide")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){n.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var e="thumbnails"===n.vars.controlNav?"control-thumbs":"control-paging",t=1,a,s;if(n.controlNavScaffold=$('<ol class="'+i+"control-nav "+i+e+'"></ol>'),n.pagingCount>1)for(var r=0;r<n.pagingCount;r++){if(s=n.slides.eq(r),void 0===s.attr("data-thumb-alt")&&s.attr("data-thumb-alt",""),altText=""!==s.attr("data-thumb-alt")?altText=' alt="'+s.attr("data-thumb-alt")+'"':"",a="thumbnails"===n.vars.controlNav?'<img src="'+s.attr("data-thumb")+'"'+altText+"/>":'<a href="#">'+t+"</a>","thumbnails"===n.vars.controlNav&&!0===n.vars.thumbCaptions){var c=s.attr("data-thumbcaption");""!==c&&void 0!==c&&(a+='<span class="'+i+'caption">'+c+"</span>")}n.controlNavScaffold.append("<li>"+a+"</li>"),t++}n.controlsContainer?$(n.controlsContainer).append(n.controlNavScaffold):n.append(n.controlNavScaffold),f.controlNav.set(),f.controlNav.active(),n.controlNavScaffold.delegate("a, img",o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(n.direction=a>n.currentSlide?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},setupManual:function(){n.controlNav=n.manualControls,f.controlNav.active(),n.controlNav.bind(o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(a>n.currentSlide?n.direction="next":n.direction="prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},set:function(){var e="thumbnails"===n.vars.controlNav?"img":"a";n.controlNav=$("."+i+"control-nav li "+e,n.controlsContainer?n.controlsContainer:n)},active:function(){n.controlNav.removeClass(i+"active").eq(n.animatingTo).addClass(i+"active")},update:function(e,t){n.pagingCount>1&&"add"===e?n.controlNavScaffold.append($('<li><a href="#">'+n.count+"</a></li>")):1===n.pagingCount?n.controlNavScaffold.find("li").remove():n.controlNav.eq(t).closest("li").remove(),f.controlNav.set(),n.pagingCount>1&&n.pagingCount!==n.controlNav.length?n.update(t,e):f.controlNav.active()}},directionNav:{setup:function(){var e=$('<ul class="'+i+'direction-nav"><li class="'+i+'nav-prev"><a class="'+i+'prev" href="#">'+n.vars.prevText+'</a></li><li class="'+i+'nav-next"><a class="'+i+'next" href="#">'+n.vars.nextText+"</a></li></ul>");n.customDirectionNav?n.directionNav=n.customDirectionNav:n.controlsContainer?($(n.controlsContainer).append(e),n.directionNav=$("."+i+"direction-nav li a",n.controlsContainer)):(n.append(e),n.directionNav=$("."+i+"direction-nav li a",n)),f.directionNav.update(),n.directionNav.bind(o,function(e){e.preventDefault();var t;(""===l||l===e.type)&&(t=$(this).hasClass(i+"next")?n.getTarget("next"):n.getTarget("prev"),n.flexAnimate(t,n.vars.pauseOnAction)),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(){var e=i+"disabled";1===n.pagingCount?n.directionNav.addClass(e).attr("tabindex","-1"):n.vars.animationLoop?n.directionNav.removeClass(e).removeAttr("tabindex"):0===n.animatingTo?n.directionNav.removeClass(e).filter("."+i+"prev").addClass(e).attr("tabindex","-1"):n.animatingTo===n.last?n.directionNav.removeClass(e).filter("."+i+"next").addClass(e).attr("tabindex","-1"):n.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var e=$('<div class="'+i+'pauseplay"><a href="#"></a></div>');n.controlsContainer?(n.controlsContainer.append(e),n.pausePlay=$("."+i+"pauseplay a",n.controlsContainer)):(n.append(e),n.pausePlay=$("."+i+"pauseplay a",n)),f.pausePlay.update(n.vars.slideshow?i+"pause":i+"play"),n.pausePlay.bind(o,function(e){e.preventDefault(),(""===l||l===e.type)&&($(this).hasClass(i+"pause")?(n.manualPause=!0,n.manualPlay=!1,n.pause()):(n.manualPause=!1,n.manualPlay=!0,n.play())),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(e){"play"===e?n.pausePlay.removeClass(i+"pause").addClass(i+"play").html(n.vars.playText):n.pausePlay.removeClass(i+"play").addClass(i+"pause").html(n.vars.pauseText)}},touch:function(){function e(e){e.stopPropagation(),n.animating?e.preventDefault():(n.pause(),t._gesture.addPointer(e.pointerId),T=0,c=d?n.h:n.w,f=Number(new Date),l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c)}function a(e){e.stopPropagation();var a=e.target._slider;if(a){var n=-e.translationX,i=-e.translationY;return T+=d?i:n,m=T,x=d?Math.abs(T)<Math.abs(-n):Math.abs(T)<Math.abs(-i),e.detail===e.MSGESTURE_FLAG_INERTIA?void setImmediate(function(){t._gesture.stop()}):void((!x||Number(new Date)-f>500)&&(e.preventDefault(),!p&&a.transitions&&(a.vars.animationLoop||(m=T/(0===a.currentSlide&&0>T||a.currentSlide===a.last&&T>0?Math.abs(T)/c+2:1)),a.setProps(l+m,"setTouch"))))}}function i(e){e.stopPropagation();var t=e.target._slider;if(t){if(t.animatingTo===t.currentSlide&&!x&&null!==m){var a=u?-m:m,n=a>0?t.getTarget("next"):t.getTarget("prev");t.canAdvance(n)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?t.flexAnimate(n,t.vars.pauseOnAction):p||t.flexAnimate(t.currentSlide,t.vars.pauseOnAction,!0)}r=null,o=null,m=null,l=null,T=0}}var r,o,l,c,m,f,g,h,S,x=!1,y=0,b=0,T=0;s?(t.style.msTouchAction="none",t._gesture=new MSGesture,t._gesture.target=t,t.addEventListener("MSPointerDown",e,!1),t._slider=n,t.addEventListener("MSGestureChange",a,!1),t.addEventListener("MSGestureEnd",i,!1)):(g=function(e){n.animating?e.preventDefault():(window.navigator.msPointerEnabled||1===e.touches.length)&&(n.pause(),c=d?n.h:n.w,f=Number(new Date),y=e.touches[0].pageX,b=e.touches[0].pageY,l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c,r=d?b:y,o=d?y:b,t.addEventListener("touchmove",h,!1),t.addEventListener("touchend",S,!1))},h=function(e){y=e.touches[0].pageX,b=e.touches[0].pageY,m=d?r-b:r-y,x=d?Math.abs(m)<Math.abs(y-o):Math.abs(m)<Math.abs(b-o);var t=500;(!x||Number(new Date)-f>t)&&(e.preventDefault(),!p&&n.transitions&&(n.vars.animationLoop||(m/=0===n.currentSlide&&0>m||n.currentSlide===n.last&&m>0?Math.abs(m)/c+2:1),n.setProps(l+m,"setTouch")))},S=function(e){if(t.removeEventListener("touchmove",h,!1),n.animatingTo===n.currentSlide&&!x&&null!==m){var a=u?-m:m,i=a>0?n.getTarget("next"):n.getTarget("prev");n.canAdvance(i)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?n.flexAnimate(i,n.vars.pauseOnAction):p||n.flexAnimate(n.currentSlide,n.vars.pauseOnAction,!0)}t.removeEventListener("touchend",S,!1),r=null,o=null,m=null,l=null},t.addEventListener("touchstart",g,!1))},resize:function(){!n.animating&&n.is(":visible")&&(v||n.doMath(),p?f.smoothHeight():v?(n.slides.width(n.computedW),n.update(n.pagingCount),n.setProps()):d?(n.viewport.height(n.h),n.setProps(n.h,"setTotal")):(n.vars.smoothHeight&&f.smoothHeight(),n.newSlides.width(n.computedW),n.setProps(n.computedW,"setTotal")))},smoothHeight:function(e){if(!d||p){var t=p?n:n.viewport;e?t.animate({height:n.slides.eq(n.animatingTo).height()},e):t.height(n.slides.eq(n.animatingTo).height())}},sync:function(e){var t=$(n.vars.sync).data("flexslider"),a=n.animatingTo;switch(e){case"animate":t.flexAnimate(a,n.vars.pauseOnAction,!1,!0);break;case"play":t.playing||t.asNav||t.play();break;case"pause":t.pause()}},uniqueID:function(e){return e.filter("[id]").add(e.find("[id]")).each(function(){var e=$(this);e.attr("id",e.attr("id")+"_clone")}),e},pauseInvisible:{visProp:null,init:function(){var e=f.pauseInvisible.getHiddenProp();if(e){var t=e.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(t,function(){f.pauseInvisible.isHidden()?n.startTimeout?clearTimeout(n.startTimeout):n.pause():n.started?n.play():n.vars.initDelay>0?setTimeout(n.play,n.vars.initDelay):n.play()})}},isHidden:function(){var e=f.pauseInvisible.getHiddenProp();return e?document[e]:!1},getHiddenProp:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}},setToClearWatchedEvent:function(){clearTimeout(c),c=setTimeout(function(){l=""},3e3)}},n.flexAnimate=function(e,t,a,s,o){if(n.vars.animationLoop||e===n.currentSlide||(n.direction=e>n.currentSlide?"next":"prev"),m&&1===n.pagingCount&&(n.direction=n.currentItem<e?"next":"prev"),!n.animating&&(n.canAdvance(e,o)||a)&&n.is(":visible")){if(m&&s){var l=$(n.vars.asNavFor).data("flexslider");if(n.atEnd=0===e||e===n.count-1,l.flexAnimate(e,!0,!1,!0,o),n.direction=n.currentItem<e?"next":"prev",l.direction=n.direction,Math.ceil((e+1)/n.visible)-1===n.currentSlide||0===e)return n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),!1;n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),e=Math.floor(e/n.visible)}if(n.animating=!0,n.animatingTo=e,t&&n.pause(),n.vars.before(n),n.syncExists&&!o&&f.sync("animate"),n.vars.controlNav&&f.controlNav.active(),v||n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),n.atEnd=0===e||e===n.last,n.vars.directionNav&&f.directionNav.update(),e===n.last&&(n.vars.end(n),n.vars.animationLoop||n.pause()),p)r?(n.slides.eq(n.currentSlide).css({opacity:0,zIndex:1}),n.slides.eq(e).css({opacity:1,zIndex:2}),n.wrapup(c)):(n.slides.eq(n.currentSlide).css({zIndex:1}).animate({opacity:0},n.vars.animationSpeed,n.vars.easing),n.slides.eq(e).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing,n.wrapup));else{var c=d?n.slides.filter(":first").height():n.computedW,g,h,S;v?(g=n.vars.itemMargin,S=(n.itemW+g)*n.move*n.animatingTo,h=S>n.limit&&1!==n.visible?n.limit:S):h=0===n.currentSlide&&e===n.count-1&&n.vars.animationLoop&&"next"!==n.direction?u?(n.count+n.cloneOffset)*c:0:n.currentSlide===n.last&&0===e&&n.vars.animationLoop&&"prev"!==n.direction?u?0:(n.count+1)*c:u?(n.count-1-e+n.cloneOffset)*c:(e+n.cloneOffset)*c,n.setProps(h,"",n.vars.animationSpeed),n.transitions?(n.vars.animationLoop&&n.atEnd||(n.animating=!1,n.currentSlide=n.animatingTo),n.container.unbind("webkitTransitionEnd transitionend"),n.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(n.ensureAnimationEnd),n.wrapup(c)}),clearTimeout(n.ensureAnimationEnd),n.ensureAnimationEnd=setTimeout(function(){n.wrapup(c)},n.vars.animationSpeed+100)):n.container.animate(n.args,n.vars.animationSpeed,n.vars.easing,function(){n.wrapup(c)})}n.vars.smoothHeight&&f.smoothHeight(n.vars.animationSpeed)}},n.wrapup=function(e){p||v||(0===n.currentSlide&&n.animatingTo===n.last&&n.vars.animationLoop?n.setProps(e,"jumpEnd"):n.currentSlide===n.last&&0===n.animatingTo&&n.vars.animationLoop&&n.setProps(e,"jumpStart")),n.animating=!1,n.currentSlide=n.animatingTo,n.vars.after(n)},n.animateSlides=function(){!n.animating&&e&&n.flexAnimate(n.getTarget("next"))},n.pause=function(){clearInterval(n.animatedSlides),n.animatedSlides=null,n.playing=!1,n.vars.pausePlay&&f.pausePlay.update("play"),n.syncExists&&f.sync("pause")},n.play=function(){n.playing&&clearInterval(n.animatedSlides),n.animatedSlides=n.animatedSlides||setInterval(n.animateSlides,n.vars.slideshowSpeed),n.started=n.playing=!0,n.vars.pausePlay&&f.pausePlay.update("pause"),n.syncExists&&f.sync("play")},n.stop=function(){n.pause(),n.stopped=!0},n.canAdvance=function(e,t){var a=m?n.pagingCount-1:n.last;return t?!0:m&&n.currentItem===n.count-1&&0===e&&"prev"===n.direction?!0:m&&0===n.currentItem&&e===n.pagingCount-1&&"next"!==n.direction?!1:e!==n.currentSlide||m?n.vars.animationLoop?!0:n.atEnd&&0===n.currentSlide&&e===a&&"next"!==n.direction?!1:n.atEnd&&n.currentSlide===a&&0===e&&"next"===n.direction?!1:!0:!1},n.getTarget=function(e){return n.direction=e,"next"===e?n.currentSlide===n.last?0:n.currentSlide+1:0===n.currentSlide?n.last:n.currentSlide-1},n.setProps=function(e,t,a){var i=function(){var a=e?e:(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo,i=function(){if(v)return"setTouch"===t?e:u&&n.animatingTo===n.last?0:u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:n.animatingTo===n.last?n.limit:a;switch(t){case"setTotal":return u?(n.count-1-n.currentSlide+n.cloneOffset)*e:(n.currentSlide+n.cloneOffset)*e;case"setTouch":return u?e:e;case"jumpEnd":return u?e:n.count*e;case"jumpStart":return u?n.count*e:e;default:return e}}();return-1*i+"px"}();n.transitions&&(i=d?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)",a=void 0!==a?a/1e3+"s":"0s",n.container.css("-"+n.pfx+"-transition-duration",a),n.container.css("transition-duration",a)),n.args[n.prop]=i,(n.transitions||void 0===a)&&n.container.css(n.args),n.container.css("transform",i)},n.setup=function(e){if(p)n.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===e&&(r?n.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+n.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(n.currentSlide).css({opacity:1,zIndex:2}):0==n.vars.fadeFirstSlide?n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).css({opacity:1}):n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing)),n.vars.smoothHeight&&f.smoothHeight();else{var t,a;"init"===e&&(n.viewport=$('<div class="'+i+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(n).append(n.container),n.cloneCount=0,n.cloneOffset=0,u&&(a=$.makeArray(n.slides).reverse(),n.slides=$(a),n.container.empty().append(n.slides))),n.vars.animationLoop&&!v&&(n.cloneCount=2,n.cloneOffset=1,"init"!==e&&n.container.find(".clone").remove(),n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))),n.newSlides=$(n.vars.selector,n),t=u?n.count-1-n.currentSlide+n.cloneOffset:n.currentSlide+n.cloneOffset,d&&!v?(n.container.height(200*(n.count+n.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){n.newSlides.css({display:"block"}),n.doMath(),n.viewport.height(n.h),n.setProps(t*n.h,"init")},"init"===e?100:0)):(n.container.width(200*(n.count+n.cloneCount)+"%"),n.setProps(t*n.computedW,"init"),setTimeout(function(){n.doMath(),n.newSlides.css({width:n.computedW,marginRight:n.computedM,"float":"left",display:"block"}),n.vars.smoothHeight&&f.smoothHeight()},"init"===e?100:0))}v||n.slides.removeClass(i+"active-slide").eq(n.currentSlide).addClass(i+"active-slide"),n.vars.init(n)},n.doMath=function(){var e=n.slides.first(),t=n.vars.itemMargin,a=n.vars.minItems,i=n.vars.maxItems;n.w=void 0===n.viewport?n.width():n.viewport.width(),n.h=e.height(),n.boxPadding=e.outerWidth()-e.width(),v?(n.itemT=n.vars.itemWidth+t,n.itemM=t,n.minW=a?a*n.itemT:n.w,n.maxW=i?i*n.itemT-t:n.w,n.itemW=n.minW>n.w?(n.w-t*(a-1))/a:n.maxW<n.w?(n.w-t*(i-1))/i:n.vars.itemWidth>n.w?n.w:n.vars.itemWidth,n.visible=Math.floor(n.w/n.itemW),n.move=n.vars.move>0&&n.vars.move<n.visible?n.vars.move:n.visible,n.pagingCount=Math.ceil((n.count-n.visible)/n.move+1),n.last=n.pagingCount-1,n.limit=1===n.pagingCount?0:n.vars.itemWidth>n.w?n.itemW*(n.count-1)+t*(n.count-1):(n.itemW+t)*n.count-n.w-t):(n.itemW=n.w,n.itemM=t,n.pagingCount=n.count,n.last=n.count-1),n.computedW=n.itemW-n.boxPadding,n.computedM=n.itemM},n.update=function(e,t){n.doMath(),v||(e<n.currentSlide?n.currentSlide+=1:e<=n.currentSlide&&0!==e&&(n.currentSlide-=1),n.animatingTo=n.currentSlide),n.vars.controlNav&&!n.manualControls&&("add"===t&&!v||n.pagingCount>n.controlNav.length?f.controlNav.update("add"):("remove"===t&&!v||n.pagingCount<n.controlNav.length)&&(v&&n.currentSlide>n.last&&(n.currentSlide-=1,n.animatingTo-=1),f.controlNav.update("remove",n.last))),n.vars.directionNav&&f.directionNav.update()},n.addSlide=function(e,t){var a=$(e);n.count+=1,n.last=n.count-1,d&&u?void 0!==t?n.slides.eq(n.count-t).after(a):n.container.prepend(a):void 0!==t?n.slides.eq(t).before(a):n.container.append(a),n.update(t,"add"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.added(n)},n.removeSlide=function(e){var t=isNaN(e)?n.slides.index($(e)):e;n.count-=1,n.last=n.count-1,isNaN(e)?$(e,n.slides).remove():d&&u?n.slides.eq(n.last).remove():n.slides.eq(e).remove(),n.doMath(),n.update(t,"remove"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.removed(n)},f.init()},$(window).blur(function(t){e=!1}).focus(function(t){e=!0}),$.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,fadeFirstSlide:!0,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",customDirectionNav:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}},$.fn.flexslider=function(e){if(void 0===e&&(e={}),"object"==typeof e)return this.each(function(){var t=$(this),a=e.selector?e.selector:".slides > li",n=t.find(a);1===n.length&&e.allowOneSlide===!0||0===n.length?(n.fadeIn(400),e.start&&e.start(t)):void 0===t.data("flexslider")&&new $.flexslider(this,e)});var t=$(this).data("flexslider");switch(e){case"play":t.play();break;case"pause":t.pause();break;case"stop":t.stop();break;case"next":t.flexAnimate(t.getTarget("next"),!0);break;case"prev":case"previous":t.flexAnimate(t.getTarget("prev"),!0);break;default:"number"==typeof e&&t.flexAnimate(e,!0)}}}(jQuery);
},{}],7:[function(require,module,exports){
!function(a){"use strict";function b(b,e){this.regex=/^(.*)(\d)+$/i,this.elem=b,this.$elem=a(b),this.elemClass=c+"-wrap","undefined"!=typeof e&&"undefined"!=typeof e.limit&&e.limit>0&&(e.maximum=e.limit),this.config=a.extend({},d,e),this.clones=this.$elem.closestChild(this.config.cloneThis),this.init()}var c="cloneya",d={cloneThis:".toclone",cloneButton:".clone",deleteButton:".delete",clonePosition:"after",minimum:1,maximum:999,valueClone:!1,dataClone:!1,deepClone:!1,serializeID:!0,ignore:"label.error",preserveChildCount:!1};b.prototype={init:function(){var b=this;b.$elem.addClass(b.elemClass),b.clones.addClass(c),b.clones.data("initialCount",b.clones.length),b.$elem.on("click."+c,b.config.cloneThis+">"+b.config.cloneButton,function(d){d.preventDefault(),d.stopPropagation();var e=a(this).closest(b.config.cloneThis);b.$elem.triggerAll("clone_clone clone."+c,[e])}),b.$elem.on("clone."+c,function(a,c){b._cloneAndAppend(c)}),b.$elem.on("click."+c,b.config.cloneThis+">"+b.config.deleteButton,function(d){d.preventDefault(),d.stopPropagation();var e=a(this).closest(b.config.cloneThis);b.$elem.triggerAll("clone_delete delete."+c,[e])}),b.$elem.on("delete."+c,function(d,e){var f=e.closest("."+b.elemClass).closestChild(b.config.cloneThis).length;f>b.config.minimum?(b.$elem.triggerAll("clone_before_delete before_delete."+c,[e,f]),b.$elem.triggerHandler("remove."+c,[e]),b.$elem.triggerAll("clone_after_delete after_delete."+c)):(b.$elem.triggerHandler("minimum."+c,b.config.minimum,[e]),e.find("input, textarea, select").each(function(){b._clearForm(a(this))}))}),b.$elem.on("remove."+c,function(b,c){a(c).remove()})},_clean:function(){var a=this;a.$elem.removeClass(c+"-wrap"),a.clones.removeClass(c),a.$elem.off("click."+c,a.config.cloneThis+">"+a.config.cloneButton),a.$elem.off("click."+c,a.config.cloneThis+">"+a.config.deleteButton),a.$elem.off("clone_clone clone_delete clone_before_delete clone."+c+" delete."+c+" before_delete."+c)},destroy:function(){this._clean(),this.$elem.removeData(c)},getOption:function(){return this.config},setOption:function(b){a.extend(this.config,b||{}),this._clean(),this.init()},_cloneAndAppend:function(a){var b=a.closest("."+this.elemClass).closestChild(this.config.cloneThis).length;if(b<this.config.maximum){this.$elem.triggerAll("clone_before_clone before_clone."+c,[a]);var d=this._cloneItem(a);this.$elem.triggerAll("clone_after_clone after_clone."+c,[a,d]),this.clones.add(d),this.$elem.triggerAll("clone_before_append before_append."+c,[a,d]),"after"!==this.config.clonePosition?a.before(d):a.after(d),this.config.ignore&&d.find(this.config.ignore).remove(),this._redoIDs(),this.$elem.triggerAll("clone_after_append after_append."+c,[a,d])}else this.$elem.triggerAll("clone_limit maximum."+c,this.config.maximum,[a])},_cloneItem:function(b){var d=this,e=b.clone(d.config.dataClone,d.config.deepClone);if(d.config.preserveChildCount!==!1){var f=b.find("."+c+"-wrap");e.find("."+c+"-wrap").each(function(b){var d=a(this).closestChild("."+c),e=a(f[b]).closestChild("."+c),g=e.data("initialCount"),h=d.slice(g,d.length);h.remove(),d.data("initial-count",g)})}return e.find("input, textarea, select").each(function(){d._clearForm(a(this)),d.$elem.triggerAll("clone_form_input form_input."+c,[a(this),b,e])}),e},_clearForm:function(a){this.config.valueClone||a.hasClass("noEmpty")||(a.is(":checkbox")||a.is(":radio")?a.prop("checked",!1):a.val(""))},_redoIDs:function(){var b=this;if(b.config.serializeID===!0){var c=b.$elem.find(b.config.cloneThis).first().attr("id");b.$elem.find(b.config.cloneThis).each(function(d){var e;e=0!==d?d:"",a(this).attr("id")&&a(this).attr("id",c+e);var f,g;a(this).find("*").each(function(){if(f=a(this).attr("id")){var c=f.match(b.regex);c&&3===c.length?(g=f.replace(/\d+$/,"")+e,a(this).attr("id",g)):(g=f+e,a(this).attr("id",g))}if(a(this).closest(b.config.cloneThis).find("label[for='"+f+"']").attr("for",g),b.config.serializeIndex){var h=a(this).attr("name");if(h){var i=h.match(/\[([^}]+)\]/);if(i&&i.length>=1){var j=h;h=[].map.call(j,function(a,b){return isNaN(+a)||"["!==j[b-1]||"]"!==j[b+1]?a:d}).join(""),a(this).attr("name",h)}}}})})}}},a.fn[c]=function(d){var e=arguments;if(void 0===d||"object"==typeof d)return this.each(function(){a.data(this,c)||a.data(this,c,new b(this,d))});if("string"==typeof d&&"_"!==d[0]&&"init"!==d){if(0===Array.prototype.slice.call(e,1).length&&-1!==a.inArray(d,a.fn[c].getters)){var f=a.data(this[0],c);return f[d].apply(f,Array.prototype.slice.call(e,1))}return this.each(function(){var f=a.data(this,c);f instanceof b&&"function"==typeof f[d]&&f[d].apply(f,Array.prototype.slice.call(e,1))})}},a.fn[c].getters=["getOption"],a.fn.closestChild=function(b){var c,d;return c=this.children(),0===c.length?a():(d=c.filter(b),d.length>0?d:c.closestChild(b))},a.fn.extend({triggerAll:function(a,b){var c,d=this,e=a.split(" ");for(c=0;c<e.length;c+=1)d.triggerHandler(e[c],b);return d}})}(jQuery);

},{}],8:[function(require,module,exports){
/*!
 * parallax.js v1.4.2 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */
!function(t,i,e,s){function o(i,e){var h=this;"object"==typeof e&&(delete e.refresh,delete e.render,t.extend(this,e)),this.$element=t(i),!this.imageSrc&&this.$element.is("img")&&(this.imageSrc=this.$element.attr("src"));var r=(this.position+"").toLowerCase().match(/\S+/g)||[];if(r.length<1&&r.push("center"),1==r.length&&r.push(r[0]),("top"==r[0]||"bottom"==r[0]||"left"==r[1]||"right"==r[1])&&(r=[r[1],r[0]]),this.positionX!=s&&(r[0]=this.positionX.toLowerCase()),this.positionY!=s&&(r[1]=this.positionY.toLowerCase()),h.positionX=r[0],h.positionY=r[1],"left"!=this.positionX&&"right"!=this.positionX&&(this.positionX=isNaN(parseInt(this.positionX))?"center":parseInt(this.positionX)),"top"!=this.positionY&&"bottom"!=this.positionY&&(this.positionY=isNaN(parseInt(this.positionY))?"center":parseInt(this.positionY)),this.position=this.positionX+(isNaN(this.positionX)?"":"px")+" "+this.positionY+(isNaN(this.positionY)?"":"px"),navigator.userAgent.match(/(iPod|iPhone|iPad)/))return this.imageSrc&&this.iosFix&&!this.$element.is("img")&&this.$element.css({backgroundImage:"url("+this.imageSrc+")",backgroundSize:"cover",backgroundPosition:this.position}),this;if(navigator.userAgent.match(/(Android)/))return this.imageSrc&&this.androidFix&&!this.$element.is("img")&&this.$element.css({backgroundImage:"url("+this.imageSrc+")",backgroundSize:"cover",backgroundPosition:this.position}),this;this.$mirror=t("<div />").prependTo("body");var a=this.$element.find(">.parallax-slider"),n=!1;0==a.length?this.$slider=t("<img />").prependTo(this.$mirror):(this.$slider=a.prependTo(this.$mirror),n=!0),this.$mirror.addClass("parallax-mirror").css({visibility:"hidden",zIndex:this.zIndex,position:"fixed",top:0,left:0,overflow:"hidden"}),this.$slider.addClass("parallax-slider").one("load",function(){h.naturalHeight&&h.naturalWidth||(h.naturalHeight=this.naturalHeight||this.height||1,h.naturalWidth=this.naturalWidth||this.width||1),h.aspectRatio=h.naturalWidth/h.naturalHeight,o.isSetup||o.setup(),o.sliders.push(h),o.isFresh=!1,o.requestRender()}),n||(this.$slider[0].src=this.imageSrc),(this.naturalHeight&&this.naturalWidth||this.$slider[0].complete||a.length>0)&&this.$slider.trigger("load")}function h(s){return this.each(function(){var h=t(this),r="object"==typeof s&&s;this==i||this==e||h.is("body")?o.configure(r):h.data("px.parallax")?"object"==typeof s&&t.extend(h.data("px.parallax"),r):(r=t.extend({},h.data(),r),h.data("px.parallax",new o(this,r))),"string"==typeof s&&("destroy"==s?o.destroy(this):o[s]())})}!function(){for(var t=0,e=["ms","moz","webkit","o"],s=0;s<e.length&&!i.requestAnimationFrame;++s)i.requestAnimationFrame=i[e[s]+"RequestAnimationFrame"],i.cancelAnimationFrame=i[e[s]+"CancelAnimationFrame"]||i[e[s]+"CancelRequestAnimationFrame"];i.requestAnimationFrame||(i.requestAnimationFrame=function(e){var s=(new Date).getTime(),o=Math.max(0,16-(s-t)),h=i.setTimeout(function(){e(s+o)},o);return t=s+o,h}),i.cancelAnimationFrame||(i.cancelAnimationFrame=function(t){clearTimeout(t)})}(),t.extend(o.prototype,{speed:.2,bleed:0,zIndex:-100,iosFix:!0,androidFix:!0,position:"center",overScrollFix:!1,refresh:function(){this.boxWidth=this.$element.outerWidth(),this.boxHeight=this.$element.outerHeight()+2*this.bleed,this.boxOffsetTop=this.$element.offset().top-this.bleed,this.boxOffsetLeft=this.$element.offset().left,this.boxOffsetBottom=this.boxOffsetTop+this.boxHeight;var t=o.winHeight,i=o.docHeight,e=Math.min(this.boxOffsetTop,i-t),s=Math.max(this.boxOffsetTop+this.boxHeight-t,0),h=this.boxHeight+(e-s)*(1-this.speed)|0,r=(this.boxOffsetTop-e)*(1-this.speed)|0;if(h*this.aspectRatio>=this.boxWidth){this.imageWidth=h*this.aspectRatio|0,this.imageHeight=h,this.offsetBaseTop=r;var a=this.imageWidth-this.boxWidth;this.offsetLeft="left"==this.positionX?0:"right"==this.positionX?-a:isNaN(this.positionX)?-a/2|0:Math.max(this.positionX,-a)}else{this.imageWidth=this.boxWidth,this.imageHeight=this.boxWidth/this.aspectRatio|0,this.offsetLeft=0;var a=this.imageHeight-h;this.offsetBaseTop="top"==this.positionY?r:"bottom"==this.positionY?r-a:isNaN(this.positionY)?r-a/2|0:r+Math.max(this.positionY,-a)}},render:function(){var t=o.scrollTop,i=o.scrollLeft,e=this.overScrollFix?o.overScroll:0,s=t+o.winHeight;this.boxOffsetBottom>t&&this.boxOffsetTop<=s?(this.visibility="visible",this.mirrorTop=this.boxOffsetTop-t,this.mirrorLeft=this.boxOffsetLeft-i,this.offsetTop=this.offsetBaseTop-this.mirrorTop*(1-this.speed)):this.visibility="hidden",this.$mirror.css({transform:"translate3d(0px, 0px, 0px)",visibility:this.visibility,top:this.mirrorTop-e,left:this.mirrorLeft,height:this.boxHeight,width:this.boxWidth}),this.$slider.css({transform:"translate3d(0px, 0px, 0px)",position:"absolute",top:this.offsetTop,left:this.offsetLeft,height:this.imageHeight,width:this.imageWidth,maxWidth:"none"})}}),t.extend(o,{scrollTop:0,scrollLeft:0,winHeight:0,winWidth:0,docHeight:1<<30,docWidth:1<<30,sliders:[],isReady:!1,isFresh:!1,isBusy:!1,setup:function(){if(!this.isReady){var s=t(e),h=t(i),r=function(){o.winHeight=h.height(),o.winWidth=h.width(),o.docHeight=s.height(),o.docWidth=s.width()},a=function(){var t=h.scrollTop(),i=o.docHeight-o.winHeight,e=o.docWidth-o.winWidth;o.scrollTop=Math.max(0,Math.min(i,t)),o.scrollLeft=Math.max(0,Math.min(e,h.scrollLeft())),o.overScroll=Math.max(t-i,Math.min(t,0))};h.on("resize.px.parallax load.px.parallax",function(){r(),o.isFresh=!1,o.requestRender()}).on("scroll.px.parallax load.px.parallax",function(){a(),o.requestRender()}),r(),a(),this.isReady=!0}},configure:function(i){"object"==typeof i&&(delete i.refresh,delete i.render,t.extend(this.prototype,i))},refresh:function(){t.each(this.sliders,function(){this.refresh()}),this.isFresh=!0},render:function(){this.isFresh||this.refresh(),t.each(this.sliders,function(){this.render()})},requestRender:function(){var t=this;this.isBusy||(this.isBusy=!0,i.requestAnimationFrame(function(){t.render(),t.isBusy=!1}))},destroy:function(e){var s,h=t(e).data("px.parallax");for(h.$mirror.remove(),s=0;s<this.sliders.length;s+=1)this.sliders[s]==h&&this.sliders.splice(s,1);t(e).data("px.parallax",!1),0===this.sliders.length&&(t(i).off("scroll.px.parallax resize.px.parallax load.px.parallax"),this.isReady=!1,o.isSetup=!1)}});var r=t.fn.parallax;t.fn.parallax=h,t.fn.parallax.Constructor=o,t.fn.parallax.noConflict=function(){return t.fn.parallax=r,this},t(e).on("ready.px.parallax.data-api",function(){t('[data-parallax="scroll"]').parallax()})}(jQuery,window,document);

},{}],9:[function(require,module,exports){
/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens and enables tab
 * support for dropdown menus.
 */
( function() {
	var container, button, menu, links, subMenus;

	container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	button = container.getElementsByTagName( 'button' )[0];
	if ( 'undefined' === typeof button ) {
		return;
	}

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	menu.setAttribute( 'aria-expanded', 'false' );
	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			container.className = container.className.replace( ' toggled', '' );
			button.setAttribute( 'aria-expanded', 'false' );
			menu.setAttribute( 'aria-expanded', 'false' );
		} else {
			container.className += ' toggled';
			button.setAttribute( 'aria-expanded', 'true' );
			menu.setAttribute( 'aria-expanded', 'true' );
		}
	};

	// Get all the link elements within the menu.
	links    = menu.getElementsByTagName( 'a' );
	subMenus = menu.getElementsByTagName( 'ul' );

	// Set menu items with submenus to aria-haspopup="true".
	for ( var i = 0, len = subMenus.length; i < len; i++ ) {
		subMenus[i].parentNode.setAttribute( 'aria-haspopup', 'true' );
	}

	// Each time a menu link is focused or blurred, toggle focus.
	for ( i = 0, len = links.length; i < len; i++ ) {
		links[i].addEventListener( 'focus', toggleFocus, true );
		links[i].addEventListener( 'blur', toggleFocus, true );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		var self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}
} )();

},{}],10:[function(require,module,exports){
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
    if (isCssSmoothSCrollSupported()) {
        document.getElementById('css-support-msg').className = 'supported';
        return;
    }
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
	console.log();
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

},{}],11:[function(require,module,exports){
;(function($){
    
var cl_nav,
    cl_navOuterHeight;

jQuery(document).ready(function($) {
    //"use strict";

    // Smooth scroll to inner links

    jQuery('.inner-link').each(function(){
        var href = jQuery(this).attr('href');
        if(href.charAt(0) !== "#"){
            jQuery(this).removeClass('inner-link');
        }
    });

    jQuery('.inner-link').click(function() {
          jQuery('html, body').animate({
            scrollTop: 0
          }, 1000);
          return false;
    });

    // Append .background-image-holder <img>'s as CSS backgrounds

    jQuery('.background-image-holder').each(function() {
        var imgSrc = jQuery(this).children('img').attr('src');
        jQuery(this).css('background', 'url("' + imgSrc + '")');
        jQuery(this).children('img').hide();
        jQuery(this).css('background-position', 'initial');
    });

    // Fade in background images

    setTimeout(function() {
        jQuery('.background-image-holder').each(function() {
            jQuery(this).addClass('fadeIn');
        });
    }, 200);

    
    // Fix nav to top while scrolling

    cl_nav = $('body .nav-container nav:first');
    cl_navOuterHeight = $('body .nav-container nav:first').outerHeight();
    window.addEventListener("scroll", updateNav, false);
    updateNav();
    
    
    // Menu dropdown positioning

    $('.menu > li > ul').each(function() {
        var menu = $(this).offset();
        var farRight = menu.left + $(this).outerWidth(true);
        if (farRight > $(window).width() && !$(this).hasClass('mega-menu')) {
            $(this).addClass('make-right');
        } else if (farRight > $(window).width() && $(this).hasClass('mega-menu')) {
            var isOnScreen = $(window).width() - menu.left;
            var difference = $(this).outerWidth(true) - isOnScreen;
            $(this).css('margin-left', -(difference));
        }
    });

    // Mobile Menu

    $('.mobile-toggle').click(function() {
        $('.nav-bar').toggleClass('nav-open');
        $(this).toggleClass('active');
        $('.search-widget-handle').toggleClass('hidden-xs hidden-sm');
    });

    $('.menu li').click(function(e) {
        if (!e) e = window.event;
        e.stopPropagation();
        if ($(this).find('ul').length) {
            $(this).toggleClass('toggle-sub');
        } else {
            $(this).parents('.toggle-sub').removeClass('toggle-sub');
        }
    });

    $('.menu li a').click(function() {
        if ($(this).hasClass('inner-link')){
            $(this).closest('.nav-bar').removeClass('nav-open');
        }
    });

    $('.module.widget-handle').click(function() {
        $(this).toggleClass('toggle-search');
    });
    
    $('.search-widget-handle .search-form input').click(function(e){
        if (!e) e = window.event;
        e.stopPropagation();
    });

    // Image Sliders
    $('.slider-all-controls').flexslider({
        start: function(slider){
            if(slider.find('.slides li:first-child').find('.fs-vid-background video').length){
               slider.find('.slides li:first-child').find('.fs-vid-background video').get(0).play();
            }
        },
        after: function(slider){
            if(slider.find('.fs-vid-background video').length){
                if(slider.find('li:not(.flex-active-slide)').find('.fs-vid-background video').length){
                    slider.find('li:not(.flex-active-slide)').find('.fs-vid-background video').get(0).pause();
                }
                if(slider.find('.flex-active-slide').find('.fs-vid-background video').length){
                    slider.find('.flex-active-slide').find('.fs-vid-background video').get(0).play();
                }
            }
        }
    });
    $('.slider-paging-controls').flexslider({
        animation: "slide",
        directionNav: false
    });
    $('.slider-arrow-controls').flexslider({
        controlNav: false
    });
    $('.slider-thumb-controls .slides li').each(function() {
        var imgSrc = $(this).find('img').attr('src');
        $(this).attr('data-thumb', imgSrc);
    });
    $('.slider-thumb-controls').flexslider({
        animation: "slide",
        controlNav: "thumbnails",
        directionNav: true
    });
    $('.logo-carousel').flexslider({
        minItems: 1,
        maxItems: 4,
        move: 1,
        itemWidth: 200,
        itemMargin: 0,
        animation: "slide",
        slideshow: true,
        slideshowSpeed: 3000,
        directionNav: false,
        controlNav: false
    });

    // Lightbox gallery titles
    $('.lightbox-grid li a').each(function(){
        var galleryTitle = $(this).closest('.lightbox-grid').attr('data-gallery-title');
        $(this).attr('data-lightbox', galleryTitle);
    });

});

jQuery(window).load(function($) {
   // "use strict";

   // Resetting testimonial parallax height
   if( jQuery('.testimonial-section').length != 0 ){
     testimonialHeight();
     setTimeout(function(){ testimonialHeight(); }, 3000);
   }

    // Initialize Masonry

    if (jQuery('.masonry').length && typeof Masonry != 'undefined') {
        var container = document.querySelector('.masonry');
        var msnry = new Masonry(container, {
            itemSelector: '.masonry-item'
        });

        msnry.on('layoutComplete', function($) {

            cl_firstSectionHeight = jQuery('.main-container section:nth-of-type(1)').outerHeight(true);

            // Fix floating project filters to bottom of projects container

            if (jQuery('.filters.floating').length) {
                setupFloatingProjectFilters();
                updateFloatingFilters();
                window.addEventListener("scroll", updateFloatingFilters, false);
            }

            jQuery('.masonry').addClass('fadeIn');
            jQuery('.masonry-loader').addClass('fadeOut');
            if (jQuery('.masonryFlyIn').length) {
                masonryFlyIn();
            }
        });

        msnry.layout();
    }
    // Navigation height
    cl_firstSectionHeight = jQuery('.main-container section:nth-of-type(1)').outerHeight(true);


});

/* Function To 
 * keep menu fixed
 **/
function updateNav(){
    if( $(window).scrollTop() > cl_navOuterHeight ){//if href = #element id
        cl_nav.addClass('fixed scrolled');
    }
    else{
        cl_nav.removeClass('fixed scrolled');
    }
}

function masonryFlyIn() {
    var $items = jQuery('.masonryFlyIn .masonry-item');
    var time = 0;

    $items.each(function() {
        var item = jQuery(this);
        setTimeout(function() {
            item.addClass('fadeIn');
        }, time);
        time += 170;
    });
}
})(jQuery);

/*
 * Resetting testimonial parallax height
 */
function testimonialHeight(){
  jQuery('.testimonial-section .parallax-window').css('height', jQuery('.testimonial-section .parallax-window .container').outerHeight()+150 );
  jQuery(window).trigger('resize').trigger('scroll');
}

},{}],12:[function(require,module,exports){
/**
 * skip-link-focus-fix.js
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
( function() {
	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
	    is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
})();

},{}],13:[function(require,module,exports){
jQuery(document).ready( function($) {
  
  /* Media uploader */
  media_upload('.button.custom_media_button.button-primary');
    
  /* Clonning of Logo Client Widgets */
  jQuery(document).on('widget-added', function(e, widget){
    shapelySort();
  });
  jQuery(document).on('widget-updated', function(e, widget){
    shapelySort();
  });
  
  
  shapelySort();/* Client widget sorting and cloning*/
  
  /* Font awsome selector */
  jQuery('select.shapely-icon').change( function(){
    jQuery(this).siblings('span').removeClass().addClass('fa ' +jQuery(this).val());console.log(jQuery(this).val());
  });
  
  /* 
   * Function for sorting
   */
  function shapelySort(){
      jQuery('.client-sortable').sortable({
         handle: '.logo_heading' })
         .bind( 'sortupdate', function(event, ui) {
           var index = 0;
           var attrname = jQuery(this).find('input:first').attr('name');
           var attrbase = attrname.substring(0, attrname.indexOf('][') + 1);
           
           var attrid = jQuery(this).find('input:first').attr('id');
           var attrbaseid = attrid.substring(0, attrid.indexOf('-image_src') + 11);
           jQuery(this).find('li').each(function() {
             jQuery(this).find('.count').html(index+1);
             jQuery(this).find('.image_src').attr('id', attrbaseid+''+ index).attr('name', attrbase +'[client_logo][img]'+'[' + index + ']');
             jQuery(this).find('.custom_media_button').attr('data-fieldid', attrbaseid+''+ index );
             jQuery(this).find('.image_demo').attr('id', 'img_demo_'+attrbaseid+''+ index);
             jQuery(this).find('.client-link').attr('id', 'link-'+ index).attr('name', attrbase +'[client_logo][link]'+'[' + index + ']').trigger('change');
             index++;
           });
         });
         
         /* Cloning */
      jQuery('.clone-wrapper').cloneya().on('after_append.cloneya after_delete.cloneya', function (toClone, newClone) {
          jQuery('.client-sortable').trigger('sortupdate');
          jQuery(newClone).next('li').find('img').attr('src', '');
      });
  }
  
  /*
   * Function of media upload
   */
  function media_upload(button_class) {
        var _custom_media = true,
        _orig_send_attachment = wp.media.editor.send.attachment;


        $('body').on('click', button_class, function(e) {
            var button_id ='#'+$(this).attr('id');            
            var send_attachment_bkp = wp.media.editor.send.attachment;
            var button = $(button_id);
            var field_id = $(this).attr('data-fieldid');
            _custom_media = true;
            wp.media.editor.send.attachment = function(props, attachment){
                if ( _custom_media  ) {
                    console.log(attachment.url);
                    //$('.custom_media_id').val(attachment.id);
                    $('#'+field_id).val(attachment.url).change();
                    $('#img_demo_'+field_id).attr('src', attachment.url);
                } else {
                    return _orig_send_attachment.apply( button_id, [props, attachment] );
                }
            }

            wp.media.editor.open(button);

            return false;
        });
    }  
});



},{}]},{},[5])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21yLWJsdWUvRGV2L1ZhZ3JhbnQvdmFncmFudC1waHAtYm94L3d3dy9odG1sL3NpdGVzL2FwcC9lLWhhbmRlbC93cC9Qb3J0Zm9saW8vbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9ob21lL21yLWJsdWUvRGV2L1ZhZ3JhbnQvdmFncmFudC1waHAtYm94L3d3dy9odG1sL3NpdGVzL2FwcC9lLWhhbmRlbC93cC9Qb3J0Zm9saW8vd3AtY29udGVudC90aGVtZXMvc2hhcGVseS9qc0NvbXBpbGUvY3VzdG9taXplci5qcyIsIi9ob21lL21yLWJsdWUvRGV2L1ZhZ3JhbnQvdmFncmFudC1waHAtYm94L3d3dy9odG1sL3NpdGVzL2FwcC9lLWhhbmRlbC93cC9Qb3J0Zm9saW8vd3AtY29udGVudC90aGVtZXMvc2hhcGVseS9qc0NvbXBpbGUvZGV2L2ZsZXhzbGlkZXIuanMiLCIvaG9tZS9tci1ibHVlL0Rldi9WYWdyYW50L3ZhZ3JhbnQtcGhwLWJveC93d3cvaHRtbC9zaXRlcy9hcHAvZS1oYW5kZWwvd3AvUG9ydGZvbGlvL3dwLWNvbnRlbnQvdGhlbWVzL3NoYXBlbHkvanNDb21waWxlL2Rldi9qcXVlcnktY2xvbmV5YS5qcyIsIi9ob21lL21yLWJsdWUvRGV2L1ZhZ3JhbnQvdmFncmFudC1waHAtYm94L3d3dy9odG1sL3NpdGVzL2FwcC9lLWhhbmRlbC93cC9Qb3J0Zm9saW8vd3AtY29udGVudC90aGVtZXMvc2hhcGVseS9qc0NvbXBpbGUvZGV2L3BhcmFsbGF4LmpzIiwiL2hvbWUvbXItYmx1ZS9EZXYvVmFncmFudC92YWdyYW50LXBocC1ib3gvd3d3L2h0bWwvc2l0ZXMvYXBwL2UtaGFuZGVsL3dwL1BvcnRmb2xpby93cC1jb250ZW50L3RoZW1lcy9zaGFwZWx5L2pzQ29tcGlsZS9mYWtlXzdjOWFhNjdhLmpzIiwiL2hvbWUvbXItYmx1ZS9EZXYvVmFncmFudC92YWdyYW50LXBocC1ib3gvd3d3L2h0bWwvc2l0ZXMvYXBwL2UtaGFuZGVsL3dwL1BvcnRmb2xpby93cC1jb250ZW50L3RoZW1lcy9zaGFwZWx5L2pzQ29tcGlsZS9saWJzL2ZsZXhzbGlkZXIubWluLmpzIiwiL2hvbWUvbXItYmx1ZS9EZXYvVmFncmFudC92YWdyYW50LXBocC1ib3gvd3d3L2h0bWwvc2l0ZXMvYXBwL2UtaGFuZGVsL3dwL1BvcnRmb2xpby93cC1jb250ZW50L3RoZW1lcy9zaGFwZWx5L2pzQ29tcGlsZS9saWJzL2pxdWVyeS1jbG9uZXlhLm1pbi5qcyIsIi9ob21lL21yLWJsdWUvRGV2L1ZhZ3JhbnQvdmFncmFudC1waHAtYm94L3d3dy9odG1sL3NpdGVzL2FwcC9lLWhhbmRlbC93cC9Qb3J0Zm9saW8vd3AtY29udGVudC90aGVtZXMvc2hhcGVseS9qc0NvbXBpbGUvbGlicy9wYXJhbGxheC5taW4uanMiLCIvaG9tZS9tci1ibHVlL0Rldi9WYWdyYW50L3ZhZ3JhbnQtcGhwLWJveC93d3cvaHRtbC9zaXRlcy9hcHAvZS1oYW5kZWwvd3AvUG9ydGZvbGlvL3dwLWNvbnRlbnQvdGhlbWVzL3NoYXBlbHkvanNDb21waWxlL25hdmlnYXRpb24uanMiLCIvaG9tZS9tci1ibHVlL0Rldi9WYWdyYW50L3ZhZ3JhbnQtcGhwLWJveC93d3cvaHRtbC9zaXRlcy9hcHAvZS1oYW5kZWwvd3AvUG9ydGZvbGlvL3dwLWNvbnRlbnQvdGhlbWVzL3NoYXBlbHkvanNDb21waWxlL3BvcnRmb2xpby5qcyIsIi9ob21lL21yLWJsdWUvRGV2L1ZhZ3JhbnQvdmFncmFudC1waHAtYm94L3d3dy9odG1sL3NpdGVzL2FwcC9lLWhhbmRlbC93cC9Qb3J0Zm9saW8vd3AtY29udGVudC90aGVtZXMvc2hhcGVseS9qc0NvbXBpbGUvc2hhcGVseS1zY3JpcHRzLmpzIiwiL2hvbWUvbXItYmx1ZS9EZXYvVmFncmFudC92YWdyYW50LXBocC1ib3gvd3d3L2h0bWwvc2l0ZXMvYXBwL2UtaGFuZGVsL3dwL1BvcnRmb2xpby93cC1jb250ZW50L3RoZW1lcy9zaGFwZWx5L2pzQ29tcGlsZS9za2lwLWxpbmstZm9jdXMtZml4LmpzIiwiL2hvbWUvbXItYmx1ZS9EZXYvVmFncmFudC92YWdyYW50LXBocC1ib3gvd3d3L2h0bWwvc2l0ZXMvYXBwL2UtaGFuZGVsL3dwL1BvcnRmb2xpby93cC1jb250ZW50L3RoZW1lcy9zaGFwZWx5L2pzQ29tcGlsZS93aWRnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdGhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBjdXN0b21pemVyLmpzXG4gKlxuICogVGhlbWUgQ3VzdG9taXplciBlbmhhbmNlbWVudHMgZm9yIGEgYmV0dGVyIHVzZXIgZXhwZXJpZW5jZS5cbiAqXG4gKiBDb250YWlucyBoYW5kbGVycyB0byBtYWtlIFRoZW1lIEN1c3RvbWl6ZXIgcHJldmlldyByZWxvYWQgY2hhbmdlcyBhc3luY2hyb25vdXNseS5cbiAqL1xuXG4oIGZ1bmN0aW9uKCAkICkge1xuXHQvLyBTaXRlIHRpdGxlIGFuZCBkZXNjcmlwdGlvbi5cblx0d3AuY3VzdG9taXplKCAnYmxvZ25hbWUnLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFsdWUuYmluZCggZnVuY3Rpb24oIHRvICkge1xuXHRcdFx0JCggJy5zaXRlLXRpdGxlJyApLnRleHQoIHRvICk7XG5cdFx0fSApO1xuXHR9ICk7XG5cdHdwLmN1c3RvbWl6ZSggJ2Jsb2dkZXNjcmlwdGlvbicsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YWx1ZS5iaW5kKCBmdW5jdGlvbiggdG8gKSB7XG5cdFx0XHQkKCAnLnNpdGUtZGVzY3JpcHRpb24nICkudGV4dCggdG8gKTtcblx0XHR9ICk7XG5cdH0gKTtcblx0Ly8gSGVhZGVyIHRleHQgY29sb3IuXG5cdHdwLmN1c3RvbWl6ZSggJ2hlYWRlcl90ZXh0Y29sb3InLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFsdWUuYmluZCggZnVuY3Rpb24oIHRvICkge1xuXHRcdFx0aWYgKCAnYmxhbmsnID09PSB0byApIHtcblx0XHRcdFx0JCggJy5zaXRlLXRpdGxlIGEsIC5zaXRlLWRlc2NyaXB0aW9uJyApLmNzcygge1xuXHRcdFx0XHRcdCdjbGlwJzogJ3JlY3QoMXB4LCAxcHgsIDFweCwgMXB4KScsXG5cdFx0XHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJ1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKCAnLnNpdGUtdGl0bGUgYSwgLnNpdGUtZGVzY3JpcHRpb24nICkuY3NzKCB7XG5cdFx0XHRcdFx0J2NsaXAnOiAnYXV0bycsXG5cdFx0XHRcdFx0J3Bvc2l0aW9uJzogJ3JlbGF0aXZlJ1xuXHRcdFx0XHR9ICk7XG5cdFx0XHRcdCQoICcuc2l0ZS10aXRsZSBhLCAuc2l0ZS1kZXNjcmlwdGlvbicgKS5jc3MoIHtcblx0XHRcdFx0XHQnY29sb3InOiB0b1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9ICk7XG59ICkoIGpRdWVyeSApO1xuIiwiLypcbiAqIGpRdWVyeSBGbGV4U2xpZGVyIHYyLjYuMFxuICogQ29weXJpZ2h0IDIwMTIgV29vVGhlbWVzXG4gKiBDb250cmlidXRpbmcgQXV0aG9yOiBUeWxlciBTbWl0aFxuICovXG4hIGZ1bmN0aW9uKCQpIHtcbiAgICB2YXIgZSA9ICEwO1xuICAgICQuZmxleHNsaWRlciA9IGZ1bmN0aW9uKHQsIGEpIHtcbiAgICAgICAgdmFyIG4gPSAkKHQpO1xuICAgICAgICBuLnZhcnMgPSAkLmV4dGVuZCh7fSwgJC5mbGV4c2xpZGVyLmRlZmF1bHRzLCBhKTtcbiAgICAgICAgdmFyIGkgPSBuLnZhcnMubmFtZXNwYWNlLFxuICAgICAgICAgICAgcyA9IHdpbmRvdy5uYXZpZ2F0b3IgJiYgd2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkICYmIHdpbmRvdy5NU0dlc3R1cmUsXG4gICAgICAgICAgICByID0gKFwib250b3VjaHN0YXJ0XCIgaW4gd2luZG93IHx8IHMgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKSAmJiBuLnZhcnMudG91Y2gsXG4gICAgICAgICAgICBvID0gXCJjbGljayB0b3VjaGVuZCBNU1BvaW50ZXJVcCBrZXl1cFwiLFxuICAgICAgICAgICAgbCA9IFwiXCIsXG4gICAgICAgICAgICBjLCBkID0gXCJ2ZXJ0aWNhbFwiID09PSBuLnZhcnMuZGlyZWN0aW9uLFxuICAgICAgICAgICAgdSA9IG4udmFycy5yZXZlcnNlLFxuICAgICAgICAgICAgdiA9IG4udmFycy5pdGVtV2lkdGggPiAwLFxuICAgICAgICAgICAgcCA9IFwiZmFkZVwiID09PSBuLnZhcnMuYW5pbWF0aW9uLFxuICAgICAgICAgICAgbSA9IFwiXCIgIT09IG4udmFycy5hc05hdkZvcixcbiAgICAgICAgICAgIGYgPSB7fTtcbiAgICAgICAgJC5kYXRhKHQsIFwiZmxleHNsaWRlclwiLCBuKSwgZiA9IHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG4uYW5pbWF0aW5nID0gITEsIG4uY3VycmVudFNsaWRlID0gcGFyc2VJbnQobi52YXJzLnN0YXJ0QXQgPyBuLnZhcnMuc3RhcnRBdCA6IDAsIDEwKSwgaXNOYU4obi5jdXJyZW50U2xpZGUpICYmIChuLmN1cnJlbnRTbGlkZSA9IDApLCBuLmFuaW1hdGluZ1RvID0gbi5jdXJyZW50U2xpZGUsIG4uYXRFbmQgPSAwID09PSBuLmN1cnJlbnRTbGlkZSB8fCBuLmN1cnJlbnRTbGlkZSA9PT0gbi5sYXN0LCBuLmNvbnRhaW5lclNlbGVjdG9yID0gbi52YXJzLnNlbGVjdG9yLnN1YnN0cigwLCBuLnZhcnMuc2VsZWN0b3Iuc2VhcmNoKFwiIFwiKSksIG4uc2xpZGVzID0gJChuLnZhcnMuc2VsZWN0b3IsIG4pLCBuLmNvbnRhaW5lciA9ICQobi5jb250YWluZXJTZWxlY3RvciwgbiksIG4uY291bnQgPSBuLnNsaWRlcy5sZW5ndGgsIG4uc3luY0V4aXN0cyA9ICQobi52YXJzLnN5bmMpLmxlbmd0aCA+IDAsIFwic2xpZGVcIiA9PT0gbi52YXJzLmFuaW1hdGlvbiAmJiAobi52YXJzLmFuaW1hdGlvbiA9IFwic3dpbmdcIiksIG4ucHJvcCA9IGQgPyBcInRvcFwiIDogXCJtYXJnaW5MZWZ0XCIsIG4uYXJncyA9IHt9LCBuLm1hbnVhbFBhdXNlID0gITEsIG4uc3RvcHBlZCA9ICExLCBuLnN0YXJ0ZWQgPSAhMSwgbi5zdGFydFRpbWVvdXQgPSBudWxsLCBuLnRyYW5zaXRpb25zID0gIW4udmFycy52aWRlbyAmJiAhcCAmJiBuLnZhcnMudXNlQ1NTICYmIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICB0ID0gW1wicGVyc3BlY3RpdmVQcm9wZXJ0eVwiLCBcIldlYmtpdFBlcnNwZWN0aXZlXCIsIFwiTW96UGVyc3BlY3RpdmVcIiwgXCJPUGVyc3BlY3RpdmVcIiwgXCJtc1BlcnNwZWN0aXZlXCJdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBhIGluIHQpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9pZCAwICE9PSBlLnN0eWxlW3RbYV1dKSByZXR1cm4gbi5wZnggPSB0W2FdLnJlcGxhY2UoXCJQZXJzcGVjdGl2ZVwiLCBcIlwiKS50b0xvd2VyQ2FzZSgpLCBuLnByb3AgPSBcIi1cIiArIG4ucGZ4ICsgXCItdHJhbnNmb3JtXCIsICEwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gITFcbiAgICAgICAgICAgICAgICB9KCksIG4uZW5zdXJlQW5pbWF0aW9uRW5kID0gXCJcIiwgXCJcIiAhPT0gbi52YXJzLmNvbnRyb2xzQ29udGFpbmVyICYmIChuLmNvbnRyb2xzQ29udGFpbmVyID0gJChuLnZhcnMuY29udHJvbHNDb250YWluZXIpLmxlbmd0aCA+IDAgJiYgJChuLnZhcnMuY29udHJvbHNDb250YWluZXIpKSwgXCJcIiAhPT0gbi52YXJzLm1hbnVhbENvbnRyb2xzICYmIChuLm1hbnVhbENvbnRyb2xzID0gJChuLnZhcnMubWFudWFsQ29udHJvbHMpLmxlbmd0aCA+IDAgJiYgJChuLnZhcnMubWFudWFsQ29udHJvbHMpKSwgXCJcIiAhPT0gbi52YXJzLmN1c3RvbURpcmVjdGlvbk5hdiAmJiAobi5jdXN0b21EaXJlY3Rpb25OYXYgPSAyID09PSAkKG4udmFycy5jdXN0b21EaXJlY3Rpb25OYXYpLmxlbmd0aCAmJiAkKG4udmFycy5jdXN0b21EaXJlY3Rpb25OYXYpKSwgbi52YXJzLnJhbmRvbWl6ZSAmJiAobi5zbGlkZXMuc29ydChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSkgLSAuNVxuICAgICAgICAgICAgICAgIH0pLCBuLmNvbnRhaW5lci5lbXB0eSgpLmFwcGVuZChuLnNsaWRlcykpLCBuLmRvTWF0aCgpLCBuLnNldHVwKFwiaW5pdFwiKSwgbi52YXJzLmNvbnRyb2xOYXYgJiYgZi5jb250cm9sTmF2LnNldHVwKCksIG4udmFycy5kaXJlY3Rpb25OYXYgJiYgZi5kaXJlY3Rpb25OYXYuc2V0dXAoKSwgbi52YXJzLmtleWJvYXJkICYmICgxID09PSAkKG4uY29udGFpbmVyU2VsZWN0b3IpLmxlbmd0aCB8fCBuLnZhcnMubXVsdGlwbGVLZXlib2FyZCkgJiYgJChkb2N1bWVudCkuYmluZChcImtleXVwXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBlLmtleUNvZGU7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbi5hbmltYXRpbmcgJiYgKDM5ID09PSB0IHx8IDM3ID09PSB0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSAzOSA9PT0gdCA/IG4uZ2V0VGFyZ2V0KFwibmV4dFwiKSA6IDM3ID09PSB0ID8gbi5nZXRUYXJnZXQoXCJwcmV2XCIpIDogITE7XG4gICAgICAgICAgICAgICAgICAgICAgICBuLmZsZXhBbmltYXRlKGEsIG4udmFycy5wYXVzZU9uQWN0aW9uKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksIG4udmFycy5tb3VzZXdoZWVsICYmIG4uYmluZChcIm1vdXNld2hlZWxcIiwgZnVuY3Rpb24oZSwgdCwgYSwgaSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzID0gMCA+IHQgPyBuLmdldFRhcmdldChcIm5leHRcIikgOiBuLmdldFRhcmdldChcInByZXZcIik7XG4gICAgICAgICAgICAgICAgICAgIG4uZmxleEFuaW1hdGUocywgbi52YXJzLnBhdXNlT25BY3Rpb24pXG4gICAgICAgICAgICAgICAgfSksIG4udmFycy5wYXVzZVBsYXkgJiYgZi5wYXVzZVBsYXkuc2V0dXAoKSwgbi52YXJzLnNsaWRlc2hvdyAmJiBuLnZhcnMucGF1c2VJbnZpc2libGUgJiYgZi5wYXVzZUludmlzaWJsZS5pbml0KCksIG4udmFycy5zbGlkZXNob3cgJiYgKG4udmFycy5wYXVzZU9uSG92ZXIgJiYgbi5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbi5tYW51YWxQbGF5IHx8IG4ubWFudWFsUGF1c2UgfHwgbi5wYXVzZSgpXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIG4ubWFudWFsUGF1c2UgfHwgbi5tYW51YWxQbGF5IHx8IG4uc3RvcHBlZCB8fCBuLnBsYXkoKVxuICAgICAgICAgICAgICAgIH0pLCBuLnZhcnMucGF1c2VJbnZpc2libGUgJiYgZi5wYXVzZUludmlzaWJsZS5pc0hpZGRlbigpIHx8IChuLnZhcnMuaW5pdERlbGF5ID4gMCA/IG4uc3RhcnRUaW1lb3V0ID0gc2V0VGltZW91dChuLnBsYXksIG4udmFycy5pbml0RGVsYXkpIDogbi5wbGF5KCkpKSwgbSAmJiBmLmFzTmF2LnNldHVwKCksIHIgJiYgbi52YXJzLnRvdWNoICYmIGYudG91Y2goKSwgKCFwIHx8IHAgJiYgbi52YXJzLnNtb290aEhlaWdodCkgJiYgJCh3aW5kb3cpLmJpbmQoXCJyZXNpemUgb3JpZW50YXRpb25jaGFuZ2UgZm9jdXNcIiwgZi5yZXNpemUpLCBuLmZpbmQoXCJpbWdcIikuYXR0cihcImRyYWdnYWJsZVwiLCBcImZhbHNlXCIpLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBuLnZhcnMuc3RhcnQobilcbiAgICAgICAgICAgICAgICB9LCAyMDApXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXNOYXY6IHtcbiAgICAgICAgICAgICAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIG4uYXNOYXYgPSAhMCwgbi5hbmltYXRpbmdUbyA9IE1hdGguZmxvb3Iobi5jdXJyZW50U2xpZGUgLyBuLm1vdmUpLCBuLmN1cnJlbnRJdGVtID0gbi5jdXJyZW50U2xpZGUsIG4uc2xpZGVzLnJlbW92ZUNsYXNzKGkgKyBcImFjdGl2ZS1zbGlkZVwiKS5lcShuLmN1cnJlbnRJdGVtKS5hZGRDbGFzcyhpICsgXCJhY3RpdmUtc2xpZGVcIiksIHMgPyAodC5fc2xpZGVyID0gbiwgbi5zbGlkZXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuX2dlc3R1cmUgPSBuZXcgTVNHZXN0dXJlLCBlLl9nZXN0dXJlLnRhcmdldCA9IGUsIGUuYWRkRXZlbnRMaXN0ZW5lcihcIk1TUG9pbnRlckRvd25cIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKSwgZS5jdXJyZW50VGFyZ2V0Ll9nZXN0dXJlICYmIGUuY3VycmVudFRhcmdldC5fZ2VzdHVyZS5hZGRQb2ludGVyKGUucG9pbnRlcklkKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgITEpLCBlLmFkZEV2ZW50TGlzdGVuZXIoXCJNU0dlc3R1cmVUYXBcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgPSB0LmluZGV4KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChuLnZhcnMuYXNOYXZGb3IpLmRhdGEoXCJmbGV4c2xpZGVyXCIpLmFuaW1hdGluZyB8fCB0Lmhhc0NsYXNzKFwiYWN0aXZlXCIpIHx8IChuLmRpcmVjdGlvbiA9IG4uY3VycmVudEl0ZW0gPCBhID8gXCJuZXh0XCIgOiBcInByZXZcIiwgbi5mbGV4QW5pbWF0ZShhLCBuLnZhcnMucGF1c2VPbkFjdGlvbiwgITEsICEwLCAhMCkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KSkgOiBuLnNsaWRlcy5vbihvLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYSA9IHQuaW5kZXgoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzID0gdC5vZmZzZXQoKS5sZWZ0IC0gJChuKS5zY3JvbGxMZWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAwID49IHMgJiYgdC5oYXNDbGFzcyhpICsgXCJhY3RpdmUtc2xpZGVcIikgPyBuLmZsZXhBbmltYXRlKG4uZ2V0VGFyZ2V0KFwicHJldlwiKSwgITApIDogJChuLnZhcnMuYXNOYXZGb3IpLmRhdGEoXCJmbGV4c2xpZGVyXCIpLmFuaW1hdGluZyB8fCB0Lmhhc0NsYXNzKGkgKyBcImFjdGl2ZS1zbGlkZVwiKSB8fCAobi5kaXJlY3Rpb24gPSBuLmN1cnJlbnRJdGVtIDwgYSA/IFwibmV4dFwiIDogXCJwcmV2XCIsIG4uZmxleEFuaW1hdGUoYSwgbi52YXJzLnBhdXNlT25BY3Rpb24sICExLCAhMCwgITApKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cm9sTmF2OiB7XG4gICAgICAgICAgICAgICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBuLm1hbnVhbENvbnRyb2xzID8gZi5jb250cm9sTmF2LnNldHVwTWFudWFsKCkgOiBmLmNvbnRyb2xOYXYuc2V0dXBQYWdpbmcoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0dXBQYWdpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IFwidGh1bWJuYWlsc1wiID09PSBuLnZhcnMuY29udHJvbE5hdiA/IFwiY29udHJvbC10aHVtYnNcIiA6IFwiY29udHJvbC1wYWdpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHQgPSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgYSwgcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4uY29udHJvbE5hdlNjYWZmb2xkID0gJCgnPG9sIGNsYXNzPVwiJyArIGkgKyBcImNvbnRyb2wtbmF2IFwiICsgaSArIGUgKyAnXCI+PC9vbD4nKSwgbi5wYWdpbmdDb3VudCA+IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IG4ucGFnaW5nQ291bnQ7IHIrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzID0gbi5zbGlkZXMuZXEociksIHZvaWQgMCA9PT0gcy5hdHRyKFwiZGF0YS10aHVtYi1hbHRcIikgJiYgcy5hdHRyKFwiZGF0YS10aHVtYi1hbHRcIiwgXCJcIiksIGFsdFRleHQgPSBcIlwiICE9PSBzLmF0dHIoXCJkYXRhLXRodW1iLWFsdFwiKSA/IGFsdFRleHQgPSAnIGFsdD1cIicgKyBzLmF0dHIoXCJkYXRhLXRodW1iLWFsdFwiKSArICdcIicgOiBcIlwiLCBhID0gXCJ0aHVtYm5haWxzXCIgPT09IG4udmFycy5jb250cm9sTmF2ID8gJzxpbWcgc3JjPVwiJyArIHMuYXR0cihcImRhdGEtdGh1bWJcIikgKyAnXCInICsgYWx0VGV4dCArIFwiLz5cIiA6ICc8YSBocmVmPVwiI1wiPicgKyB0ICsgXCI8L2E+XCIsIFwidGh1bWJuYWlsc1wiID09PSBuLnZhcnMuY29udHJvbE5hdiAmJiAhMCA9PT0gbi52YXJzLnRodW1iQ2FwdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGMgPSBzLmF0dHIoXCJkYXRhLXRodW1iY2FwdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIiAhPT0gYyAmJiB2b2lkIDAgIT09IGMgJiYgKGEgKz0gJzxzcGFuIGNsYXNzPVwiJyArIGkgKyAnY2FwdGlvblwiPicgKyBjICsgXCI8L3NwYW4+XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4uY29udHJvbE5hdlNjYWZmb2xkLmFwcGVuZChcIjxsaT5cIiArIGEgKyBcIjwvbGk+XCIpLCB0KytcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbi5jb250cm9sc0NvbnRhaW5lciA/ICQobi5jb250cm9sc0NvbnRhaW5lcikuYXBwZW5kKG4uY29udHJvbE5hdlNjYWZmb2xkKSA6IG4uYXBwZW5kKG4uY29udHJvbE5hdlNjYWZmb2xkKSwgZi5jb250cm9sTmF2LnNldCgpLCBmLmNvbnRyb2xOYXYuYWN0aXZlKCksIG4uY29udHJvbE5hdlNjYWZmb2xkLmRlbGVnYXRlKFwiYSwgaW1nXCIsIG8sIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KCksIFwiXCIgPT09IGwgfHwgbCA9PT0gZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhID0gbi5jb250cm9sTmF2LmluZGV4KHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuaGFzQ2xhc3MoaSArIFwiYWN0aXZlXCIpIHx8IChuLmRpcmVjdGlvbiA9IGEgPiBuLmN1cnJlbnRTbGlkZSA/IFwibmV4dFwiIDogXCJwcmV2XCIsIG4uZmxleEFuaW1hdGUoYSwgbi52YXJzLnBhdXNlT25BY3Rpb24pKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcIiA9PT0gbCAmJiAobCA9IGUudHlwZSksIGYuc2V0VG9DbGVhcldhdGNoZWRFdmVudCgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXR1cE1hbnVhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIG4uY29udHJvbE5hdiA9IG4ubWFudWFsQ29udHJvbHMsIGYuY29udHJvbE5hdi5hY3RpdmUoKSwgbi5jb250cm9sTmF2LmJpbmQobywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQoKSwgXCJcIiA9PT0gbCB8fCBsID09PSBlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgPSBuLmNvbnRyb2xOYXYuaW5kZXgodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5oYXNDbGFzcyhpICsgXCJhY3RpdmVcIikgfHwgKGEgPiBuLmN1cnJlbnRTbGlkZSA/IG4uZGlyZWN0aW9uID0gXCJuZXh0XCIgOiBuLmRpcmVjdGlvbiA9IFwicHJldlwiLCBuLmZsZXhBbmltYXRlKGEsIG4udmFycy5wYXVzZU9uQWN0aW9uKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXCIgPT09IGwgJiYgKGwgPSBlLnR5cGUpLCBmLnNldFRvQ2xlYXJXYXRjaGVkRXZlbnQoKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBcInRodW1ibmFpbHNcIiA9PT0gbi52YXJzLmNvbnRyb2xOYXYgPyBcImltZ1wiIDogXCJhXCI7XG4gICAgICAgICAgICAgICAgICAgIG4uY29udHJvbE5hdiA9ICQoXCIuXCIgKyBpICsgXCJjb250cm9sLW5hdiBsaSBcIiArIGUsIG4uY29udHJvbHNDb250YWluZXIgPyBuLmNvbnRyb2xzQ29udGFpbmVyIDogbilcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGFjdGl2ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIG4uY29udHJvbE5hdi5yZW1vdmVDbGFzcyhpICsgXCJhY3RpdmVcIikuZXEobi5hbmltYXRpbmdUbykuYWRkQ2xhc3MoaSArIFwiYWN0aXZlXCIpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbi5wYWdpbmdDb3VudCA+IDEgJiYgXCJhZGRcIiA9PT0gZSA/IG4uY29udHJvbE5hdlNjYWZmb2xkLmFwcGVuZCgkKCc8bGk+PGEgaHJlZj1cIiNcIj4nICsgbi5jb3VudCArIFwiPC9hPjwvbGk+XCIpKSA6IDEgPT09IG4ucGFnaW5nQ291bnQgPyBuLmNvbnRyb2xOYXZTY2FmZm9sZC5maW5kKFwibGlcIikucmVtb3ZlKCkgOiBuLmNvbnRyb2xOYXYuZXEodCkuY2xvc2VzdChcImxpXCIpLnJlbW92ZSgpLCBmLmNvbnRyb2xOYXYuc2V0KCksIG4ucGFnaW5nQ291bnQgPiAxICYmIG4ucGFnaW5nQ291bnQgIT09IG4uY29udHJvbE5hdi5sZW5ndGggPyBuLnVwZGF0ZSh0LCBlKSA6IGYuY29udHJvbE5hdi5hY3RpdmUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXJlY3Rpb25OYXY6IHtcbiAgICAgICAgICAgICAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlID0gJCgnPHVsIGNsYXNzPVwiJyArIGkgKyAnZGlyZWN0aW9uLW5hdlwiPjxsaSBjbGFzcz1cIicgKyBpICsgJ25hdi1wcmV2XCI+PGEgY2xhc3M9XCInICsgaSArICdwcmV2XCIgaHJlZj1cIiNcIj4nICsgbi52YXJzLnByZXZUZXh0ICsgJzwvYT48L2xpPjxsaSBjbGFzcz1cIicgKyBpICsgJ25hdi1uZXh0XCI+PGEgY2xhc3M9XCInICsgaSArICduZXh0XCIgaHJlZj1cIiNcIj4nICsgbi52YXJzLm5leHRUZXh0ICsgXCI8L2E+PC9saT48L3VsPlwiKTtcbiAgICAgICAgICAgICAgICAgICAgbi5jdXN0b21EaXJlY3Rpb25OYXYgPyBuLmRpcmVjdGlvbk5hdiA9IG4uY3VzdG9tRGlyZWN0aW9uTmF2IDogbi5jb250cm9sc0NvbnRhaW5lciA/ICgkKG4uY29udHJvbHNDb250YWluZXIpLmFwcGVuZChlKSwgbi5kaXJlY3Rpb25OYXYgPSAkKFwiLlwiICsgaSArIFwiZGlyZWN0aW9uLW5hdiBsaSBhXCIsIG4uY29udHJvbHNDb250YWluZXIpKSA6IChuLmFwcGVuZChlKSwgbi5kaXJlY3Rpb25OYXYgPSAkKFwiLlwiICsgaSArIFwiZGlyZWN0aW9uLW5hdiBsaSBhXCIsIG4pKSwgZi5kaXJlY3Rpb25OYXYudXBkYXRlKCksIG4uZGlyZWN0aW9uTmF2LmJpbmQobywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJcIiA9PT0gbCB8fCBsID09PSBlLnR5cGUpICYmICh0ID0gJCh0aGlzKS5oYXNDbGFzcyhpICsgXCJuZXh0XCIpID8gbi5nZXRUYXJnZXQoXCJuZXh0XCIpIDogbi5nZXRUYXJnZXQoXCJwcmV2XCIpLCBuLmZsZXhBbmltYXRlKHQsIG4udmFycy5wYXVzZU9uQWN0aW9uKSksIFwiXCIgPT09IGwgJiYgKGwgPSBlLnR5cGUpLCBmLnNldFRvQ2xlYXJXYXRjaGVkRXZlbnQoKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBpICsgXCJkaXNhYmxlZFwiO1xuICAgICAgICAgICAgICAgICAgICAxID09PSBuLnBhZ2luZ0NvdW50ID8gbi5kaXJlY3Rpb25OYXYuYWRkQ2xhc3MoZSkuYXR0cihcInRhYmluZGV4XCIsIFwiLTFcIikgOiBuLnZhcnMuYW5pbWF0aW9uTG9vcCA/IG4uZGlyZWN0aW9uTmF2LnJlbW92ZUNsYXNzKGUpLnJlbW92ZUF0dHIoXCJ0YWJpbmRleFwiKSA6IDAgPT09IG4uYW5pbWF0aW5nVG8gPyBuLmRpcmVjdGlvbk5hdi5yZW1vdmVDbGFzcyhlKS5maWx0ZXIoXCIuXCIgKyBpICsgXCJwcmV2XCIpLmFkZENsYXNzKGUpLmF0dHIoXCJ0YWJpbmRleFwiLCBcIi0xXCIpIDogbi5hbmltYXRpbmdUbyA9PT0gbi5sYXN0ID8gbi5kaXJlY3Rpb25OYXYucmVtb3ZlQ2xhc3MoZSkuZmlsdGVyKFwiLlwiICsgaSArIFwibmV4dFwiKS5hZGRDbGFzcyhlKS5hdHRyKFwidGFiaW5kZXhcIiwgXCItMVwiKSA6IG4uZGlyZWN0aW9uTmF2LnJlbW92ZUNsYXNzKGUpLnJlbW92ZUF0dHIoXCJ0YWJpbmRleFwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXVzZVBsYXk6IHtcbiAgICAgICAgICAgICAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlID0gJCgnPGRpdiBjbGFzcz1cIicgKyBpICsgJ3BhdXNlcGxheVwiPjxhIGhyZWY9XCIjXCI+PC9hPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBuLmNvbnRyb2xzQ29udGFpbmVyID8gKG4uY29udHJvbHNDb250YWluZXIuYXBwZW5kKGUpLCBuLnBhdXNlUGxheSA9ICQoXCIuXCIgKyBpICsgXCJwYXVzZXBsYXkgYVwiLCBuLmNvbnRyb2xzQ29udGFpbmVyKSkgOiAobi5hcHBlbmQoZSksIG4ucGF1c2VQbGF5ID0gJChcIi5cIiArIGkgKyBcInBhdXNlcGxheSBhXCIsIG4pKSwgZi5wYXVzZVBsYXkudXBkYXRlKG4udmFycy5zbGlkZXNob3cgPyBpICsgXCJwYXVzZVwiIDogaSArIFwicGxheVwiKSwgbi5wYXVzZVBsYXkuYmluZChvLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCksIChcIlwiID09PSBsIHx8IGwgPT09IGUudHlwZSkgJiYgKCQodGhpcykuaGFzQ2xhc3MoaSArIFwicGF1c2VcIikgPyAobi5tYW51YWxQYXVzZSA9ICEwLCBuLm1hbnVhbFBsYXkgPSAhMSwgbi5wYXVzZSgpKSA6IChuLm1hbnVhbFBhdXNlID0gITEsIG4ubWFudWFsUGxheSA9ICEwLCBuLnBsYXkoKSkpLCBcIlwiID09PSBsICYmIChsID0gZS50eXBlKSwgZi5zZXRUb0NsZWFyV2F0Y2hlZEV2ZW50KClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBcInBsYXlcIiA9PT0gZSA/IG4ucGF1c2VQbGF5LnJlbW92ZUNsYXNzKGkgKyBcInBhdXNlXCIpLmFkZENsYXNzKGkgKyBcInBsYXlcIikuaHRtbChuLnZhcnMucGxheVRleHQpIDogbi5wYXVzZVBsYXkucmVtb3ZlQ2xhc3MoaSArIFwicGxheVwiKS5hZGRDbGFzcyhpICsgXCJwYXVzZVwiKS5odG1sKG4udmFycy5wYXVzZVRleHQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvdWNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBlKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKSwgbi5hbmltYXRpbmcgPyBlLnByZXZlbnREZWZhdWx0KCkgOiAobi5wYXVzZSgpLCB0Ll9nZXN0dXJlLmFkZFBvaW50ZXIoZS5wb2ludGVySWQpLCBUID0gMCwgYyA9IGQgPyBuLmggOiBuLncsIGYgPSBOdW1iZXIobmV3IERhdGUpLCBsID0gdiAmJiB1ICYmIG4uYW5pbWF0aW5nVG8gPT09IG4ubGFzdCA/IDAgOiB2ICYmIHUgPyBuLmxpbWl0IC0gKG4uaXRlbVcgKyBuLnZhcnMuaXRlbU1hcmdpbikgKiBuLm1vdmUgKiBuLmFuaW1hdGluZ1RvIDogdiAmJiBuLmN1cnJlbnRTbGlkZSA9PT0gbi5sYXN0ID8gbi5saW1pdCA6IHYgPyAobi5pdGVtVyArIG4udmFycy5pdGVtTWFyZ2luKSAqIG4ubW92ZSAqIG4uY3VycmVudFNsaWRlIDogdSA/IChuLmxhc3QgLSBuLmN1cnJlbnRTbGlkZSArIG4uY2xvbmVPZmZzZXQpICogYyA6IChuLmN1cnJlbnRTbGlkZSArIG4uY2xvbmVPZmZzZXQpICogYylcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSBlLnRhcmdldC5fc2xpZGVyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG4gPSAtZS50cmFuc2xhdGlvblgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IC1lLnRyYW5zbGF0aW9uWTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBUICs9IGQgPyBpIDogbiwgbSA9IFQsIHggPSBkID8gTWF0aC5hYnMoVCkgPCBNYXRoLmFicygtbikgOiBNYXRoLmFicyhUKSA8IE1hdGguYWJzKC1pKSwgZS5kZXRhaWwgPT09IGUuTVNHRVNUVVJFX0ZMQUdfSU5FUlRJQSA/IHZvaWQgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuX2dlc3R1cmUuc3RvcCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSA6IHZvaWQoKCF4IHx8IE51bWJlcihuZXcgRGF0ZSkgLSBmID4gNTAwKSAmJiAoZS5wcmV2ZW50RGVmYXVsdCgpLCAhcCAmJiBhLnRyYW5zaXRpb25zICYmIChhLnZhcnMuYW5pbWF0aW9uTG9vcCB8fCAobSA9IFQgLyAoMCA9PT0gYS5jdXJyZW50U2xpZGUgJiYgMCA+IFQgfHwgYS5jdXJyZW50U2xpZGUgPT09IGEubGFzdCAmJiBUID4gMCA/IE1hdGguYWJzKFQpIC8gYyArIDIgOiAxKSksIGEuc2V0UHJvcHMobCArIG0sIFwic2V0VG91Y2hcIikpKSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGkoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGUudGFyZ2V0Ll9zbGlkZXI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodC5hbmltYXRpbmdUbyA9PT0gdC5jdXJyZW50U2xpZGUgJiYgIXggJiYgbnVsbCAhPT0gbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhID0gdSA/IC1tIDogbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9IGEgPiAwID8gdC5nZXRUYXJnZXQoXCJuZXh0XCIpIDogdC5nZXRUYXJnZXQoXCJwcmV2XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuY2FuQWR2YW5jZShuKSAmJiAoTnVtYmVyKG5ldyBEYXRlKSAtIGYgPCA1NTAgJiYgTWF0aC5hYnMoYSkgPiA1MCB8fCBNYXRoLmFicyhhKSA+IGMgLyAyKSA/IHQuZmxleEFuaW1hdGUobiwgdC52YXJzLnBhdXNlT25BY3Rpb24pIDogcCB8fCB0LmZsZXhBbmltYXRlKHQuY3VycmVudFNsaWRlLCB0LnZhcnMucGF1c2VPbkFjdGlvbiwgITApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByID0gbnVsbCwgbyA9IG51bGwsIG0gPSBudWxsLCBsID0gbnVsbCwgVCA9IDBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgciwgbywgbCwgYywgbSwgZiwgZywgaCwgUywgeCA9ICExLFxuICAgICAgICAgICAgICAgICAgICB5ID0gMCxcbiAgICAgICAgICAgICAgICAgICAgYiA9IDAsXG4gICAgICAgICAgICAgICAgICAgIFQgPSAwO1xuICAgICAgICAgICAgICAgIHMgPyAodC5zdHlsZS5tc1RvdWNoQWN0aW9uID0gXCJub25lXCIsIHQuX2dlc3R1cmUgPSBuZXcgTVNHZXN0dXJlLCB0Ll9nZXN0dXJlLnRhcmdldCA9IHQsIHQuYWRkRXZlbnRMaXN0ZW5lcihcIk1TUG9pbnRlckRvd25cIiwgZSwgITEpLCB0Ll9zbGlkZXIgPSBuLCB0LmFkZEV2ZW50TGlzdGVuZXIoXCJNU0dlc3R1cmVDaGFuZ2VcIiwgYSwgITEpLCB0LmFkZEV2ZW50TGlzdGVuZXIoXCJNU0dlc3R1cmVFbmRcIiwgaSwgITEpKSA6IChnID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBuLmFuaW1hdGluZyA/IGUucHJldmVudERlZmF1bHQoKSA6ICh3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQgfHwgMSA9PT0gZS50b3VjaGVzLmxlbmd0aCkgJiYgKG4ucGF1c2UoKSwgYyA9IGQgPyBuLmggOiBuLncsIGYgPSBOdW1iZXIobmV3IERhdGUpLCB5ID0gZS50b3VjaGVzWzBdLnBhZ2VYLCBiID0gZS50b3VjaGVzWzBdLnBhZ2VZLCBsID0gdiAmJiB1ICYmIG4uYW5pbWF0aW5nVG8gPT09IG4ubGFzdCA/IDAgOiB2ICYmIHUgPyBuLmxpbWl0IC0gKG4uaXRlbVcgKyBuLnZhcnMuaXRlbU1hcmdpbikgKiBuLm1vdmUgKiBuLmFuaW1hdGluZ1RvIDogdiAmJiBuLmN1cnJlbnRTbGlkZSA9PT0gbi5sYXN0ID8gbi5saW1pdCA6IHYgPyAobi5pdGVtVyArIG4udmFycy5pdGVtTWFyZ2luKSAqIG4ubW92ZSAqIG4uY3VycmVudFNsaWRlIDogdSA/IChuLmxhc3QgLSBuLmN1cnJlbnRTbGlkZSArIG4uY2xvbmVPZmZzZXQpICogYyA6IChuLmN1cnJlbnRTbGlkZSArIG4uY2xvbmVPZmZzZXQpICogYywgciA9IGQgPyBiIDogeSwgbyA9IGQgPyB5IDogYiwgdC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGgsICExKSwgdC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgUywgITEpKVxuICAgICAgICAgICAgICAgIH0sIGggPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHkgPSBlLnRvdWNoZXNbMF0ucGFnZVgsIGIgPSBlLnRvdWNoZXNbMF0ucGFnZVksIG0gPSBkID8gciAtIGIgOiByIC0geSwgeCA9IGQgPyBNYXRoLmFicyhtKSA8IE1hdGguYWJzKHkgLSBvKSA6IE1hdGguYWJzKG0pIDwgTWF0aC5hYnMoYiAtIG8pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IDUwMDtcbiAgICAgICAgICAgICAgICAgICAgKCF4IHx8IE51bWJlcihuZXcgRGF0ZSkgLSBmID4gdCkgJiYgKGUucHJldmVudERlZmF1bHQoKSwgIXAgJiYgbi50cmFuc2l0aW9ucyAmJiAobi52YXJzLmFuaW1hdGlvbkxvb3AgfHwgKG0gLz0gMCA9PT0gbi5jdXJyZW50U2xpZGUgJiYgMCA+IG0gfHwgbi5jdXJyZW50U2xpZGUgPT09IG4ubGFzdCAmJiBtID4gMCA/IE1hdGguYWJzKG0pIC8gYyArIDIgOiAxKSwgbi5zZXRQcm9wcyhsICsgbSwgXCJzZXRUb3VjaFwiKSkpXG4gICAgICAgICAgICAgICAgfSwgUyA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoLCAhMSksIG4uYW5pbWF0aW5nVG8gPT09IG4uY3VycmVudFNsaWRlICYmICF4ICYmIG51bGwgIT09IG0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhID0gdSA/IC1tIDogbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gYSA+IDAgPyBuLmdldFRhcmdldChcIm5leHRcIikgOiBuLmdldFRhcmdldChcInByZXZcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBuLmNhbkFkdmFuY2UoaSkgJiYgKE51bWJlcihuZXcgRGF0ZSkgLSBmIDwgNTUwICYmIE1hdGguYWJzKGEpID4gNTAgfHwgTWF0aC5hYnMoYSkgPiBjIC8gMikgPyBuLmZsZXhBbmltYXRlKGksIG4udmFycy5wYXVzZU9uQWN0aW9uKSA6IHAgfHwgbi5mbGV4QW5pbWF0ZShuLmN1cnJlbnRTbGlkZSwgbi52YXJzLnBhdXNlT25BY3Rpb24sICEwKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIFMsICExKSwgciA9IG51bGwsIG8gPSBudWxsLCBtID0gbnVsbCwgbCA9IG51bGxcbiAgICAgICAgICAgICAgICB9LCB0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGcsICExKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICFuLmFuaW1hdGluZyAmJiBuLmlzKFwiOnZpc2libGVcIikgJiYgKHYgfHwgbi5kb01hdGgoKSwgcCA/IGYuc21vb3RoSGVpZ2h0KCkgOiB2ID8gKG4uc2xpZGVzLndpZHRoKG4uY29tcHV0ZWRXKSwgbi51cGRhdGUobi5wYWdpbmdDb3VudCksIG4uc2V0UHJvcHMoKSkgOiBkID8gKG4udmlld3BvcnQuaGVpZ2h0KG4uaCksIG4uc2V0UHJvcHMobi5oLCBcInNldFRvdGFsXCIpKSA6IChuLnZhcnMuc21vb3RoSGVpZ2h0ICYmIGYuc21vb3RoSGVpZ2h0KCksIG4ubmV3U2xpZGVzLndpZHRoKG4uY29tcHV0ZWRXKSwgbi5zZXRQcm9wcyhuLmNvbXB1dGVkVywgXCJzZXRUb3RhbFwiKSkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc21vb3RoSGVpZ2h0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkIHx8IHApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBwID8gbiA6IG4udmlld3BvcnQ7XG4gICAgICAgICAgICAgICAgICAgIGUgPyB0LmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBuLnNsaWRlcy5lcShuLmFuaW1hdGluZ1RvKS5oZWlnaHQoKVxuICAgICAgICAgICAgICAgICAgICB9LCBlKSA6IHQuaGVpZ2h0KG4uc2xpZGVzLmVxKG4uYW5pbWF0aW5nVG8pLmhlaWdodCgpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzeW5jOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSAkKG4udmFycy5zeW5jKS5kYXRhKFwiZmxleHNsaWRlclwiKSxcbiAgICAgICAgICAgICAgICAgICAgYSA9IG4uYW5pbWF0aW5nVG87XG4gICAgICAgICAgICAgICAgc3dpdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhbmltYXRlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0LmZsZXhBbmltYXRlKGEsIG4udmFycy5wYXVzZU9uQWN0aW9uLCAhMSwgITApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0LnBsYXlpbmcgfHwgdC5hc05hdiB8fCB0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicGF1c2VcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHQucGF1c2UoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1bmlxdWVJRDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlLmZpbHRlcihcIltpZF1cIikuYWRkKGUuZmluZChcIltpZF1cIikpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgZS5hdHRyKFwiaWRcIiwgZS5hdHRyKFwiaWRcIikgKyBcIl9jbG9uZVwiKVxuICAgICAgICAgICAgICAgIH0pLCBlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF1c2VJbnZpc2libGU6IHtcbiAgICAgICAgICAgICAgICB2aXNQcm9wOiBudWxsLFxuICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZSA9IGYucGF1c2VJbnZpc2libGUuZ2V0SGlkZGVuUHJvcCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBlLnJlcGxhY2UoL1tIfGhdaWRkZW4vLCBcIlwiKSArIFwidmlzaWJpbGl0eWNoYW5nZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmLnBhdXNlSW52aXNpYmxlLmlzSGlkZGVuKCkgPyBuLnN0YXJ0VGltZW91dCA/IGNsZWFyVGltZW91dChuLnN0YXJ0VGltZW91dCkgOiBuLnBhdXNlKCkgOiBuLnN0YXJ0ZWQgPyBuLnBsYXkoKSA6IG4udmFycy5pbml0RGVsYXkgPiAwID8gc2V0VGltZW91dChuLnBsYXksIG4udmFycy5pbml0RGVsYXkpIDogbi5wbGF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlzSGlkZGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBmLnBhdXNlSW52aXNpYmxlLmdldEhpZGRlblByb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUgPyBkb2N1bWVudFtlXSA6ICExXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBnZXRIaWRkZW5Qcm9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBbXCJ3ZWJraXRcIiwgXCJtb3pcIiwgXCJtc1wiLCBcIm9cIl07XG4gICAgICAgICAgICAgICAgICAgIGlmIChcImhpZGRlblwiIGluIGRvY3VtZW50KSByZXR1cm4gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdCA9IDA7IHQgPCBlLmxlbmd0aDsgdCsrKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVbdF0gKyBcIkhpZGRlblwiIGluIGRvY3VtZW50KSByZXR1cm4gZVt0XSArIFwiSGlkZGVuXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFRvQ2xlYXJXYXRjaGVkRXZlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChjKSwgYyA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGwgPSBcIlwiXG4gICAgICAgICAgICAgICAgfSwgM2UzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBuLmZsZXhBbmltYXRlID0gZnVuY3Rpb24oZSwgdCwgYSwgcywgbykge1xuICAgICAgICAgICAgaWYgKG4udmFycy5hbmltYXRpb25Mb29wIHx8IGUgPT09IG4uY3VycmVudFNsaWRlIHx8IChuLmRpcmVjdGlvbiA9IGUgPiBuLmN1cnJlbnRTbGlkZSA/IFwibmV4dFwiIDogXCJwcmV2XCIpLCBtICYmIDEgPT09IG4ucGFnaW5nQ291bnQgJiYgKG4uZGlyZWN0aW9uID0gbi5jdXJyZW50SXRlbSA8IGUgPyBcIm5leHRcIiA6IFwicHJldlwiKSwgIW4uYW5pbWF0aW5nICYmIChuLmNhbkFkdmFuY2UoZSwgbykgfHwgYSkgJiYgbi5pcyhcIjp2aXNpYmxlXCIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG0gJiYgcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbCA9ICQobi52YXJzLmFzTmF2Rm9yKS5kYXRhKFwiZmxleHNsaWRlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4uYXRFbmQgPSAwID09PSBlIHx8IGUgPT09IG4uY291bnQgLSAxLCBsLmZsZXhBbmltYXRlKGUsICEwLCAhMSwgITAsIG8pLCBuLmRpcmVjdGlvbiA9IG4uY3VycmVudEl0ZW0gPCBlID8gXCJuZXh0XCIgOiBcInByZXZcIiwgbC5kaXJlY3Rpb24gPSBuLmRpcmVjdGlvbiwgTWF0aC5jZWlsKChlICsgMSkgLyBuLnZpc2libGUpIC0gMSA9PT0gbi5jdXJyZW50U2xpZGUgfHwgMCA9PT0gZSkgcmV0dXJuIG4uY3VycmVudEl0ZW0gPSBlLCBuLnNsaWRlcy5yZW1vdmVDbGFzcyhpICsgXCJhY3RpdmUtc2xpZGVcIikuZXEoZSkuYWRkQ2xhc3MoaSArIFwiYWN0aXZlLXNsaWRlXCIpLCAhMTtcbiAgICAgICAgICAgICAgICAgICAgbi5jdXJyZW50SXRlbSA9IGUsIG4uc2xpZGVzLnJlbW92ZUNsYXNzKGkgKyBcImFjdGl2ZS1zbGlkZVwiKS5lcShlKS5hZGRDbGFzcyhpICsgXCJhY3RpdmUtc2xpZGVcIiksIGUgPSBNYXRoLmZsb29yKGUgLyBuLnZpc2libGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuLmFuaW1hdGluZyA9ICEwLCBuLmFuaW1hdGluZ1RvID0gZSwgdCAmJiBuLnBhdXNlKCksIG4udmFycy5iZWZvcmUobiksIG4uc3luY0V4aXN0cyAmJiAhbyAmJiBmLnN5bmMoXCJhbmltYXRlXCIpLCBuLnZhcnMuY29udHJvbE5hdiAmJiBmLmNvbnRyb2xOYXYuYWN0aXZlKCksIHYgfHwgbi5zbGlkZXMucmVtb3ZlQ2xhc3MoaSArIFwiYWN0aXZlLXNsaWRlXCIpLmVxKGUpLmFkZENsYXNzKGkgKyBcImFjdGl2ZS1zbGlkZVwiKSwgbi5hdEVuZCA9IDAgPT09IGUgfHwgZSA9PT0gbi5sYXN0LCBuLnZhcnMuZGlyZWN0aW9uTmF2ICYmIGYuZGlyZWN0aW9uTmF2LnVwZGF0ZSgpLCBlID09PSBuLmxhc3QgJiYgKG4udmFycy5lbmQobiksIG4udmFycy5hbmltYXRpb25Mb29wIHx8IG4ucGF1c2UoKSksIHApIHIgPyAobi5zbGlkZXMuZXEobi5jdXJyZW50U2xpZGUpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogMVxuICAgICAgICAgICAgICAgIH0pLCBuLnNsaWRlcy5lcShlKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDJcbiAgICAgICAgICAgICAgICB9KSwgbi53cmFwdXAoYykpIDogKG4uc2xpZGVzLmVxKG4uY3VycmVudFNsaWRlKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDFcbiAgICAgICAgICAgICAgICB9KS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgIH0sIG4udmFycy5hbmltYXRpb25TcGVlZCwgbi52YXJzLmVhc2luZyksIG4uc2xpZGVzLmVxKGUpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogMlxuICAgICAgICAgICAgICAgIH0pLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICAgICAgfSwgbi52YXJzLmFuaW1hdGlvblNwZWVkLCBuLnZhcnMuZWFzaW5nLCBuLndyYXB1cCkpO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IGQgPyBuLnNsaWRlcy5maWx0ZXIoXCI6Zmlyc3RcIikuaGVpZ2h0KCkgOiBuLmNvbXB1dGVkVyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGcsIGgsIFM7XG4gICAgICAgICAgICAgICAgICAgIHYgPyAoZyA9IG4udmFycy5pdGVtTWFyZ2luLCBTID0gKG4uaXRlbVcgKyBnKSAqIG4ubW92ZSAqIG4uYW5pbWF0aW5nVG8sIGggPSBTID4gbi5saW1pdCAmJiAxICE9PSBuLnZpc2libGUgPyBuLmxpbWl0IDogUykgOiBoID0gMCA9PT0gbi5jdXJyZW50U2xpZGUgJiYgZSA9PT0gbi5jb3VudCAtIDEgJiYgbi52YXJzLmFuaW1hdGlvbkxvb3AgJiYgXCJuZXh0XCIgIT09IG4uZGlyZWN0aW9uID8gdSA/IChuLmNvdW50ICsgbi5jbG9uZU9mZnNldCkgKiBjIDogMCA6IG4uY3VycmVudFNsaWRlID09PSBuLmxhc3QgJiYgMCA9PT0gZSAmJiBuLnZhcnMuYW5pbWF0aW9uTG9vcCAmJiBcInByZXZcIiAhPT0gbi5kaXJlY3Rpb24gPyB1ID8gMCA6IChuLmNvdW50ICsgMSkgKiBjIDogdSA/IChuLmNvdW50IC0gMSAtIGUgKyBuLmNsb25lT2Zmc2V0KSAqIGMgOiAoZSArIG4uY2xvbmVPZmZzZXQpICogYywgbi5zZXRQcm9wcyhoLCBcIlwiLCBuLnZhcnMuYW5pbWF0aW9uU3BlZWQpLCBuLnRyYW5zaXRpb25zID8gKG4udmFycy5hbmltYXRpb25Mb29wICYmIG4uYXRFbmQgfHwgKG4uYW5pbWF0aW5nID0gITEsIG4uY3VycmVudFNsaWRlID0gbi5hbmltYXRpbmdUbyksIG4uY29udGFpbmVyLnVuYmluZChcIndlYmtpdFRyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZFwiKSwgbi5jb250YWluZXIuYmluZChcIndlYmtpdFRyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChuLmVuc3VyZUFuaW1hdGlvbkVuZCksIG4ud3JhcHVwKGMpXG4gICAgICAgICAgICAgICAgICAgIH0pLCBjbGVhclRpbWVvdXQobi5lbnN1cmVBbmltYXRpb25FbmQpLCBuLmVuc3VyZUFuaW1hdGlvbkVuZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuLndyYXB1cChjKVxuICAgICAgICAgICAgICAgICAgICB9LCBuLnZhcnMuYW5pbWF0aW9uU3BlZWQgKyAxMDApKSA6IG4uY29udGFpbmVyLmFuaW1hdGUobi5hcmdzLCBuLnZhcnMuYW5pbWF0aW9uU3BlZWQsIG4udmFycy5lYXNpbmcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbi53cmFwdXAoYylcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbi52YXJzLnNtb290aEhlaWdodCAmJiBmLnNtb290aEhlaWdodChuLnZhcnMuYW5pbWF0aW9uU3BlZWQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG4ud3JhcHVwID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcCB8fCB2IHx8ICgwID09PSBuLmN1cnJlbnRTbGlkZSAmJiBuLmFuaW1hdGluZ1RvID09PSBuLmxhc3QgJiYgbi52YXJzLmFuaW1hdGlvbkxvb3AgPyBuLnNldFByb3BzKGUsIFwianVtcEVuZFwiKSA6IG4uY3VycmVudFNsaWRlID09PSBuLmxhc3QgJiYgMCA9PT0gbi5hbmltYXRpbmdUbyAmJiBuLnZhcnMuYW5pbWF0aW9uTG9vcCAmJiBuLnNldFByb3BzKGUsIFwianVtcFN0YXJ0XCIpKSwgbi5hbmltYXRpbmcgPSAhMSwgbi5jdXJyZW50U2xpZGUgPSBuLmFuaW1hdGluZ1RvLCBuLnZhcnMuYWZ0ZXIobilcbiAgICAgICAgfSwgbi5hbmltYXRlU2xpZGVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAhbi5hbmltYXRpbmcgJiYgZSAmJiBuLmZsZXhBbmltYXRlKG4uZ2V0VGFyZ2V0KFwibmV4dFwiKSlcbiAgICAgICAgfSwgbi5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChuLmFuaW1hdGVkU2xpZGVzKSwgbi5hbmltYXRlZFNsaWRlcyA9IG51bGwsIG4ucGxheWluZyA9ICExLCBuLnZhcnMucGF1c2VQbGF5ICYmIGYucGF1c2VQbGF5LnVwZGF0ZShcInBsYXlcIiksIG4uc3luY0V4aXN0cyAmJiBmLnN5bmMoXCJwYXVzZVwiKVxuICAgICAgICB9LCBuLnBsYXkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG4ucGxheWluZyAmJiBjbGVhckludGVydmFsKG4uYW5pbWF0ZWRTbGlkZXMpLCBuLmFuaW1hdGVkU2xpZGVzID0gbi5hbmltYXRlZFNsaWRlcyB8fCBzZXRJbnRlcnZhbChuLmFuaW1hdGVTbGlkZXMsIG4udmFycy5zbGlkZXNob3dTcGVlZCksIG4uc3RhcnRlZCA9IG4ucGxheWluZyA9ICEwLCBuLnZhcnMucGF1c2VQbGF5ICYmIGYucGF1c2VQbGF5LnVwZGF0ZShcInBhdXNlXCIpLCBuLnN5bmNFeGlzdHMgJiYgZi5zeW5jKFwicGxheVwiKVxuICAgICAgICB9LCBuLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG4ucGF1c2UoKSwgbi5zdG9wcGVkID0gITBcbiAgICAgICAgfSwgbi5jYW5BZHZhbmNlID0gZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgdmFyIGEgPSBtID8gbi5wYWdpbmdDb3VudCAtIDEgOiBuLmxhc3Q7XG4gICAgICAgICAgICByZXR1cm4gdCA/ICEwIDogbSAmJiBuLmN1cnJlbnRJdGVtID09PSBuLmNvdW50IC0gMSAmJiAwID09PSBlICYmIFwicHJldlwiID09PSBuLmRpcmVjdGlvbiA/ICEwIDogbSAmJiAwID09PSBuLmN1cnJlbnRJdGVtICYmIGUgPT09IG4ucGFnaW5nQ291bnQgLSAxICYmIFwibmV4dFwiICE9PSBuLmRpcmVjdGlvbiA/ICExIDogZSAhPT0gbi5jdXJyZW50U2xpZGUgfHwgbSA/IG4udmFycy5hbmltYXRpb25Mb29wID8gITAgOiBuLmF0RW5kICYmIDAgPT09IG4uY3VycmVudFNsaWRlICYmIGUgPT09IGEgJiYgXCJuZXh0XCIgIT09IG4uZGlyZWN0aW9uID8gITEgOiBuLmF0RW5kICYmIG4uY3VycmVudFNsaWRlID09PSBhICYmIDAgPT09IGUgJiYgXCJuZXh0XCIgPT09IG4uZGlyZWN0aW9uID8gITEgOiAhMCA6ICExXG4gICAgICAgIH0sIG4uZ2V0VGFyZ2V0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIG4uZGlyZWN0aW9uID0gZSwgXCJuZXh0XCIgPT09IGUgPyBuLmN1cnJlbnRTbGlkZSA9PT0gbi5sYXN0ID8gMCA6IG4uY3VycmVudFNsaWRlICsgMSA6IDAgPT09IG4uY3VycmVudFNsaWRlID8gbi5sYXN0IDogbi5jdXJyZW50U2xpZGUgLSAxXG4gICAgICAgIH0sIG4uc2V0UHJvcHMgPSBmdW5jdGlvbihlLCB0LCBhKSB7XG4gICAgICAgICAgICB2YXIgaSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBhID0gZSA/IGUgOiAobi5pdGVtVyArIG4udmFycy5pdGVtTWFyZ2luKSAqIG4ubW92ZSAqIG4uYW5pbWF0aW5nVG8sXG4gICAgICAgICAgICAgICAgICAgIGkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2KSByZXR1cm4gXCJzZXRUb3VjaFwiID09PSB0ID8gZSA6IHUgJiYgbi5hbmltYXRpbmdUbyA9PT0gbi5sYXN0ID8gMCA6IHUgPyBuLmxpbWl0IC0gKG4uaXRlbVcgKyBuLnZhcnMuaXRlbU1hcmdpbikgKiBuLm1vdmUgKiBuLmFuaW1hdGluZ1RvIDogbi5hbmltYXRpbmdUbyA9PT0gbi5sYXN0ID8gbi5saW1pdCA6IGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2V0VG90YWxcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHUgPyAobi5jb3VudCAtIDEgLSBuLmN1cnJlbnRTbGlkZSArIG4uY2xvbmVPZmZzZXQpICogZSA6IChuLmN1cnJlbnRTbGlkZSArIG4uY2xvbmVPZmZzZXQpICogZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2V0VG91Y2hcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHUgPyBlIDogZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwianVtcEVuZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdSA/IGUgOiBuLmNvdW50ICogZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwianVtcFN0YXJ0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1ID8gbi5jb3VudCAqIGUgOiBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTEgKiBpICsgXCJweFwiXG4gICAgICAgICAgICB9KCk7XG4gICAgICAgICAgICBuLnRyYW5zaXRpb25zICYmIChpID0gZCA/IFwidHJhbnNsYXRlM2QoMCxcIiArIGkgKyBcIiwwKVwiIDogXCJ0cmFuc2xhdGUzZChcIiArIGkgKyBcIiwwLDApXCIsIGEgPSB2b2lkIDAgIT09IGEgPyBhIC8gMWUzICsgXCJzXCIgOiBcIjBzXCIsIG4uY29udGFpbmVyLmNzcyhcIi1cIiArIG4ucGZ4ICsgXCItdHJhbnNpdGlvbi1kdXJhdGlvblwiLCBhKSwgbi5jb250YWluZXIuY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLCBhKSksIG4uYXJnc1tuLnByb3BdID0gaSwgKG4udHJhbnNpdGlvbnMgfHwgdm9pZCAwID09PSBhKSAmJiBuLmNvbnRhaW5lci5jc3Mobi5hcmdzKSwgbi5jb250YWluZXIuY3NzKFwidHJhbnNmb3JtXCIsIGkpXG4gICAgICAgIH0sIG4uc2V0dXAgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAocCkgbi5zbGlkZXMuY3NzKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgXCJmbG9hdFwiOiBcImxlZnRcIixcbiAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogXCItMTAwJVwiLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCJcbiAgICAgICAgICAgIH0pLCBcImluaXRcIiA9PT0gZSAmJiAociA/IG4uc2xpZGVzLmNzcyh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImJsb2NrXCIsXG4gICAgICAgICAgICAgICAgd2Via2l0VHJhbnNpdGlvbjogXCJvcGFjaXR5IFwiICsgbi52YXJzLmFuaW1hdGlvblNwZWVkIC8gMWUzICsgXCJzIGVhc2VcIixcbiAgICAgICAgICAgICAgICB6SW5kZXg6IDFcbiAgICAgICAgICAgIH0pLmVxKG4uY3VycmVudFNsaWRlKS5jc3Moe1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgICAgekluZGV4OiAyXG4gICAgICAgICAgICB9KSA6IDAgPT0gbi52YXJzLmZhZGVGaXJzdFNsaWRlID8gbi5zbGlkZXMuY3NzKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIixcbiAgICAgICAgICAgICAgICB6SW5kZXg6IDFcbiAgICAgICAgICAgIH0pLmVxKG4uY3VycmVudFNsaWRlKS5jc3Moe1xuICAgICAgICAgICAgICAgIHpJbmRleDogMlxuICAgICAgICAgICAgfSkuY3NzKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9KSA6IG4uc2xpZGVzLmNzcyh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImJsb2NrXCIsXG4gICAgICAgICAgICAgICAgekluZGV4OiAxXG4gICAgICAgICAgICB9KS5lcShuLmN1cnJlbnRTbGlkZSkuY3NzKHtcbiAgICAgICAgICAgICAgICB6SW5kZXg6IDJcbiAgICAgICAgICAgIH0pLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgIH0sIG4udmFycy5hbmltYXRpb25TcGVlZCwgbi52YXJzLmVhc2luZykpLCBuLnZhcnMuc21vb3RoSGVpZ2h0ICYmIGYuc21vb3RoSGVpZ2h0KCk7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdCwgYTtcbiAgICAgICAgICAgICAgICBcImluaXRcIiA9PT0gZSAmJiAobi52aWV3cG9ydCA9ICQoJzxkaXYgY2xhc3M9XCInICsgaSArICd2aWV3cG9ydFwiPjwvZGl2PicpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiBcImhpZGRlblwiLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiXG4gICAgICAgICAgICAgICAgfSkuYXBwZW5kVG8obikuYXBwZW5kKG4uY29udGFpbmVyKSwgbi5jbG9uZUNvdW50ID0gMCwgbi5jbG9uZU9mZnNldCA9IDAsIHUgJiYgKGEgPSAkLm1ha2VBcnJheShuLnNsaWRlcykucmV2ZXJzZSgpLCBuLnNsaWRlcyA9ICQoYSksIG4uY29udGFpbmVyLmVtcHR5KCkuYXBwZW5kKG4uc2xpZGVzKSkpLCBuLnZhcnMuYW5pbWF0aW9uTG9vcCAmJiAhdiAmJiAobi5jbG9uZUNvdW50ID0gMiwgbi5jbG9uZU9mZnNldCA9IDEsIFwiaW5pdFwiICE9PSBlICYmIG4uY29udGFpbmVyLmZpbmQoXCIuY2xvbmVcIikucmVtb3ZlKCksIG4uY29udGFpbmVyLmFwcGVuZChmLnVuaXF1ZUlEKG4uc2xpZGVzLmZpcnN0KCkuY2xvbmUoKS5hZGRDbGFzcyhcImNsb25lXCIpKS5hdHRyKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpKS5wcmVwZW5kKGYudW5pcXVlSUQobi5zbGlkZXMubGFzdCgpLmNsb25lKCkuYWRkQ2xhc3MoXCJjbG9uZVwiKSkuYXR0cihcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKSkpLCBuLm5ld1NsaWRlcyA9ICQobi52YXJzLnNlbGVjdG9yLCBuKSwgdCA9IHUgPyBuLmNvdW50IC0gMSAtIG4uY3VycmVudFNsaWRlICsgbi5jbG9uZU9mZnNldCA6IG4uY3VycmVudFNsaWRlICsgbi5jbG9uZU9mZnNldCwgZCAmJiAhdiA/IChuLmNvbnRhaW5lci5oZWlnaHQoMjAwICogKG4uY291bnQgKyBuLmNsb25lQ291bnQpICsgXCIlXCIpLmNzcyhcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIikud2lkdGgoXCIxMDAlXCIpLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBuLm5ld1NsaWRlcy5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJibG9ja1wiXG4gICAgICAgICAgICAgICAgICAgIH0pLCBuLmRvTWF0aCgpLCBuLnZpZXdwb3J0LmhlaWdodChuLmgpLCBuLnNldFByb3BzKHQgKiBuLmgsIFwiaW5pdFwiKVxuICAgICAgICAgICAgICAgIH0sIFwiaW5pdFwiID09PSBlID8gMTAwIDogMCkpIDogKG4uY29udGFpbmVyLndpZHRoKDIwMCAqIChuLmNvdW50ICsgbi5jbG9uZUNvdW50KSArIFwiJVwiKSwgbi5zZXRQcm9wcyh0ICogbi5jb21wdXRlZFcsIFwiaW5pdFwiKSwgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbi5kb01hdGgoKSwgbi5uZXdTbGlkZXMuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBuLmNvbXB1dGVkVyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiBuLmNvbXB1dGVkTSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmxvYXRcIjogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImJsb2NrXCJcbiAgICAgICAgICAgICAgICAgICAgfSksIG4udmFycy5zbW9vdGhIZWlnaHQgJiYgZi5zbW9vdGhIZWlnaHQoKVxuICAgICAgICAgICAgICAgIH0sIFwiaW5pdFwiID09PSBlID8gMTAwIDogMCkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2IHx8IG4uc2xpZGVzLnJlbW92ZUNsYXNzKGkgKyBcImFjdGl2ZS1zbGlkZVwiKS5lcShuLmN1cnJlbnRTbGlkZSkuYWRkQ2xhc3MoaSArIFwiYWN0aXZlLXNsaWRlXCIpLCBuLnZhcnMuaW5pdChuKVxuICAgICAgICB9LCBuLmRvTWF0aCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGUgPSBuLnNsaWRlcy5maXJzdCgpLFxuICAgICAgICAgICAgICAgIHQgPSBuLnZhcnMuaXRlbU1hcmdpbixcbiAgICAgICAgICAgICAgICBhID0gbi52YXJzLm1pbkl0ZW1zLFxuICAgICAgICAgICAgICAgIGkgPSBuLnZhcnMubWF4SXRlbXM7XG4gICAgICAgICAgICBuLncgPSB2b2lkIDAgPT09IG4udmlld3BvcnQgPyBuLndpZHRoKCkgOiBuLnZpZXdwb3J0LndpZHRoKCksIG4uaCA9IGUuaGVpZ2h0KCksIG4uYm94UGFkZGluZyA9IGUub3V0ZXJXaWR0aCgpIC0gZS53aWR0aCgpLCB2ID8gKG4uaXRlbVQgPSBuLnZhcnMuaXRlbVdpZHRoICsgdCwgbi5pdGVtTSA9IHQsIG4ubWluVyA9IGEgPyBhICogbi5pdGVtVCA6IG4udywgbi5tYXhXID0gaSA/IGkgKiBuLml0ZW1UIC0gdCA6IG4udywgbi5pdGVtVyA9IG4ubWluVyA+IG4udyA/IChuLncgLSB0ICogKGEgLSAxKSkgLyBhIDogbi5tYXhXIDwgbi53ID8gKG4udyAtIHQgKiAoaSAtIDEpKSAvIGkgOiBuLnZhcnMuaXRlbVdpZHRoID4gbi53ID8gbi53IDogbi52YXJzLml0ZW1XaWR0aCwgbi52aXNpYmxlID0gTWF0aC5mbG9vcihuLncgLyBuLml0ZW1XKSwgbi5tb3ZlID0gbi52YXJzLm1vdmUgPiAwICYmIG4udmFycy5tb3ZlIDwgbi52aXNpYmxlID8gbi52YXJzLm1vdmUgOiBuLnZpc2libGUsIG4ucGFnaW5nQ291bnQgPSBNYXRoLmNlaWwoKG4uY291bnQgLSBuLnZpc2libGUpIC8gbi5tb3ZlICsgMSksIG4ubGFzdCA9IG4ucGFnaW5nQ291bnQgLSAxLCBuLmxpbWl0ID0gMSA9PT0gbi5wYWdpbmdDb3VudCA/IDAgOiBuLnZhcnMuaXRlbVdpZHRoID4gbi53ID8gbi5pdGVtVyAqIChuLmNvdW50IC0gMSkgKyB0ICogKG4uY291bnQgLSAxKSA6IChuLml0ZW1XICsgdCkgKiBuLmNvdW50IC0gbi53IC0gdCkgOiAobi5pdGVtVyA9IG4udywgbi5pdGVtTSA9IHQsIG4ucGFnaW5nQ291bnQgPSBuLmNvdW50LCBuLmxhc3QgPSBuLmNvdW50IC0gMSksIG4uY29tcHV0ZWRXID0gbi5pdGVtVyAtIG4uYm94UGFkZGluZywgbi5jb21wdXRlZE0gPSBuLml0ZW1NXG4gICAgICAgIH0sIG4udXBkYXRlID0gZnVuY3Rpb24oZSwgdCkge1xuICAgICAgICAgICAgbi5kb01hdGgoKSwgdiB8fCAoZSA8IG4uY3VycmVudFNsaWRlID8gbi5jdXJyZW50U2xpZGUgKz0gMSA6IGUgPD0gbi5jdXJyZW50U2xpZGUgJiYgMCAhPT0gZSAmJiAobi5jdXJyZW50U2xpZGUgLT0gMSksIG4uYW5pbWF0aW5nVG8gPSBuLmN1cnJlbnRTbGlkZSksIG4udmFycy5jb250cm9sTmF2ICYmICFuLm1hbnVhbENvbnRyb2xzICYmIChcImFkZFwiID09PSB0ICYmICF2IHx8IG4ucGFnaW5nQ291bnQgPiBuLmNvbnRyb2xOYXYubGVuZ3RoID8gZi5jb250cm9sTmF2LnVwZGF0ZShcImFkZFwiKSA6IChcInJlbW92ZVwiID09PSB0ICYmICF2IHx8IG4ucGFnaW5nQ291bnQgPCBuLmNvbnRyb2xOYXYubGVuZ3RoKSAmJiAodiAmJiBuLmN1cnJlbnRTbGlkZSA+IG4ubGFzdCAmJiAobi5jdXJyZW50U2xpZGUgLT0gMSwgbi5hbmltYXRpbmdUbyAtPSAxKSwgZi5jb250cm9sTmF2LnVwZGF0ZShcInJlbW92ZVwiLCBuLmxhc3QpKSksIG4udmFycy5kaXJlY3Rpb25OYXYgJiYgZi5kaXJlY3Rpb25OYXYudXBkYXRlKClcbiAgICAgICAgfSwgbi5hZGRTbGlkZSA9IGZ1bmN0aW9uKGUsIHQpIHtcbiAgICAgICAgICAgIHZhciBhID0gJChlKTtcbiAgICAgICAgICAgIG4uY291bnQgKz0gMSwgbi5sYXN0ID0gbi5jb3VudCAtIDEsIGQgJiYgdSA/IHZvaWQgMCAhPT0gdCA/IG4uc2xpZGVzLmVxKG4uY291bnQgLSB0KS5hZnRlcihhKSA6IG4uY29udGFpbmVyLnByZXBlbmQoYSkgOiB2b2lkIDAgIT09IHQgPyBuLnNsaWRlcy5lcSh0KS5iZWZvcmUoYSkgOiBuLmNvbnRhaW5lci5hcHBlbmQoYSksIG4udXBkYXRlKHQsIFwiYWRkXCIpLCBuLnNsaWRlcyA9ICQobi52YXJzLnNlbGVjdG9yICsgXCI6bm90KC5jbG9uZSlcIiwgbiksIG4uc2V0dXAoKSwgbi52YXJzLmFkZGVkKG4pXG4gICAgICAgIH0sIG4ucmVtb3ZlU2xpZGUgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdCA9IGlzTmFOKGUpID8gbi5zbGlkZXMuaW5kZXgoJChlKSkgOiBlO1xuICAgICAgICAgICAgbi5jb3VudCAtPSAxLCBuLmxhc3QgPSBuLmNvdW50IC0gMSwgaXNOYU4oZSkgPyAkKGUsIG4uc2xpZGVzKS5yZW1vdmUoKSA6IGQgJiYgdSA/IG4uc2xpZGVzLmVxKG4ubGFzdCkucmVtb3ZlKCkgOiBuLnNsaWRlcy5lcShlKS5yZW1vdmUoKSwgbi5kb01hdGgoKSwgbi51cGRhdGUodCwgXCJyZW1vdmVcIiksIG4uc2xpZGVzID0gJChuLnZhcnMuc2VsZWN0b3IgKyBcIjpub3QoLmNsb25lKVwiLCBuKSwgbi5zZXR1cCgpLCBuLnZhcnMucmVtb3ZlZChuKVxuICAgICAgICB9LCBmLmluaXQoKVxuICAgIH0sICQod2luZG93KS5ibHVyKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZSA9ICExXG4gICAgfSkuZm9jdXMoZnVuY3Rpb24odCkge1xuICAgICAgICBlID0gITBcbiAgICB9KSwgJC5mbGV4c2xpZGVyLmRlZmF1bHRzID0ge1xuICAgICAgICBuYW1lc3BhY2U6IFwiZmxleC1cIixcbiAgICAgICAgc2VsZWN0b3I6IFwiLnNsaWRlcyA+IGxpXCIsXG4gICAgICAgIGFuaW1hdGlvbjogXCJmYWRlXCIsXG4gICAgICAgIGVhc2luZzogXCJzd2luZ1wiLFxuICAgICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgICByZXZlcnNlOiAhMSxcbiAgICAgICAgYW5pbWF0aW9uTG9vcDogITAsXG4gICAgICAgIHNtb290aEhlaWdodDogITEsXG4gICAgICAgIHN0YXJ0QXQ6IDAsXG4gICAgICAgIHNsaWRlc2hvdzogITAsXG4gICAgICAgIHNsaWRlc2hvd1NwZWVkOiA3ZTMsXG4gICAgICAgIGFuaW1hdGlvblNwZWVkOiA2MDAsXG4gICAgICAgIGluaXREZWxheTogMCxcbiAgICAgICAgcmFuZG9taXplOiAhMSxcbiAgICAgICAgZmFkZUZpcnN0U2xpZGU6ICEwLFxuICAgICAgICB0aHVtYkNhcHRpb25zOiAhMSxcbiAgICAgICAgcGF1c2VPbkFjdGlvbjogITAsXG4gICAgICAgIHBhdXNlT25Ib3ZlcjogITEsXG4gICAgICAgIHBhdXNlSW52aXNpYmxlOiAhMCxcbiAgICAgICAgdXNlQ1NTOiAhMCxcbiAgICAgICAgdG91Y2g6ICEwLFxuICAgICAgICB2aWRlbzogITEsXG4gICAgICAgIGNvbnRyb2xOYXY6ICEwLFxuICAgICAgICBkaXJlY3Rpb25OYXY6ICEwLFxuICAgICAgICBwcmV2VGV4dDogXCJQcmV2aW91c1wiLFxuICAgICAgICBuZXh0VGV4dDogXCJOZXh0XCIsXG4gICAgICAgIGtleWJvYXJkOiAhMCxcbiAgICAgICAgbXVsdGlwbGVLZXlib2FyZDogITEsXG4gICAgICAgIG1vdXNld2hlZWw6ICExLFxuICAgICAgICBwYXVzZVBsYXk6ICExLFxuICAgICAgICBwYXVzZVRleHQ6IFwiUGF1c2VcIixcbiAgICAgICAgcGxheVRleHQ6IFwiUGxheVwiLFxuICAgICAgICBjb250cm9sc0NvbnRhaW5lcjogXCJcIixcbiAgICAgICAgbWFudWFsQ29udHJvbHM6IFwiXCIsXG4gICAgICAgIGN1c3RvbURpcmVjdGlvbk5hdjogXCJcIixcbiAgICAgICAgc3luYzogXCJcIixcbiAgICAgICAgYXNOYXZGb3I6IFwiXCIsXG4gICAgICAgIGl0ZW1XaWR0aDogMCxcbiAgICAgICAgaXRlbU1hcmdpbjogMCxcbiAgICAgICAgbWluSXRlbXM6IDEsXG4gICAgICAgIG1heEl0ZW1zOiAwLFxuICAgICAgICBtb3ZlOiAwLFxuICAgICAgICBhbGxvd09uZVNsaWRlOiAhMCxcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGJlZm9yZTogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgYWZ0ZXI6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGVuZDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgYWRkZWQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIHJlbW92ZWQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge31cbiAgICB9LCAkLmZuLmZsZXhzbGlkZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICh2b2lkIDAgPT09IGUgJiYgKGUgPSB7fSksIFwib2JqZWN0XCIgPT0gdHlwZW9mIGUpIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdCA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgYSA9IGUuc2VsZWN0b3IgPyBlLnNlbGVjdG9yIDogXCIuc2xpZGVzID4gbGlcIixcbiAgICAgICAgICAgICAgICBuID0gdC5maW5kKGEpO1xuICAgICAgICAgICAgMSA9PT0gbi5sZW5ndGggJiYgZS5hbGxvd09uZVNsaWRlID09PSAhMCB8fCAwID09PSBuLmxlbmd0aCA/IChuLmZhZGVJbig0MDApLCBlLnN0YXJ0ICYmIGUuc3RhcnQodCkpIDogdm9pZCAwID09PSB0LmRhdGEoXCJmbGV4c2xpZGVyXCIpICYmIG5ldyAkLmZsZXhzbGlkZXIodGhpcywgZSlcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB0ID0gJCh0aGlzKS5kYXRhKFwiZmxleHNsaWRlclwiKTtcbiAgICAgICAgc3dpdGNoIChlKSB7XG4gICAgICAgICAgICBjYXNlIFwicGxheVwiOlxuICAgICAgICAgICAgICAgIHQucGxheSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBhdXNlXCI6XG4gICAgICAgICAgICAgICAgdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInN0b3BcIjpcbiAgICAgICAgICAgICAgICB0LnN0b3AoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJuZXh0XCI6XG4gICAgICAgICAgICAgICAgdC5mbGV4QW5pbWF0ZSh0LmdldFRhcmdldChcIm5leHRcIiksICEwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwcmV2XCI6XG4gICAgICAgICAgICBjYXNlIFwicHJldmlvdXNcIjpcbiAgICAgICAgICAgICAgICB0LmZsZXhBbmltYXRlKHQuZ2V0VGFyZ2V0KFwicHJldlwiKSwgITApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiID09IHR5cGVvZiBlICYmIHQuZmxleEFuaW1hdGUoZSwgITApXG4gICAgICAgIH1cbiAgICB9XG59KGpRdWVyeSk7IiwiLyoqXG4gKiBDbG9uZVlhITogUGx1Z2luIHRvIGNsb25lIGZvcm0gZWxlbWVudHMgaW4gYSBuZXN0ZWQgbWFubmVyXG4gKiBAYXV0aG9yIFNhdXJhYmggU2h1a2xhIDxzYXVyYWJoQHlhcGFwYXlhLmNvbT5cbiAqIGh0dHA6Ly9ob29rcmVmaW5lYW5kdGlua2VyLmNvbVxuICogTGljZW5zZSBHTlUvR1BMICYgTUlUXG4gKi9cblxuKGZ1bmN0aW9uICgkKSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBuYW1lID0gXCJjbG9uZXlhXCIsIGRlZmF1bHRzID0ge1xuICAgICAgICBjbG9uZVRoaXM6ICcudG9jbG9uZScsXG4gICAgICAgIGNsb25lQnV0dG9uOiAnLmNsb25lJyxcbiAgICAgICAgZGVsZXRlQnV0dG9uOiAnLmRlbGV0ZScsXG4gICAgICAgIGNsb25lUG9zaXRpb246ICdhZnRlcicsXG4gICAgICAgIG1pbmltdW06IDEsXG4gICAgICAgIC8vIHJlbmFtaW5nIGxpbWl0XG4gICAgICAgIG1heGltdW06IDk5OSwgLy9zZXR0aW5nIGl0IHRvIGEgaGlnaCBudW1iZXIsIGJ5IGRlZmF1bHRcblxuICAgICAgICAvL2xpbWl0OiA5OTksXG5cbiAgICAgICAgdmFsdWVDbG9uZTogZmFsc2UsXG4gICAgICAgIGRhdGFDbG9uZTogZmFsc2UsXG4gICAgICAgIGRlZXBDbG9uZTogZmFsc2UsXG4gICAgICAgIHNlcmlhbGl6ZUlEOiB0cnVlLFxuICAgICAgICBpZ25vcmU6ICdsYWJlbC5lcnJvcicsXG4gICAgICAgIHByZXNlcnZlQ2hpbGRDb3VudDogZmFsc2VcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgY2xhc3MgQ2xvbmVZYVxuICAgICAqXG4gICAgICogQGNsYXNzIENsb25lWWFcbiAgICAgKiBAY2xhc3NkZXNjIEFkZHMgY2xvbmluZyBmdW5jdGlvbmFsaXR5IHRvIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nIHwgT2JqZWN0fSBlbGVtZW50IC0gdGhlIGNsb25lIHdyYXBwZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyB0byBpbml0aWFsaXNlIHdpdGhcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmNsb25lVGhpcyAtIFNlbGVjdG9yIGZvciB0aGUgIGNsb25lIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5jbG9uZUJ1dHRvbiAtIFNlbGVjdG9yIGZvciB0aGUgIGNsb25lIGJ1dHRvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmRlbGV0ZUJ1dHRvbiAtIFNlbGVjdG9yIGZvciB0aGUgIGRlbGV0ZSBidXR0b25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmNsb25lUG9zaXRpb24gLSBXaGVyZSBzaG91bGQgdGhlIGNsb25lIGJlIGFkZGVkICdiZWZvcmUnIG9yICdhZnRlcidcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmxpbWl0IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGNsb25lc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLnZhbHVlQ2xvbmUgLSBDbG9uZSB0aGUgaW5wdXQgdmFsdWVzIGFzIHdlbGw/XG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmRhdGFDbG9uZSAtIENsb25lIHRoZSBkYXRhIGF0dHJpYnV0ZXM/XG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmRlZXBDbG9uZSAtIENsb25lIG90aGVyIGRhdGEgYWRkZWQgdG8gdGhlIGpRdWVyeSBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5zZXJpYWxpemVJRCAtIFdoZXRoZXIgdG8gc2VyaWFsaXplIHRoZSBJRHMsIGF1dG9tYXRpY2FsbHlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5pZ25vcmUgLSBTZWxlY3RvcnMgZm9yIGNsb25hYmxlcycgZWxlbWVudHMgdGhhdCBzaG91bGQgbm90IGJlIGNsb25lZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5kZWZhdWx0UmVuZGVyIC0gU3RhcnQgd2l0aCB0aGlzIG51bWJlciBvZiBjbG9uZXMsIGJ5IGRlZmF1bHRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMucHJlc2VydmVDaGlsZENvdW50IC0gd2hldGhlciB0byBwcmVzZXJ2ZSB0aGUgaW5pdGlhbCBudW1iZXIgb2YgY2xvbmUncyBjaGlsZCBjbG9uZXMsIHdvcmtzIHdpdGggbmVzdGluZyBhcyB3ZWxsLlxuICAgICAqXG4gICAgICogQHJldHVybnMge19MMTMuQ2xvbmVZYX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBDbG9uZVlhKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJlZ2V4IGZvciByZWNhbGN1bGF0aW5nIHRoZSBpZHNcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUgUmVnRXhwXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlZ2V4ID0gL14oLiopKFxcZCkrJC9pO1xuXG5cbiAgICAgICAgdGhpcy5lbGVtID0gZWxlbWVudDtcblxuICAgICAgICB0aGlzLiRlbGVtID0gJChlbGVtZW50KTtcblxuXHR0aGlzLmVsZW1DbGFzcyA9IG5hbWUgKyAnLXdyYXAnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjcmVhdGluZyBhIGpRdWVyeSBvYmplY3QsIGp1c3QgaW4gY2FzZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSBAY2FsbDskXG4gICAgICAgICAqL1xuICAgICAgICAvL3ZhciBlbGVtID0gJChlbGVtZW50KTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdXBwb3J0IGRlcHJlY2F0ZWQgcGFyYW1ldGVyc1xuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxpbWl0ICE9PSAndW5kZWZpbmVkJyAmJiBvcHRpb25zLmxpbWl0ID4gMCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubWF4aW11bSA9IG9wdGlvbnMubGltaXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogbWVyZ2UgdGhlIHBhc3NlZCBvcHRpb25zIG9iamVjdCB3aXRoIGRlZmF1bHRzXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIEBleHA7JEBjYWxsO2V4dGVuZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb25maWcgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIEBleHA7ZWxlbUBjYWxsO2Nsb3Nlc3RDaGlsZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jbG9uZXMgPSB0aGlzLiRlbGVtLmNsb3Nlc3RDaGlsZCh0aGlzLmNvbmZpZy5jbG9uZVRoaXMpO1xuXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgfVxuXG4gICAgQ2xvbmVZYS5wcm90b3R5cGUgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdmFyICR0aGlzID0gdGhpcztcblxuXG4gICAgICAgICAgICAvLyBhZGQgb3VyIGNsYXNzZXNcbiAgICAgICAgICAgICR0aGlzLiRlbGVtLmFkZENsYXNzKCR0aGlzLmVsZW1DbGFzcyk7XG4gICAgICAgICAgICAkdGhpcy5jbG9uZXMuYWRkQ2xhc3MobmFtZSk7XG5cbiAgICAgICAgICAgIC8vIHNhdmUgdGhlIHNpYmxpbmcgY291bnQgaW50byBkYXRhIGF0dHJcbiAgICAgICAgICAgICR0aGlzLmNsb25lcy5kYXRhKCdpbml0aWFsQ291bnQnLCAkdGhpcy5jbG9uZXMubGVuZ3RoKTtcblxuICAgICAgICAgICAgLy9Ob3csIHdoYXQgaWYgdGhlIGNsb25lIGJ1dHRvbiBhbmQgZGVsZXRlIGJ1dHRvbiBhcmUgbm90IGNvbnRhaW5lZCBpblxuICAgICAgICAgICAgLy90aGUgY2xvbmFibGU/XG4gICAgICAgICAgICAvLyBhZGQgYSBjbGljayBoYW5kbGVyIGZvciB0aGUgY2xvbmUgYnV0dG9uc1xuICAgICAgICAgICAgJHRoaXMuJGVsZW0ub24oJ2NsaWNrLicgKyBuYW1lLCAkdGhpcy5jb25maWcuY2xvbmVUaGlzICsgJz4nICsgJHRoaXMuY29uZmlnLmNsb25lQnV0dG9uLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRvQ2xvbmUgPSAkKHRoaXMpLmNsb3Nlc3QoJHRoaXMuY29uZmlnLmNsb25lVGhpcyk7XG5cbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGp1c3QgYSB3cmFwcGVyIGZvciB0aGUgY3VzdG9tIGNsb25lIGV2ZW50XG4gICAgICAgICAgICAgICAgJHRoaXMuJGVsZW0udHJpZ2dlckFsbCgnY2xvbmVfY2xvbmUgY2xvbmUuJyArIG5hbWUsIFt0b0Nsb25lXSk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAvLyB0aGUgY3VzdG9tIGNsb25lIGV2ZW50XG4gICAgICAgICAgICAkdGhpcy4kZWxlbS5vbignY2xvbmUuJyArIG5hbWUsIGZ1bmN0aW9uIChldmVudCwgdG9DbG9uZSkge1xuXG4gICAgICAgICAgICAgICAgJHRoaXMuX2Nsb25lQW5kQXBwZW5kKHRvQ2xvbmUpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gY2xpY2sgaGFuZGxlciBmb3IgZGVsZXRlIGJ1dHRvblxuICAgICAgICAgICAgJHRoaXMuJGVsZW0ub24oJ2NsaWNrLicgKyBuYW1lLCAkdGhpcy5jb25maWcuY2xvbmVUaGlzICsgJz4nICsgJHRoaXMuY29uZmlnLmRlbGV0ZUJ1dHRvbiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgIHZhciB0b0RlbGV0ZSA9ICQodGhpcykuY2xvc2VzdCgkdGhpcy5jb25maWcuY2xvbmVUaGlzKTtcbiAgICAgICAgICAgICAgICAvLyBqdXN0IGEgd3JhcHBlciBmb3IgZGVsY2xvbmUgZXZlbnRcbiAgICAgICAgICAgICAgICAkdGhpcy4kZWxlbS50cmlnZ2VyQWxsKCdjbG9uZV9kZWxldGUgZGVsZXRlLicgKyBuYW1lLCBbdG9EZWxldGVdKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyAgdGhlIGRlbGV0ZSBjbG9uZSBldmVudFxuICAgICAgICAgICAgJHRoaXMuJGVsZW0ub24oJ2RlbGV0ZS4nICsgbmFtZSwgZnVuY3Rpb24gKGV2ZW50LCB0b0RlbGV0ZSkge1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjb3VudCBvZiBhbGwgdGhlIHNpYmxpbmcgY2xvbmVzXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKiBAdHlwZSBAZXhwOyR0b2RlbGV0ZUBjYWxsO2Nsb3Nlc3RAY2FsbDtjbG9zZXN0Q2hpbGRAcHJvO2xlbmd0aFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHZhciBjbG9uZUNvdW50ID0gdG9EZWxldGUuY2xvc2VzdCgnLicgKyAkdGhpcy5lbGVtQ2xhc3MpLmNsb3Nlc3RDaGlsZCgkdGhpcy5jb25maWcuY2xvbmVUaGlzKS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2xvbmVDb3VudCA+ICR0aGlzLmNvbmZpZy5taW5pbXVtKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgaG9va1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy4kZWxlbS50cmlnZ2VyQWxsKCdjbG9uZV9iZWZvcmVfZGVsZXRlIGJlZm9yZV9kZWxldGUuJyArIG5hbWUsIFt0b0RlbGV0ZSwgY2xvbmVDb3VudF0pO1xuICAgICAgICAgICAgICAgICAgICAkdGhpcy4kZWxlbS50cmlnZ2VySGFuZGxlcigncmVtb3ZlLicgKyBuYW1lLCBbdG9EZWxldGVdKTtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuJGVsZW0udHJpZ2dlckFsbCgnY2xvbmVfYWZ0ZXJfZGVsZXRlIGFmdGVyX2RlbGV0ZS4nICsgbmFtZSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuJGVsZW0udHJpZ2dlckhhbmRsZXIoJ21pbmltdW0uJyArIG5hbWUsICR0aGlzLmNvbmZpZy5taW5pbXVtLCBbdG9EZWxldGVdKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpcnN0IGNsb25lIGZvcm0gY2FuJ3QgYmUgZGVsZXRlZCwgYnV0IHRoZSB2YWx1ZXMgc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSBmaXJzdCBmb3JtXG4gICAgICAgICAgICAgICAgICAgIC8vIGlzIHRoaXMgZXhwZWN0ZWQgYmVoYXZpb3VyPyBlc3BlY2lhbGx5IHNpbmNlIHdlIHVzZSBtaW5pbXVtP1xuICAgICAgICAgICAgICAgICAgICB0b0RlbGV0ZS5maW5kKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMuX2NsZWFyRm9ybSgkKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgICR0aGlzLiRlbGVtLm9uKCdyZW1vdmUuJyArIG5hbWUsIGZ1bmN0aW9uIChldmVudCwgdG9EZWxldGUpIHtcbiAgICAgICAgICAgICAgICAkKHRvRGVsZXRlKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgX2NsZWFuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSB0aGlzO1xuICAgICAgICAgICAgJHRoaXMuJGVsZW0ucmVtb3ZlQ2xhc3MobmFtZSArICctd3JhcCcpO1xuICAgICAgICAgICAgJHRoaXMuY2xvbmVzLnJlbW92ZUNsYXNzKG5hbWUpO1xuICAgICAgICAgICAgJHRoaXMuJGVsZW0ub2ZmKCdjbGljay4nICsgbmFtZSwgJHRoaXMuY29uZmlnLmNsb25lVGhpcyArICc+JyArICR0aGlzLmNvbmZpZy5jbG9uZUJ1dHRvbik7XG4gICAgICAgICAgICAkdGhpcy4kZWxlbS5vZmYoJ2NsaWNrLicgKyBuYW1lLCAkdGhpcy5jb25maWcuY2xvbmVUaGlzICsgJz4nICsgJHRoaXMuY29uZmlnLmRlbGV0ZUJ1dHRvbik7XG4gICAgICAgICAgICAkdGhpcy4kZWxlbS5vZmYoJ2Nsb25lX2Nsb25lIGNsb25lX2RlbGV0ZSBjbG9uZV9iZWZvcmVfZGVsZXRlIGNsb25lLicgKyBuYW1lICsgJyBkZWxldGUuJyArIG5hbWUgKyAnIGJlZm9yZV9kZWxldGUuJyArIG5hbWUpO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFuKCk7XG4gICAgICAgICAgICB0aGlzLiRlbGVtLnJlbW92ZURhdGEobmFtZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE9wdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnO1xuICAgICAgICB9LFxuICAgICAgICBzZXRPcHRpb246IGZ1bmN0aW9uIChsYXRlT3B0aW9ucykge1xuICAgICAgICAgICAgJC5leHRlbmQodGhpcy5jb25maWcsIGxhdGVPcHRpb25zIHx8IHt9KTtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFuKCk7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgICB9LFxuICAgICAgICBfY2xvbmVBbmRBcHBlbmQ6IGZ1bmN0aW9uICh0b0Nsb25lKSB7XG5cblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBjb3VudCBvZiBhbGwgdGhlIHNpYmxpbmcgY2xvbmVzXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAdHlwZSBAZXhwOyR0b2Nsb25lQGNhbGw7Y2xvc2VzdEBjYWxsO2Nsb3Nlc3RDaGlsZEBwcm87bGVuZ3RoXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBjbG9uZUNvdW50ID0gdG9DbG9uZS5jbG9zZXN0KCcuJyArIHRoaXMuZWxlbUNsYXNzKS5jbG9zZXN0Q2hpbGQodGhpcy5jb25maWcuY2xvbmVUaGlzKS5sZW5ndGg7XG5cblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UndmUgcmVhY2hlZCB0aGUgbWF4aW11bSBsaW1pdFxuICAgICAgICAgICAgaWYgKGNsb25lQ291bnQgPCB0aGlzLmNvbmZpZy5tYXhpbXVtKSB7XG5cbiAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIGEgY3VzdG9tIGV2ZW50IGZvciBob29raW5nIGluXG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbS50cmlnZ2VyQWxsKCdjbG9uZV9iZWZvcmVfY2xvbmUgYmVmb3JlX2Nsb25lLicgKyBuYW1lLCBbdG9DbG9uZV0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIG5ld0Nsb25lID0gdGhpcy5fY2xvbmVJdGVtKHRvQ2xvbmUpO1xuXG5cblxuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgY3VzdG9tIGV2ZW50IG9uIHRoZSBvcmlnaW5hbCBlbGVtZW50XG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbS50cmlnZ2VyQWxsKCdjbG9uZV9hZnRlcl9jbG9uZSBhZnRlcl9jbG9uZS4nICsgbmFtZSwgW3RvQ2xvbmUsIG5ld0Nsb25lXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgdG8gb3VyIGNsb25lcyBvYmplY3RcbiAgICAgICAgICAgICAgICB0aGlzLmNsb25lcy5hZGQobmV3Q2xvbmUpO1xuXG4gICAgICAgICAgICAgICAgLy8gdHJpZ2dlciBjdXN0b20gZXZlbnQgb24gdGhlIG5ldyBjbG9uZVxuICAgICAgICAgICAgICAgIHRoaXMuJGVsZW0udHJpZ2dlckFsbCgnY2xvbmVfYmVmb3JlX2FwcGVuZCBiZWZvcmVfYXBwZW5kLicgKyBuYW1lLCBbdG9DbG9uZSwgbmV3Q2xvbmVdKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgcG9zaXRpb24gd2hlcmUgdGhlIGNsb25lIGhhcyB0byBiZSBhZGRlZFxuICAgICAgICAgICAgICAgIC8vIGFuZCBhZGQgdGhlIG5ld2Nsb25lXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmNsb25lUG9zaXRpb24gIT09ICdhZnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9DbG9uZS5iZWZvcmUobmV3Q2xvbmUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvQ2xvbmUuYWZ0ZXIobmV3Q2xvbmUpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmlnbm9yZSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdDbG9uZS5maW5kKHRoaXMuY29uZmlnLmlnbm9yZSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmVmb3JtYXQgdGhlIGlkIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWRvSURzKCk7XG5cbiAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIGN1c3RvbSBldmVudCBmb3IgaG9va2luZ1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsZW0udHJpZ2dlckFsbCgnY2xvbmVfYWZ0ZXJfYXBwZW5kIGFmdGVyX2FwcGVuZC4nICsgbmFtZSwgW3RvQ2xvbmUsIG5ld0Nsb25lXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgYSBjdXN0b20gZXZlbnQgZm9yIGhvb2tpbmdcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGVtLnRyaWdnZXJBbGwoJ2Nsb25lX2xpbWl0IG1heGltdW0uJyArIG5hbWUsIHRoaXMuY29uZmlnLm1heGltdW0sIFt0b0Nsb25lXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICAgICAgX2Nsb25lSXRlbTogZnVuY3Rpb24gKHRvQ2xvbmUpIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIGNsb25lIGl0XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAdHlwZSBAZXhwOyR0b2Nsb25lQGNhbGw7Y2xvbmVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFyIG5ld0Nsb25lID0gdG9DbG9uZS5jbG9uZSgkdGhpcy5jb25maWcuZGF0YUNsb25lLCAkdGhpcy5jb25maWcuZGVlcENsb25lKTtcblxuICAgICAgICAgICAgLy8gd2Ugd2FudCB0byBwcmVzZXJ2ZSB0aGUgaW5pdGlhbCBjaGlsZCBjb3VudFxuICAgICAgICAgICAgaWYgKCR0aGlzLmNvbmZpZy5wcmVzZXJ2ZUNoaWxkQ291bnQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlIGNoaWxkIGNvdW50IG9ubHkgbmVlZHMgcHJlc2VydmF0aW9uIGlmIHRoZXkgYXJlIGNsb25hYmxlLlxuXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsQ2hpbGRyZW4gPSB0b0Nsb25lLmZpbmQoJy4nICsgbmFtZSArICctd3JhcCcpO1xuXG4gICAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggd3JhcHBlclxuICAgICAgICAgICAgICAgIG5ld0Nsb25lLmZpbmQoJy4nICsgbmFtZSArICctd3JhcCcpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIEBjYWxsO2pxdWVyeS1jbG9uZXlhX0w4LiRAY2FsbDtjbG9zZXN0Q2hpbGRcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbk5ld0Nsb25lID0gJCh0aGlzKS5jbG9zZXN0Q2hpbGQoJy4nICsgbmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGluT3JpZ2luYWwgPSAkKG9yaWdpbmFsQ2hpbGRyZW5baW5kZXhdKS5jbG9zZXN0Q2hpbGQoJy4nICsgbmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIEBleHA7aW5PcmlnaW5hbEBjYWxsO2RhdGFcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbENvdW50ID0gaW5PcmlnaW5hbC5kYXRhKCdpbml0aWFsQ291bnQnKTtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUgQGV4cDtpbk5ld0Nsb25lQGNhbGw7c2xpY2VcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciAkZXh0cmEgPSBpbk5ld0Nsb25lLnNsaWNlKG9yaWdpbmFsQ291bnQsIGluTmV3Q2xvbmUubGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgICAgICAkZXh0cmEucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaW5OZXdDbG9uZS5kYXRhKCdpbml0aWFsLWNvdW50Jywgb3JpZ2luYWxDb3VudCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBmb3JtIGlucHV0XG4gICAgICAgICAgICBuZXdDbG9uZS5maW5kKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHZhbHVlcyBuZWVkIHRvIGJlIGNvcGllZCwgaWYgbm90IGVtcHR5IHRoZW1cbiAgICAgICAgICAgICAgICAkdGhpcy5fY2xlYXJGb3JtKCQodGhpcykpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlZCB0aGUgcG9ydGlvbiB0YWtpbmcgY2FyZSBvZiB0aGUgaW5kZXhcbiAgICAgICAgICAgICAgICAvLyBlYWNoIGNhc2UgaXMgc3BlY2lmaWMgYW5kIEknZCByYXRoZXIgbGVhdmUgaXQgdG8gdGhlIGRldmVsb3BlclxuXG4gICAgICAgICAgICAgICAgLy8gY3VzdG9tIGV2ZW50IGhvb2sgZm9yIGluZGV4IGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgJHRoaXMuJGVsZW0udHJpZ2dlckFsbCgnY2xvbmVfZm9ybV9pbnB1dCBmb3JtX2lucHV0LicgKyBuYW1lLCBbJCh0aGlzKSwgdG9DbG9uZSwgbmV3Q2xvbmVdKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3Q2xvbmU7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLypcbiAgICAgICAgICogQ2xlYXIgRm9ybSB3aWxsIHVzZWQgdG8gY2xlYXIgdGhlIHZhbHVlcyBvZiB0aGUgZm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7dHlwZX0gJGVsXG4gICAgICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICAgICAqL1xuICAgICAgICBfY2xlYXJGb3JtOiBmdW5jdGlvbiAoJGVsKSB7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5jb25maWcudmFsdWVDbG9uZSAmJiAhJGVsLmhhc0NsYXNzKCdub0VtcHR5JykpIHtcblxuICAgICAgICAgICAgICAgIGlmICgkZWwuaXMoJzpjaGVja2JveCcpIHx8ICRlbC5pcygnOnJhZGlvJykpIHtcblxuICAgICAgICAgICAgICAgICAgICAkZWwucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRlbC52YWwoJycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWRvIHRoZSBpZCBhdHRyaWJ1dGUsIHNlcmlhbGx5XG4gICAgICAgICAqL1xuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAgICAgICAgICovXG4gICAgICAgIF9yZWRvSURzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciAkdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgZXZlbiBuZWVkcyB0byBiZSBkb25lXG4gICAgICAgICAgICBpZiAoJHRoaXMuY29uZmlnLnNlcmlhbGl6ZUlEICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGlkIG9mIHRoZSBmaXJzdCBjbG9uZSAoaG9waW5nIHRvIGluY3JlbWVudCB0aGUgaWRzKVxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHR5cGUgQGV4cDtlbGVtQGNhbGw7ZmluZEBjYWxsO2ZpcnN0QGNhbGw7YXR0clxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgbWFpbmlkID0gJHRoaXMuJGVsZW0uZmluZCgkdGhpcy5jb25maWcuY2xvbmVUaGlzKS5maXJzdCgpLmF0dHIoJ2lkJyk7XG5cbiAgICAgICAgICAgICR0aGlzLiRlbGVtLmZpbmQoJHRoaXMuY29uZmlnLmNsb25lVGhpcykuZWFjaChmdW5jdGlvbiAoaSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGo7XG4gICAgICAgICAgICAgICAgLy8gYXNzaWduIHRoZSBpbmRleCB0byBhIHN0cmluZyB2YXIgZm9yIGFwcGVuZGluZyB0byB0aGUgaWRzXG4gICAgICAgICAgICAgICAgLy8gMCBpbmRleCB3aWxsIGhhdmUgbm8gbnVtYmVyIGF0IHRoZSBlbmRcbiAgICAgICAgICAgICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBqID0gaTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBqID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZmlyc3QgbW9kaWZ5IHRoZSBjbG9uZSBpZFxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmF0dHIoJ2lkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdpZCcsIG1haW5pZCArIGopO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBpZCwgbklkO1xuICAgICAgICAgICAgICAgIC8vIHRha2UgYWxsIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhlIGNsb25lXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcqJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWQgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2ggdGhlIGlkIHdpdGggdGhlIHJlZ2V4IHRvIGdldCB0aGUgc3RyaW5nIHBhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlcGFyYXRlIGZyb20gdGhlIG51bWJlciBwYXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSBpZC5tYXRjaCgkdGhpcy5yZWdleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIHdhcyBhIG51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGp1c3QgdGFrZSB0aGUgc3RyaW5nIHBhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIG5ldyBudW1iZXIgdG8gaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuSWQgPSBpZC5yZXBsYWNlKC9cXGQrJC8sIFwiXCIpICsgajtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignaWQnLCBuSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIHRoZXJlIHdhcyBubyBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyB3YXMgZWFybGllciB0aGUgZmlyc3QgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGp1c3QgYWRkIHRoZSBudW1iZXIgdG8gaXRzIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbklkID0gaWQgKyBqO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignaWQnLCBuSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy91cGRhdGUgbGFiZWxcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCR0aGlzLmNvbmZpZy5jbG9uZVRoaXMpLmZpbmQoXCJsYWJlbFtmb3I9J1wiICsgaWQgKyBcIiddXCIpLmF0dHIoJ2ZvcicsIG5JZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCR0aGlzLmNvbmZpZy5zZXJpYWxpemVJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSAkKHRoaXMpLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBpbmNyZW1lbnQgdGhlIG51bWVyaWMgYXJyYXkgaW5kZXggZm9yIGNsb25lZCBmaWVsZCBuYW1lc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IG5hbWUubWF0Y2goL1xcWyhbXn1dKylcXF0vKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoID49IDEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3QgPSBuYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gW10ubWFwLmNhbGwoc3QsIGZ1bmN0aW9uIChzLCBuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCFpc05hTigrcykgJiYgc3RbbiAtIDFdID09PSAnWycgJiYgc3RbbiArIDFdID09PSAnXScpID8gaSA6IHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignbmFtZScsIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuICAgIH07XG5cbiAgICAvLyBhZGQgdGhlIGNsb25leWEgdG8gdGhlIGdsb2JhbCBvYmplY3RcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7dHlwZX0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtqcXVlcnktY2xvbmV5YV9MOC4kLmZuQGNhbGw7ZWFjaH1cbiAgICAgKi9cbiAgICAkLmZuW25hbWVdID0gZnVuY3Rpb24gKG9wdGlvbnMpXG4gICAge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy8gQ3JlYXRlcyBhIG5ldyBwbHVnaW4gaW5zdGFuY2UsIGZvciBlYWNoIHNlbGVjdGVkIGVsZW1lbnQsIGFuZFxuICAgICAgICAgICAgLy8gc3RvcmVzIGEgcmVmZXJlbmNlIHdpdGhpbnQgdGhlIGVsZW1lbnQncyBkYXRhXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoISQuZGF0YSh0aGlzLCBuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAkLmRhdGEodGhpcywgbmFtZSwgbmV3IENsb25lWWEodGhpcywgb3B0aW9ucykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJyAmJiBvcHRpb25zWzBdICE9PSAnXycgJiYgb3B0aW9ucyAhPT0gJ2luaXQnKSB7XG4gICAgICAgICAgICAvLyBDYWxsIGEgcHVibGljIHBsdWd1aW4gbWV0aG9kIChub3Qgc3RhcnRpbmcgd2l0aCBhbiB1bmRlcnNjb3JlKSBmb3IgZWFjaFxuICAgICAgICAgICAgLy8gc2VsZWN0ZWQgZWxlbWVudC5cbiAgICAgICAgICAgIGlmIChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzLCAxKS5sZW5ndGggPT09IDAgJiYgJC5pbkFycmF5KG9wdGlvbnMsICQuZm5bbmFtZV0uZ2V0dGVycykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgZG9lcyBub3QgcGFzcyBhbnkgYXJndW1lbnRzIGFuZCB0aGUgbWV0aG9kIGFsbG93cyB0b1xuICAgICAgICAgICAgICAgIC8vIHdvcmsgYXMgYSBnZXR0ZXIgdGhlbiBicmVhayB0aGUgY2hhaW5hYmlsaXR5IHNvIHdlIGNhbiByZXR1cm4gYSB2YWx1ZVxuICAgICAgICAgICAgICAgIC8vIGluc3RlYWQgdGhlIGVsZW1lbnQgcmVmZXJlbmNlLlxuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9ICQuZGF0YSh0aGlzWzBdLCBuYW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2Vbb3B0aW9uc10uYXBwbHkoaW5zdGFuY2UsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MsIDEpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSW52b2tlIHRoZSBzcGVmaWNpZWQgbWV0aG9kIG9uIGVhY2ggc2VsZWN0ZWQgZWxlbWVudFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSAkLmRhdGEodGhpcywgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZSBpbnN0YW5jZW9mIENsb25lWWEgJiYgdHlwZW9mIGluc3RhbmNlW29wdGlvbnNdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtvcHRpb25zXS5hcHBseShpbnN0YW5jZSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncywgMSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJC5mbltuYW1lXS5nZXR0ZXJzID0gWydnZXRPcHRpb24nXTtcblxuXG5cbiAgICAvKlxuICAgICAqIGpxdWVyeS5jbG9zZXN0Y2hpbGQgMC4xLjFcbiAgICAgKlxuICAgICAqIEF1dGhvcjogQW5kcmV5IE1pa2hheWxvdiBha2EgbG9sbWF1c1xuICAgICAqIEVtYWlsOiBsb2xtYXVzQGdtYWlsLmNvbVxuICAgICAqXG4gICAgICovXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3R5cGV9IHNlbGVjdG9yXG4gICAgICogQHJldHVybnMgeyR9XG4gICAgICovXG4gICAgJC5mbi5jbG9zZXN0Q2hpbGQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgdmFyICRjaGlsZHJlbiwgJHJlc3VsdHM7XG5cbiAgICAgICAgJGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbigpO1xuXG4gICAgICAgIGlmICgkY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJlc3VsdHMgPSAkY2hpbGRyZW4uZmlsdGVyKHNlbGVjdG9yKTtcblxuICAgICAgICBpZiAoJHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuICRyZXN1bHRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICRjaGlsZHJlbi5jbG9zZXN0Q2hpbGQoc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogVHJpZ2dlckFsbCwgbW9kaWZpZWQgZnJvbSBzdGFja292ZXJmbG93XG4gICAgICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTg1MDYyNS9qcXVlcnktdHJpZ2dlci1tdWx0aXBsZS1ldmVudHNcbiAgICAgKi9cbiAgICAkLmZuLmV4dGVuZCh7XG4gICAgICAgIHRyaWdnZXJBbGw6IGZ1bmN0aW9uIChldmVudHMsIHBhcmFtcykge1xuICAgICAgICAgICAgdmFyIGVsID0gdGhpcywgaSwgZXZ0cyA9IGV2ZW50cy5zcGxpdCgnICcpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGV2dHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBlbC50cmlnZ2VySGFuZGxlcihldnRzW2ldLCBwYXJhbXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIvKiFcbiAqIHBhcmFsbGF4LmpzIHYxLjQuMiAoaHR0cDovL3BpeGVsY29nLmdpdGh1Yi5pby9wYXJhbGxheC5qcy8pXG4gKiBAY29weXJpZ2h0IDIwMTYgUGl4ZWxDb2csIEluYy5cbiAqIEBsaWNlbnNlIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3BpeGVsY29nL3BhcmFsbGF4LmpzL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKi9cblxuOyhmdW5jdGlvbiAoICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblxuICAvLyBQb2x5ZmlsbCBmb3IgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIC8vIHZpYTogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzE1Nzk2NzFcblxuICAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxhc3RUaW1lID0gMDtcbiAgICB2YXIgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJ107XG4gICAgZm9yKHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3gpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSsnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSsnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXVxuICAgICAgICB8fCB3aW5kb3dbdmVuZG9yc1t4XSsnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgfVxuXG4gICAgaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcbiAgICAgICAgdmFyIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7IH0sXG4gICAgICAgICAgdGltZVRvQ2FsbCk7XG4gICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgICB9O1xuXG4gICAgaWYgKCF3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUpXG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgfTtcbiAgfSgpKTtcblxuXG4gIC8vIFBhcmFsbGF4IENvbnN0cnVjdG9yXG5cbiAgZnVuY3Rpb24gUGFyYWxsYXgoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnb2JqZWN0Jykge1xuICAgICAgZGVsZXRlIG9wdGlvbnMucmVmcmVzaDtcbiAgICAgIGRlbGV0ZSBvcHRpb25zLnJlbmRlcjtcbiAgICAgICQuZXh0ZW5kKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xuXG4gICAgaWYgKCF0aGlzLmltYWdlU3JjICYmIHRoaXMuJGVsZW1lbnQuaXMoJ2ltZycpKSB7XG4gICAgICB0aGlzLmltYWdlU3JjID0gdGhpcy4kZWxlbWVudC5hdHRyKCdzcmMnKTtcbiAgICB9XG5cbiAgICB2YXIgcG9zaXRpb25zID0gKHRoaXMucG9zaXRpb24gKyAnJykudG9Mb3dlckNhc2UoKS5tYXRjaCgvXFxTKy9nKSB8fCBbXTtcblxuICAgIGlmIChwb3NpdGlvbnMubGVuZ3RoIDwgMSkge1xuICAgICAgcG9zaXRpb25zLnB1c2goJ2NlbnRlcicpO1xuICAgIH1cbiAgICBpZiAocG9zaXRpb25zLmxlbmd0aCA9PSAxKSB7XG4gICAgICBwb3NpdGlvbnMucHVzaChwb3NpdGlvbnNbMF0pO1xuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbnNbMF0gPT0gJ3RvcCcgfHwgcG9zaXRpb25zWzBdID09ICdib3R0b20nIHx8IHBvc2l0aW9uc1sxXSA9PSAnbGVmdCcgfHwgcG9zaXRpb25zWzFdID09ICdyaWdodCcpIHtcbiAgICAgIHBvc2l0aW9ucyA9IFtwb3NpdGlvbnNbMV0sIHBvc2l0aW9uc1swXV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9zaXRpb25YICE9IHVuZGVmaW5lZCkgcG9zaXRpb25zWzBdID0gdGhpcy5wb3NpdGlvblgudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodGhpcy5wb3NpdGlvblkgIT0gdW5kZWZpbmVkKSBwb3NpdGlvbnNbMV0gPSB0aGlzLnBvc2l0aW9uWS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgc2VsZi5wb3NpdGlvblggPSBwb3NpdGlvbnNbMF07XG4gICAgc2VsZi5wb3NpdGlvblkgPSBwb3NpdGlvbnNbMV07XG5cbiAgICBpZiAodGhpcy5wb3NpdGlvblggIT0gJ2xlZnQnICYmIHRoaXMucG9zaXRpb25YICE9ICdyaWdodCcpIHtcbiAgICAgIGlmIChpc05hTihwYXJzZUludCh0aGlzLnBvc2l0aW9uWCkpKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25YID0gJ2NlbnRlcic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvc2l0aW9uWCA9IHBhcnNlSW50KHRoaXMucG9zaXRpb25YKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5wb3NpdGlvblkgIT0gJ3RvcCcgJiYgdGhpcy5wb3NpdGlvblkgIT0gJ2JvdHRvbScpIHtcbiAgICAgIGlmIChpc05hTihwYXJzZUludCh0aGlzLnBvc2l0aW9uWSkpKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25ZID0gJ2NlbnRlcic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBvc2l0aW9uWSA9IHBhcnNlSW50KHRoaXMucG9zaXRpb25ZKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnBvc2l0aW9uID1cbiAgICAgIHRoaXMucG9zaXRpb25YICsgKGlzTmFOKHRoaXMucG9zaXRpb25YKT8gJycgOiAncHgnKSArICcgJyArXG4gICAgICB0aGlzLnBvc2l0aW9uWSArIChpc05hTih0aGlzLnBvc2l0aW9uWSk/ICcnIDogJ3B4Jyk7XG5cbiAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGlQb2R8aVBob25lfGlQYWQpLykpIHtcbiAgICAgIGlmICh0aGlzLmltYWdlU3JjICYmIHRoaXMuaW9zRml4ICYmICF0aGlzLiRlbGVtZW50LmlzKCdpbWcnKSkge1xuICAgICAgICB0aGlzLiRlbGVtZW50LmNzcyh7XG4gICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyB0aGlzLmltYWdlU3JjICsgJyknLFxuICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogdGhpcy5wb3NpdGlvblxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8oQW5kcm9pZCkvKSkge1xuICAgICAgaWYgKHRoaXMuaW1hZ2VTcmMgJiYgdGhpcy5hbmRyb2lkRml4ICYmICF0aGlzLiRlbGVtZW50LmlzKCdpbWcnKSkge1xuICAgICAgICB0aGlzLiRlbGVtZW50LmNzcyh7XG4gICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAndXJsKCcgKyB0aGlzLmltYWdlU3JjICsgJyknLFxuICAgICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogdGhpcy5wb3NpdGlvblxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRoaXMuJG1pcnJvciA9ICQoJzxkaXYgLz4nKS5wcmVwZW5kVG8oJ2JvZHknKTtcblxuICAgIHZhciBzbGlkZXIgPSB0aGlzLiRlbGVtZW50LmZpbmQoJz4ucGFyYWxsYXgtc2xpZGVyJyk7XG4gICAgdmFyIHNsaWRlckV4aXN0ZWQgPSBmYWxzZTtcblxuICAgIGlmIChzbGlkZXIubGVuZ3RoID09IDApXG4gICAgICB0aGlzLiRzbGlkZXIgPSAkKCc8aW1nIC8+JykucHJlcGVuZFRvKHRoaXMuJG1pcnJvcik7XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLiRzbGlkZXIgPSBzbGlkZXIucHJlcGVuZFRvKHRoaXMuJG1pcnJvcilcbiAgICAgIHNsaWRlckV4aXN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuJG1pcnJvci5hZGRDbGFzcygncGFyYWxsYXgtbWlycm9yJykuY3NzKHtcbiAgICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICAgICAgekluZGV4OiB0aGlzLnpJbmRleCxcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMCxcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICAgIH0pO1xuXG4gICAgdGhpcy4kc2xpZGVyLmFkZENsYXNzKCdwYXJhbGxheC1zbGlkZXInKS5vbmUoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghc2VsZi5uYXR1cmFsSGVpZ2h0IHx8ICFzZWxmLm5hdHVyYWxXaWR0aCkge1xuICAgICAgICBzZWxmLm5hdHVyYWxIZWlnaHQgPSB0aGlzLm5hdHVyYWxIZWlnaHQgfHwgdGhpcy5oZWlnaHQgfHwgMTtcbiAgICAgICAgc2VsZi5uYXR1cmFsV2lkdGggID0gdGhpcy5uYXR1cmFsV2lkdGggIHx8IHRoaXMud2lkdGggIHx8IDE7XG4gICAgICB9XG4gICAgICBzZWxmLmFzcGVjdFJhdGlvID0gc2VsZi5uYXR1cmFsV2lkdGggLyBzZWxmLm5hdHVyYWxIZWlnaHQ7XG5cbiAgICAgIFBhcmFsbGF4LmlzU2V0dXAgfHwgUGFyYWxsYXguc2V0dXAoKTtcbiAgICAgIFBhcmFsbGF4LnNsaWRlcnMucHVzaChzZWxmKTtcbiAgICAgIFBhcmFsbGF4LmlzRnJlc2ggPSBmYWxzZTtcbiAgICAgIFBhcmFsbGF4LnJlcXVlc3RSZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIGlmICghc2xpZGVyRXhpc3RlZClcbiAgICAgIHRoaXMuJHNsaWRlclswXS5zcmMgPSB0aGlzLmltYWdlU3JjO1xuXG4gICAgaWYgKHRoaXMubmF0dXJhbEhlaWdodCAmJiB0aGlzLm5hdHVyYWxXaWR0aCB8fCB0aGlzLiRzbGlkZXJbMF0uY29tcGxldGUgfHwgc2xpZGVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuJHNsaWRlci50cmlnZ2VyKCdsb2FkJyk7XG4gICAgfVxuXG4gIH07XG5cblxuICAvLyBQYXJhbGxheCBJbnN0YW5jZSBNZXRob2RzXG5cbiAgJC5leHRlbmQoUGFyYWxsYXgucHJvdG90eXBlLCB7XG4gICAgc3BlZWQ6ICAgIDAuMixcbiAgICBibGVlZDogICAgMCxcbiAgICB6SW5kZXg6ICAgLTEwMCxcbiAgICBpb3NGaXg6ICAgdHJ1ZSxcbiAgICBhbmRyb2lkRml4OiB0cnVlLFxuICAgIHBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICBvdmVyU2Nyb2xsRml4OiBmYWxzZSxcblxuICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5ib3hXaWR0aCAgICAgICAgPSB0aGlzLiRlbGVtZW50Lm91dGVyV2lkdGgoKTtcbiAgICAgIHRoaXMuYm94SGVpZ2h0ICAgICAgID0gdGhpcy4kZWxlbWVudC5vdXRlckhlaWdodCgpICsgdGhpcy5ibGVlZCAqIDI7XG4gICAgICB0aGlzLmJveE9mZnNldFRvcCAgICA9IHRoaXMuJGVsZW1lbnQub2Zmc2V0KCkudG9wIC0gdGhpcy5ibGVlZDtcbiAgICAgIHRoaXMuYm94T2Zmc2V0TGVmdCAgID0gdGhpcy4kZWxlbWVudC5vZmZzZXQoKS5sZWZ0O1xuICAgICAgdGhpcy5ib3hPZmZzZXRCb3R0b20gPSB0aGlzLmJveE9mZnNldFRvcCArIHRoaXMuYm94SGVpZ2h0O1xuXG4gICAgICB2YXIgd2luSGVpZ2h0ID0gUGFyYWxsYXgud2luSGVpZ2h0O1xuICAgICAgdmFyIGRvY0hlaWdodCA9IFBhcmFsbGF4LmRvY0hlaWdodDtcbiAgICAgIHZhciBtYXhPZmZzZXQgPSBNYXRoLm1pbih0aGlzLmJveE9mZnNldFRvcCwgZG9jSGVpZ2h0IC0gd2luSGVpZ2h0KTtcbiAgICAgIHZhciBtaW5PZmZzZXQgPSBNYXRoLm1heCh0aGlzLmJveE9mZnNldFRvcCArIHRoaXMuYm94SGVpZ2h0IC0gd2luSGVpZ2h0LCAwKTtcbiAgICAgIHZhciBpbWFnZUhlaWdodE1pbiA9IHRoaXMuYm94SGVpZ2h0ICsgKG1heE9mZnNldCAtIG1pbk9mZnNldCkgKiAoMSAtIHRoaXMuc3BlZWQpIHwgMDtcbiAgICAgIHZhciBpbWFnZU9mZnNldE1pbiA9ICh0aGlzLmJveE9mZnNldFRvcCAtIG1heE9mZnNldCkgKiAoMSAtIHRoaXMuc3BlZWQpIHwgMDtcblxuICAgICAgaWYgKGltYWdlSGVpZ2h0TWluICogdGhpcy5hc3BlY3RSYXRpbyA+PSB0aGlzLmJveFdpZHRoKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VXaWR0aCAgICA9IGltYWdlSGVpZ2h0TWluICogdGhpcy5hc3BlY3RSYXRpbyB8IDA7XG4gICAgICAgIHRoaXMuaW1hZ2VIZWlnaHQgICA9IGltYWdlSGVpZ2h0TWluO1xuICAgICAgICB0aGlzLm9mZnNldEJhc2VUb3AgPSBpbWFnZU9mZnNldE1pbjtcblxuICAgICAgICB2YXIgbWFyZ2luID0gdGhpcy5pbWFnZVdpZHRoIC0gdGhpcy5ib3hXaWR0aDtcblxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvblggPT0gJ2xlZnQnKSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRMZWZ0ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBvc2l0aW9uWCA9PSAncmlnaHQnKSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRMZWZ0ID0gLSBtYXJnaW47XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKHRoaXMucG9zaXRpb25YKSkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0TGVmdCA9IE1hdGgubWF4KHRoaXMucG9zaXRpb25YLCAtIG1hcmdpbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRMZWZ0ID0gLSBtYXJnaW4gLyAyIHwgMDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbWFnZVdpZHRoICAgID0gdGhpcy5ib3hXaWR0aDtcbiAgICAgICAgdGhpcy5pbWFnZUhlaWdodCAgID0gdGhpcy5ib3hXaWR0aCAvIHRoaXMuYXNwZWN0UmF0aW8gfCAwO1xuICAgICAgICB0aGlzLm9mZnNldExlZnQgICAgPSAwO1xuXG4gICAgICAgIHZhciBtYXJnaW4gPSB0aGlzLmltYWdlSGVpZ2h0IC0gaW1hZ2VIZWlnaHRNaW47XG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25ZID09ICd0b3AnKSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRCYXNlVG9wID0gaW1hZ2VPZmZzZXRNaW47XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvblkgPT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICB0aGlzLm9mZnNldEJhc2VUb3AgPSBpbWFnZU9mZnNldE1pbiAtIG1hcmdpbjtcbiAgICAgICAgfSBlbHNlIGlmICghaXNOYU4odGhpcy5wb3NpdGlvblkpKSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRCYXNlVG9wID0gaW1hZ2VPZmZzZXRNaW4gKyBNYXRoLm1heCh0aGlzLnBvc2l0aW9uWSwgLSBtYXJnaW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub2Zmc2V0QmFzZVRvcCA9IGltYWdlT2Zmc2V0TWluIC0gbWFyZ2luIC8gMiB8IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzY3JvbGxUb3AgICAgPSBQYXJhbGxheC5zY3JvbGxUb3A7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCAgID0gUGFyYWxsYXguc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBvdmVyU2Nyb2xsICAgPSB0aGlzLm92ZXJTY3JvbGxGaXggPyBQYXJhbGxheC5vdmVyU2Nyb2xsIDogMDtcbiAgICAgIHZhciBzY3JvbGxCb3R0b20gPSBzY3JvbGxUb3AgKyBQYXJhbGxheC53aW5IZWlnaHQ7XG5cbiAgICAgIGlmICh0aGlzLmJveE9mZnNldEJvdHRvbSA+IHNjcm9sbFRvcCAmJiB0aGlzLmJveE9mZnNldFRvcCA8PSBzY3JvbGxCb3R0b20pIHtcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB0aGlzLm1pcnJvclRvcCA9IHRoaXMuYm94T2Zmc2V0VG9wICAtIHNjcm9sbFRvcDtcbiAgICAgICAgdGhpcy5taXJyb3JMZWZ0ID0gdGhpcy5ib3hPZmZzZXRMZWZ0IC0gc2Nyb2xsTGVmdDtcbiAgICAgICAgdGhpcy5vZmZzZXRUb3AgPSB0aGlzLm9mZnNldEJhc2VUb3AgLSB0aGlzLm1pcnJvclRvcCAqICgxIC0gdGhpcy5zcGVlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgIH1cblxuICAgICAgdGhpcy4kbWlycm9yLmNzcyh7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpJyxcbiAgICAgICAgdmlzaWJpbGl0eTogdGhpcy52aXNpYmlsaXR5LFxuICAgICAgICB0b3A6IHRoaXMubWlycm9yVG9wIC0gb3ZlclNjcm9sbCxcbiAgICAgICAgbGVmdDogdGhpcy5taXJyb3JMZWZ0LFxuICAgICAgICBoZWlnaHQ6IHRoaXMuYm94SGVpZ2h0LFxuICAgICAgICB3aWR0aDogdGhpcy5ib3hXaWR0aFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuJHNsaWRlci5jc3Moe1xuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KScsXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICB0b3A6IHRoaXMub2Zmc2V0VG9wLFxuICAgICAgICBsZWZ0OiB0aGlzLm9mZnNldExlZnQsXG4gICAgICAgIGhlaWdodDogdGhpcy5pbWFnZUhlaWdodCxcbiAgICAgICAgd2lkdGg6IHRoaXMuaW1hZ2VXaWR0aCxcbiAgICAgICAgbWF4V2lkdGg6ICdub25lJ1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuXG4gIC8vIFBhcmFsbGF4IFN0YXRpYyBNZXRob2RzXG5cbiAgJC5leHRlbmQoUGFyYWxsYXgsIHtcbiAgICBzY3JvbGxUb3A6ICAgIDAsXG4gICAgc2Nyb2xsTGVmdDogICAwLFxuICAgIHdpbkhlaWdodDogICAgMCxcbiAgICB3aW5XaWR0aDogICAgIDAsXG4gICAgZG9jSGVpZ2h0OiAgICAxIDw8IDMwLFxuICAgIGRvY1dpZHRoOiAgICAgMSA8PCAzMCxcbiAgICBzbGlkZXJzOiAgICAgIFtdLFxuICAgIGlzUmVhZHk6ICAgICAgZmFsc2UsXG4gICAgaXNGcmVzaDogICAgICBmYWxzZSxcbiAgICBpc0J1c3k6ICAgICAgIGZhbHNlLFxuXG4gICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaXNSZWFkeSkgcmV0dXJuO1xuXG4gICAgICB2YXIgJGRvYyA9ICQoZG9jdW1lbnQpLCAkd2luID0gJCh3aW5kb3cpO1xuXG4gICAgICB2YXIgbG9hZERpbWVuc2lvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgUGFyYWxsYXgud2luSGVpZ2h0ID0gJHdpbi5oZWlnaHQoKTtcbiAgICAgICAgUGFyYWxsYXgud2luV2lkdGggID0gJHdpbi53aWR0aCgpO1xuICAgICAgICBQYXJhbGxheC5kb2NIZWlnaHQgPSAkZG9jLmhlaWdodCgpO1xuICAgICAgICBQYXJhbGxheC5kb2NXaWR0aCAgPSAkZG9jLndpZHRoKCk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgbG9hZFNjcm9sbFBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB3aW5TY3JvbGxUb3AgID0gJHdpbi5zY3JvbGxUb3AoKTtcbiAgICAgICAgdmFyIHNjcm9sbFRvcE1heCAgPSBQYXJhbGxheC5kb2NIZWlnaHQgLSBQYXJhbGxheC53aW5IZWlnaHQ7XG4gICAgICAgIHZhciBzY3JvbGxMZWZ0TWF4ID0gUGFyYWxsYXguZG9jV2lkdGggIC0gUGFyYWxsYXgud2luV2lkdGg7XG4gICAgICAgIFBhcmFsbGF4LnNjcm9sbFRvcCAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihzY3JvbGxUb3BNYXgsICB3aW5TY3JvbGxUb3ApKTtcbiAgICAgICAgUGFyYWxsYXguc2Nyb2xsTGVmdCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHNjcm9sbExlZnRNYXgsICR3aW4uc2Nyb2xsTGVmdCgpKSk7XG4gICAgICAgIFBhcmFsbGF4Lm92ZXJTY3JvbGwgPSBNYXRoLm1heCh3aW5TY3JvbGxUb3AgLSBzY3JvbGxUb3BNYXgsIE1hdGgubWluKHdpblNjcm9sbFRvcCwgMCkpO1xuICAgICAgfTtcblxuICAgICAgJHdpbi5vbigncmVzaXplLnB4LnBhcmFsbGF4IGxvYWQucHgucGFyYWxsYXgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBsb2FkRGltZW5zaW9ucygpO1xuICAgICAgICAgIFBhcmFsbGF4LmlzRnJlc2ggPSBmYWxzZTtcbiAgICAgICAgICBQYXJhbGxheC5yZXF1ZXN0UmVuZGVyKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignc2Nyb2xsLnB4LnBhcmFsbGF4IGxvYWQucHgucGFyYWxsYXgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBsb2FkU2Nyb2xsUG9zaXRpb24oKTtcbiAgICAgICAgICBQYXJhbGxheC5yZXF1ZXN0UmVuZGVyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICBsb2FkRGltZW5zaW9ucygpO1xuICAgICAgbG9hZFNjcm9sbFBvc2l0aW9uKCk7XG5cbiAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgfSxcblxuICAgIGNvbmZpZ3VyZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09ICdvYmplY3QnKSB7XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLnJlZnJlc2g7XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLnJlbmRlcjtcbiAgICAgICAgJC5leHRlbmQodGhpcy5wcm90b3R5cGUsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICQuZWFjaCh0aGlzLnNsaWRlcnMsIGZ1bmN0aW9uKCl7IHRoaXMucmVmcmVzaCgpIH0pO1xuICAgICAgdGhpcy5pc0ZyZXNoID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaXNGcmVzaCB8fCB0aGlzLnJlZnJlc2goKTtcbiAgICAgICQuZWFjaCh0aGlzLnNsaWRlcnMsIGZ1bmN0aW9uKCl7IHRoaXMucmVuZGVyKCkgfSk7XG4gICAgfSxcblxuICAgIHJlcXVlc3RSZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAoIXRoaXMuaXNCdXN5KSB7XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnJlbmRlcigpO1xuICAgICAgICAgIHNlbGYuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24oZWwpe1xuICAgICAgdmFyIGksXG4gICAgICAgICAgcGFyYWxsYXhFbGVtZW50ID0gJChlbCkuZGF0YSgncHgucGFyYWxsYXgnKTtcbiAgICAgIHBhcmFsbGF4RWxlbWVudC4kbWlycm9yLnJlbW92ZSgpO1xuICAgICAgZm9yKGk9MDsgaSA8IHRoaXMuc2xpZGVycy5sZW5ndGg7IGkrPTEpe1xuICAgICAgICBpZih0aGlzLnNsaWRlcnNbaV0gPT0gcGFyYWxsYXhFbGVtZW50KXtcbiAgICAgICAgICB0aGlzLnNsaWRlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAkKGVsKS5kYXRhKCdweC5wYXJhbGxheCcsIGZhbHNlKTtcbiAgICAgIGlmKHRoaXMuc2xpZGVycy5sZW5ndGggPT09IDApe1xuICAgICAgICAkKHdpbmRvdykub2ZmKCdzY3JvbGwucHgucGFyYWxsYXggcmVzaXplLnB4LnBhcmFsbGF4IGxvYWQucHgucGFyYWxsYXgnKTtcbiAgICAgICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG4gICAgICAgIFBhcmFsbGF4LmlzU2V0dXAgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG5cbiAgLy8gUGFyYWxsYXggUGx1Z2luIERlZmluaXRpb25cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvbjtcblxuICAgICAgaWYgKHRoaXMgPT0gd2luZG93IHx8IHRoaXMgPT0gZG9jdW1lbnQgfHwgJHRoaXMuaXMoJ2JvZHknKSkge1xuICAgICAgICBQYXJhbGxheC5jb25maWd1cmUob3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghJHRoaXMuZGF0YSgncHgucGFyYWxsYXgnKSkge1xuICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sICR0aGlzLmRhdGEoKSwgb3B0aW9ucyk7XG4gICAgICAgICR0aGlzLmRhdGEoJ3B4LnBhcmFsbGF4JywgbmV3IFBhcmFsbGF4KHRoaXMsIG9wdGlvbnMpKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcpXG4gICAgICB7XG4gICAgICAgICQuZXh0ZW5kKCR0aGlzLmRhdGEoJ3B4LnBhcmFsbGF4JyksIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYob3B0aW9uID09ICdkZXN0cm95Jyl7XG4gICAgICAgICAgICBQYXJhbGxheFsnZGVzdHJveSddKHRoaXMpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBQYXJhbGxheFtvcHRpb25dKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9O1xuXG4gIHZhciBvbGQgPSAkLmZuLnBhcmFsbGF4O1xuXG4gICQuZm4ucGFyYWxsYXggICAgICAgICAgICAgPSBQbHVnaW47XG4gICQuZm4ucGFyYWxsYXguQ29uc3RydWN0b3IgPSBQYXJhbGxheDtcblxuXG4gIC8vIFBhcmFsbGF4IE5vIENvbmZsaWN0XG5cbiAgJC5mbi5wYXJhbGxheC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4ucGFyYWxsYXggPSBvbGQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cblxuICAvLyBQYXJhbGxheCBEYXRhLUFQSVxuXG4gICQoZG9jdW1lbnQpLm9uKCdyZWFkeS5weC5wYXJhbGxheC5kYXRhLWFwaScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCdbZGF0YS1wYXJhbGxheD1cInNjcm9sbFwiXScpLnBhcmFsbGF4KCk7XG4gIH0pO1xuXG59KGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCkpO1xuIiwiLypcbiogTGlic1xuKi9cblxucmVxdWlyZSAoJy4vbGlicy9qcXVlcnktY2xvbmV5YS5taW4nKTsgXG5yZXF1aXJlICgnLi9saWJzL2ZsZXhzbGlkZXIubWluJyk7IFxucmVxdWlyZSAoJy4vbGlicy9wYXJhbGxheC5taW4nKTsgXG4gXG4vKlxuKiBkZXZcbiovXG5cbnJlcXVpcmUgKCcuL2Rldi9mbGV4c2xpZGVyJyk7IFxucmVxdWlyZSAoJy4vZGV2L2pxdWVyeS1jbG9uZXlhJyk7IFxucmVxdWlyZSAoJy4vZGV2L3BhcmFsbGF4Jyk7IFxuLy9yZXF1aXJlICgnLi9kZXYvc21vb3RoLXNjcm9sbCcpOyBcblxuICBcbiBcbi8qIFxuKiB2aXN1bGVzIG1vZHVsZXMgXG4qLyBcblxucmVxdWlyZSAoJy4vcG9ydGZvbGlvJyk7IFxucmVxdWlyZSAoJy4vY3VzdG9taXplcicpOyBcbnJlcXVpcmUgKCcuL25hdmlnYXRpb24nKTsgXG5yZXF1aXJlICgnLi9zaGFwZWx5LXNjcmlwdHMnKTsgXG5yZXF1aXJlICgnLi9za2lwLWxpbmstZm9jdXMtZml4Jyk7IFxucmVxdWlyZSAoJy4vd2lkZ2V0Jyk7IFxuICIsIi8qXG4gKiBqUXVlcnkgRmxleFNsaWRlciB2Mi42LjBcbiAqIENvcHlyaWdodCAyMDEyIFdvb1RoZW1lc1xuICogQ29udHJpYnV0aW5nIEF1dGhvcjogVHlsZXIgU21pdGhcbiAqLyFmdW5jdGlvbigkKXt2YXIgZT0hMDskLmZsZXhzbGlkZXI9ZnVuY3Rpb24odCxhKXt2YXIgbj0kKHQpO24udmFycz0kLmV4dGVuZCh7fSwkLmZsZXhzbGlkZXIuZGVmYXVsdHMsYSk7dmFyIGk9bi52YXJzLm5hbWVzcGFjZSxzPXdpbmRvdy5uYXZpZ2F0b3ImJndpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCYmd2luZG93Lk1TR2VzdHVyZSxyPShcIm9udG91Y2hzdGFydFwiaW4gd2luZG93fHxzfHx3aW5kb3cuRG9jdW1lbnRUb3VjaCYmZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKSYmbi52YXJzLnRvdWNoLG89XCJjbGljayB0b3VjaGVuZCBNU1BvaW50ZXJVcCBrZXl1cFwiLGw9XCJcIixjLGQ9XCJ2ZXJ0aWNhbFwiPT09bi52YXJzLmRpcmVjdGlvbix1PW4udmFycy5yZXZlcnNlLHY9bi52YXJzLml0ZW1XaWR0aD4wLHA9XCJmYWRlXCI9PT1uLnZhcnMuYW5pbWF0aW9uLG09XCJcIiE9PW4udmFycy5hc05hdkZvcixmPXt9OyQuZGF0YSh0LFwiZmxleHNsaWRlclwiLG4pLGY9e2luaXQ6ZnVuY3Rpb24oKXtuLmFuaW1hdGluZz0hMSxuLmN1cnJlbnRTbGlkZT1wYXJzZUludChuLnZhcnMuc3RhcnRBdD9uLnZhcnMuc3RhcnRBdDowLDEwKSxpc05hTihuLmN1cnJlbnRTbGlkZSkmJihuLmN1cnJlbnRTbGlkZT0wKSxuLmFuaW1hdGluZ1RvPW4uY3VycmVudFNsaWRlLG4uYXRFbmQ9MD09PW4uY3VycmVudFNsaWRlfHxuLmN1cnJlbnRTbGlkZT09PW4ubGFzdCxuLmNvbnRhaW5lclNlbGVjdG9yPW4udmFycy5zZWxlY3Rvci5zdWJzdHIoMCxuLnZhcnMuc2VsZWN0b3Iuc2VhcmNoKFwiIFwiKSksbi5zbGlkZXM9JChuLnZhcnMuc2VsZWN0b3Isbiksbi5jb250YWluZXI9JChuLmNvbnRhaW5lclNlbGVjdG9yLG4pLG4uY291bnQ9bi5zbGlkZXMubGVuZ3RoLG4uc3luY0V4aXN0cz0kKG4udmFycy5zeW5jKS5sZW5ndGg+MCxcInNsaWRlXCI9PT1uLnZhcnMuYW5pbWF0aW9uJiYobi52YXJzLmFuaW1hdGlvbj1cInN3aW5nXCIpLG4ucHJvcD1kP1widG9wXCI6XCJtYXJnaW5MZWZ0XCIsbi5hcmdzPXt9LG4ubWFudWFsUGF1c2U9ITEsbi5zdG9wcGVkPSExLG4uc3RhcnRlZD0hMSxuLnN0YXJ0VGltZW91dD1udWxsLG4udHJhbnNpdGlvbnM9IW4udmFycy52aWRlbyYmIXAmJm4udmFycy51c2VDU1MmJmZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSx0PVtcInBlcnNwZWN0aXZlUHJvcGVydHlcIixcIldlYmtpdFBlcnNwZWN0aXZlXCIsXCJNb3pQZXJzcGVjdGl2ZVwiLFwiT1BlcnNwZWN0aXZlXCIsXCJtc1BlcnNwZWN0aXZlXCJdO2Zvcih2YXIgYSBpbiB0KWlmKHZvaWQgMCE9PWUuc3R5bGVbdFthXV0pcmV0dXJuIG4ucGZ4PXRbYV0ucmVwbGFjZShcIlBlcnNwZWN0aXZlXCIsXCJcIikudG9Mb3dlckNhc2UoKSxuLnByb3A9XCItXCIrbi5wZngrXCItdHJhbnNmb3JtXCIsITA7cmV0dXJuITF9KCksbi5lbnN1cmVBbmltYXRpb25FbmQ9XCJcIixcIlwiIT09bi52YXJzLmNvbnRyb2xzQ29udGFpbmVyJiYobi5jb250cm9sc0NvbnRhaW5lcj0kKG4udmFycy5jb250cm9sc0NvbnRhaW5lcikubGVuZ3RoPjAmJiQobi52YXJzLmNvbnRyb2xzQ29udGFpbmVyKSksXCJcIiE9PW4udmFycy5tYW51YWxDb250cm9scyYmKG4ubWFudWFsQ29udHJvbHM9JChuLnZhcnMubWFudWFsQ29udHJvbHMpLmxlbmd0aD4wJiYkKG4udmFycy5tYW51YWxDb250cm9scykpLFwiXCIhPT1uLnZhcnMuY3VzdG9tRGlyZWN0aW9uTmF2JiYobi5jdXN0b21EaXJlY3Rpb25OYXY9Mj09PSQobi52YXJzLmN1c3RvbURpcmVjdGlvbk5hdikubGVuZ3RoJiYkKG4udmFycy5jdXN0b21EaXJlY3Rpb25OYXYpKSxuLnZhcnMucmFuZG9taXplJiYobi5zbGlkZXMuc29ydChmdW5jdGlvbigpe3JldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpLS41fSksbi5jb250YWluZXIuZW1wdHkoKS5hcHBlbmQobi5zbGlkZXMpKSxuLmRvTWF0aCgpLG4uc2V0dXAoXCJpbml0XCIpLG4udmFycy5jb250cm9sTmF2JiZmLmNvbnRyb2xOYXYuc2V0dXAoKSxuLnZhcnMuZGlyZWN0aW9uTmF2JiZmLmRpcmVjdGlvbk5hdi5zZXR1cCgpLG4udmFycy5rZXlib2FyZCYmKDE9PT0kKG4uY29udGFpbmVyU2VsZWN0b3IpLmxlbmd0aHx8bi52YXJzLm11bHRpcGxlS2V5Ym9hcmQpJiYkKGRvY3VtZW50KS5iaW5kKFwia2V5dXBcIixmdW5jdGlvbihlKXt2YXIgdD1lLmtleUNvZGU7aWYoIW4uYW5pbWF0aW5nJiYoMzk9PT10fHwzNz09PXQpKXt2YXIgYT0zOT09PXQ/bi5nZXRUYXJnZXQoXCJuZXh0XCIpOjM3PT09dD9uLmdldFRhcmdldChcInByZXZcIik6ITE7bi5mbGV4QW5pbWF0ZShhLG4udmFycy5wYXVzZU9uQWN0aW9uKX19KSxuLnZhcnMubW91c2V3aGVlbCYmbi5iaW5kKFwibW91c2V3aGVlbFwiLGZ1bmN0aW9uKGUsdCxhLGkpe2UucHJldmVudERlZmF1bHQoKTt2YXIgcz0wPnQ/bi5nZXRUYXJnZXQoXCJuZXh0XCIpOm4uZ2V0VGFyZ2V0KFwicHJldlwiKTtuLmZsZXhBbmltYXRlKHMsbi52YXJzLnBhdXNlT25BY3Rpb24pfSksbi52YXJzLnBhdXNlUGxheSYmZi5wYXVzZVBsYXkuc2V0dXAoKSxuLnZhcnMuc2xpZGVzaG93JiZuLnZhcnMucGF1c2VJbnZpc2libGUmJmYucGF1c2VJbnZpc2libGUuaW5pdCgpLG4udmFycy5zbGlkZXNob3cmJihuLnZhcnMucGF1c2VPbkhvdmVyJiZuLmhvdmVyKGZ1bmN0aW9uKCl7bi5tYW51YWxQbGF5fHxuLm1hbnVhbFBhdXNlfHxuLnBhdXNlKCl9LGZ1bmN0aW9uKCl7bi5tYW51YWxQYXVzZXx8bi5tYW51YWxQbGF5fHxuLnN0b3BwZWR8fG4ucGxheSgpfSksbi52YXJzLnBhdXNlSW52aXNpYmxlJiZmLnBhdXNlSW52aXNpYmxlLmlzSGlkZGVuKCl8fChuLnZhcnMuaW5pdERlbGF5PjA/bi5zdGFydFRpbWVvdXQ9c2V0VGltZW91dChuLnBsYXksbi52YXJzLmluaXREZWxheSk6bi5wbGF5KCkpKSxtJiZmLmFzTmF2LnNldHVwKCksciYmbi52YXJzLnRvdWNoJiZmLnRvdWNoKCksKCFwfHxwJiZuLnZhcnMuc21vb3RoSGVpZ2h0KSYmJCh3aW5kb3cpLmJpbmQoXCJyZXNpemUgb3JpZW50YXRpb25jaGFuZ2UgZm9jdXNcIixmLnJlc2l6ZSksbi5maW5kKFwiaW1nXCIpLmF0dHIoXCJkcmFnZ2FibGVcIixcImZhbHNlXCIpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtuLnZhcnMuc3RhcnQobil9LDIwMCl9LGFzTmF2OntzZXR1cDpmdW5jdGlvbigpe24uYXNOYXY9ITAsbi5hbmltYXRpbmdUbz1NYXRoLmZsb29yKG4uY3VycmVudFNsaWRlL24ubW92ZSksbi5jdXJyZW50SXRlbT1uLmN1cnJlbnRTbGlkZSxuLnNsaWRlcy5yZW1vdmVDbGFzcyhpK1wiYWN0aXZlLXNsaWRlXCIpLmVxKG4uY3VycmVudEl0ZW0pLmFkZENsYXNzKGkrXCJhY3RpdmUtc2xpZGVcIikscz8odC5fc2xpZGVyPW4sbi5zbGlkZXMuZWFjaChmdW5jdGlvbigpe3ZhciBlPXRoaXM7ZS5fZ2VzdHVyZT1uZXcgTVNHZXN0dXJlLGUuX2dlc3R1cmUudGFyZ2V0PWUsZS5hZGRFdmVudExpc3RlbmVyKFwiTVNQb2ludGVyRG93blwiLGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKSxlLmN1cnJlbnRUYXJnZXQuX2dlc3R1cmUmJmUuY3VycmVudFRhcmdldC5fZ2VzdHVyZS5hZGRQb2ludGVyKGUucG9pbnRlcklkKX0sITEpLGUuYWRkRXZlbnRMaXN0ZW5lcihcIk1TR2VzdHVyZVRhcFwiLGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKTt2YXIgdD0kKHRoaXMpLGE9dC5pbmRleCgpOyQobi52YXJzLmFzTmF2Rm9yKS5kYXRhKFwiZmxleHNsaWRlclwiKS5hbmltYXRpbmd8fHQuaGFzQ2xhc3MoXCJhY3RpdmVcIil8fChuLmRpcmVjdGlvbj1uLmN1cnJlbnRJdGVtPGE/XCJuZXh0XCI6XCJwcmV2XCIsbi5mbGV4QW5pbWF0ZShhLG4udmFycy5wYXVzZU9uQWN0aW9uLCExLCEwLCEwKSl9KX0pKTpuLnNsaWRlcy5vbihvLGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKTt2YXIgdD0kKHRoaXMpLGE9dC5pbmRleCgpLHM9dC5vZmZzZXQoKS5sZWZ0LSQobikuc2Nyb2xsTGVmdCgpOzA+PXMmJnQuaGFzQ2xhc3MoaStcImFjdGl2ZS1zbGlkZVwiKT9uLmZsZXhBbmltYXRlKG4uZ2V0VGFyZ2V0KFwicHJldlwiKSwhMCk6JChuLnZhcnMuYXNOYXZGb3IpLmRhdGEoXCJmbGV4c2xpZGVyXCIpLmFuaW1hdGluZ3x8dC5oYXNDbGFzcyhpK1wiYWN0aXZlLXNsaWRlXCIpfHwobi5kaXJlY3Rpb249bi5jdXJyZW50SXRlbTxhP1wibmV4dFwiOlwicHJldlwiLG4uZmxleEFuaW1hdGUoYSxuLnZhcnMucGF1c2VPbkFjdGlvbiwhMSwhMCwhMCkpfSl9fSxjb250cm9sTmF2OntzZXR1cDpmdW5jdGlvbigpe24ubWFudWFsQ29udHJvbHM/Zi5jb250cm9sTmF2LnNldHVwTWFudWFsKCk6Zi5jb250cm9sTmF2LnNldHVwUGFnaW5nKCl9LHNldHVwUGFnaW5nOmZ1bmN0aW9uKCl7dmFyIGU9XCJ0aHVtYm5haWxzXCI9PT1uLnZhcnMuY29udHJvbE5hdj9cImNvbnRyb2wtdGh1bWJzXCI6XCJjb250cm9sLXBhZ2luZ1wiLHQ9MSxhLHM7aWYobi5jb250cm9sTmF2U2NhZmZvbGQ9JCgnPG9sIGNsYXNzPVwiJytpK1wiY29udHJvbC1uYXYgXCIraStlKydcIj48L29sPicpLG4ucGFnaW5nQ291bnQ+MSlmb3IodmFyIHI9MDtyPG4ucGFnaW5nQ291bnQ7cisrKXtpZihzPW4uc2xpZGVzLmVxKHIpLHZvaWQgMD09PXMuYXR0cihcImRhdGEtdGh1bWItYWx0XCIpJiZzLmF0dHIoXCJkYXRhLXRodW1iLWFsdFwiLFwiXCIpLGFsdFRleHQ9XCJcIiE9PXMuYXR0cihcImRhdGEtdGh1bWItYWx0XCIpP2FsdFRleHQ9JyBhbHQ9XCInK3MuYXR0cihcImRhdGEtdGh1bWItYWx0XCIpKydcIic6XCJcIixhPVwidGh1bWJuYWlsc1wiPT09bi52YXJzLmNvbnRyb2xOYXY/JzxpbWcgc3JjPVwiJytzLmF0dHIoXCJkYXRhLXRodW1iXCIpKydcIicrYWx0VGV4dCtcIi8+XCI6JzxhIGhyZWY9XCIjXCI+Jyt0K1wiPC9hPlwiLFwidGh1bWJuYWlsc1wiPT09bi52YXJzLmNvbnRyb2xOYXYmJiEwPT09bi52YXJzLnRodW1iQ2FwdGlvbnMpe3ZhciBjPXMuYXR0cihcImRhdGEtdGh1bWJjYXB0aW9uXCIpO1wiXCIhPT1jJiZ2b2lkIDAhPT1jJiYoYSs9JzxzcGFuIGNsYXNzPVwiJytpKydjYXB0aW9uXCI+JytjK1wiPC9zcGFuPlwiKX1uLmNvbnRyb2xOYXZTY2FmZm9sZC5hcHBlbmQoXCI8bGk+XCIrYStcIjwvbGk+XCIpLHQrK31uLmNvbnRyb2xzQ29udGFpbmVyPyQobi5jb250cm9sc0NvbnRhaW5lcikuYXBwZW5kKG4uY29udHJvbE5hdlNjYWZmb2xkKTpuLmFwcGVuZChuLmNvbnRyb2xOYXZTY2FmZm9sZCksZi5jb250cm9sTmF2LnNldCgpLGYuY29udHJvbE5hdi5hY3RpdmUoKSxuLmNvbnRyb2xOYXZTY2FmZm9sZC5kZWxlZ2F0ZShcImEsIGltZ1wiLG8sZnVuY3Rpb24oZSl7aWYoZS5wcmV2ZW50RGVmYXVsdCgpLFwiXCI9PT1sfHxsPT09ZS50eXBlKXt2YXIgdD0kKHRoaXMpLGE9bi5jb250cm9sTmF2LmluZGV4KHQpO3QuaGFzQ2xhc3MoaStcImFjdGl2ZVwiKXx8KG4uZGlyZWN0aW9uPWE+bi5jdXJyZW50U2xpZGU/XCJuZXh0XCI6XCJwcmV2XCIsbi5mbGV4QW5pbWF0ZShhLG4udmFycy5wYXVzZU9uQWN0aW9uKSl9XCJcIj09PWwmJihsPWUudHlwZSksZi5zZXRUb0NsZWFyV2F0Y2hlZEV2ZW50KCl9KX0sc2V0dXBNYW51YWw6ZnVuY3Rpb24oKXtuLmNvbnRyb2xOYXY9bi5tYW51YWxDb250cm9scyxmLmNvbnRyb2xOYXYuYWN0aXZlKCksbi5jb250cm9sTmF2LmJpbmQobyxmdW5jdGlvbihlKXtpZihlLnByZXZlbnREZWZhdWx0KCksXCJcIj09PWx8fGw9PT1lLnR5cGUpe3ZhciB0PSQodGhpcyksYT1uLmNvbnRyb2xOYXYuaW5kZXgodCk7dC5oYXNDbGFzcyhpK1wiYWN0aXZlXCIpfHwoYT5uLmN1cnJlbnRTbGlkZT9uLmRpcmVjdGlvbj1cIm5leHRcIjpuLmRpcmVjdGlvbj1cInByZXZcIixuLmZsZXhBbmltYXRlKGEsbi52YXJzLnBhdXNlT25BY3Rpb24pKX1cIlwiPT09bCYmKGw9ZS50eXBlKSxmLnNldFRvQ2xlYXJXYXRjaGVkRXZlbnQoKX0pfSxzZXQ6ZnVuY3Rpb24oKXt2YXIgZT1cInRodW1ibmFpbHNcIj09PW4udmFycy5jb250cm9sTmF2P1wiaW1nXCI6XCJhXCI7bi5jb250cm9sTmF2PSQoXCIuXCIraStcImNvbnRyb2wtbmF2IGxpIFwiK2Usbi5jb250cm9sc0NvbnRhaW5lcj9uLmNvbnRyb2xzQ29udGFpbmVyOm4pfSxhY3RpdmU6ZnVuY3Rpb24oKXtuLmNvbnRyb2xOYXYucmVtb3ZlQ2xhc3MoaStcImFjdGl2ZVwiKS5lcShuLmFuaW1hdGluZ1RvKS5hZGRDbGFzcyhpK1wiYWN0aXZlXCIpfSx1cGRhdGU6ZnVuY3Rpb24oZSx0KXtuLnBhZ2luZ0NvdW50PjEmJlwiYWRkXCI9PT1lP24uY29udHJvbE5hdlNjYWZmb2xkLmFwcGVuZCgkKCc8bGk+PGEgaHJlZj1cIiNcIj4nK24uY291bnQrXCI8L2E+PC9saT5cIikpOjE9PT1uLnBhZ2luZ0NvdW50P24uY29udHJvbE5hdlNjYWZmb2xkLmZpbmQoXCJsaVwiKS5yZW1vdmUoKTpuLmNvbnRyb2xOYXYuZXEodCkuY2xvc2VzdChcImxpXCIpLnJlbW92ZSgpLGYuY29udHJvbE5hdi5zZXQoKSxuLnBhZ2luZ0NvdW50PjEmJm4ucGFnaW5nQ291bnQhPT1uLmNvbnRyb2xOYXYubGVuZ3RoP24udXBkYXRlKHQsZSk6Zi5jb250cm9sTmF2LmFjdGl2ZSgpfX0sZGlyZWN0aW9uTmF2OntzZXR1cDpmdW5jdGlvbigpe3ZhciBlPSQoJzx1bCBjbGFzcz1cIicraSsnZGlyZWN0aW9uLW5hdlwiPjxsaSBjbGFzcz1cIicraSsnbmF2LXByZXZcIj48YSBjbGFzcz1cIicraSsncHJldlwiIGhyZWY9XCIjXCI+JytuLnZhcnMucHJldlRleHQrJzwvYT48L2xpPjxsaSBjbGFzcz1cIicraSsnbmF2LW5leHRcIj48YSBjbGFzcz1cIicraSsnbmV4dFwiIGhyZWY9XCIjXCI+JytuLnZhcnMubmV4dFRleHQrXCI8L2E+PC9saT48L3VsPlwiKTtuLmN1c3RvbURpcmVjdGlvbk5hdj9uLmRpcmVjdGlvbk5hdj1uLmN1c3RvbURpcmVjdGlvbk5hdjpuLmNvbnRyb2xzQ29udGFpbmVyPygkKG4uY29udHJvbHNDb250YWluZXIpLmFwcGVuZChlKSxuLmRpcmVjdGlvbk5hdj0kKFwiLlwiK2krXCJkaXJlY3Rpb24tbmF2IGxpIGFcIixuLmNvbnRyb2xzQ29udGFpbmVyKSk6KG4uYXBwZW5kKGUpLG4uZGlyZWN0aW9uTmF2PSQoXCIuXCIraStcImRpcmVjdGlvbi1uYXYgbGkgYVwiLG4pKSxmLmRpcmVjdGlvbk5hdi51cGRhdGUoKSxuLmRpcmVjdGlvbk5hdi5iaW5kKG8sZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpO3ZhciB0OyhcIlwiPT09bHx8bD09PWUudHlwZSkmJih0PSQodGhpcykuaGFzQ2xhc3MoaStcIm5leHRcIik/bi5nZXRUYXJnZXQoXCJuZXh0XCIpOm4uZ2V0VGFyZ2V0KFwicHJldlwiKSxuLmZsZXhBbmltYXRlKHQsbi52YXJzLnBhdXNlT25BY3Rpb24pKSxcIlwiPT09bCYmKGw9ZS50eXBlKSxmLnNldFRvQ2xlYXJXYXRjaGVkRXZlbnQoKX0pfSx1cGRhdGU6ZnVuY3Rpb24oKXt2YXIgZT1pK1wiZGlzYWJsZWRcIjsxPT09bi5wYWdpbmdDb3VudD9uLmRpcmVjdGlvbk5hdi5hZGRDbGFzcyhlKS5hdHRyKFwidGFiaW5kZXhcIixcIi0xXCIpOm4udmFycy5hbmltYXRpb25Mb29wP24uZGlyZWN0aW9uTmF2LnJlbW92ZUNsYXNzKGUpLnJlbW92ZUF0dHIoXCJ0YWJpbmRleFwiKTowPT09bi5hbmltYXRpbmdUbz9uLmRpcmVjdGlvbk5hdi5yZW1vdmVDbGFzcyhlKS5maWx0ZXIoXCIuXCIraStcInByZXZcIikuYWRkQ2xhc3MoZSkuYXR0cihcInRhYmluZGV4XCIsXCItMVwiKTpuLmFuaW1hdGluZ1RvPT09bi5sYXN0P24uZGlyZWN0aW9uTmF2LnJlbW92ZUNsYXNzKGUpLmZpbHRlcihcIi5cIitpK1wibmV4dFwiKS5hZGRDbGFzcyhlKS5hdHRyKFwidGFiaW5kZXhcIixcIi0xXCIpOm4uZGlyZWN0aW9uTmF2LnJlbW92ZUNsYXNzKGUpLnJlbW92ZUF0dHIoXCJ0YWJpbmRleFwiKX19LHBhdXNlUGxheTp7c2V0dXA6ZnVuY3Rpb24oKXt2YXIgZT0kKCc8ZGl2IGNsYXNzPVwiJytpKydwYXVzZXBsYXlcIj48YSBocmVmPVwiI1wiPjwvYT48L2Rpdj4nKTtuLmNvbnRyb2xzQ29udGFpbmVyPyhuLmNvbnRyb2xzQ29udGFpbmVyLmFwcGVuZChlKSxuLnBhdXNlUGxheT0kKFwiLlwiK2krXCJwYXVzZXBsYXkgYVwiLG4uY29udHJvbHNDb250YWluZXIpKToobi5hcHBlbmQoZSksbi5wYXVzZVBsYXk9JChcIi5cIitpK1wicGF1c2VwbGF5IGFcIixuKSksZi5wYXVzZVBsYXkudXBkYXRlKG4udmFycy5zbGlkZXNob3c/aStcInBhdXNlXCI6aStcInBsYXlcIiksbi5wYXVzZVBsYXkuYmluZChvLGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKSwoXCJcIj09PWx8fGw9PT1lLnR5cGUpJiYoJCh0aGlzKS5oYXNDbGFzcyhpK1wicGF1c2VcIik/KG4ubWFudWFsUGF1c2U9ITAsbi5tYW51YWxQbGF5PSExLG4ucGF1c2UoKSk6KG4ubWFudWFsUGF1c2U9ITEsbi5tYW51YWxQbGF5PSEwLG4ucGxheSgpKSksXCJcIj09PWwmJihsPWUudHlwZSksZi5zZXRUb0NsZWFyV2F0Y2hlZEV2ZW50KCl9KX0sdXBkYXRlOmZ1bmN0aW9uKGUpe1wicGxheVwiPT09ZT9uLnBhdXNlUGxheS5yZW1vdmVDbGFzcyhpK1wicGF1c2VcIikuYWRkQ2xhc3MoaStcInBsYXlcIikuaHRtbChuLnZhcnMucGxheVRleHQpOm4ucGF1c2VQbGF5LnJlbW92ZUNsYXNzKGkrXCJwbGF5XCIpLmFkZENsYXNzKGkrXCJwYXVzZVwiKS5odG1sKG4udmFycy5wYXVzZVRleHQpfX0sdG91Y2g6ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUpe2Uuc3RvcFByb3BhZ2F0aW9uKCksbi5hbmltYXRpbmc/ZS5wcmV2ZW50RGVmYXVsdCgpOihuLnBhdXNlKCksdC5fZ2VzdHVyZS5hZGRQb2ludGVyKGUucG9pbnRlcklkKSxUPTAsYz1kP24uaDpuLncsZj1OdW1iZXIobmV3IERhdGUpLGw9diYmdSYmbi5hbmltYXRpbmdUbz09PW4ubGFzdD8wOnYmJnU/bi5saW1pdC0obi5pdGVtVytuLnZhcnMuaXRlbU1hcmdpbikqbi5tb3ZlKm4uYW5pbWF0aW5nVG86diYmbi5jdXJyZW50U2xpZGU9PT1uLmxhc3Q/bi5saW1pdDp2PyhuLml0ZW1XK24udmFycy5pdGVtTWFyZ2luKSpuLm1vdmUqbi5jdXJyZW50U2xpZGU6dT8obi5sYXN0LW4uY3VycmVudFNsaWRlK24uY2xvbmVPZmZzZXQpKmM6KG4uY3VycmVudFNsaWRlK24uY2xvbmVPZmZzZXQpKmMpfWZ1bmN0aW9uIGEoZSl7ZS5zdG9wUHJvcGFnYXRpb24oKTt2YXIgYT1lLnRhcmdldC5fc2xpZGVyO2lmKGEpe3ZhciBuPS1lLnRyYW5zbGF0aW9uWCxpPS1lLnRyYW5zbGF0aW9uWTtyZXR1cm4gVCs9ZD9pOm4sbT1ULHg9ZD9NYXRoLmFicyhUKTxNYXRoLmFicygtbik6TWF0aC5hYnMoVCk8TWF0aC5hYnMoLWkpLGUuZGV0YWlsPT09ZS5NU0dFU1RVUkVfRkxBR19JTkVSVElBP3ZvaWQgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCl7dC5fZ2VzdHVyZS5zdG9wKCl9KTp2b2lkKCgheHx8TnVtYmVyKG5ldyBEYXRlKS1mPjUwMCkmJihlLnByZXZlbnREZWZhdWx0KCksIXAmJmEudHJhbnNpdGlvbnMmJihhLnZhcnMuYW5pbWF0aW9uTG9vcHx8KG09VC8oMD09PWEuY3VycmVudFNsaWRlJiYwPlR8fGEuY3VycmVudFNsaWRlPT09YS5sYXN0JiZUPjA/TWF0aC5hYnMoVCkvYysyOjEpKSxhLnNldFByb3BzKGwrbSxcInNldFRvdWNoXCIpKSkpfX1mdW5jdGlvbiBpKGUpe2Uuc3RvcFByb3BhZ2F0aW9uKCk7dmFyIHQ9ZS50YXJnZXQuX3NsaWRlcjtpZih0KXtpZih0LmFuaW1hdGluZ1RvPT09dC5jdXJyZW50U2xpZGUmJiF4JiZudWxsIT09bSl7dmFyIGE9dT8tbTptLG49YT4wP3QuZ2V0VGFyZ2V0KFwibmV4dFwiKTp0LmdldFRhcmdldChcInByZXZcIik7dC5jYW5BZHZhbmNlKG4pJiYoTnVtYmVyKG5ldyBEYXRlKS1mPDU1MCYmTWF0aC5hYnMoYSk+NTB8fE1hdGguYWJzKGEpPmMvMik/dC5mbGV4QW5pbWF0ZShuLHQudmFycy5wYXVzZU9uQWN0aW9uKTpwfHx0LmZsZXhBbmltYXRlKHQuY3VycmVudFNsaWRlLHQudmFycy5wYXVzZU9uQWN0aW9uLCEwKX1yPW51bGwsbz1udWxsLG09bnVsbCxsPW51bGwsVD0wfX12YXIgcixvLGwsYyxtLGYsZyxoLFMseD0hMSx5PTAsYj0wLFQ9MDtzPyh0LnN0eWxlLm1zVG91Y2hBY3Rpb249XCJub25lXCIsdC5fZ2VzdHVyZT1uZXcgTVNHZXN0dXJlLHQuX2dlc3R1cmUudGFyZ2V0PXQsdC5hZGRFdmVudExpc3RlbmVyKFwiTVNQb2ludGVyRG93blwiLGUsITEpLHQuX3NsaWRlcj1uLHQuYWRkRXZlbnRMaXN0ZW5lcihcIk1TR2VzdHVyZUNoYW5nZVwiLGEsITEpLHQuYWRkRXZlbnRMaXN0ZW5lcihcIk1TR2VzdHVyZUVuZFwiLGksITEpKTooZz1mdW5jdGlvbihlKXtuLmFuaW1hdGluZz9lLnByZXZlbnREZWZhdWx0KCk6KHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZHx8MT09PWUudG91Y2hlcy5sZW5ndGgpJiYobi5wYXVzZSgpLGM9ZD9uLmg6bi53LGY9TnVtYmVyKG5ldyBEYXRlKSx5PWUudG91Y2hlc1swXS5wYWdlWCxiPWUudG91Y2hlc1swXS5wYWdlWSxsPXYmJnUmJm4uYW5pbWF0aW5nVG89PT1uLmxhc3Q/MDp2JiZ1P24ubGltaXQtKG4uaXRlbVcrbi52YXJzLml0ZW1NYXJnaW4pKm4ubW92ZSpuLmFuaW1hdGluZ1RvOnYmJm4uY3VycmVudFNsaWRlPT09bi5sYXN0P24ubGltaXQ6dj8obi5pdGVtVytuLnZhcnMuaXRlbU1hcmdpbikqbi5tb3ZlKm4uY3VycmVudFNsaWRlOnU/KG4ubGFzdC1uLmN1cnJlbnRTbGlkZStuLmNsb25lT2Zmc2V0KSpjOihuLmN1cnJlbnRTbGlkZStuLmNsb25lT2Zmc2V0KSpjLHI9ZD9iOnksbz1kP3k6Yix0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixoLCExKSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLFMsITEpKX0saD1mdW5jdGlvbihlKXt5PWUudG91Y2hlc1swXS5wYWdlWCxiPWUudG91Y2hlc1swXS5wYWdlWSxtPWQ/ci1iOnIteSx4PWQ/TWF0aC5hYnMobSk8TWF0aC5hYnMoeS1vKTpNYXRoLmFicyhtKTxNYXRoLmFicyhiLW8pO3ZhciB0PTUwMDsoIXh8fE51bWJlcihuZXcgRGF0ZSktZj50KSYmKGUucHJldmVudERlZmF1bHQoKSwhcCYmbi50cmFuc2l0aW9ucyYmKG4udmFycy5hbmltYXRpb25Mb29wfHwobS89MD09PW4uY3VycmVudFNsaWRlJiYwPm18fG4uY3VycmVudFNsaWRlPT09bi5sYXN0JiZtPjA/TWF0aC5hYnMobSkvYysyOjEpLG4uc2V0UHJvcHMobCttLFwic2V0VG91Y2hcIikpKX0sUz1mdW5jdGlvbihlKXtpZih0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixoLCExKSxuLmFuaW1hdGluZ1RvPT09bi5jdXJyZW50U2xpZGUmJiF4JiZudWxsIT09bSl7dmFyIGE9dT8tbTptLGk9YT4wP24uZ2V0VGFyZ2V0KFwibmV4dFwiKTpuLmdldFRhcmdldChcInByZXZcIik7bi5jYW5BZHZhbmNlKGkpJiYoTnVtYmVyKG5ldyBEYXRlKS1mPDU1MCYmTWF0aC5hYnMoYSk+NTB8fE1hdGguYWJzKGEpPmMvMik/bi5mbGV4QW5pbWF0ZShpLG4udmFycy5wYXVzZU9uQWN0aW9uKTpwfHxuLmZsZXhBbmltYXRlKG4uY3VycmVudFNsaWRlLG4udmFycy5wYXVzZU9uQWN0aW9uLCEwKX10LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLFMsITEpLHI9bnVsbCxvPW51bGwsbT1udWxsLGw9bnVsbH0sdC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLGcsITEpKX0scmVzaXplOmZ1bmN0aW9uKCl7IW4uYW5pbWF0aW5nJiZuLmlzKFwiOnZpc2libGVcIikmJih2fHxuLmRvTWF0aCgpLHA/Zi5zbW9vdGhIZWlnaHQoKTp2PyhuLnNsaWRlcy53aWR0aChuLmNvbXB1dGVkVyksbi51cGRhdGUobi5wYWdpbmdDb3VudCksbi5zZXRQcm9wcygpKTpkPyhuLnZpZXdwb3J0LmhlaWdodChuLmgpLG4uc2V0UHJvcHMobi5oLFwic2V0VG90YWxcIikpOihuLnZhcnMuc21vb3RoSGVpZ2h0JiZmLnNtb290aEhlaWdodCgpLG4ubmV3U2xpZGVzLndpZHRoKG4uY29tcHV0ZWRXKSxuLnNldFByb3BzKG4uY29tcHV0ZWRXLFwic2V0VG90YWxcIikpKX0sc21vb3RoSGVpZ2h0OmZ1bmN0aW9uKGUpe2lmKCFkfHxwKXt2YXIgdD1wP246bi52aWV3cG9ydDtlP3QuYW5pbWF0ZSh7aGVpZ2h0Om4uc2xpZGVzLmVxKG4uYW5pbWF0aW5nVG8pLmhlaWdodCgpfSxlKTp0LmhlaWdodChuLnNsaWRlcy5lcShuLmFuaW1hdGluZ1RvKS5oZWlnaHQoKSl9fSxzeW5jOmZ1bmN0aW9uKGUpe3ZhciB0PSQobi52YXJzLnN5bmMpLmRhdGEoXCJmbGV4c2xpZGVyXCIpLGE9bi5hbmltYXRpbmdUbztzd2l0Y2goZSl7Y2FzZVwiYW5pbWF0ZVwiOnQuZmxleEFuaW1hdGUoYSxuLnZhcnMucGF1c2VPbkFjdGlvbiwhMSwhMCk7YnJlYWs7Y2FzZVwicGxheVwiOnQucGxheWluZ3x8dC5hc05hdnx8dC5wbGF5KCk7YnJlYWs7Y2FzZVwicGF1c2VcIjp0LnBhdXNlKCl9fSx1bmlxdWVJRDpmdW5jdGlvbihlKXtyZXR1cm4gZS5maWx0ZXIoXCJbaWRdXCIpLmFkZChlLmZpbmQoXCJbaWRdXCIpKS5lYWNoKGZ1bmN0aW9uKCl7dmFyIGU9JCh0aGlzKTtlLmF0dHIoXCJpZFwiLGUuYXR0cihcImlkXCIpK1wiX2Nsb25lXCIpfSksZX0scGF1c2VJbnZpc2libGU6e3Zpc1Byb3A6bnVsbCxpbml0OmZ1bmN0aW9uKCl7dmFyIGU9Zi5wYXVzZUludmlzaWJsZS5nZXRIaWRkZW5Qcm9wKCk7aWYoZSl7dmFyIHQ9ZS5yZXBsYWNlKC9bSHxoXWlkZGVuLyxcIlwiKStcInZpc2liaWxpdHljaGFuZ2VcIjtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHQsZnVuY3Rpb24oKXtmLnBhdXNlSW52aXNpYmxlLmlzSGlkZGVuKCk/bi5zdGFydFRpbWVvdXQ/Y2xlYXJUaW1lb3V0KG4uc3RhcnRUaW1lb3V0KTpuLnBhdXNlKCk6bi5zdGFydGVkP24ucGxheSgpOm4udmFycy5pbml0RGVsYXk+MD9zZXRUaW1lb3V0KG4ucGxheSxuLnZhcnMuaW5pdERlbGF5KTpuLnBsYXkoKX0pfX0saXNIaWRkZW46ZnVuY3Rpb24oKXt2YXIgZT1mLnBhdXNlSW52aXNpYmxlLmdldEhpZGRlblByb3AoKTtyZXR1cm4gZT9kb2N1bWVudFtlXTohMX0sZ2V0SGlkZGVuUHJvcDpmdW5jdGlvbigpe3ZhciBlPVtcIndlYmtpdFwiLFwibW96XCIsXCJtc1wiLFwib1wiXTtpZihcImhpZGRlblwiaW4gZG9jdW1lbnQpcmV0dXJuXCJoaWRkZW5cIjtmb3IodmFyIHQ9MDt0PGUubGVuZ3RoO3QrKylpZihlW3RdK1wiSGlkZGVuXCJpbiBkb2N1bWVudClyZXR1cm4gZVt0XStcIkhpZGRlblwiO3JldHVybiBudWxsfX0sc2V0VG9DbGVhcldhdGNoZWRFdmVudDpmdW5jdGlvbigpe2NsZWFyVGltZW91dChjKSxjPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtsPVwiXCJ9LDNlMyl9fSxuLmZsZXhBbmltYXRlPWZ1bmN0aW9uKGUsdCxhLHMsbyl7aWYobi52YXJzLmFuaW1hdGlvbkxvb3B8fGU9PT1uLmN1cnJlbnRTbGlkZXx8KG4uZGlyZWN0aW9uPWU+bi5jdXJyZW50U2xpZGU/XCJuZXh0XCI6XCJwcmV2XCIpLG0mJjE9PT1uLnBhZ2luZ0NvdW50JiYobi5kaXJlY3Rpb249bi5jdXJyZW50SXRlbTxlP1wibmV4dFwiOlwicHJldlwiKSwhbi5hbmltYXRpbmcmJihuLmNhbkFkdmFuY2UoZSxvKXx8YSkmJm4uaXMoXCI6dmlzaWJsZVwiKSl7aWYobSYmcyl7dmFyIGw9JChuLnZhcnMuYXNOYXZGb3IpLmRhdGEoXCJmbGV4c2xpZGVyXCIpO2lmKG4uYXRFbmQ9MD09PWV8fGU9PT1uLmNvdW50LTEsbC5mbGV4QW5pbWF0ZShlLCEwLCExLCEwLG8pLG4uZGlyZWN0aW9uPW4uY3VycmVudEl0ZW08ZT9cIm5leHRcIjpcInByZXZcIixsLmRpcmVjdGlvbj1uLmRpcmVjdGlvbixNYXRoLmNlaWwoKGUrMSkvbi52aXNpYmxlKS0xPT09bi5jdXJyZW50U2xpZGV8fDA9PT1lKXJldHVybiBuLmN1cnJlbnRJdGVtPWUsbi5zbGlkZXMucmVtb3ZlQ2xhc3MoaStcImFjdGl2ZS1zbGlkZVwiKS5lcShlKS5hZGRDbGFzcyhpK1wiYWN0aXZlLXNsaWRlXCIpLCExO24uY3VycmVudEl0ZW09ZSxuLnNsaWRlcy5yZW1vdmVDbGFzcyhpK1wiYWN0aXZlLXNsaWRlXCIpLmVxKGUpLmFkZENsYXNzKGkrXCJhY3RpdmUtc2xpZGVcIiksZT1NYXRoLmZsb29yKGUvbi52aXNpYmxlKX1pZihuLmFuaW1hdGluZz0hMCxuLmFuaW1hdGluZ1RvPWUsdCYmbi5wYXVzZSgpLG4udmFycy5iZWZvcmUobiksbi5zeW5jRXhpc3RzJiYhbyYmZi5zeW5jKFwiYW5pbWF0ZVwiKSxuLnZhcnMuY29udHJvbE5hdiYmZi5jb250cm9sTmF2LmFjdGl2ZSgpLHZ8fG4uc2xpZGVzLnJlbW92ZUNsYXNzKGkrXCJhY3RpdmUtc2xpZGVcIikuZXEoZSkuYWRkQ2xhc3MoaStcImFjdGl2ZS1zbGlkZVwiKSxuLmF0RW5kPTA9PT1lfHxlPT09bi5sYXN0LG4udmFycy5kaXJlY3Rpb25OYXYmJmYuZGlyZWN0aW9uTmF2LnVwZGF0ZSgpLGU9PT1uLmxhc3QmJihuLnZhcnMuZW5kKG4pLG4udmFycy5hbmltYXRpb25Mb29wfHxuLnBhdXNlKCkpLHApcj8obi5zbGlkZXMuZXEobi5jdXJyZW50U2xpZGUpLmNzcyh7b3BhY2l0eTowLHpJbmRleDoxfSksbi5zbGlkZXMuZXEoZSkuY3NzKHtvcGFjaXR5OjEsekluZGV4OjJ9KSxuLndyYXB1cChjKSk6KG4uc2xpZGVzLmVxKG4uY3VycmVudFNsaWRlKS5jc3Moe3pJbmRleDoxfSkuYW5pbWF0ZSh7b3BhY2l0eTowfSxuLnZhcnMuYW5pbWF0aW9uU3BlZWQsbi52YXJzLmVhc2luZyksbi5zbGlkZXMuZXEoZSkuY3NzKHt6SW5kZXg6Mn0pLmFuaW1hdGUoe29wYWNpdHk6MX0sbi52YXJzLmFuaW1hdGlvblNwZWVkLG4udmFycy5lYXNpbmcsbi53cmFwdXApKTtlbHNle3ZhciBjPWQ/bi5zbGlkZXMuZmlsdGVyKFwiOmZpcnN0XCIpLmhlaWdodCgpOm4uY29tcHV0ZWRXLGcsaCxTO3Y/KGc9bi52YXJzLml0ZW1NYXJnaW4sUz0obi5pdGVtVytnKSpuLm1vdmUqbi5hbmltYXRpbmdUbyxoPVM+bi5saW1pdCYmMSE9PW4udmlzaWJsZT9uLmxpbWl0OlMpOmg9MD09PW4uY3VycmVudFNsaWRlJiZlPT09bi5jb3VudC0xJiZuLnZhcnMuYW5pbWF0aW9uTG9vcCYmXCJuZXh0XCIhPT1uLmRpcmVjdGlvbj91PyhuLmNvdW50K24uY2xvbmVPZmZzZXQpKmM6MDpuLmN1cnJlbnRTbGlkZT09PW4ubGFzdCYmMD09PWUmJm4udmFycy5hbmltYXRpb25Mb29wJiZcInByZXZcIiE9PW4uZGlyZWN0aW9uP3U/MDoobi5jb3VudCsxKSpjOnU/KG4uY291bnQtMS1lK24uY2xvbmVPZmZzZXQpKmM6KGUrbi5jbG9uZU9mZnNldCkqYyxuLnNldFByb3BzKGgsXCJcIixuLnZhcnMuYW5pbWF0aW9uU3BlZWQpLG4udHJhbnNpdGlvbnM/KG4udmFycy5hbmltYXRpb25Mb29wJiZuLmF0RW5kfHwobi5hbmltYXRpbmc9ITEsbi5jdXJyZW50U2xpZGU9bi5hbmltYXRpbmdUbyksbi5jb250YWluZXIudW5iaW5kKFwid2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIpLG4uY29udGFpbmVyLmJpbmQoXCJ3ZWJraXRUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmRcIixmdW5jdGlvbigpe2NsZWFyVGltZW91dChuLmVuc3VyZUFuaW1hdGlvbkVuZCksbi53cmFwdXAoYyl9KSxjbGVhclRpbWVvdXQobi5lbnN1cmVBbmltYXRpb25FbmQpLG4uZW5zdXJlQW5pbWF0aW9uRW5kPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtuLndyYXB1cChjKX0sbi52YXJzLmFuaW1hdGlvblNwZWVkKzEwMCkpOm4uY29udGFpbmVyLmFuaW1hdGUobi5hcmdzLG4udmFycy5hbmltYXRpb25TcGVlZCxuLnZhcnMuZWFzaW5nLGZ1bmN0aW9uKCl7bi53cmFwdXAoYyl9KX1uLnZhcnMuc21vb3RoSGVpZ2h0JiZmLnNtb290aEhlaWdodChuLnZhcnMuYW5pbWF0aW9uU3BlZWQpfX0sbi53cmFwdXA9ZnVuY3Rpb24oZSl7cHx8dnx8KDA9PT1uLmN1cnJlbnRTbGlkZSYmbi5hbmltYXRpbmdUbz09PW4ubGFzdCYmbi52YXJzLmFuaW1hdGlvbkxvb3A/bi5zZXRQcm9wcyhlLFwianVtcEVuZFwiKTpuLmN1cnJlbnRTbGlkZT09PW4ubGFzdCYmMD09PW4uYW5pbWF0aW5nVG8mJm4udmFycy5hbmltYXRpb25Mb29wJiZuLnNldFByb3BzKGUsXCJqdW1wU3RhcnRcIikpLG4uYW5pbWF0aW5nPSExLG4uY3VycmVudFNsaWRlPW4uYW5pbWF0aW5nVG8sbi52YXJzLmFmdGVyKG4pfSxuLmFuaW1hdGVTbGlkZXM9ZnVuY3Rpb24oKXshbi5hbmltYXRpbmcmJmUmJm4uZmxleEFuaW1hdGUobi5nZXRUYXJnZXQoXCJuZXh0XCIpKX0sbi5wYXVzZT1mdW5jdGlvbigpe2NsZWFySW50ZXJ2YWwobi5hbmltYXRlZFNsaWRlcyksbi5hbmltYXRlZFNsaWRlcz1udWxsLG4ucGxheWluZz0hMSxuLnZhcnMucGF1c2VQbGF5JiZmLnBhdXNlUGxheS51cGRhdGUoXCJwbGF5XCIpLG4uc3luY0V4aXN0cyYmZi5zeW5jKFwicGF1c2VcIil9LG4ucGxheT1mdW5jdGlvbigpe24ucGxheWluZyYmY2xlYXJJbnRlcnZhbChuLmFuaW1hdGVkU2xpZGVzKSxuLmFuaW1hdGVkU2xpZGVzPW4uYW5pbWF0ZWRTbGlkZXN8fHNldEludGVydmFsKG4uYW5pbWF0ZVNsaWRlcyxuLnZhcnMuc2xpZGVzaG93U3BlZWQpLG4uc3RhcnRlZD1uLnBsYXlpbmc9ITAsbi52YXJzLnBhdXNlUGxheSYmZi5wYXVzZVBsYXkudXBkYXRlKFwicGF1c2VcIiksbi5zeW5jRXhpc3RzJiZmLnN5bmMoXCJwbGF5XCIpfSxuLnN0b3A9ZnVuY3Rpb24oKXtuLnBhdXNlKCksbi5zdG9wcGVkPSEwfSxuLmNhbkFkdmFuY2U9ZnVuY3Rpb24oZSx0KXt2YXIgYT1tP24ucGFnaW5nQ291bnQtMTpuLmxhc3Q7cmV0dXJuIHQ/ITA6bSYmbi5jdXJyZW50SXRlbT09PW4uY291bnQtMSYmMD09PWUmJlwicHJldlwiPT09bi5kaXJlY3Rpb24/ITA6bSYmMD09PW4uY3VycmVudEl0ZW0mJmU9PT1uLnBhZ2luZ0NvdW50LTEmJlwibmV4dFwiIT09bi5kaXJlY3Rpb24/ITE6ZSE9PW4uY3VycmVudFNsaWRlfHxtP24udmFycy5hbmltYXRpb25Mb29wPyEwOm4uYXRFbmQmJjA9PT1uLmN1cnJlbnRTbGlkZSYmZT09PWEmJlwibmV4dFwiIT09bi5kaXJlY3Rpb24/ITE6bi5hdEVuZCYmbi5jdXJyZW50U2xpZGU9PT1hJiYwPT09ZSYmXCJuZXh0XCI9PT1uLmRpcmVjdGlvbj8hMTohMDohMX0sbi5nZXRUYXJnZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIG4uZGlyZWN0aW9uPWUsXCJuZXh0XCI9PT1lP24uY3VycmVudFNsaWRlPT09bi5sYXN0PzA6bi5jdXJyZW50U2xpZGUrMTowPT09bi5jdXJyZW50U2xpZGU/bi5sYXN0Om4uY3VycmVudFNsaWRlLTF9LG4uc2V0UHJvcHM9ZnVuY3Rpb24oZSx0LGEpe3ZhciBpPWZ1bmN0aW9uKCl7dmFyIGE9ZT9lOihuLml0ZW1XK24udmFycy5pdGVtTWFyZ2luKSpuLm1vdmUqbi5hbmltYXRpbmdUbyxpPWZ1bmN0aW9uKCl7aWYodilyZXR1cm5cInNldFRvdWNoXCI9PT10P2U6dSYmbi5hbmltYXRpbmdUbz09PW4ubGFzdD8wOnU/bi5saW1pdC0obi5pdGVtVytuLnZhcnMuaXRlbU1hcmdpbikqbi5tb3ZlKm4uYW5pbWF0aW5nVG86bi5hbmltYXRpbmdUbz09PW4ubGFzdD9uLmxpbWl0OmE7c3dpdGNoKHQpe2Nhc2VcInNldFRvdGFsXCI6cmV0dXJuIHU/KG4uY291bnQtMS1uLmN1cnJlbnRTbGlkZStuLmNsb25lT2Zmc2V0KSplOihuLmN1cnJlbnRTbGlkZStuLmNsb25lT2Zmc2V0KSplO2Nhc2VcInNldFRvdWNoXCI6cmV0dXJuIHU/ZTplO2Nhc2VcImp1bXBFbmRcIjpyZXR1cm4gdT9lOm4uY291bnQqZTtjYXNlXCJqdW1wU3RhcnRcIjpyZXR1cm4gdT9uLmNvdW50KmU6ZTtkZWZhdWx0OnJldHVybiBlfX0oKTtyZXR1cm4tMSppK1wicHhcIn0oKTtuLnRyYW5zaXRpb25zJiYoaT1kP1widHJhbnNsYXRlM2QoMCxcIitpK1wiLDApXCI6XCJ0cmFuc2xhdGUzZChcIitpK1wiLDAsMClcIixhPXZvaWQgMCE9PWE/YS8xZTMrXCJzXCI6XCIwc1wiLG4uY29udGFpbmVyLmNzcyhcIi1cIituLnBmeCtcIi10cmFuc2l0aW9uLWR1cmF0aW9uXCIsYSksbi5jb250YWluZXIuY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLGEpKSxuLmFyZ3Nbbi5wcm9wXT1pLChuLnRyYW5zaXRpb25zfHx2b2lkIDA9PT1hKSYmbi5jb250YWluZXIuY3NzKG4uYXJncyksbi5jb250YWluZXIuY3NzKFwidHJhbnNmb3JtXCIsaSl9LG4uc2V0dXA9ZnVuY3Rpb24oZSl7aWYocCluLnNsaWRlcy5jc3Moe3dpZHRoOlwiMTAwJVwiLFwiZmxvYXRcIjpcImxlZnRcIixtYXJnaW5SaWdodDpcIi0xMDAlXCIscG9zaXRpb246XCJyZWxhdGl2ZVwifSksXCJpbml0XCI9PT1lJiYocj9uLnNsaWRlcy5jc3Moe29wYWNpdHk6MCxkaXNwbGF5OlwiYmxvY2tcIix3ZWJraXRUcmFuc2l0aW9uOlwib3BhY2l0eSBcIituLnZhcnMuYW5pbWF0aW9uU3BlZWQvMWUzK1wicyBlYXNlXCIsekluZGV4OjF9KS5lcShuLmN1cnJlbnRTbGlkZSkuY3NzKHtvcGFjaXR5OjEsekluZGV4OjJ9KTowPT1uLnZhcnMuZmFkZUZpcnN0U2xpZGU/bi5zbGlkZXMuY3NzKHtvcGFjaXR5OjAsZGlzcGxheTpcImJsb2NrXCIsekluZGV4OjF9KS5lcShuLmN1cnJlbnRTbGlkZSkuY3NzKHt6SW5kZXg6Mn0pLmNzcyh7b3BhY2l0eToxfSk6bi5zbGlkZXMuY3NzKHtvcGFjaXR5OjAsZGlzcGxheTpcImJsb2NrXCIsekluZGV4OjF9KS5lcShuLmN1cnJlbnRTbGlkZSkuY3NzKHt6SW5kZXg6Mn0pLmFuaW1hdGUoe29wYWNpdHk6MX0sbi52YXJzLmFuaW1hdGlvblNwZWVkLG4udmFycy5lYXNpbmcpKSxuLnZhcnMuc21vb3RoSGVpZ2h0JiZmLnNtb290aEhlaWdodCgpO2Vsc2V7dmFyIHQsYTtcImluaXRcIj09PWUmJihuLnZpZXdwb3J0PSQoJzxkaXYgY2xhc3M9XCInK2krJ3ZpZXdwb3J0XCI+PC9kaXY+JykuY3NzKHtvdmVyZmxvdzpcImhpZGRlblwiLHBvc2l0aW9uOlwicmVsYXRpdmVcIn0pLmFwcGVuZFRvKG4pLmFwcGVuZChuLmNvbnRhaW5lciksbi5jbG9uZUNvdW50PTAsbi5jbG9uZU9mZnNldD0wLHUmJihhPSQubWFrZUFycmF5KG4uc2xpZGVzKS5yZXZlcnNlKCksbi5zbGlkZXM9JChhKSxuLmNvbnRhaW5lci5lbXB0eSgpLmFwcGVuZChuLnNsaWRlcykpKSxuLnZhcnMuYW5pbWF0aW9uTG9vcCYmIXYmJihuLmNsb25lQ291bnQ9MixuLmNsb25lT2Zmc2V0PTEsXCJpbml0XCIhPT1lJiZuLmNvbnRhaW5lci5maW5kKFwiLmNsb25lXCIpLnJlbW92ZSgpLG4uY29udGFpbmVyLmFwcGVuZChmLnVuaXF1ZUlEKG4uc2xpZGVzLmZpcnN0KCkuY2xvbmUoKS5hZGRDbGFzcyhcImNsb25lXCIpKS5hdHRyKFwiYXJpYS1oaWRkZW5cIixcInRydWVcIikpLnByZXBlbmQoZi51bmlxdWVJRChuLnNsaWRlcy5sYXN0KCkuY2xvbmUoKS5hZGRDbGFzcyhcImNsb25lXCIpKS5hdHRyKFwiYXJpYS1oaWRkZW5cIixcInRydWVcIikpKSxuLm5ld1NsaWRlcz0kKG4udmFycy5zZWxlY3RvcixuKSx0PXU/bi5jb3VudC0xLW4uY3VycmVudFNsaWRlK24uY2xvbmVPZmZzZXQ6bi5jdXJyZW50U2xpZGUrbi5jbG9uZU9mZnNldCxkJiYhdj8obi5jb250YWluZXIuaGVpZ2h0KDIwMCoobi5jb3VudCtuLmNsb25lQ291bnQpK1wiJVwiKS5jc3MoXCJwb3NpdGlvblwiLFwiYWJzb2x1dGVcIikud2lkdGgoXCIxMDAlXCIpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtuLm5ld1NsaWRlcy5jc3Moe2Rpc3BsYXk6XCJibG9ja1wifSksbi5kb01hdGgoKSxuLnZpZXdwb3J0LmhlaWdodChuLmgpLG4uc2V0UHJvcHModCpuLmgsXCJpbml0XCIpfSxcImluaXRcIj09PWU/MTAwOjApKToobi5jb250YWluZXIud2lkdGgoMjAwKihuLmNvdW50K24uY2xvbmVDb3VudCkrXCIlXCIpLG4uc2V0UHJvcHModCpuLmNvbXB1dGVkVyxcImluaXRcIiksc2V0VGltZW91dChmdW5jdGlvbigpe24uZG9NYXRoKCksbi5uZXdTbGlkZXMuY3NzKHt3aWR0aDpuLmNvbXB1dGVkVyxtYXJnaW5SaWdodDpuLmNvbXB1dGVkTSxcImZsb2F0XCI6XCJsZWZ0XCIsZGlzcGxheTpcImJsb2NrXCJ9KSxuLnZhcnMuc21vb3RoSGVpZ2h0JiZmLnNtb290aEhlaWdodCgpfSxcImluaXRcIj09PWU/MTAwOjApKX12fHxuLnNsaWRlcy5yZW1vdmVDbGFzcyhpK1wiYWN0aXZlLXNsaWRlXCIpLmVxKG4uY3VycmVudFNsaWRlKS5hZGRDbGFzcyhpK1wiYWN0aXZlLXNsaWRlXCIpLG4udmFycy5pbml0KG4pfSxuLmRvTWF0aD1mdW5jdGlvbigpe3ZhciBlPW4uc2xpZGVzLmZpcnN0KCksdD1uLnZhcnMuaXRlbU1hcmdpbixhPW4udmFycy5taW5JdGVtcyxpPW4udmFycy5tYXhJdGVtcztuLnc9dm9pZCAwPT09bi52aWV3cG9ydD9uLndpZHRoKCk6bi52aWV3cG9ydC53aWR0aCgpLG4uaD1lLmhlaWdodCgpLG4uYm94UGFkZGluZz1lLm91dGVyV2lkdGgoKS1lLndpZHRoKCksdj8obi5pdGVtVD1uLnZhcnMuaXRlbVdpZHRoK3Qsbi5pdGVtTT10LG4ubWluVz1hP2Eqbi5pdGVtVDpuLncsbi5tYXhXPWk/aSpuLml0ZW1ULXQ6bi53LG4uaXRlbVc9bi5taW5XPm4udz8obi53LXQqKGEtMSkpL2E6bi5tYXhXPG4udz8obi53LXQqKGktMSkpL2k6bi52YXJzLml0ZW1XaWR0aD5uLnc/bi53Om4udmFycy5pdGVtV2lkdGgsbi52aXNpYmxlPU1hdGguZmxvb3Iobi53L24uaXRlbVcpLG4ubW92ZT1uLnZhcnMubW92ZT4wJiZuLnZhcnMubW92ZTxuLnZpc2libGU/bi52YXJzLm1vdmU6bi52aXNpYmxlLG4ucGFnaW5nQ291bnQ9TWF0aC5jZWlsKChuLmNvdW50LW4udmlzaWJsZSkvbi5tb3ZlKzEpLG4ubGFzdD1uLnBhZ2luZ0NvdW50LTEsbi5saW1pdD0xPT09bi5wYWdpbmdDb3VudD8wOm4udmFycy5pdGVtV2lkdGg+bi53P24uaXRlbVcqKG4uY291bnQtMSkrdCoobi5jb3VudC0xKToobi5pdGVtVyt0KSpuLmNvdW50LW4udy10KToobi5pdGVtVz1uLncsbi5pdGVtTT10LG4ucGFnaW5nQ291bnQ9bi5jb3VudCxuLmxhc3Q9bi5jb3VudC0xKSxuLmNvbXB1dGVkVz1uLml0ZW1XLW4uYm94UGFkZGluZyxuLmNvbXB1dGVkTT1uLml0ZW1NfSxuLnVwZGF0ZT1mdW5jdGlvbihlLHQpe24uZG9NYXRoKCksdnx8KGU8bi5jdXJyZW50U2xpZGU/bi5jdXJyZW50U2xpZGUrPTE6ZTw9bi5jdXJyZW50U2xpZGUmJjAhPT1lJiYobi5jdXJyZW50U2xpZGUtPTEpLG4uYW5pbWF0aW5nVG89bi5jdXJyZW50U2xpZGUpLG4udmFycy5jb250cm9sTmF2JiYhbi5tYW51YWxDb250cm9scyYmKFwiYWRkXCI9PT10JiYhdnx8bi5wYWdpbmdDb3VudD5uLmNvbnRyb2xOYXYubGVuZ3RoP2YuY29udHJvbE5hdi51cGRhdGUoXCJhZGRcIik6KFwicmVtb3ZlXCI9PT10JiYhdnx8bi5wYWdpbmdDb3VudDxuLmNvbnRyb2xOYXYubGVuZ3RoKSYmKHYmJm4uY3VycmVudFNsaWRlPm4ubGFzdCYmKG4uY3VycmVudFNsaWRlLT0xLG4uYW5pbWF0aW5nVG8tPTEpLGYuY29udHJvbE5hdi51cGRhdGUoXCJyZW1vdmVcIixuLmxhc3QpKSksbi52YXJzLmRpcmVjdGlvbk5hdiYmZi5kaXJlY3Rpb25OYXYudXBkYXRlKCl9LG4uYWRkU2xpZGU9ZnVuY3Rpb24oZSx0KXt2YXIgYT0kKGUpO24uY291bnQrPTEsbi5sYXN0PW4uY291bnQtMSxkJiZ1P3ZvaWQgMCE9PXQ/bi5zbGlkZXMuZXEobi5jb3VudC10KS5hZnRlcihhKTpuLmNvbnRhaW5lci5wcmVwZW5kKGEpOnZvaWQgMCE9PXQ/bi5zbGlkZXMuZXEodCkuYmVmb3JlKGEpOm4uY29udGFpbmVyLmFwcGVuZChhKSxuLnVwZGF0ZSh0LFwiYWRkXCIpLG4uc2xpZGVzPSQobi52YXJzLnNlbGVjdG9yK1wiOm5vdCguY2xvbmUpXCIsbiksbi5zZXR1cCgpLG4udmFycy5hZGRlZChuKX0sbi5yZW1vdmVTbGlkZT1mdW5jdGlvbihlKXt2YXIgdD1pc05hTihlKT9uLnNsaWRlcy5pbmRleCgkKGUpKTplO24uY291bnQtPTEsbi5sYXN0PW4uY291bnQtMSxpc05hTihlKT8kKGUsbi5zbGlkZXMpLnJlbW92ZSgpOmQmJnU/bi5zbGlkZXMuZXEobi5sYXN0KS5yZW1vdmUoKTpuLnNsaWRlcy5lcShlKS5yZW1vdmUoKSxuLmRvTWF0aCgpLG4udXBkYXRlKHQsXCJyZW1vdmVcIiksbi5zbGlkZXM9JChuLnZhcnMuc2VsZWN0b3IrXCI6bm90KC5jbG9uZSlcIixuKSxuLnNldHVwKCksbi52YXJzLnJlbW92ZWQobil9LGYuaW5pdCgpfSwkKHdpbmRvdykuYmx1cihmdW5jdGlvbih0KXtlPSExfSkuZm9jdXMoZnVuY3Rpb24odCl7ZT0hMH0pLCQuZmxleHNsaWRlci5kZWZhdWx0cz17bmFtZXNwYWNlOlwiZmxleC1cIixzZWxlY3RvcjpcIi5zbGlkZXMgPiBsaVwiLGFuaW1hdGlvbjpcImZhZGVcIixlYXNpbmc6XCJzd2luZ1wiLGRpcmVjdGlvbjpcImhvcml6b250YWxcIixyZXZlcnNlOiExLGFuaW1hdGlvbkxvb3A6ITAsc21vb3RoSGVpZ2h0OiExLHN0YXJ0QXQ6MCxzbGlkZXNob3c6ITAsc2xpZGVzaG93U3BlZWQ6N2UzLGFuaW1hdGlvblNwZWVkOjYwMCxpbml0RGVsYXk6MCxyYW5kb21pemU6ITEsZmFkZUZpcnN0U2xpZGU6ITAsdGh1bWJDYXB0aW9uczohMSxwYXVzZU9uQWN0aW9uOiEwLHBhdXNlT25Ib3ZlcjohMSxwYXVzZUludmlzaWJsZTohMCx1c2VDU1M6ITAsdG91Y2g6ITAsdmlkZW86ITEsY29udHJvbE5hdjohMCxkaXJlY3Rpb25OYXY6ITAscHJldlRleHQ6XCJQcmV2aW91c1wiLG5leHRUZXh0OlwiTmV4dFwiLGtleWJvYXJkOiEwLG11bHRpcGxlS2V5Ym9hcmQ6ITEsbW91c2V3aGVlbDohMSxwYXVzZVBsYXk6ITEscGF1c2VUZXh0OlwiUGF1c2VcIixwbGF5VGV4dDpcIlBsYXlcIixjb250cm9sc0NvbnRhaW5lcjpcIlwiLG1hbnVhbENvbnRyb2xzOlwiXCIsY3VzdG9tRGlyZWN0aW9uTmF2OlwiXCIsc3luYzpcIlwiLGFzTmF2Rm9yOlwiXCIsaXRlbVdpZHRoOjAsaXRlbU1hcmdpbjowLG1pbkl0ZW1zOjEsbWF4SXRlbXM6MCxtb3ZlOjAsYWxsb3dPbmVTbGlkZTohMCxzdGFydDpmdW5jdGlvbigpe30sYmVmb3JlOmZ1bmN0aW9uKCl7fSxhZnRlcjpmdW5jdGlvbigpe30sZW5kOmZ1bmN0aW9uKCl7fSxhZGRlZDpmdW5jdGlvbigpe30scmVtb3ZlZDpmdW5jdGlvbigpe30saW5pdDpmdW5jdGlvbigpe319LCQuZm4uZmxleHNsaWRlcj1mdW5jdGlvbihlKXtpZih2b2lkIDA9PT1lJiYoZT17fSksXCJvYmplY3RcIj09dHlwZW9mIGUpcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciB0PSQodGhpcyksYT1lLnNlbGVjdG9yP2Uuc2VsZWN0b3I6XCIuc2xpZGVzID4gbGlcIixuPXQuZmluZChhKTsxPT09bi5sZW5ndGgmJmUuYWxsb3dPbmVTbGlkZT09PSEwfHwwPT09bi5sZW5ndGg/KG4uZmFkZUluKDQwMCksZS5zdGFydCYmZS5zdGFydCh0KSk6dm9pZCAwPT09dC5kYXRhKFwiZmxleHNsaWRlclwiKSYmbmV3ICQuZmxleHNsaWRlcih0aGlzLGUpfSk7dmFyIHQ9JCh0aGlzKS5kYXRhKFwiZmxleHNsaWRlclwiKTtzd2l0Y2goZSl7Y2FzZVwicGxheVwiOnQucGxheSgpO2JyZWFrO2Nhc2VcInBhdXNlXCI6dC5wYXVzZSgpO2JyZWFrO2Nhc2VcInN0b3BcIjp0LnN0b3AoKTticmVhaztjYXNlXCJuZXh0XCI6dC5mbGV4QW5pbWF0ZSh0LmdldFRhcmdldChcIm5leHRcIiksITApO2JyZWFrO2Nhc2VcInByZXZcIjpjYXNlXCJwcmV2aW91c1wiOnQuZmxleEFuaW1hdGUodC5nZXRUYXJnZXQoXCJwcmV2XCIpLCEwKTticmVhaztkZWZhdWx0OlwibnVtYmVyXCI9PXR5cGVvZiBlJiZ0LmZsZXhBbmltYXRlKGUsITApfX19KGpRdWVyeSk7IiwiIWZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYixlKXt0aGlzLnJlZ2V4PS9eKC4qKShcXGQpKyQvaSx0aGlzLmVsZW09Yix0aGlzLiRlbGVtPWEoYiksdGhpcy5lbGVtQ2xhc3M9YytcIi13cmFwXCIsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGUmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBlLmxpbWl0JiZlLmxpbWl0PjAmJihlLm1heGltdW09ZS5saW1pdCksdGhpcy5jb25maWc9YS5leHRlbmQoe30sZCxlKSx0aGlzLmNsb25lcz10aGlzLiRlbGVtLmNsb3Nlc3RDaGlsZCh0aGlzLmNvbmZpZy5jbG9uZVRoaXMpLHRoaXMuaW5pdCgpfXZhciBjPVwiY2xvbmV5YVwiLGQ9e2Nsb25lVGhpczpcIi50b2Nsb25lXCIsY2xvbmVCdXR0b246XCIuY2xvbmVcIixkZWxldGVCdXR0b246XCIuZGVsZXRlXCIsY2xvbmVQb3NpdGlvbjpcImFmdGVyXCIsbWluaW11bToxLG1heGltdW06OTk5LHZhbHVlQ2xvbmU6ITEsZGF0YUNsb25lOiExLGRlZXBDbG9uZTohMSxzZXJpYWxpemVJRDohMCxpZ25vcmU6XCJsYWJlbC5lcnJvclwiLHByZXNlcnZlQ2hpbGRDb3VudDohMX07Yi5wcm90b3R5cGU9e2luaXQ6ZnVuY3Rpb24oKXt2YXIgYj10aGlzO2IuJGVsZW0uYWRkQ2xhc3MoYi5lbGVtQ2xhc3MpLGIuY2xvbmVzLmFkZENsYXNzKGMpLGIuY2xvbmVzLmRhdGEoXCJpbml0aWFsQ291bnRcIixiLmNsb25lcy5sZW5ndGgpLGIuJGVsZW0ub24oXCJjbGljay5cIitjLGIuY29uZmlnLmNsb25lVGhpcytcIj5cIitiLmNvbmZpZy5jbG9uZUJ1dHRvbixmdW5jdGlvbihkKXtkLnByZXZlbnREZWZhdWx0KCksZC5zdG9wUHJvcGFnYXRpb24oKTt2YXIgZT1hKHRoaXMpLmNsb3Nlc3QoYi5jb25maWcuY2xvbmVUaGlzKTtiLiRlbGVtLnRyaWdnZXJBbGwoXCJjbG9uZV9jbG9uZSBjbG9uZS5cIitjLFtlXSl9KSxiLiRlbGVtLm9uKFwiY2xvbmUuXCIrYyxmdW5jdGlvbihhLGMpe2IuX2Nsb25lQW5kQXBwZW5kKGMpfSksYi4kZWxlbS5vbihcImNsaWNrLlwiK2MsYi5jb25maWcuY2xvbmVUaGlzK1wiPlwiK2IuY29uZmlnLmRlbGV0ZUJ1dHRvbixmdW5jdGlvbihkKXtkLnByZXZlbnREZWZhdWx0KCksZC5zdG9wUHJvcGFnYXRpb24oKTt2YXIgZT1hKHRoaXMpLmNsb3Nlc3QoYi5jb25maWcuY2xvbmVUaGlzKTtiLiRlbGVtLnRyaWdnZXJBbGwoXCJjbG9uZV9kZWxldGUgZGVsZXRlLlwiK2MsW2VdKX0pLGIuJGVsZW0ub24oXCJkZWxldGUuXCIrYyxmdW5jdGlvbihkLGUpe3ZhciBmPWUuY2xvc2VzdChcIi5cIitiLmVsZW1DbGFzcykuY2xvc2VzdENoaWxkKGIuY29uZmlnLmNsb25lVGhpcykubGVuZ3RoO2Y+Yi5jb25maWcubWluaW11bT8oYi4kZWxlbS50cmlnZ2VyQWxsKFwiY2xvbmVfYmVmb3JlX2RlbGV0ZSBiZWZvcmVfZGVsZXRlLlwiK2MsW2UsZl0pLGIuJGVsZW0udHJpZ2dlckhhbmRsZXIoXCJyZW1vdmUuXCIrYyxbZV0pLGIuJGVsZW0udHJpZ2dlckFsbChcImNsb25lX2FmdGVyX2RlbGV0ZSBhZnRlcl9kZWxldGUuXCIrYykpOihiLiRlbGVtLnRyaWdnZXJIYW5kbGVyKFwibWluaW11bS5cIitjLGIuY29uZmlnLm1pbmltdW0sW2VdKSxlLmZpbmQoXCJpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdFwiKS5lYWNoKGZ1bmN0aW9uKCl7Yi5fY2xlYXJGb3JtKGEodGhpcykpfSkpfSksYi4kZWxlbS5vbihcInJlbW92ZS5cIitjLGZ1bmN0aW9uKGIsYyl7YShjKS5yZW1vdmUoKX0pfSxfY2xlYW46ZnVuY3Rpb24oKXt2YXIgYT10aGlzO2EuJGVsZW0ucmVtb3ZlQ2xhc3MoYytcIi13cmFwXCIpLGEuY2xvbmVzLnJlbW92ZUNsYXNzKGMpLGEuJGVsZW0ub2ZmKFwiY2xpY2suXCIrYyxhLmNvbmZpZy5jbG9uZVRoaXMrXCI+XCIrYS5jb25maWcuY2xvbmVCdXR0b24pLGEuJGVsZW0ub2ZmKFwiY2xpY2suXCIrYyxhLmNvbmZpZy5jbG9uZVRoaXMrXCI+XCIrYS5jb25maWcuZGVsZXRlQnV0dG9uKSxhLiRlbGVtLm9mZihcImNsb25lX2Nsb25lIGNsb25lX2RlbGV0ZSBjbG9uZV9iZWZvcmVfZGVsZXRlIGNsb25lLlwiK2MrXCIgZGVsZXRlLlwiK2MrXCIgYmVmb3JlX2RlbGV0ZS5cIitjKX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMuX2NsZWFuKCksdGhpcy4kZWxlbS5yZW1vdmVEYXRhKGMpfSxnZXRPcHRpb246ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb25maWd9LHNldE9wdGlvbjpmdW5jdGlvbihiKXthLmV4dGVuZCh0aGlzLmNvbmZpZyxifHx7fSksdGhpcy5fY2xlYW4oKSx0aGlzLmluaXQoKX0sX2Nsb25lQW5kQXBwZW5kOmZ1bmN0aW9uKGEpe3ZhciBiPWEuY2xvc2VzdChcIi5cIit0aGlzLmVsZW1DbGFzcykuY2xvc2VzdENoaWxkKHRoaXMuY29uZmlnLmNsb25lVGhpcykubGVuZ3RoO2lmKGI8dGhpcy5jb25maWcubWF4aW11bSl7dGhpcy4kZWxlbS50cmlnZ2VyQWxsKFwiY2xvbmVfYmVmb3JlX2Nsb25lIGJlZm9yZV9jbG9uZS5cIitjLFthXSk7dmFyIGQ9dGhpcy5fY2xvbmVJdGVtKGEpO3RoaXMuJGVsZW0udHJpZ2dlckFsbChcImNsb25lX2FmdGVyX2Nsb25lIGFmdGVyX2Nsb25lLlwiK2MsW2EsZF0pLHRoaXMuY2xvbmVzLmFkZChkKSx0aGlzLiRlbGVtLnRyaWdnZXJBbGwoXCJjbG9uZV9iZWZvcmVfYXBwZW5kIGJlZm9yZV9hcHBlbmQuXCIrYyxbYSxkXSksXCJhZnRlclwiIT09dGhpcy5jb25maWcuY2xvbmVQb3NpdGlvbj9hLmJlZm9yZShkKTphLmFmdGVyKGQpLHRoaXMuY29uZmlnLmlnbm9yZSYmZC5maW5kKHRoaXMuY29uZmlnLmlnbm9yZSkucmVtb3ZlKCksdGhpcy5fcmVkb0lEcygpLHRoaXMuJGVsZW0udHJpZ2dlckFsbChcImNsb25lX2FmdGVyX2FwcGVuZCBhZnRlcl9hcHBlbmQuXCIrYyxbYSxkXSl9ZWxzZSB0aGlzLiRlbGVtLnRyaWdnZXJBbGwoXCJjbG9uZV9saW1pdCBtYXhpbXVtLlwiK2MsdGhpcy5jb25maWcubWF4aW11bSxbYV0pfSxfY2xvbmVJdGVtOmZ1bmN0aW9uKGIpe3ZhciBkPXRoaXMsZT1iLmNsb25lKGQuY29uZmlnLmRhdGFDbG9uZSxkLmNvbmZpZy5kZWVwQ2xvbmUpO2lmKGQuY29uZmlnLnByZXNlcnZlQ2hpbGRDb3VudCE9PSExKXt2YXIgZj1iLmZpbmQoXCIuXCIrYytcIi13cmFwXCIpO2UuZmluZChcIi5cIitjK1wiLXdyYXBcIikuZWFjaChmdW5jdGlvbihiKXt2YXIgZD1hKHRoaXMpLmNsb3Nlc3RDaGlsZChcIi5cIitjKSxlPWEoZltiXSkuY2xvc2VzdENoaWxkKFwiLlwiK2MpLGc9ZS5kYXRhKFwiaW5pdGlhbENvdW50XCIpLGg9ZC5zbGljZShnLGQubGVuZ3RoKTtoLnJlbW92ZSgpLGQuZGF0YShcImluaXRpYWwtY291bnRcIixnKX0pfXJldHVybiBlLmZpbmQoXCJpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdFwiKS5lYWNoKGZ1bmN0aW9uKCl7ZC5fY2xlYXJGb3JtKGEodGhpcykpLGQuJGVsZW0udHJpZ2dlckFsbChcImNsb25lX2Zvcm1faW5wdXQgZm9ybV9pbnB1dC5cIitjLFthKHRoaXMpLGIsZV0pfSksZX0sX2NsZWFyRm9ybTpmdW5jdGlvbihhKXt0aGlzLmNvbmZpZy52YWx1ZUNsb25lfHxhLmhhc0NsYXNzKFwibm9FbXB0eVwiKXx8KGEuaXMoXCI6Y2hlY2tib3hcIil8fGEuaXMoXCI6cmFkaW9cIik/YS5wcm9wKFwiY2hlY2tlZFwiLCExKTphLnZhbChcIlwiKSl9LF9yZWRvSURzOmZ1bmN0aW9uKCl7dmFyIGI9dGhpcztpZihiLmNvbmZpZy5zZXJpYWxpemVJRD09PSEwKXt2YXIgYz1iLiRlbGVtLmZpbmQoYi5jb25maWcuY2xvbmVUaGlzKS5maXJzdCgpLmF0dHIoXCJpZFwiKTtiLiRlbGVtLmZpbmQoYi5jb25maWcuY2xvbmVUaGlzKS5lYWNoKGZ1bmN0aW9uKGQpe3ZhciBlO2U9MCE9PWQ/ZDpcIlwiLGEodGhpcykuYXR0cihcImlkXCIpJiZhKHRoaXMpLmF0dHIoXCJpZFwiLGMrZSk7dmFyIGYsZzthKHRoaXMpLmZpbmQoXCIqXCIpLmVhY2goZnVuY3Rpb24oKXtpZihmPWEodGhpcykuYXR0cihcImlkXCIpKXt2YXIgYz1mLm1hdGNoKGIucmVnZXgpO2MmJjM9PT1jLmxlbmd0aD8oZz1mLnJlcGxhY2UoL1xcZCskLyxcIlwiKStlLGEodGhpcykuYXR0cihcImlkXCIsZykpOihnPWYrZSxhKHRoaXMpLmF0dHIoXCJpZFwiLGcpKX1pZihhKHRoaXMpLmNsb3Nlc3QoYi5jb25maWcuY2xvbmVUaGlzKS5maW5kKFwibGFiZWxbZm9yPSdcIitmK1wiJ11cIikuYXR0cihcImZvclwiLGcpLGIuY29uZmlnLnNlcmlhbGl6ZUluZGV4KXt2YXIgaD1hKHRoaXMpLmF0dHIoXCJuYW1lXCIpO2lmKGgpe3ZhciBpPWgubWF0Y2goL1xcWyhbXn1dKylcXF0vKTtpZihpJiZpLmxlbmd0aD49MSl7dmFyIGo9aDtoPVtdLm1hcC5jYWxsKGosZnVuY3Rpb24oYSxiKXtyZXR1cm4gaXNOYU4oK2EpfHxcIltcIiE9PWpbYi0xXXx8XCJdXCIhPT1qW2IrMV0/YTpkfSkuam9pbihcIlwiKSxhKHRoaXMpLmF0dHIoXCJuYW1lXCIsaCl9fX19KX0pfX19LGEuZm5bY109ZnVuY3Rpb24oZCl7dmFyIGU9YXJndW1lbnRzO2lmKHZvaWQgMD09PWR8fFwib2JqZWN0XCI9PXR5cGVvZiBkKXJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXthLmRhdGEodGhpcyxjKXx8YS5kYXRhKHRoaXMsYyxuZXcgYih0aGlzLGQpKX0pO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBkJiZcIl9cIiE9PWRbMF0mJlwiaW5pdFwiIT09ZCl7aWYoMD09PUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUsMSkubGVuZ3RoJiYtMSE9PWEuaW5BcnJheShkLGEuZm5bY10uZ2V0dGVycykpe3ZhciBmPWEuZGF0YSh0aGlzWzBdLGMpO3JldHVybiBmW2RdLmFwcGx5KGYsQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSwxKSl9cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBmPWEuZGF0YSh0aGlzLGMpO2YgaW5zdGFuY2VvZiBiJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBmW2RdJiZmW2RdLmFwcGx5KGYsQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSwxKSl9KX19LGEuZm5bY10uZ2V0dGVycz1bXCJnZXRPcHRpb25cIl0sYS5mbi5jbG9zZXN0Q2hpbGQ9ZnVuY3Rpb24oYil7dmFyIGMsZDtyZXR1cm4gYz10aGlzLmNoaWxkcmVuKCksMD09PWMubGVuZ3RoP2EoKTooZD1jLmZpbHRlcihiKSxkLmxlbmd0aD4wP2Q6Yy5jbG9zZXN0Q2hpbGQoYikpfSxhLmZuLmV4dGVuZCh7dHJpZ2dlckFsbDpmdW5jdGlvbihhLGIpe3ZhciBjLGQ9dGhpcyxlPWEuc3BsaXQoXCIgXCIpO2ZvcihjPTA7YzxlLmxlbmd0aDtjKz0xKWQudHJpZ2dlckhhbmRsZXIoZVtjXSxiKTtyZXR1cm4gZH19KX0oalF1ZXJ5KTtcbiIsIi8qIVxuICogcGFyYWxsYXguanMgdjEuNC4yIChodHRwOi8vcGl4ZWxjb2cuZ2l0aHViLmlvL3BhcmFsbGF4LmpzLylcbiAqIEBjb3B5cmlnaHQgMjAxNiBQaXhlbENvZywgSW5jLlxuICogQGxpY2Vuc2UgTUlUIChodHRwczovL2dpdGh1Yi5jb20vcGl4ZWxjb2cvcGFyYWxsYXguanMvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqL1xuIWZ1bmN0aW9uKHQsaSxlLHMpe2Z1bmN0aW9uIG8oaSxlKXt2YXIgaD10aGlzO1wib2JqZWN0XCI9PXR5cGVvZiBlJiYoZGVsZXRlIGUucmVmcmVzaCxkZWxldGUgZS5yZW5kZXIsdC5leHRlbmQodGhpcyxlKSksdGhpcy4kZWxlbWVudD10KGkpLCF0aGlzLmltYWdlU3JjJiZ0aGlzLiRlbGVtZW50LmlzKFwiaW1nXCIpJiYodGhpcy5pbWFnZVNyYz10aGlzLiRlbGVtZW50LmF0dHIoXCJzcmNcIikpO3ZhciByPSh0aGlzLnBvc2l0aW9uK1wiXCIpLnRvTG93ZXJDYXNlKCkubWF0Y2goL1xcUysvZyl8fFtdO2lmKHIubGVuZ3RoPDEmJnIucHVzaChcImNlbnRlclwiKSwxPT1yLmxlbmd0aCYmci5wdXNoKHJbMF0pLChcInRvcFwiPT1yWzBdfHxcImJvdHRvbVwiPT1yWzBdfHxcImxlZnRcIj09clsxXXx8XCJyaWdodFwiPT1yWzFdKSYmKHI9W3JbMV0sclswXV0pLHRoaXMucG9zaXRpb25YIT1zJiYoclswXT10aGlzLnBvc2l0aW9uWC50b0xvd2VyQ2FzZSgpKSx0aGlzLnBvc2l0aW9uWSE9cyYmKHJbMV09dGhpcy5wb3NpdGlvblkudG9Mb3dlckNhc2UoKSksaC5wb3NpdGlvblg9clswXSxoLnBvc2l0aW9uWT1yWzFdLFwibGVmdFwiIT10aGlzLnBvc2l0aW9uWCYmXCJyaWdodFwiIT10aGlzLnBvc2l0aW9uWCYmKHRoaXMucG9zaXRpb25YPWlzTmFOKHBhcnNlSW50KHRoaXMucG9zaXRpb25YKSk/XCJjZW50ZXJcIjpwYXJzZUludCh0aGlzLnBvc2l0aW9uWCkpLFwidG9wXCIhPXRoaXMucG9zaXRpb25ZJiZcImJvdHRvbVwiIT10aGlzLnBvc2l0aW9uWSYmKHRoaXMucG9zaXRpb25ZPWlzTmFOKHBhcnNlSW50KHRoaXMucG9zaXRpb25ZKSk/XCJjZW50ZXJcIjpwYXJzZUludCh0aGlzLnBvc2l0aW9uWSkpLHRoaXMucG9zaXRpb249dGhpcy5wb3NpdGlvblgrKGlzTmFOKHRoaXMucG9zaXRpb25YKT9cIlwiOlwicHhcIikrXCIgXCIrdGhpcy5wb3NpdGlvblkrKGlzTmFOKHRoaXMucG9zaXRpb25ZKT9cIlwiOlwicHhcIiksbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGlQb2R8aVBob25lfGlQYWQpLykpcmV0dXJuIHRoaXMuaW1hZ2VTcmMmJnRoaXMuaW9zRml4JiYhdGhpcy4kZWxlbWVudC5pcyhcImltZ1wiKSYmdGhpcy4kZWxlbWVudC5jc3Moe2JhY2tncm91bmRJbWFnZTpcInVybChcIit0aGlzLmltYWdlU3JjK1wiKVwiLGJhY2tncm91bmRTaXplOlwiY292ZXJcIixiYWNrZ3JvdW5kUG9zaXRpb246dGhpcy5wb3NpdGlvbn0pLHRoaXM7aWYobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKEFuZHJvaWQpLykpcmV0dXJuIHRoaXMuaW1hZ2VTcmMmJnRoaXMuYW5kcm9pZEZpeCYmIXRoaXMuJGVsZW1lbnQuaXMoXCJpbWdcIikmJnRoaXMuJGVsZW1lbnQuY3NzKHtiYWNrZ3JvdW5kSW1hZ2U6XCJ1cmwoXCIrdGhpcy5pbWFnZVNyYytcIilcIixiYWNrZ3JvdW5kU2l6ZTpcImNvdmVyXCIsYmFja2dyb3VuZFBvc2l0aW9uOnRoaXMucG9zaXRpb259KSx0aGlzO3RoaXMuJG1pcnJvcj10KFwiPGRpdiAvPlwiKS5wcmVwZW5kVG8oXCJib2R5XCIpO3ZhciBhPXRoaXMuJGVsZW1lbnQuZmluZChcIj4ucGFyYWxsYXgtc2xpZGVyXCIpLG49ITE7MD09YS5sZW5ndGg/dGhpcy4kc2xpZGVyPXQoXCI8aW1nIC8+XCIpLnByZXBlbmRUbyh0aGlzLiRtaXJyb3IpOih0aGlzLiRzbGlkZXI9YS5wcmVwZW5kVG8odGhpcy4kbWlycm9yKSxuPSEwKSx0aGlzLiRtaXJyb3IuYWRkQ2xhc3MoXCJwYXJhbGxheC1taXJyb3JcIikuY3NzKHt2aXNpYmlsaXR5OlwiaGlkZGVuXCIsekluZGV4OnRoaXMuekluZGV4LHBvc2l0aW9uOlwiZml4ZWRcIix0b3A6MCxsZWZ0OjAsb3ZlcmZsb3c6XCJoaWRkZW5cIn0pLHRoaXMuJHNsaWRlci5hZGRDbGFzcyhcInBhcmFsbGF4LXNsaWRlclwiKS5vbmUoXCJsb2FkXCIsZnVuY3Rpb24oKXtoLm5hdHVyYWxIZWlnaHQmJmgubmF0dXJhbFdpZHRofHwoaC5uYXR1cmFsSGVpZ2h0PXRoaXMubmF0dXJhbEhlaWdodHx8dGhpcy5oZWlnaHR8fDEsaC5uYXR1cmFsV2lkdGg9dGhpcy5uYXR1cmFsV2lkdGh8fHRoaXMud2lkdGh8fDEpLGguYXNwZWN0UmF0aW89aC5uYXR1cmFsV2lkdGgvaC5uYXR1cmFsSGVpZ2h0LG8uaXNTZXR1cHx8by5zZXR1cCgpLG8uc2xpZGVycy5wdXNoKGgpLG8uaXNGcmVzaD0hMSxvLnJlcXVlc3RSZW5kZXIoKX0pLG58fCh0aGlzLiRzbGlkZXJbMF0uc3JjPXRoaXMuaW1hZ2VTcmMpLCh0aGlzLm5hdHVyYWxIZWlnaHQmJnRoaXMubmF0dXJhbFdpZHRofHx0aGlzLiRzbGlkZXJbMF0uY29tcGxldGV8fGEubGVuZ3RoPjApJiZ0aGlzLiRzbGlkZXIudHJpZ2dlcihcImxvYWRcIil9ZnVuY3Rpb24gaChzKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGg9dCh0aGlzKSxyPVwib2JqZWN0XCI9PXR5cGVvZiBzJiZzO3RoaXM9PWl8fHRoaXM9PWV8fGguaXMoXCJib2R5XCIpP28uY29uZmlndXJlKHIpOmguZGF0YShcInB4LnBhcmFsbGF4XCIpP1wib2JqZWN0XCI9PXR5cGVvZiBzJiZ0LmV4dGVuZChoLmRhdGEoXCJweC5wYXJhbGxheFwiKSxyKToocj10LmV4dGVuZCh7fSxoLmRhdGEoKSxyKSxoLmRhdGEoXCJweC5wYXJhbGxheFwiLG5ldyBvKHRoaXMscikpKSxcInN0cmluZ1wiPT10eXBlb2YgcyYmKFwiZGVzdHJveVwiPT1zP28uZGVzdHJveSh0aGlzKTpvW3NdKCkpfSl9IWZ1bmN0aW9uKCl7Zm9yKHZhciB0PTAsZT1bXCJtc1wiLFwibW96XCIsXCJ3ZWJraXRcIixcIm9cIl0scz0wO3M8ZS5sZW5ndGgmJiFpLnJlcXVlc3RBbmltYXRpb25GcmFtZTsrK3MpaS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU9aVtlW3NdK1wiUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdLGkuY2FuY2VsQW5pbWF0aW9uRnJhbWU9aVtlW3NdK1wiQ2FuY2VsQW5pbWF0aW9uRnJhbWVcIl18fGlbZVtzXStcIkNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZVwiXTtpLnJlcXVlc3RBbmltYXRpb25GcmFtZXx8KGkucmVxdWVzdEFuaW1hdGlvbkZyYW1lPWZ1bmN0aW9uKGUpe3ZhciBzPShuZXcgRGF0ZSkuZ2V0VGltZSgpLG89TWF0aC5tYXgoMCwxNi0ocy10KSksaD1pLnNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKHMrbyl9LG8pO3JldHVybiB0PXMrbyxofSksaS5jYW5jZWxBbmltYXRpb25GcmFtZXx8KGkuY2FuY2VsQW5pbWF0aW9uRnJhbWU9ZnVuY3Rpb24odCl7Y2xlYXJUaW1lb3V0KHQpfSl9KCksdC5leHRlbmQoby5wcm90b3R5cGUse3NwZWVkOi4yLGJsZWVkOjAsekluZGV4Oi0xMDAsaW9zRml4OiEwLGFuZHJvaWRGaXg6ITAscG9zaXRpb246XCJjZW50ZXJcIixvdmVyU2Nyb2xsRml4OiExLHJlZnJlc2g6ZnVuY3Rpb24oKXt0aGlzLmJveFdpZHRoPXRoaXMuJGVsZW1lbnQub3V0ZXJXaWR0aCgpLHRoaXMuYm94SGVpZ2h0PXRoaXMuJGVsZW1lbnQub3V0ZXJIZWlnaHQoKSsyKnRoaXMuYmxlZWQsdGhpcy5ib3hPZmZzZXRUb3A9dGhpcy4kZWxlbWVudC5vZmZzZXQoKS50b3AtdGhpcy5ibGVlZCx0aGlzLmJveE9mZnNldExlZnQ9dGhpcy4kZWxlbWVudC5vZmZzZXQoKS5sZWZ0LHRoaXMuYm94T2Zmc2V0Qm90dG9tPXRoaXMuYm94T2Zmc2V0VG9wK3RoaXMuYm94SGVpZ2h0O3ZhciB0PW8ud2luSGVpZ2h0LGk9by5kb2NIZWlnaHQsZT1NYXRoLm1pbih0aGlzLmJveE9mZnNldFRvcCxpLXQpLHM9TWF0aC5tYXgodGhpcy5ib3hPZmZzZXRUb3ArdGhpcy5ib3hIZWlnaHQtdCwwKSxoPXRoaXMuYm94SGVpZ2h0KyhlLXMpKigxLXRoaXMuc3BlZWQpfDAscj0odGhpcy5ib3hPZmZzZXRUb3AtZSkqKDEtdGhpcy5zcGVlZCl8MDtpZihoKnRoaXMuYXNwZWN0UmF0aW8+PXRoaXMuYm94V2lkdGgpe3RoaXMuaW1hZ2VXaWR0aD1oKnRoaXMuYXNwZWN0UmF0aW98MCx0aGlzLmltYWdlSGVpZ2h0PWgsdGhpcy5vZmZzZXRCYXNlVG9wPXI7dmFyIGE9dGhpcy5pbWFnZVdpZHRoLXRoaXMuYm94V2lkdGg7dGhpcy5vZmZzZXRMZWZ0PVwibGVmdFwiPT10aGlzLnBvc2l0aW9uWD8wOlwicmlnaHRcIj09dGhpcy5wb3NpdGlvblg/LWE6aXNOYU4odGhpcy5wb3NpdGlvblgpPy1hLzJ8MDpNYXRoLm1heCh0aGlzLnBvc2l0aW9uWCwtYSl9ZWxzZXt0aGlzLmltYWdlV2lkdGg9dGhpcy5ib3hXaWR0aCx0aGlzLmltYWdlSGVpZ2h0PXRoaXMuYm94V2lkdGgvdGhpcy5hc3BlY3RSYXRpb3wwLHRoaXMub2Zmc2V0TGVmdD0wO3ZhciBhPXRoaXMuaW1hZ2VIZWlnaHQtaDt0aGlzLm9mZnNldEJhc2VUb3A9XCJ0b3BcIj09dGhpcy5wb3NpdGlvblk/cjpcImJvdHRvbVwiPT10aGlzLnBvc2l0aW9uWT9yLWE6aXNOYU4odGhpcy5wb3NpdGlvblkpP3ItYS8yfDA6citNYXRoLm1heCh0aGlzLnBvc2l0aW9uWSwtYSl9fSxyZW5kZXI6ZnVuY3Rpb24oKXt2YXIgdD1vLnNjcm9sbFRvcCxpPW8uc2Nyb2xsTGVmdCxlPXRoaXMub3ZlclNjcm9sbEZpeD9vLm92ZXJTY3JvbGw6MCxzPXQrby53aW5IZWlnaHQ7dGhpcy5ib3hPZmZzZXRCb3R0b20+dCYmdGhpcy5ib3hPZmZzZXRUb3A8PXM/KHRoaXMudmlzaWJpbGl0eT1cInZpc2libGVcIix0aGlzLm1pcnJvclRvcD10aGlzLmJveE9mZnNldFRvcC10LHRoaXMubWlycm9yTGVmdD10aGlzLmJveE9mZnNldExlZnQtaSx0aGlzLm9mZnNldFRvcD10aGlzLm9mZnNldEJhc2VUb3AtdGhpcy5taXJyb3JUb3AqKDEtdGhpcy5zcGVlZCkpOnRoaXMudmlzaWJpbGl0eT1cImhpZGRlblwiLHRoaXMuJG1pcnJvci5jc3Moe3RyYW5zZm9ybTpcInRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpXCIsdmlzaWJpbGl0eTp0aGlzLnZpc2liaWxpdHksdG9wOnRoaXMubWlycm9yVG9wLWUsbGVmdDp0aGlzLm1pcnJvckxlZnQsaGVpZ2h0OnRoaXMuYm94SGVpZ2h0LHdpZHRoOnRoaXMuYm94V2lkdGh9KSx0aGlzLiRzbGlkZXIuY3NzKHt0cmFuc2Zvcm06XCJ0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KVwiLHBvc2l0aW9uOlwiYWJzb2x1dGVcIix0b3A6dGhpcy5vZmZzZXRUb3AsbGVmdDp0aGlzLm9mZnNldExlZnQsaGVpZ2h0OnRoaXMuaW1hZ2VIZWlnaHQsd2lkdGg6dGhpcy5pbWFnZVdpZHRoLG1heFdpZHRoOlwibm9uZVwifSl9fSksdC5leHRlbmQobyx7c2Nyb2xsVG9wOjAsc2Nyb2xsTGVmdDowLHdpbkhlaWdodDowLHdpbldpZHRoOjAsZG9jSGVpZ2h0OjE8PDMwLGRvY1dpZHRoOjE8PDMwLHNsaWRlcnM6W10saXNSZWFkeTohMSxpc0ZyZXNoOiExLGlzQnVzeTohMSxzZXR1cDpmdW5jdGlvbigpe2lmKCF0aGlzLmlzUmVhZHkpe3ZhciBzPXQoZSksaD10KGkpLHI9ZnVuY3Rpb24oKXtvLndpbkhlaWdodD1oLmhlaWdodCgpLG8ud2luV2lkdGg9aC53aWR0aCgpLG8uZG9jSGVpZ2h0PXMuaGVpZ2h0KCksby5kb2NXaWR0aD1zLndpZHRoKCl9LGE9ZnVuY3Rpb24oKXt2YXIgdD1oLnNjcm9sbFRvcCgpLGk9by5kb2NIZWlnaHQtby53aW5IZWlnaHQsZT1vLmRvY1dpZHRoLW8ud2luV2lkdGg7by5zY3JvbGxUb3A9TWF0aC5tYXgoMCxNYXRoLm1pbihpLHQpKSxvLnNjcm9sbExlZnQ9TWF0aC5tYXgoMCxNYXRoLm1pbihlLGguc2Nyb2xsTGVmdCgpKSksby5vdmVyU2Nyb2xsPU1hdGgubWF4KHQtaSxNYXRoLm1pbih0LDApKX07aC5vbihcInJlc2l6ZS5weC5wYXJhbGxheCBsb2FkLnB4LnBhcmFsbGF4XCIsZnVuY3Rpb24oKXtyKCksby5pc0ZyZXNoPSExLG8ucmVxdWVzdFJlbmRlcigpfSkub24oXCJzY3JvbGwucHgucGFyYWxsYXggbG9hZC5weC5wYXJhbGxheFwiLGZ1bmN0aW9uKCl7YSgpLG8ucmVxdWVzdFJlbmRlcigpfSkscigpLGEoKSx0aGlzLmlzUmVhZHk9ITB9fSxjb25maWd1cmU6ZnVuY3Rpb24oaSl7XCJvYmplY3RcIj09dHlwZW9mIGkmJihkZWxldGUgaS5yZWZyZXNoLGRlbGV0ZSBpLnJlbmRlcix0LmV4dGVuZCh0aGlzLnByb3RvdHlwZSxpKSl9LHJlZnJlc2g6ZnVuY3Rpb24oKXt0LmVhY2godGhpcy5zbGlkZXJzLGZ1bmN0aW9uKCl7dGhpcy5yZWZyZXNoKCl9KSx0aGlzLmlzRnJlc2g9ITB9LHJlbmRlcjpmdW5jdGlvbigpe3RoaXMuaXNGcmVzaHx8dGhpcy5yZWZyZXNoKCksdC5lYWNoKHRoaXMuc2xpZGVycyxmdW5jdGlvbigpe3RoaXMucmVuZGVyKCl9KX0scmVxdWVzdFJlbmRlcjpmdW5jdGlvbigpe3ZhciB0PXRoaXM7dGhpcy5pc0J1c3l8fCh0aGlzLmlzQnVzeT0hMCxpLnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe3QucmVuZGVyKCksdC5pc0J1c3k9ITF9KSl9LGRlc3Ryb3k6ZnVuY3Rpb24oZSl7dmFyIHMsaD10KGUpLmRhdGEoXCJweC5wYXJhbGxheFwiKTtmb3IoaC4kbWlycm9yLnJlbW92ZSgpLHM9MDtzPHRoaXMuc2xpZGVycy5sZW5ndGg7cys9MSl0aGlzLnNsaWRlcnNbc109PWgmJnRoaXMuc2xpZGVycy5zcGxpY2UocywxKTt0KGUpLmRhdGEoXCJweC5wYXJhbGxheFwiLCExKSwwPT09dGhpcy5zbGlkZXJzLmxlbmd0aCYmKHQoaSkub2ZmKFwic2Nyb2xsLnB4LnBhcmFsbGF4IHJlc2l6ZS5weC5wYXJhbGxheCBsb2FkLnB4LnBhcmFsbGF4XCIpLHRoaXMuaXNSZWFkeT0hMSxvLmlzU2V0dXA9ITEpfX0pO3ZhciByPXQuZm4ucGFyYWxsYXg7dC5mbi5wYXJhbGxheD1oLHQuZm4ucGFyYWxsYXguQ29uc3RydWN0b3I9byx0LmZuLnBhcmFsbGF4Lm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gdC5mbi5wYXJhbGxheD1yLHRoaXN9LHQoZSkub24oXCJyZWFkeS5weC5wYXJhbGxheC5kYXRhLWFwaVwiLGZ1bmN0aW9uKCl7dCgnW2RhdGEtcGFyYWxsYXg9XCJzY3JvbGxcIl0nKS5wYXJhbGxheCgpfSl9KGpRdWVyeSx3aW5kb3csZG9jdW1lbnQpO1xuIiwiLyoqXG4gKiBuYXZpZ2F0aW9uLmpzXG4gKlxuICogSGFuZGxlcyB0b2dnbGluZyB0aGUgbmF2aWdhdGlvbiBtZW51IGZvciBzbWFsbCBzY3JlZW5zIGFuZCBlbmFibGVzIHRhYlxuICogc3VwcG9ydCBmb3IgZHJvcGRvd24gbWVudXMuXG4gKi9cbiggZnVuY3Rpb24oKSB7XG5cdHZhciBjb250YWluZXIsIGJ1dHRvbiwgbWVudSwgbGlua3MsIHN1Yk1lbnVzO1xuXG5cdGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnc2l0ZS1uYXZpZ2F0aW9uJyApO1xuXHRpZiAoICEgY29udGFpbmVyICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGJ1dHRvbiA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSggJ2J1dHRvbicgKVswXTtcblx0aWYgKCAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIGJ1dHRvbiApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRtZW51ID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCAndWwnIClbMF07XG5cblx0Ly8gSGlkZSBtZW51IHRvZ2dsZSBidXR0b24gaWYgbWVudSBpcyBlbXB0eSBhbmQgcmV0dXJuIGVhcmx5LlxuXHRpZiAoICd1bmRlZmluZWQnID09PSB0eXBlb2YgbWVudSApIHtcblx0XHRidXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRyZXR1cm47XG5cdH1cblxuXHRtZW51LnNldEF0dHJpYnV0ZSggJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnICk7XG5cdGlmICggLTEgPT09IG1lbnUuY2xhc3NOYW1lLmluZGV4T2YoICduYXYtbWVudScgKSApIHtcblx0XHRtZW51LmNsYXNzTmFtZSArPSAnIG5hdi1tZW51Jztcblx0fVxuXG5cdGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCAtMSAhPT0gY29udGFpbmVyLmNsYXNzTmFtZS5pbmRleE9mKCAndG9nZ2xlZCcgKSApIHtcblx0XHRcdGNvbnRhaW5lci5jbGFzc05hbWUgPSBjb250YWluZXIuY2xhc3NOYW1lLnJlcGxhY2UoICcgdG9nZ2xlZCcsICcnICk7XG5cdFx0XHRidXR0b24uc2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcsICdmYWxzZScgKTtcblx0XHRcdG1lbnUuc2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcsICdmYWxzZScgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29udGFpbmVyLmNsYXNzTmFtZSArPSAnIHRvZ2dsZWQnO1xuXHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSggJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScgKTtcblx0XHRcdG1lbnUuc2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcsICd0cnVlJyApO1xuXHRcdH1cblx0fTtcblxuXHQvLyBHZXQgYWxsIHRoZSBsaW5rIGVsZW1lbnRzIHdpdGhpbiB0aGUgbWVudS5cblx0bGlua3MgICAgPSBtZW51LmdldEVsZW1lbnRzQnlUYWdOYW1lKCAnYScgKTtcblx0c3ViTWVudXMgPSBtZW51LmdldEVsZW1lbnRzQnlUYWdOYW1lKCAndWwnICk7XG5cblx0Ly8gU2V0IG1lbnUgaXRlbXMgd2l0aCBzdWJtZW51cyB0byBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiLlxuXHRmb3IgKCB2YXIgaSA9IDAsIGxlbiA9IHN1Yk1lbnVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdHN1Yk1lbnVzW2ldLnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKCAnYXJpYS1oYXNwb3B1cCcsICd0cnVlJyApO1xuXHR9XG5cblx0Ly8gRWFjaCB0aW1lIGEgbWVudSBsaW5rIGlzIGZvY3VzZWQgb3IgYmx1cnJlZCwgdG9nZ2xlIGZvY3VzLlxuXHRmb3IgKCBpID0gMCwgbGVuID0gbGlua3MubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0bGlua3NbaV0uYWRkRXZlbnRMaXN0ZW5lciggJ2ZvY3VzJywgdG9nZ2xlRm9jdXMsIHRydWUgKTtcblx0XHRsaW5rc1tpXS5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsIHRvZ2dsZUZvY3VzLCB0cnVlICk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0cyBvciByZW1vdmVzIC5mb2N1cyBjbGFzcyBvbiBhbiBlbGVtZW50LlxuXHQgKi9cblx0ZnVuY3Rpb24gdG9nZ2xlRm9jdXMoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0Ly8gTW92ZSB1cCB0aHJvdWdoIHRoZSBhbmNlc3RvcnMgb2YgdGhlIGN1cnJlbnQgbGluayB1bnRpbCB3ZSBoaXQgLm5hdi1tZW51LlxuXHRcdHdoaWxlICggLTEgPT09IHNlbGYuY2xhc3NOYW1lLmluZGV4T2YoICduYXYtbWVudScgKSApIHtcblxuXHRcdFx0Ly8gT24gbGkgZWxlbWVudHMgdG9nZ2xlIHRoZSBjbGFzcyAuZm9jdXMuXG5cdFx0XHRpZiAoICdsaScgPT09IHNlbGYudGFnTmFtZS50b0xvd2VyQ2FzZSgpICkge1xuXHRcdFx0XHRpZiAoIC0xICE9PSBzZWxmLmNsYXNzTmFtZS5pbmRleE9mKCAnZm9jdXMnICkgKSB7XG5cdFx0XHRcdFx0c2VsZi5jbGFzc05hbWUgPSBzZWxmLmNsYXNzTmFtZS5yZXBsYWNlKCAnIGZvY3VzJywgJycgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzZWxmLmNsYXNzTmFtZSArPSAnIGZvY3VzJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRzZWxmID0gc2VsZi5wYXJlbnRFbGVtZW50O1xuXHRcdH1cblx0fVxufSApKCk7XG4iLCIvKlxuKiBQb3Rmb2xpb1xuKi9cblxuZnVuY3Rpb24gaW5pdCgpIFxue1xuXHQvKlxuXHQqIENyZWF0ZSBsaW5rc1xuXHQqIEBPYmo6IGFyZzEgbmFtZSwgYXJnMiwgdXJsXG5cdCovXG5cblx0dmFyIHNfYUVsZW1lbnRzID0ge1xuXHRcdCdCbG9nZyc6ICcjJyxcblx0XHQnQ3YnIDogJyNDdidcblx0fTtcblx0XG5cdGZvciAodmFyIGkgaW4gc19hRWxlbWVudHMpIHtcblxuXHRcdHZhciBjX29FbGVMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cdFx0dmFyIGNfb0VsZUEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0dmFyIGNfb1RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpKTtcblx0XHRcblx0XHRjX29FbGVBLnNldEF0dHJpYnV0ZSgnaHJlZicsIHNfYUVsZW1lbnRzW2ldKTtcblx0XHRjX29FbGVBLnNldEF0dHJpYnV0ZSgnaWQnLCBpKTtcblx0XHRjX29FbGVBLmFwcGVuZENoaWxkKGNfb1RleHQpO1xuXHRcdGNfb0VsZUxpLmFwcGVuZENoaWxkKGNfb0VsZUEpO1xuXHRcdFxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51JykuYXBwZW5kQ2hpbGQoY19vRWxlTGkpO1xuXHRcblx0fVxuXG59XG5cbi8qXG4qIFRhcmdldCBsaW5rXG4qL1xuXG5mdW5jdGlvbiBpbml0U21vb3RoU2Nyb2xsaW5nKCkge1xuICAgIGlmIChpc0Nzc1Ntb290aFNDcm9sbFN1cHBvcnRlZCgpKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjc3Mtc3VwcG9ydC1tc2cnKS5jbGFzc05hbWUgPSAnc3VwcG9ydGVkJztcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZHVyYXRpb24gPSA0MDA7XG4gICAgdmFyIHBhZ2VVcmwgPSBsb2NhdGlvbi5oYXNoXG4gICAgICAgID8gc3RyaXBIYXNoKGxvY2F0aW9uLmhyZWYpXG4gICAgICAgIDogbG9jYXRpb24uaHJlZlxuICAgIDtcbiAgICBcbiAgICBkZWxlZ2F0ZWRMaW5rSGlqYWNraW5nKCk7XG4gICAgLy9kaXJlY3RMaW5rSGlqYWNraW5nKCk7XG4gICAgXG4gICAgZnVuY3Rpb24gZGVsZWdhdGVkTGlua0hpamFja2luZygpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2ssIGZhbHNlKTtcbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuICAgICAgICAgICAgaWYgKCFpc0luUGFnZUxpbmsoZS50YXJnZXQpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAganVtcChlLnRhcmdldC5oYXNoLCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Rm9jdXMoZS50YXJnZXQuaGFzaCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXJlY3RMaW5rSGlqYWNraW5nKCkge1xuICAgICAgICBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKSlcbiAgICAgICAgICAgIC5maWx0ZXIoaXNJblBhZ2VMaW5rKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24oYSkgeyBhLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljaywgZmFsc2UpOyB9KVxuICAgICAgICA7XG4gICAgICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBqdW1wKGUudGFyZ2V0Lmhhc2gsIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzSW5QYWdlTGluayhuKSB7XG4gICAgICAgIHJldHVybiBuLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnIFxuICAgICAgICAgICAgJiYgbi5oYXNoLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICYmIHN0cmlwSGFzaChuLmhyZWYpID09PSBwYWdlVXJsXG4gICAgICAgIDtcbiAgICB9XG4gICAgICAgIFxuICAgIGZ1bmN0aW9uIHN0cmlwSGFzaCh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHVybC5zbGljZSgwLCB1cmwubGFzdEluZGV4T2YoJyMnKSk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGlzQ3NzU21vb3RoU0Nyb2xsU3VwcG9ydGVkKCkge1xuICAgICAgICByZXR1cm4gJ3Njcm9sbEJlaGF2aW9yJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG4gICAgfVxuXG4gICAgLy8gQWRhcHRlZCBmcm9tOlxuICAgIC8vIGh0dHBzOi8vd3d3Lm5jem9ubGluZS5uZXQvYmxvZy8yMDEzLzAxLzE1L2ZpeGluZy1za2lwLXRvLWNvbnRlbnQtbGlua3MvXG4gICAgZnVuY3Rpb24gc2V0Rm9jdXMoaGFzaCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2guc3Vic3RyaW5nKDEpKTtcblxuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKCEvXig/OmF8c2VsZWN0fGlucHV0fGJ1dHRvbnx0ZXh0YXJlYSkkL2kudGVzdChlbGVtZW50LnRhZ05hbWUpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC50YWJJbmRleCA9IC0xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qXG4qIFNtb290aCBzY3JvbGxpbmdcbiovXG5cbmZ1bmN0aW9uIGp1bXAodGFyZ2V0LCBvcHRpb25zKSB7XG4gICAgdmFyIFxuICAgICAgICBzdGFydCA9IHdpbmRvdy5wYWdlWU9mZnNldCxcbiAgICAgICAgb3B0ID0ge1xuICAgICAgICAgICAgZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXG4gICAgICAgICAgICBvZmZzZXQ6IG9wdGlvbnMub2Zmc2V0IHx8IDAsXG4gICAgICAgICAgICBjYWxsYmFjazogb3B0aW9ucy5jYWxsYmFjayxcbiAgICAgICAgICAgIGVhc2luZzogb3B0aW9ucy5lYXNpbmcgfHwgZWFzZUluT3V0UXVhZFxuICAgICAgICB9LFxuICAgICAgICBkaXN0YW5jZSA9IHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IG9wdC5vZmZzZXQgKyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wXG4gICAgICAgICAgICA6IHRhcmdldCxcbiAgICAgICAgZHVyYXRpb24gPSB0eXBlb2Ygb3B0LmR1cmF0aW9uID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IG9wdC5kdXJhdGlvbihkaXN0YW5jZSlcbiAgICAgICAgICAgIDogb3B0LmR1cmF0aW9uLFxuICAgICAgICB0aW1lU3RhcnQsIHRpbWVFbGFwc2VkXG4gICAgO1xuICAgIFxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbih0aW1lKSB7IHRpbWVTdGFydCA9IHRpbWU7IGxvb3AodGltZSk7IH0pO1xuICAgIFxuICAgIGZ1bmN0aW9uIGxvb3AodGltZSkge1xuICAgICAgICB0aW1lRWxhcHNlZCA9IHRpbWUgLSB0aW1lU3RhcnQ7XG5cbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIG9wdC5lYXNpbmcodGltZUVsYXBzZWQsIHN0YXJ0LCBkaXN0YW5jZSwgZHVyYXRpb24pKTtcblxuICAgICAgICBpZiAodGltZUVsYXBzZWQgPCBkdXJhdGlvbilcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBlbmQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmQoKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzdGFydCArIGRpc3RhbmNlKTtcblxuICAgICAgICBpZiAodHlwZW9mIG9wdC5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIG9wdC5jYWxsYmFjaygpO1xuICAgIH1cbiAgICBcbiAgICAvLyBSb2JlcnQgUGVubmVyJ3MgZWFzZUluT3V0UXVhZCAtIGh0dHA6Ly9yb2JlcnRwZW5uZXIuY29tL2Vhc2luZy9cbiAgICBmdW5jdGlvbiBlYXNlSW5PdXRRdWFkKHQsIGIsIGMsIGQpICB7XG4gICAgICAgIHQgLz0gZCAvIDJcbiAgICAgICAgaWYodCA8IDEpIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYlxuICAgICAgICB0LS1cbiAgICAgICAgcmV0dXJuIC1jIC8gMiAqICh0ICogKHQgLSAyKSAtIDEpICsgYlxuICAgIH1cbiBcbn1cblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cdGluaXRTbW9vdGhTY3JvbGxpbmcoKTtcblx0aW5pdCgpO1xuXHRjb25zb2xlLmxvZygpO1xuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkN2XCIpLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICBcdFx0d2luZG93Lm9wZW4oXG4gIFx0XHRcdCdodHRwOi8vJyt3aW5kb3cubG9jYXRpb24uaG9zdCsnL1BvcnRmb2xpby93cC1jb250ZW50L3VwbG9hZHMvMjAxNi8wOS9Qb250dXMuUGV0dGVyc3Nvbi5Ddl8ucGRmJywgJ19ibGFuaydcblx0XHQpLmZvY3VzKCk7XG5cdH07XG4gICAgXG4gICAgdmFyIG9Gb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9vdGVyXCIpLm9mZnNldEhlaWdodDtcbiAgICBcbiAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHVzaCcpLmNsaWVudEhlaWdodCA8PSBvRm9vdGVyKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwdXNoJykuc3R5bGUuaGVpZ2h0ID0gb0Zvb3RlcioyKydweCc7XG4gICAgfVxuXG4gICAgdmFyIG9Qcm9qZWt0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNtaW5hLXByb2pla3QgYVwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9Qcm9qZWt0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG9Qcm9qZWt0W2ldLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xuICAgIH1cbiAgICAgIFxuXG59KTtcbiIsIjsoZnVuY3Rpb24oJCl7XG4gICAgXG52YXIgY2xfbmF2LFxuICAgIGNsX25hdk91dGVySGVpZ2h0O1xuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpIHtcbiAgICAvL1widXNlIHN0cmljdFwiO1xuXG4gICAgLy8gU21vb3RoIHNjcm9sbCB0byBpbm5lciBsaW5rc1xuXG4gICAgalF1ZXJ5KCcuaW5uZXItbGluaycpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGhyZWYgPSBqUXVlcnkodGhpcykuYXR0cignaHJlZicpO1xuICAgICAgICBpZihocmVmLmNoYXJBdCgwKSAhPT0gXCIjXCIpe1xuICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLnJlbW92ZUNsYXNzKCdpbm5lci1saW5rJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGpRdWVyeSgnLmlubmVyLWxpbmsnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICBqUXVlcnkoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8vIEFwcGVuZCAuYmFja2dyb3VuZC1pbWFnZS1ob2xkZXIgPGltZz4ncyBhcyBDU1MgYmFja2dyb3VuZHNcblxuICAgIGpRdWVyeSgnLmJhY2tncm91bmQtaW1hZ2UtaG9sZGVyJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGltZ1NyYyA9IGpRdWVyeSh0aGlzKS5jaGlsZHJlbignaW1nJykuYXR0cignc3JjJyk7XG4gICAgICAgIGpRdWVyeSh0aGlzKS5jc3MoJ2JhY2tncm91bmQnLCAndXJsKFwiJyArIGltZ1NyYyArICdcIiknKTtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLmNoaWxkcmVuKCdpbWcnKS5oaWRlKCk7XG4gICAgICAgIGpRdWVyeSh0aGlzKS5jc3MoJ2JhY2tncm91bmQtcG9zaXRpb24nLCAnaW5pdGlhbCcpO1xuICAgIH0pO1xuXG4gICAgLy8gRmFkZSBpbiBiYWNrZ3JvdW5kIGltYWdlc1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgalF1ZXJ5KCcuYmFja2dyb3VuZC1pbWFnZS1ob2xkZXInKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLmFkZENsYXNzKCdmYWRlSW4nKTtcbiAgICAgICAgfSk7XG4gICAgfSwgMjAwKTtcblxuICAgIFxuICAgIC8vIEZpeCBuYXYgdG8gdG9wIHdoaWxlIHNjcm9sbGluZ1xuXG4gICAgY2xfbmF2ID0gJCgnYm9keSAubmF2LWNvbnRhaW5lciBuYXY6Zmlyc3QnKTtcbiAgICBjbF9uYXZPdXRlckhlaWdodCA9ICQoJ2JvZHkgLm5hdi1jb250YWluZXIgbmF2OmZpcnN0Jykub3V0ZXJIZWlnaHQoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB1cGRhdGVOYXYsIGZhbHNlKTtcbiAgICB1cGRhdGVOYXYoKTtcbiAgICBcbiAgICBcbiAgICAvLyBNZW51IGRyb3Bkb3duIHBvc2l0aW9uaW5nXG5cbiAgICAkKCcubWVudSA+IGxpID4gdWwnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWVudSA9ICQodGhpcykub2Zmc2V0KCk7XG4gICAgICAgIHZhciBmYXJSaWdodCA9IG1lbnUubGVmdCArICQodGhpcykub3V0ZXJXaWR0aCh0cnVlKTtcbiAgICAgICAgaWYgKGZhclJpZ2h0ID4gJCh3aW5kb3cpLndpZHRoKCkgJiYgISQodGhpcykuaGFzQ2xhc3MoJ21lZ2EtbWVudScpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdtYWtlLXJpZ2h0Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZmFyUmlnaHQgPiAkKHdpbmRvdykud2lkdGgoKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdtZWdhLW1lbnUnKSkge1xuICAgICAgICAgICAgdmFyIGlzT25TY3JlZW4gPSAkKHdpbmRvdykud2lkdGgoKSAtIG1lbnUubGVmdDtcbiAgICAgICAgICAgIHZhciBkaWZmZXJlbmNlID0gJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpIC0gaXNPblNjcmVlbjtcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdtYXJnaW4tbGVmdCcsIC0oZGlmZmVyZW5jZSkpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBNb2JpbGUgTWVudVxuXG4gICAgJCgnLm1vYmlsZS10b2dnbGUnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLm5hdi1iYXInKS50b2dnbGVDbGFzcygnbmF2LW9wZW4nKTtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQoJy5zZWFyY2gtd2lkZ2V0LWhhbmRsZScpLnRvZ2dsZUNsYXNzKCdoaWRkZW4teHMgaGlkZGVuLXNtJyk7XG4gICAgfSk7XG5cbiAgICAkKCcubWVudSBsaScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCFlKSBlID0gd2luZG93LmV2ZW50O1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCd1bCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygndG9nZ2xlLXN1YicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcudG9nZ2xlLXN1YicpLnJlbW92ZUNsYXNzKCd0b2dnbGUtc3ViJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJy5tZW51IGxpIGEnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lubmVyLWxpbmsnKSl7XG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5uYXYtYmFyJykucmVtb3ZlQ2xhc3MoJ25hdi1vcGVuJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJy5tb2R1bGUud2lkZ2V0LWhhbmRsZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCd0b2dnbGUtc2VhcmNoJyk7XG4gICAgfSk7XG4gICAgXG4gICAgJCgnLnNlYXJjaC13aWRnZXQtaGFuZGxlIC5zZWFyY2gtZm9ybSBpbnB1dCcpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZiAoIWUpIGUgPSB3aW5kb3cuZXZlbnQ7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICAvLyBJbWFnZSBTbGlkZXJzXG4gICAgJCgnLnNsaWRlci1hbGwtY29udHJvbHMnKS5mbGV4c2xpZGVyKHtcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKHNsaWRlcil7XG4gICAgICAgICAgICBpZihzbGlkZXIuZmluZCgnLnNsaWRlcyBsaTpmaXJzdC1jaGlsZCcpLmZpbmQoJy5mcy12aWQtYmFja2dyb3VuZCB2aWRlbycpLmxlbmd0aCl7XG4gICAgICAgICAgICAgICBzbGlkZXIuZmluZCgnLnNsaWRlcyBsaTpmaXJzdC1jaGlsZCcpLmZpbmQoJy5mcy12aWQtYmFja2dyb3VuZCB2aWRlbycpLmdldCgwKS5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFmdGVyOiBmdW5jdGlvbihzbGlkZXIpe1xuICAgICAgICAgICAgaWYoc2xpZGVyLmZpbmQoJy5mcy12aWQtYmFja2dyb3VuZCB2aWRlbycpLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgaWYoc2xpZGVyLmZpbmQoJ2xpOm5vdCguZmxleC1hY3RpdmUtc2xpZGUpJykuZmluZCgnLmZzLXZpZC1iYWNrZ3JvdW5kIHZpZGVvJykubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLmZpbmQoJ2xpOm5vdCguZmxleC1hY3RpdmUtc2xpZGUpJykuZmluZCgnLmZzLXZpZC1iYWNrZ3JvdW5kIHZpZGVvJykuZ2V0KDApLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNsaWRlci5maW5kKCcuZmxleC1hY3RpdmUtc2xpZGUnKS5maW5kKCcuZnMtdmlkLWJhY2tncm91bmQgdmlkZW8nKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXIuZmluZCgnLmZsZXgtYWN0aXZlLXNsaWRlJykuZmluZCgnLmZzLXZpZC1iYWNrZ3JvdW5kIHZpZGVvJykuZ2V0KDApLnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkKCcuc2xpZGVyLXBhZ2luZy1jb250cm9scycpLmZsZXhzbGlkZXIoe1xuICAgICAgICBhbmltYXRpb246IFwic2xpZGVcIixcbiAgICAgICAgZGlyZWN0aW9uTmF2OiBmYWxzZVxuICAgIH0pO1xuICAgICQoJy5zbGlkZXItYXJyb3ctY29udHJvbHMnKS5mbGV4c2xpZGVyKHtcbiAgICAgICAgY29udHJvbE5hdjogZmFsc2VcbiAgICB9KTtcbiAgICAkKCcuc2xpZGVyLXRodW1iLWNvbnRyb2xzIC5zbGlkZXMgbGknKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaW1nU3JjID0gJCh0aGlzKS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKTtcbiAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLXRodW1iJywgaW1nU3JjKTtcbiAgICB9KTtcbiAgICAkKCcuc2xpZGVyLXRodW1iLWNvbnRyb2xzJykuZmxleHNsaWRlcih7XG4gICAgICAgIGFuaW1hdGlvbjogXCJzbGlkZVwiLFxuICAgICAgICBjb250cm9sTmF2OiBcInRodW1ibmFpbHNcIixcbiAgICAgICAgZGlyZWN0aW9uTmF2OiB0cnVlXG4gICAgfSk7XG4gICAgJCgnLmxvZ28tY2Fyb3VzZWwnKS5mbGV4c2xpZGVyKHtcbiAgICAgICAgbWluSXRlbXM6IDEsXG4gICAgICAgIG1heEl0ZW1zOiA0LFxuICAgICAgICBtb3ZlOiAxLFxuICAgICAgICBpdGVtV2lkdGg6IDIwMCxcbiAgICAgICAgaXRlbU1hcmdpbjogMCxcbiAgICAgICAgYW5pbWF0aW9uOiBcInNsaWRlXCIsXG4gICAgICAgIHNsaWRlc2hvdzogdHJ1ZSxcbiAgICAgICAgc2xpZGVzaG93U3BlZWQ6IDMwMDAsXG4gICAgICAgIGRpcmVjdGlvbk5hdjogZmFsc2UsXG4gICAgICAgIGNvbnRyb2xOYXY6IGZhbHNlXG4gICAgfSk7XG5cbiAgICAvLyBMaWdodGJveCBnYWxsZXJ5IHRpdGxlc1xuICAgICQoJy5saWdodGJveC1ncmlkIGxpIGEnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBnYWxsZXJ5VGl0bGUgPSAkKHRoaXMpLmNsb3Nlc3QoJy5saWdodGJveC1ncmlkJykuYXR0cignZGF0YS1nYWxsZXJ5LXRpdGxlJyk7XG4gICAgICAgICQodGhpcykuYXR0cignZGF0YS1saWdodGJveCcsIGdhbGxlcnlUaXRsZSk7XG4gICAgfSk7XG5cbn0pO1xuXG5qUXVlcnkod2luZG93KS5sb2FkKGZ1bmN0aW9uKCQpIHtcbiAgIC8vIFwidXNlIHN0cmljdFwiO1xuXG4gICAvLyBSZXNldHRpbmcgdGVzdGltb25pYWwgcGFyYWxsYXggaGVpZ2h0XG4gICBpZiggalF1ZXJ5KCcudGVzdGltb25pYWwtc2VjdGlvbicpLmxlbmd0aCAhPSAwICl7XG4gICAgIHRlc3RpbW9uaWFsSGVpZ2h0KCk7XG4gICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgdGVzdGltb25pYWxIZWlnaHQoKTsgfSwgMzAwMCk7XG4gICB9XG5cbiAgICAvLyBJbml0aWFsaXplIE1hc29ucnlcblxuICAgIGlmIChqUXVlcnkoJy5tYXNvbnJ5JykubGVuZ3RoICYmIHR5cGVvZiBNYXNvbnJ5ICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFzb25yeScpO1xuICAgICAgICB2YXIgbXNucnkgPSBuZXcgTWFzb25yeShjb250YWluZXIsIHtcbiAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjogJy5tYXNvbnJ5LWl0ZW0nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1zbnJ5Lm9uKCdsYXlvdXRDb21wbGV0ZScsIGZ1bmN0aW9uKCQpIHtcblxuICAgICAgICAgICAgY2xfZmlyc3RTZWN0aW9uSGVpZ2h0ID0galF1ZXJ5KCcubWFpbi1jb250YWluZXIgc2VjdGlvbjpudGgtb2YtdHlwZSgxKScpLm91dGVySGVpZ2h0KHRydWUpO1xuXG4gICAgICAgICAgICAvLyBGaXggZmxvYXRpbmcgcHJvamVjdCBmaWx0ZXJzIHRvIGJvdHRvbSBvZiBwcm9qZWN0cyBjb250YWluZXJcblxuICAgICAgICAgICAgaWYgKGpRdWVyeSgnLmZpbHRlcnMuZmxvYXRpbmcnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzZXR1cEZsb2F0aW5nUHJvamVjdEZpbHRlcnMoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVGbG9hdGluZ0ZpbHRlcnMoKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB1cGRhdGVGbG9hdGluZ0ZpbHRlcnMsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgalF1ZXJ5KCcubWFzb25yeScpLmFkZENsYXNzKCdmYWRlSW4nKTtcbiAgICAgICAgICAgIGpRdWVyeSgnLm1hc29ucnktbG9hZGVyJykuYWRkQ2xhc3MoJ2ZhZGVPdXQnKTtcbiAgICAgICAgICAgIGlmIChqUXVlcnkoJy5tYXNvbnJ5Rmx5SW4nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBtYXNvbnJ5Rmx5SW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbXNucnkubGF5b3V0KCk7XG4gICAgfVxuICAgIC8vIE5hdmlnYXRpb24gaGVpZ2h0XG4gICAgY2xfZmlyc3RTZWN0aW9uSGVpZ2h0ID0galF1ZXJ5KCcubWFpbi1jb250YWluZXIgc2VjdGlvbjpudGgtb2YtdHlwZSgxKScpLm91dGVySGVpZ2h0KHRydWUpO1xuXG5cbn0pO1xuXG4vKiBGdW5jdGlvbiBUbyBcbiAqIGtlZXAgbWVudSBmaXhlZFxuICoqL1xuZnVuY3Rpb24gdXBkYXRlTmF2KCl7XG4gICAgaWYoICQod2luZG93KS5zY3JvbGxUb3AoKSA+IGNsX25hdk91dGVySGVpZ2h0ICl7Ly9pZiBocmVmID0gI2VsZW1lbnQgaWRcbiAgICAgICAgY2xfbmF2LmFkZENsYXNzKCdmaXhlZCBzY3JvbGxlZCcpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBjbF9uYXYucmVtb3ZlQ2xhc3MoJ2ZpeGVkIHNjcm9sbGVkJyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtYXNvbnJ5Rmx5SW4oKSB7XG4gICAgdmFyICRpdGVtcyA9IGpRdWVyeSgnLm1hc29ucnlGbHlJbiAubWFzb25yeS1pdGVtJyk7XG4gICAgdmFyIHRpbWUgPSAwO1xuXG4gICAgJGl0ZW1zLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpdGVtID0galF1ZXJ5KHRoaXMpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygnZmFkZUluJyk7XG4gICAgICAgIH0sIHRpbWUpO1xuICAgICAgICB0aW1lICs9IDE3MDtcbiAgICB9KTtcbn1cbn0pKGpRdWVyeSk7XG5cbi8qXG4gKiBSZXNldHRpbmcgdGVzdGltb25pYWwgcGFyYWxsYXggaGVpZ2h0XG4gKi9cbmZ1bmN0aW9uIHRlc3RpbW9uaWFsSGVpZ2h0KCl7XG4gIGpRdWVyeSgnLnRlc3RpbW9uaWFsLXNlY3Rpb24gLnBhcmFsbGF4LXdpbmRvdycpLmNzcygnaGVpZ2h0JywgalF1ZXJ5KCcudGVzdGltb25pYWwtc2VjdGlvbiAucGFyYWxsYXgtd2luZG93IC5jb250YWluZXInKS5vdXRlckhlaWdodCgpKzE1MCApO1xuICBqUXVlcnkod2luZG93KS50cmlnZ2VyKCdyZXNpemUnKS50cmlnZ2VyKCdzY3JvbGwnKTtcbn1cbiIsIi8qKlxuICogc2tpcC1saW5rLWZvY3VzLWZpeC5qc1xuICpcbiAqIEhlbHBzIHdpdGggYWNjZXNzaWJpbGl0eSBmb3Iga2V5Ym9hcmQgb25seSB1c2Vycy5cbiAqXG4gKiBMZWFybiBtb3JlOiBodHRwczovL2dpdC5pby92V2RyMlxuICovXG4oIGZ1bmN0aW9uKCkge1xuXHR2YXIgaXNfd2Via2l0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoICd3ZWJraXQnICkgPiAtMSxcblx0ICAgIGlzX29wZXJhICA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCAnb3BlcmEnICkgID4gLTEsXG5cdCAgICBpc19pZSAgICAgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZiggJ21zaWUnICkgICA+IC0xO1xuXG5cdGlmICggKCBpc193ZWJraXQgfHwgaXNfb3BlcmEgfHwgaXNfaWUgKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpZCA9IGxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKCAxICksXG5cdFx0XHRcdGVsZW1lbnQ7XG5cblx0XHRcdGlmICggISAoIC9eW0EtejAtOV8tXSskLy50ZXN0KCBpZCApICkgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuXG5cdFx0XHRpZiAoIGVsZW1lbnQgKSB7XG5cdFx0XHRcdGlmICggISAoIC9eKD86YXxzZWxlY3R8aW5wdXR8YnV0dG9ufHRleHRhcmVhKSQvaS50ZXN0KCBlbGVtZW50LnRhZ05hbWUgKSApICkge1xuXHRcdFx0XHRcdGVsZW1lbnQudGFiSW5kZXggPSAtMTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW1lbnQuZm9jdXMoKTtcblx0XHRcdH1cblx0XHR9LCBmYWxzZSApO1xuXHR9XG59KSgpO1xuIiwialF1ZXJ5KGRvY3VtZW50KS5yZWFkeSggZnVuY3Rpb24oJCkge1xuICBcbiAgLyogTWVkaWEgdXBsb2FkZXIgKi9cbiAgbWVkaWFfdXBsb2FkKCcuYnV0dG9uLmN1c3RvbV9tZWRpYV9idXR0b24uYnV0dG9uLXByaW1hcnknKTtcbiAgICBcbiAgLyogQ2xvbm5pbmcgb2YgTG9nbyBDbGllbnQgV2lkZ2V0cyAqL1xuICBqUXVlcnkoZG9jdW1lbnQpLm9uKCd3aWRnZXQtYWRkZWQnLCBmdW5jdGlvbihlLCB3aWRnZXQpe1xuICAgIHNoYXBlbHlTb3J0KCk7XG4gIH0pO1xuICBqUXVlcnkoZG9jdW1lbnQpLm9uKCd3aWRnZXQtdXBkYXRlZCcsIGZ1bmN0aW9uKGUsIHdpZGdldCl7XG4gICAgc2hhcGVseVNvcnQoKTtcbiAgfSk7XG4gIFxuICBcbiAgc2hhcGVseVNvcnQoKTsvKiBDbGllbnQgd2lkZ2V0IHNvcnRpbmcgYW5kIGNsb25pbmcqL1xuICBcbiAgLyogRm9udCBhd3NvbWUgc2VsZWN0b3IgKi9cbiAgalF1ZXJ5KCdzZWxlY3Quc2hhcGVseS1pY29uJykuY2hhbmdlKCBmdW5jdGlvbigpe1xuICAgIGpRdWVyeSh0aGlzKS5zaWJsaW5ncygnc3BhbicpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoJ2ZhICcgK2pRdWVyeSh0aGlzKS52YWwoKSk7Y29uc29sZS5sb2coalF1ZXJ5KHRoaXMpLnZhbCgpKTtcbiAgfSk7XG4gIFxuICAvKiBcbiAgICogRnVuY3Rpb24gZm9yIHNvcnRpbmdcbiAgICovXG4gIGZ1bmN0aW9uIHNoYXBlbHlTb3J0KCl7XG4gICAgICBqUXVlcnkoJy5jbGllbnQtc29ydGFibGUnKS5zb3J0YWJsZSh7XG4gICAgICAgICBoYW5kbGU6ICcubG9nb19oZWFkaW5nJyB9KVxuICAgICAgICAgLmJpbmQoICdzb3J0dXBkYXRlJywgZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG4gICAgICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgICAgIHZhciBhdHRybmFtZSA9IGpRdWVyeSh0aGlzKS5maW5kKCdpbnB1dDpmaXJzdCcpLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgdmFyIGF0dHJiYXNlID0gYXR0cm5hbWUuc3Vic3RyaW5nKDAsIGF0dHJuYW1lLmluZGV4T2YoJ11bJykgKyAxKTtcbiAgICAgICAgICAgXG4gICAgICAgICAgIHZhciBhdHRyaWQgPSBqUXVlcnkodGhpcykuZmluZCgnaW5wdXQ6Zmlyc3QnKS5hdHRyKCdpZCcpO1xuICAgICAgICAgICB2YXIgYXR0cmJhc2VpZCA9IGF0dHJpZC5zdWJzdHJpbmcoMCwgYXR0cmlkLmluZGV4T2YoJy1pbWFnZV9zcmMnKSArIDExKTtcbiAgICAgICAgICAgalF1ZXJ5KHRoaXMpLmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICBqUXVlcnkodGhpcykuZmluZCgnLmNvdW50JykuaHRtbChpbmRleCsxKTtcbiAgICAgICAgICAgICBqUXVlcnkodGhpcykuZmluZCgnLmltYWdlX3NyYycpLmF0dHIoJ2lkJywgYXR0cmJhc2VpZCsnJysgaW5kZXgpLmF0dHIoJ25hbWUnLCBhdHRyYmFzZSArJ1tjbGllbnRfbG9nb11baW1nXScrJ1snICsgaW5kZXggKyAnXScpO1xuICAgICAgICAgICAgIGpRdWVyeSh0aGlzKS5maW5kKCcuY3VzdG9tX21lZGlhX2J1dHRvbicpLmF0dHIoJ2RhdGEtZmllbGRpZCcsIGF0dHJiYXNlaWQrJycrIGluZGV4ICk7XG4gICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLmZpbmQoJy5pbWFnZV9kZW1vJykuYXR0cignaWQnLCAnaW1nX2RlbW9fJythdHRyYmFzZWlkKycnKyBpbmRleCk7XG4gICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLmZpbmQoJy5jbGllbnQtbGluaycpLmF0dHIoJ2lkJywgJ2xpbmstJysgaW5kZXgpLmF0dHIoJ25hbWUnLCBhdHRyYmFzZSArJ1tjbGllbnRfbG9nb11bbGlua10nKydbJyArIGluZGV4ICsgJ10nKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICB9KTtcbiAgICAgICAgIH0pO1xuICAgICAgICAgXG4gICAgICAgICAvKiBDbG9uaW5nICovXG4gICAgICBqUXVlcnkoJy5jbG9uZS13cmFwcGVyJykuY2xvbmV5YSgpLm9uKCdhZnRlcl9hcHBlbmQuY2xvbmV5YSBhZnRlcl9kZWxldGUuY2xvbmV5YScsIGZ1bmN0aW9uICh0b0Nsb25lLCBuZXdDbG9uZSkge1xuICAgICAgICAgIGpRdWVyeSgnLmNsaWVudC1zb3J0YWJsZScpLnRyaWdnZXIoJ3NvcnR1cGRhdGUnKTtcbiAgICAgICAgICBqUXVlcnkobmV3Q2xvbmUpLm5leHQoJ2xpJykuZmluZCgnaW1nJykuYXR0cignc3JjJywgJycpO1xuICAgICAgfSk7XG4gIH1cbiAgXG4gIC8qXG4gICAqIEZ1bmN0aW9uIG9mIG1lZGlhIHVwbG9hZFxuICAgKi9cbiAgZnVuY3Rpb24gbWVkaWFfdXBsb2FkKGJ1dHRvbl9jbGFzcykge1xuICAgICAgICB2YXIgX2N1c3RvbV9tZWRpYSA9IHRydWUsXG4gICAgICAgIF9vcmlnX3NlbmRfYXR0YWNobWVudCA9IHdwLm1lZGlhLmVkaXRvci5zZW5kLmF0dGFjaG1lbnQ7XG5cblxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgYnV0dG9uX2NsYXNzLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgYnV0dG9uX2lkID0nIycrJCh0aGlzKS5hdHRyKCdpZCcpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNlbmRfYXR0YWNobWVudF9ia3AgPSB3cC5tZWRpYS5lZGl0b3Iuc2VuZC5hdHRhY2htZW50O1xuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9ICQoYnV0dG9uX2lkKTtcbiAgICAgICAgICAgIHZhciBmaWVsZF9pZCA9ICQodGhpcykuYXR0cignZGF0YS1maWVsZGlkJyk7XG4gICAgICAgICAgICBfY3VzdG9tX21lZGlhID0gdHJ1ZTtcbiAgICAgICAgICAgIHdwLm1lZGlhLmVkaXRvci5zZW5kLmF0dGFjaG1lbnQgPSBmdW5jdGlvbihwcm9wcywgYXR0YWNobWVudCl7XG4gICAgICAgICAgICAgICAgaWYgKCBfY3VzdG9tX21lZGlhICApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXR0YWNobWVudC51cmwpO1xuICAgICAgICAgICAgICAgICAgICAvLyQoJy5jdXN0b21fbWVkaWFfaWQnKS52YWwoYXR0YWNobWVudC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyMnK2ZpZWxkX2lkKS52YWwoYXR0YWNobWVudC51cmwpLmNoYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjaW1nX2RlbW9fJytmaWVsZF9pZCkuYXR0cignc3JjJywgYXR0YWNobWVudC51cmwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfb3JpZ19zZW5kX2F0dGFjaG1lbnQuYXBwbHkoIGJ1dHRvbl9pZCwgW3Byb3BzLCBhdHRhY2htZW50XSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd3AubWVkaWEuZWRpdG9yLm9wZW4oYnV0dG9uKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9ICBcbn0pO1xuXG5cbiJdfQ==

//Debounce Function
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};



$(window).on('load', function () {
    setTimeout(function () {
        $('body').removeClass('loading');
    }, 800);
});

$(document).ready(function () {
    mobileMenuInit();
    collapsibleToggleFn();
    sticyHeaderFn();
    scrollToFn();
    setFullViewHeight();
    mouseHoverEffectFn();
    whoWeAreBannerRadialAnimation();
    switchDarkmodeFn();
    dragScrollFn();

});

$(window).resize(function () {
    mouseHoverEffectFn();
});


function mobileMenuInit() {
    var threshold = 1024;
    
    $('.ag-menu-toggler').on('click', function () {

        if ($('.ag-menu-toggler').hasClass('open')) {
            $('.ag-nav').removeClass('open');
            $('body').removeClass('no-scroll');
            setTimeout(function () {
                $('.ag-menu-toggler').removeClass('open');
                $('header').removeClass('open-menu');
            }, 300);
        }
        else {
            $('.ag-menu-toggler').addClass('open');
            $('header').addClass('open-menu');
            $('body').addClass('no-scroll');
            $('header::before').css('height', 1000);
            setTimeout(function () {
                $('.ag-nav').addClass('open');
            }, 100);
        }
    });

    $(window).resize(function () {
        if ($(this).width() >= threshold ) {
            $('.ag-nav').removeClass('open');
            $('.ag-menu-toggler').removeClass('open');
            $('header').removeClass('open-menu');
        }
    });
}

function collapsibleToggleFn () {
    $('.collapsible-item-header').click(function () {
        var $itemHeader = $(this);
        $('.collapsible-item').each(function () {
            var $item = $(this);
            if ($itemHeader.parent().index() === $item.index()) {
                $item.toggleClass('open');
            }
            else {
                $item.removeClass('open');
            }
        })
    })
}

function sticyHeaderFn() {
    var previousScroll = 0,
        targetHeight = $('header').height() ;

    $(window).scroll(function () {
        if ($('header').hasClass('open-menu')) {
            return;
        }
        var currentScroll = $(this).scrollTop();
        if (currentScroll > targetHeight) {
            if (currentScroll > previousScroll) {
                $('body').removeClass('sticky-header');
            } else {
                $('body').addClass('sticky-header');
            }
        } else {
            $('body').removeClass('sticky-header');
        }
        previousScroll = currentScroll;
    });
}

function scrollToFn () {
    $('[data-target]').on('click', function () {
        var target = $(this).data('target');
        if (target !== undefined) {
            $('html, body').animate({
                scrollTop: $("#" + target).offset().top
            }, 1500);
        }
    });
}

function setFullViewHeight () {
    //Some browsers/devices can't read 100vh property.
    $('.full-view-height').css('height', $(window).outerHeight());
    $(window).resize(function () {
        $('.full-view-height').css('height', $(window).outerHeight());
    });
}


/*----------------- Text Rotate animation ------------------*/
var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 150 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typing-txt');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typing-txt > .wrap { border-right: 0.04em solid #60b2f3 }";
    document.body.appendChild(css);
};

/*----------------- Mouse Hover animation ------------------*/

function mouseHoverEffectFn () {
    if ($(window).width() < 1024) {
        return;
    }

    /* const $bigBall = document.querySelector('.cursor__ball--big');
    const $smallBall = document.querySelector('.cursor__ball--small');
    const $hoverables = document.querySelectorAll('.hoverable'); */
    var $bigBall = $('.cursor-ball-big');
    var $smallBall = $('.cursor-ball-small');

    // Listeners
    //document.body.addEventListener('mousemove', onMouseMove);
    $('body').on('mousemove', onMouseMove);
    $('.hoverable').on('mouseenter', onMouseHover);
    $('.hoverable').on('mouseleave', onMouseHoverOut);
    /* for (let i = 0; i < $hoverables.length; i++) {
        $hoverables[i].addEventListener('mouseenter', onMouseHover);
        $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
    } */

    // Move the cursor
    function onMouseMove(e) {
        TweenMax.to($bigBall, .1, {
            x: e.clientX - $bigBall.width() / 2,
            y: e.clientY - $bigBall.height() / 2,
            transformOrigin: 'center',
        })
        TweenMax.to($smallBall, .1, {
            x: e.clientX - 5,
            y: e.clientY - 7
        })
    }

    // Hover an element
    function onMouseHover(e) {
        var target = e.target;
        var isButton = target.nodeName.toLowerCase() === 'button';
        var targetHeight = isButton ? $(target).outerHeight() : $(target).css('line-height');
        targetHeight = isButton ? targetHeight : targetHeight.substring(0, targetHeight.length - 2);
        var scaleTo = isButton ? (targetHeight * 1.1) : (targetHeight * 2);
        if (target.nodeName.toLowerCase() === 'img') {
            $bigBall.css('width', '100px');
            $bigBall.css('height', '100px');
        } else {
            $bigBall.css('width', scaleTo + 'px');
            $bigBall.css('height', scaleTo + 'px');
        }
        $smallBall.css('opacity', '0');
        TweenMax.to($bigBall, .3, {
            scale: 1,
            transformOrigin: 'center'
        });
    }
    function onMouseHoverOut(e) {
        $bigBall.css('width', '');
        $bigBall.css('height', '');
        $smallBall.css('opacity', '1');
        TweenMax.to($bigBall, .3, {
            scale: 0,
            transformOrigin: 'center'
        })
    }
}


function whoWeAreBannerRadialAnimation () {
    $(window).on('resize scroll', function () {
            var elementTop = $('.who-we-are-banner').offset().top;
            var elementBottom = elementTop + $('.who-we-are-banner').outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            var moveTo = (viewportBottom - elementTop) * 100 / $('.who-we-are-banner').height() - (($('.who-we-are-banner-rect').outerWidth()) * 100 / $('.who-we-are-banner').outerWidth());

            var isVisible = (viewportBottom - elementTop) > 0 && (viewportTop - elementTop) <= $('.who-we-are-banner').outerHeight();
            if (isVisible) {
                var percent = $(window).width() * 100 / ($(window).height() + $('.who-we-are-banner').outerHeight());
                TweenMax.to($('.who-we-are-banner-rect'), .3, {
                    x: (((viewportBottom - elementTop) * percent) / 100) - ($('.who-we-are-banner-rect').width() / 2)
                });
            }
        });
    };

function switchDarkmodeFn () {
    $(window).on('resize scroll', 
        debounce(function () {
            var $element = $('.color-transition');
            var $window = $(window);

            var startAt = $window.scrollTop() + $window.height();
            var endAt = $element.offset().top + ($element.height() / 1.5);

            var isVisible = startAt > $element.offset().top + ($element.height() / 4);
            var isPast = $window.scrollTop() < endAt;

            if (isVisible && isPast) {
                $('body').addClass('dark');
            } else {
                $('body').removeClass('dark');
            }
            /* console.log(isVisible);
            console.log(isPast); */
        }, 10, true)
    );
}

function dragScrollFn () {
    var sliderParent = '.ag-carousel'; 
    var slider = '.ag-carousel-items'; 
    var sliderIndicator = '.ag-carousel-marker';
    var isMouseDown = false;
    var startX;
    var scrollLeft;
    var paddingLeft = $('.ag-container').offset().left;

    $(sliderIndicator).width(Math.floor($(sliderIndicator).parent().width() / $(slider).children().length));
    $(window).on('resize', function () {
        $(sliderIndicator).width(Math.floor($(sliderIndicator).parent().width() / $(slider).children().length));
    });

    //Setting the left-padding 
    $(slider).css('padding-left', paddingLeft + 'px');
    $(window).on('resize', function () {
        //Setting the left-padding 
        paddingLeft = $('.ag-container').offset().left;
        $(slider).css('padding-left', paddingLeft + 'px');
    });


    $(sliderParent).on('mousedown touchstart', function (e) {
        isMouseDown = true;
        startX = e.pageX - $(slider)[0].offsetLeft;
        scrollLeft = $(slider)[0].scrollLeft;
        $(this).css('cursor', 'grabbing');
    });

    $(sliderParent).on('mouseup touchend', function () {
        isMouseDown = false;
        $(this).css('cursor', '');
    });
    $(sliderParent).on('mouseleave', function () {
        isMouseDown = false;
        $('.ag-carousel-cursor.fixed').css('visibility', 'hidden');
        $('.cursor').css('display', 'block');
        $(this).css('cursor', '');
    });

    $(sliderParent).on('mouseenter', function (e) {
        setTimeout(function() {
            $('.ag-carousel-cursor.fixed').css('visibility', 'visible');
        }, 200);
        $('.cursor').css('display', 'none');
    });

    $(sliderParent).on('mousemove touchmove', function (e) {
        var carouselCursor = $('.ag-carousel-cursor.fixed');
        TweenMax.to(carouselCursor, .2, {
            x: e.clientX - carouselCursor.width() / 2,
            y: e.clientY - carouselCursor.height() / 2
        })

        if (!isMouseDown) {
            return;
        }

        //Sliding Begins
        e.preventDefault();
        var x = e.pageX - $(slider)[0].offsetLeft;
        var walk = (x - startX);

        var sliderScrollLeft;
        var sliderWidth = $(slider).width();
        var sliderScrolWidth = $(slider)[0].scrollWidth;
        var sliderMovedPercentage;
        var markerPosition;


        TweenMax.to($(slider), .7, {
            scrollLeft: scrollLeft - walk,
            ease: Sine.easeOut,
            onUpdate: function () {
                //Moving the SLider marker
                sliderScrollLeft = $(slider)[0].scrollLeft;
                sliderMovedPercentage = Math.ceil(sliderScrollLeft * 100 / (sliderScrolWidth - (sliderWidth + paddingLeft)));
                markerPosition = ($(sliderIndicator).parent().width() - $(sliderIndicator).width()) * sliderMovedPercentage / 100;
                TweenMax.to($(sliderIndicator), .2, {
                    x: markerPosition,
                    ease: Sine.easeOut
                });
            }
        });


        $(window).on('resize', function () {
            //Moving the SLider marker on Screen resize
            sliderScrollLeft = $(slider)[0].scrollLeft;
            sliderMovedPercentage = Math.ceil(sliderScrollLeft * 100 / (sliderScrolWidth - (sliderWidth + paddingLeft)));
            markerPosition = ($(sliderIndicator).parent().width() - $(sliderIndicator).width()) * sliderMovedPercentage / 100;
            TweenMax.to($(sliderIndicator), .2, {
                x: markerPosition,
                ease: Sine.easeOut
            });
        });
    });


}
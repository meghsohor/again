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
    mouseHoverEffectFn();
    whoWeAreBannerRadialAnimation();
    switchDarkmodeFn();

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
    $('.ag-nav-link, .ag-masthead-scroll-link').on('click', function () {
        var target = $(this).data('target');
        if (target !== undefined) {
            $('html, body').animate({
                scrollTop: $("#" + target).offset().top
            }, 2000);
        }
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

    const $bigBall = $('.cursor-ball-big');
    const $smallBall = $('.cursor-ball-small');

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
        TweenMax.to($bigBall, .4, {
            x: e.pageX - 15,
            y: e.pageY - 15
        })
        TweenMax.to($smallBall, .1, {
            x: e.pageX - 5,
            y: e.pageY - 7
        })
    }

    // Hover an element
    function onMouseHover(e) {
        var lineHieght = $(e.target).css('line-height');
        var scaleTo = +lineHieght.substring(0, lineHieght.length - 2);
        //$bigBall.style.mixBlendMode = 'multiply';
        $bigBall.css('mixBlendMode', 'multiply');
        TweenMax.to($bigBall, .3, {
            //scale: 6
            scale: scaleTo / 10,
        })
    }
    function onMouseHoverOut() {
        //$bigBall.style.mixBlendMode = '';
        $bigBall.css('mixBlendMode', '');
        TweenMax.to($bigBall, .3, {
            scale: 1
        })
    }
}


function whoWeAreBannerRadialAnimation () {
    $(window).on('resize scroll', 
        debounce(function () {
            if ($(window).width() < 768) {
                return;
            }
            var elementTop = $('.who-we-are-banner').offset().top;
            var elementBottom = elementTop + $('.who-we-are-banner').outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            var moveTo = (viewportBottom - elementTop) * 100 / $('.who-we-are-banner').outerHeight() - (($('.who-we-are-banner-rect').outerWidth()) * 100 / $('.who-we-are-banner').outerWidth());
            $('.who-we-are-banner-rect').css('left', moveTo / 1.75 + '%')
        }, 10, true)
    );
}

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
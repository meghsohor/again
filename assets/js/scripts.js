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
        $('body').removeClass('loading').removeClass('no-scroll');
    }, 500);
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
    
    scrollFadeinFn();
    //dragScrollFn();
    scrollHideMastheadFn();
    checkCookie();

    if (window.innerWidth < 1024) {
        startCarousel();
    } else {
        $('.owl-carousel').addClass('off');
    }

    //Preventing Image downloads
    $("body").on("contextmenu", "img", function (e) {
        return false;
    });

    $(window).on('scroll', function(e) {
    });

    //Form Submit
    //leadFormSubmission();

});

$(window).resize(function () {
    mouseHoverEffectFn();

    if (window.innerWidth < 1024) {
        startCarousel();
    } else {
        $('.owl-carousel').addClass('off');
    }
});

function startCarousel() {
    $(".owl-carousel").owlCarousel({
        //margin: 50,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1024: {
                items: 3
            }
        }
    });
}


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
            $('body').removeClass('no-scroll');
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
        });

        if ($('.collapsible-item').hasClass('open')) {
            setTimeout(function () {
                $('.collapsible-section').css('min-height', $('.collapsible-section').height());
            }, 100)
            
        } else {
            $('.collapsible-section').css('min-height', '');
        }
    })
}

function sticyHeaderFn() {
    var previousScroll = 0,
        targetHeight = $('header').height() ;

    $(window).scroll(function (e) {
        if ($('header').hasClass('open-menu')) {
            e.preventDefault();
            return;
        }
        var currentScroll = $(this).scrollTop();
        if (currentScroll > targetHeight) {
            if (currentScroll > previousScroll) {
                $('header').slideUp(250);
                setTimeout(function() {
                    $('body').removeClass('sticky-header');
                }, 250)
            } else {
                $('body').addClass('sticky-header');
                $('header').slideDown(250);
            }
        } else {
            $('body').removeClass('sticky-header');
        }
        previousScroll = currentScroll;
    });
}

function scrollToFn () {
    var scrollSpeed;
    var scrollTo;
    $('[data-target]').on('click', function () {
        var target = $(this).data('target');
        if (target !== undefined) {
            if (target == 'masthead') {
                scrollTo = 0;
            } else {
                scrollTo = $("#" + target).offset().top;
            }
            scrollSpeed = $("#" + target).offset().top > 1500 ? 1500 : $("#" + target).offset().top ;
            if (window.innerWidth > 1024) {
                $('html, body').animate({
                    scrollTop: scrollTo
                }, scrollSpeed);
            } else {
                $('html, body').animate({
                    scrollTop: scrollTo
                }, 0);

                $('body').removeClass('no-scroll');
                $('header').removeClass('open-menu');
                $('header nav').removeClass('open');
                $('.ag-menu-toggler').removeClass('open');
            }
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

/*----------------- Mouse Hover animation ------------------*/

function mouseHoverEffectFn () {
    if (window.innerWidth < 1024) {
        return;
    }

    var $bigBall = $('.cursor-ball-big');
    var $smallBall = $('.cursor-ball-small');

    $('body').on('mousemove', onMouseMove);
    $('.hoverable').on('mouseenter', onMouseHover);
    $('.hoverable').on('mouseleave', onMouseHoverOut);


    // Move the cursor
    function onMouseMove(e) {
        TweenMax.to($bigBall, .2, {
            x: e.clientX - $bigBall.width() / 2,
            y: e.clientY - $bigBall.height() / 2,
            transformOrigin: 'center',
        })
        /* TweenMax.to($smallBall, .1, {
            x: e.clientX - 5,
            y: e.clientY - 7
        }) */
    }

    // Hover an element
    function onMouseHover(e) {
        var target = e.target;
        var isButton = target.nodeName.toLowerCase() === 'button';
        var targetHeight = isButton ? $(target).outerHeight() : $(target).css('line-height');
        targetHeight = isButton ? targetHeight : targetHeight.substring(0, targetHeight.length - 2);
        var scaleTo = isButton ? (targetHeight * 1.1) : (targetHeight * 2);
        if (target.nodeName.toLowerCase() === 'img' || $(this).hasClass('single-post-item')) {
            scaleTo = 100;
        }
        TweenMax.to($bigBall, .2, {
            scale: scaleTo / 25
        });
        
        //$smallBall.css('opacity', '0');
        /* TweenMax.to($bigBall, .3, {
            scale: 1,
            transformOrigin: 'center'
        }); */
    }
    function onMouseHoverOut(e) {
        //$bigBall.css('width', '');
        //$bigBall.css('height', '');
        //$smallBall.css('opacity', '1');
        TweenMax.to($bigBall, .2, {
            scale: 1
            //transformOrigin: 'center',
        });
    }
}


function whoWeAreBannerRadialAnimation () {
    $(window).on('resize scroll', function () {
            if ($('.who-we-are-banner').length === 0) {
                return;
            }
            var elementTop = $('.who-we-are-banner').offset().top;
            var elementBottom = elementTop + $('.who-we-are-banner').outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            var moveTo = (viewportBottom - elementTop) * 100 / $('.who-we-are-banner').height() - (($('.who-we-are-banner-rect').outerWidth()) * 100 / $('.who-we-are-banner').outerWidth());

            var isVisible = (viewportBottom - elementTop) > 0 && (viewportTop - elementTop) <= $('.who-we-are-banner').outerHeight();
            if (isVisible) {
                var percent = $(window).width() * 100 / ($(window).height() + $('.who-we-are-banner').outerHeight());
                TweenMax.to($('.who-we-are-banner-rect'), .3, {
                    x: (((viewportBottom - elementTop) * percent) / 100) - ($('.who-we-are-banner-rect').width() / 2),
                    y: ($('.who-we-are-banner').height() / 2) - ($('.who-we-are-banner-rect').height() / 2)
                });
            }
        });
    };

function switchDarkmodeFn () {
    $(window).on('resize scroll load', 
        debounce(function () {
            var $element = $('.color-transition');
            var $window = $(window);

            if ($element.length === 0) {
                return;
            }

            var startAt = $window.scrollTop() + $window.height();
            var endAt = $element.offset().top + ($element.height() / 1.25);

            var isVisible = startAt > $element.offset().top + ($element.height() / 6);
            var isPast = $window.scrollTop() < endAt;

            if (isVisible && isPast) {
                $('body').addClass('dark');
                /* $('.ag-carousel-item-img .dark-logo').css('display', 'none');
                $('.ag-carousel-item-img .light-logo').fadeIn(700); */
            } else {
                $('body').removeClass('dark');
                /* $('.ag-carousel-item-img .light-logo').css('display', 'none');
                $('.ag-carousel-item-img .dark-logo').fadeIn(700); */
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
    var isTouchDevice = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    var startX;
    var scrollLeft;

    $(sliderIndicator).width(Math.floor($(sliderIndicator).parent().width() / $(slider).children().length));
    $(window).on('resize', function () {
        $(sliderIndicator).width(Math.floor($(sliderIndicator).parent().width() / $(slider).children().length));
    });

    //Hiding the drag icon if touch-screen device
    if (isTouchDevice) {
        $('.ag-carousel-cursor').css('display', 'none');
    }
    else {
        $('.ag-carousel-cursor').css('display', '');
    }


    $(sliderParent).on('pointerdown', function (e) {
        isMouseDown = true;
        startX = e.pageX - $(slider)[0].offsetLeft;
        scrollLeft = $(slider)[0].scrollLeft;
        $(this).css('cursor', 'grabbing');
    });

    $(sliderParent).on('pointerup', function () {
        isMouseDown = false;
        $(this).css('cursor', '');
    });
    $(sliderParent).on('pointerleave', function () {
        isMouseDown = false;
        $('.ag-carousel-cursor.fixed').css('visibility', 'hidden');
        $('.cursor').css('display', 'block');
        $(this).css('cursor', '');
    });

    $(sliderParent).on('pointerenter', function (e) {
        setTimeout(function() {
            $('.ag-carousel-cursor.fixed').css('visibility', 'visible');
        }, 200);
        $('.cursor').css('display', 'none');
    });

    $(sliderParent).on('pointermove', function (e) {
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

        if (isTouchDevice) {
            walk = walk * 25;
        }

        TweenMax.to($(slider), .7, {
            scrollLeft: scrollLeft - walk,
            ease: Sine.easeOut,
            onUpdate: function () {
                //Moving the SLider marker
                sliderScrollLeft = $(slider)[0].scrollLeft;
                sliderMovedPercentage = Math.ceil(sliderScrollLeft * 100 / (sliderScrolWidth - sliderWidth));
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

/*----------------- Fade in element when the element visible in the viewport ------------------*/
function scrollFadeinFn () {

    $(window).on('scroll resize', function () {
        $('.scroll-fade').each(function () {
            if (window.innerWidth < 1024) {
                return false
            }

            var bottom_of_object = $(this).offset().top + ($(this).height() / 2);
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window > bottom_of_object) {

                $(this).addClass('fade-in');

            }

        });

    });
    $(document).ready(function () {
        $('.scroll-fade').each(function () {
            if (window.innerWidth < 1024) {
                return false
            }

            var bottom_of_object = $(this).offset().top + $(this).height();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window > bottom_of_object) {

                $(this).addClass('fade-in');

            }

        });

    });
}

/*----------------- Hide Masthead ------------------*/
function scrollHideMastheadFn() {

    $(window).on('scroll', function () {
        var mastHead = $('#masthead');
        var bottom_of_object = mastHead.height();
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        if (bottom_of_window > (bottom_of_object * 2)) {
            mastHead.css('visibility', 'hidden');
        } else {
            mastHead.css('visibility', '');
        }

    });
}

function leadFormSubmission() {
    $('#leadform').on('submit', function(event) {
        event.preventDefault();

        var formData = $(this).serialize();
        $.ajax({
            url: 'process.php',
            type: 'POST',
            data: formData,
            success: function (data) {
                console.log('Success', data);
            },
            error: function (error) {
                console.error('Error', error);
            }
        });
    });
}

function checkCookie() {
    //Hide Cookie box
    var isSessionDataSet = sessionStorage.getItem("again_cookie_box");

    //Show Cookie box
    if ((isSessionDataSet === null || isSessionDataSet ===false) && $('.cookie-box').length > 0) {
        setTimeout(function () {
            $('.cookie-box').fadeIn();
        }, 10000)
    }

    $('.cookie-box-buttons a').on('click', function () {
        $('.cookie-box').fadeOut();
        sessionStorage.setItem("again_cookie_box", true);
    });
}
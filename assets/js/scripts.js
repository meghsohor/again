$(window).on('load', function () {
    setTimeout(function () {
        $('body').removeClass('loading');
    }, 800);
});

$(document).ready(function () {
    mobileMenuInit();
    collapsibleToggleFn();
    sticyHeaderFn();
    scrollToFn()
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
$(document).ready(function () {
    $('.ag-menu-toggler').on('click', function () { 

        if ($('.ag-menu-toggler').hasClass('open')) {
            $('.ag-nav').removeClass('open');
            setTimeout(function () {
                $('.ag-menu-toggler').removeClass('open');
                $('header').removeClass('open-menu');
            }, 300);
        }
        else {
            $('.ag-menu-toggler').addClass('open');
            $('header').addClass('open-menu');
            setTimeout(function () {
                $('.ag-nav').addClass('open');
            }, 300);
        }
     })
});
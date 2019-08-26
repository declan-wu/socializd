//reveals next button uppon entering text
$('.form-control').keyup(function () {
    $('.nxt').removeClass("hide fadeOutDown").addClass("fadeInUp");
})

//on click (next),
$('.nxt').click(function () {
    $('.nxt').removeClass("fdeInUp").addClass('fadeOutDown');
    if ($('.progress-form li').hasClass('activate')) {
        var $activate = $('li.activate');
        var $inactive = $('li.inactive');
        $activate.removeClass("fadeInRightBig activate").addClass('fadeOutLeftBig');
        $inactive.removeClass("hide inactive").addClass("activate fadeInRightBig").next().addClass('inactive');
        $('.submit').click(function () {
            event.preventDefault();
            var darken = '<div class="darken" style="display:none;"></div>';
            $('body').prepend(darken);
            $(".darken").delay().show(0).animate({
                opacity: 0.8
            }, "fast");
            $('.thanks').removeClass('hide').addClass('fadeInDownBig');
        });
    }
});


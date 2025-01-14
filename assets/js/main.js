/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)

    "Cleaned" - aka destroyed and rewritten by L3D.
    <WARNING> L3D does not know how JavaScript works and just deleted some random lines.

*/
(function ($) {

    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)'
    });

    $(function () {

        var $window = $(window),
            $body = $('body');

        // Touch mode.
        if (skel.vars.mobile)
            $body.addClass('is-touch');

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on medium.
        skel.on('+medium -medium', function () {
            $.prioritize(
                '.important\\28 medium\\29',
                skel.breakpoint('medium').active
            );
        });

        // Scrolly links.
        $('.scrolly').scrolly({
            speed: 2000
        });

        // Off-Canvas Navigation.

        // Title Bar.
        $(
            '<div id="titleBar">' +
            '<a href="#navPanel" class="fas fa-bars toggle"></a>' +
            '<span class="title">' + $('#logo').html() + '</span>' +
            '</div>'
        )
            .appendTo($body);

        // Navigation Panel.
        $(
            '<div id="navPanel">' +
            '<nav>' +
            $('#nav').navList() +
            '</nav>' +
            '</div>'
        )
            .appendTo($body)
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'left',
                target: $body,
                visibleClass: 'navPanel-visible'
            });

        // Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
        if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
            $('#titleBar, #navPanel, #page-wrapper')
                .css('transition', 'none');

        // Parallax.
        // Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
        if (skel.vars.browser == 'ie' ||
            skel.vars.mobile) {

            $.fn._parallax = function () {
                return $(this);
            };

        } else {
            $.fn._parallax = function () {
                $(this).each(function () {
                    var $this = $(this),
                        on, off;
                    on = function () {
                        $this
                            .css('background-position', 'center 0px');
                        $window
                            .on('scroll._parallax', function () {
                                var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);
                                $this.css('background-position', 'center ' + (pos * -0.15) + 'px');
                            });
                    };

                    off = function () {
                        $this
                            .css('background-position', '');
                        $window
                            .off('scroll._parallax');
                    };

                    skel.on('change', function () {
                        if (skel.breakpoint('medium').active)
                            (off)();
                        else
                            (on)();
                    });
                });
                return $(this);
            };

            $window
                .on('load resize', function () {
                    $window.trigger('scroll');
                });

        }

        // Banner.
        var $banner = $('#banner');
        $banner
            ._parallax();
    });
})(jQuery);

window.setInterval(function () {
    $.getJSON("/toolboxbodenseeev.json", function (data) {
        $("link[href='/css/spacestatus.css']").remove();
        if (data.state.open == true) {
            $('#space-closed').hide();
            $('#space-opened').css("display", "block");
        } else {
            $('#space-opened').hide();
            $('#space-closed').show();
        }
    });
}, 5000);

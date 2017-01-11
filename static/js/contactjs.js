/* forEach() Polyfill */
if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisArg */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t)
        fun.call(thisArg, t[i], i, t);
    }
  };
}
/* End Polyfill */

/* AJAX Contact Form */
$(document).on('submit', '#contact-form', function(event) {
    event.preventDefault();
    f = $(this);
    $.post(f.attr('action'), f.serialize(), function(data) {
        var allInputs = $('#contact-form').find("[id^='div_id_']");
        if (data.result == 'success') {
            var container = $('#contact-container');
            allGreen(allInputs);
            $('.goodbye').fadeOut(function() {
                $('#loader').show()
                if (container.width() >= 979) {
                    showImage();
                } else {
                    showImage('narrow');
                }
            });
        }
        if (data.result == 'fail') {
            removeErrors(allInputs);
            for (var key in data.errors) {
                data.errors[key].forEach(function(val, i) {
                    var mystring = '<p id="error_id_' + i + '_' +  key + 
                                   '" class="help-block errorlist"><strong>' +
                                   val + '</strong></p>';
                    $(mystring).insertAfter($('#id_' + key));
                    $('#div_id_' + key).addClass('has-error');
                });
            }
            $('html,body').animate({scrollTop: $('#contact-form').offset().top},'slow');
            showSuccessful(allInputs);
        }

    }, 'json');
});

function showImage(size) {
    var container = $('#contact-container');
    if (size == "narrow") {
        var src = $('#contact-big-img-narrow').data('src');
        var klass = 'big-img-narrow';
    } else {
        var src = $('#contact-big-img').data('src');
        var klass = 'big-img';
    }
    if (src && klass) {
        var img = new Image();
        img.style.display = "none";
        // $(img).addClass(klass);
        $(img).addClass('img-responsive').addClass('thanks');
        img.onload = function() {
            $('#loader').hide();
            // (size == 'narrow') ? full_page('narrow') : full_page();
            $(this).fadeIn(1000);
        };
        container.append(img);
        img.src = src;
    }
}
function full_page() {
    if (arguments[0] == "narrow") {
    $('.big-img-narrow').css('width', $(window).innerWidth());
    $('.big-img-narrow').css('height', $(window).innerHeight());
    } else {
    $('.big-img').css('width', $(window).innerWidth());
    $('.big-img').css('height', $(window).innerHeight());
    }
}
function allGreen(allInputs) {
    allInputs.each(function() {
        if ($(this).hasClass('has-error')) {
            $(this).removeClass('has-error');
            $(this).addClass('has-success');
            $('.errorlist').each(function() {
                $(this).remove();
            });
        }
        else {
            $(this).addClass('has-success');
        }
    });
}
function removeErrors(allInputs) {
    if ($('.errorlist').length && allInputs) {
        $('.errorlist').each(function() {
            $(this).closest('.has-error').removeClass('has-error');
            $(this).remove();
        });
        allInputs.each(function() {
            if ($(this).hasClass('has-success')) {
                $(this).removeClass('has-success');
            }
        });
    }
}
function showSuccessful(allInputs) {
    allInputs.each(function() {
        if (!($(this).hasClass('has-error'))) {
            $(this).addClass('has-success');
        }
    });
}
/* End AJAX Contact Form */

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


$(document).ready(function() {
    $(document).pjax('.url', '#main-container');

    $(document).on('pjax:send', function() {
      $('#loader').show()
    });
    $(document).on('pjax:complete', function() {
      $('#loader').hide()
    });
    $(document).on('pjax:timeout', function(event) {
        // Prevent default timeout redirection behavior
        event.preventDefault()
    });

    // When menu toggle button is pressed, trigger it
    // to close it automatically so it looks right w/ pjax
    if ($('html').width() < 760) {
        $('.nav a').click(function() {
        $('.navbar-toggle').trigger('click');
        });
    }
});

// Since .thumbnail may not be present when the page is loaded, we need
// to use $(document).on() to bind to it's click event.
$(document).on('click', '.thumbnail', function(event) {
        event.preventDefault();
        var newLink = $(this).attr('src');
        var newDescription = $(this).attr('alt');
        $('#big-img').attr('src', newLink);
        $('#big-img-description').text(newDescription);

        // If on a mobile device, gently scroll up to the image
        if ($('html').width() < 760) {
            $('html,body').animate({scrollTop: $('#big-img').offset().top},'slow');
        }
    });

/* AJAX Contact Form */

// If the form fails to validate, I've written two ways of handling it. 
// The Object.keys method doesn't look as clean so I commented it out.
$(document).on('submit', '#contact-form', function(event) {
    event.preventDefault();
    f = $(this);
    $.post(f.attr('action'), f.serialize(), function(data) {
        var allInputs = $('#contact-form').find("[id^='div_id_']");
        if (data.result == 'success') {

            var container = $('#contact-container');

            (container.width() >= 979) ? full_page() : full_page('narrow')

            allGreen(allInputs);

            $('#contact-form').fadeOut(function() {
                if (container.width() >= 979) {
                $('#contact-big-img').css('visibility','visible').hide().fadeIn().removeClass('hidden');
                } else {
                $('#contact-big-img-narrow').css('visibility','visible').hide().fadeIn().removeClass('hidden');
                }
            });

        }
        if (data.result == 'fail') {
            removeErrors(allInputs);
            //var myErrors = [];
            for (var key in data.errors) {
                data.errors[key].forEach(function(val, i) {
                    //myErrors.push(key);
                    var mystring = '<p id="error_id_' + i + '_' +  key + 
                                   '" class="help-block errorlist"><strong>' +
                                   val + '</strong></p>';
                    $(mystring).insertAfter($('#id_' + key));
                    $('#div_id_' + key).addClass('has-error');
                });
            }
            showSuccessful(allInputs);

            // Object.keys(data.errors).forEach(function(key) {
            //     for (i = 0; i < data.errors[key].length; i++) {
            //         var mystring = '<ul class="errorlist"><li>' + data.errors[key][i] + '</li></ul>';
            //         $(mystring).insertBefore($('#id_' + key));
            //         $('#div_id_' + key).addClass('has-error');
            //     }
            // });
        }

    }, 'json');
});

function full_page() {
    if (arguments[0] == "narrow") {
    $('#contact-big-img-narrow').css('width', $('#contact-container').innerWidth());
    $('#contact-big-img-narrow').css('height', $('#contact-container').innerHeight());
    } else {
    $('#contact-big-img').css('width', $('#contact-container').innerWidth());
    $('#contact-big-img').css('height', $('#contact-container').innerHeight());
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

/* Active Nav change */
$(document).ready(function() {

    var anch = $('.nav a');

    anch.each(function() {
        // no need for var, can use directly
        // var xx = $(this).text().toLowerCase();
        if (window.location.pathname.indexOf(
                $(this).text().toLowerCase()
                ) > -1) {
            navActivate($(this));
        }
    });
    
    anch.click(function() {
        navActivate($(this));
    });

    function navActivate(el) {
            var myList = $(el).parents('li')
            myList.siblings('li').each(function() {;
                $(this).removeClass('active');
            });
            if (!(myList.hasClass('active'))) {
            myList.addClass('active');
            }
    }
});

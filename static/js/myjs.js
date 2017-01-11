$(document).ready(function() {
    var footer = $('#footer'),
        loader = $('#loader'),
        owl = $('#owl'),
        main_container = $('#main-container');

    // Owl should only display on home page
    if (owl.length && window.location.pathname !== '/') {
        owl.hide();
    }

    // USER CLICKS LINK WITH PJAX CLASS
    $('body').delegate('.url', 'click', function(event) {
        // STOP THE LINK FROM WORKING NORMALLY
        event.preventDefault();
        // Are we transitioning from a page with owl? Slide it out if we are
        if (owl.length) {
            owl.hide( "slide", { direction: "left" }, 1000);
        }
        // CONTENT FADE OUT TRANSITION BEGINS
        var target = $(this).attr('href');
        footer.fadeOut(200);
        main_container.hide( "slide", { direction: "left" }, 1000, function() {
        // CALLBACK TO RUN PJAX AFTER FADEOUT
                $.pjax({
                  url: target,
                  container: '#main-container',
                });
        });
  });

  // PJAX DOIN THANGS TO THE CONTENT FRAGMENT IDENTIFIED ABOVE
    main_container
    .on('pjax:start', function() { 
        if (owl.length && window.location.pathname !== '/') {
            owl.hide();
        }
        // KEEPING THE MAIN CONTENT HIDDEN
        $(this).fadeOut(0);
        footer.fadeOut(0);
    })
    .on('pjax:end', function() { 
      // FADE IN THE MAIN CONTENT
          main_container.show( "slide", { direction: "right" }, 1000);
          footer.fadeIn(200);
          // FUNCTIONS LOADED AGAIN AFTER PJAX ENDS GO HERE
          if (owl.length && window.location.pathname === '/') {
              owl.show( "slide", { direction: "right" }, 1000);
              if (!(owl.hasClass('initialized'))) {
                  owl.owlCarousel({
                      autoPlay: 5000, //Set AutoPlay to 5 seconds
                      singleItem: true,
                  });
              }
          }
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

    //Owl Carousel
    if (owl.length && window.location.pathname === '/') {
        owl.owlCarousel({
            autoPlay: 5000, //Set AutoPlay to 3 seconds
            singleItem: true,
        });
        owl.addClass('initialized');
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

/* Active Nav change */
// $(document).ready(function() {
// 
//     var anch = $('.nav a');
// 
//     anch.each(function() {
//         // no need for var, can use directly
//         // var xx = $(this).text().toLowerCase();
//         if (window.location.pathname.indexOf(
//                 $(this).text().toLowerCase()
//                 ) > -1) {
//             navActivate($(this));
//         }
//     });
//     
//     anch.click(function() {
//         navActivate($(this));
//     });
// 
//     function navActivate(el) {
//             var myList = $(el).parents('li')
//             myList.siblings('li').each(function() {;
//                 $(this).removeClass('active');
//             });
//             if (!(myList.hasClass('active'))) {
//             myList.addClass('active');
//             }
//     }
// });

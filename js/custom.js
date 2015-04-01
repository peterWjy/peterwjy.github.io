 // NIVOSLIDER CUSTOM SETTINGS   
        
        $(window).load(function () {
            $('#slider').nivoSlider({
                effect: 'fade', // Specify sets like: 'fold,fade,sliceDown'
                animSpeed: 500, // Slide transition speed
                pauseTime: 3000, // How long each slide will show
                startSlide: 0, // Set starting Slide (0 index)
                directionNav: true, // Next & Prev navigation
                controlNav: false, // 1,2,3... navigation
                controlNavThumbs: false // Use thumbnails for Control Nav
            });
        });


// JQUERY ASCENSOR SETTINGS

    $('#ascensorBuilding').ascensor({
        AscensorName: 'ascensor',
        ChildType: 'section',
        AscensorFloorName: 'Profile | Resume | Portfolio | Contact',
        Time: 1000,
        WindowsOn: 1,
        Direction: 'chocolate',
        AscensorMap: '1|1 & 2|1 & 1|2 & 2|2',
        Easing: 'easeInOutQuad',
        KeyNavigation: true
    });

// PRETTYPHOTO HTML5 VALIDATION HACK

  $('a[data-rel]').each(function () {
        $(this).attr('rel', $(this).data('rel'));
    });

/////////////////* PORTFOLIO QUICKSAND AND PRETTYPHOTO SETTINGS */////////////////////////

    $(document).ready(function () {

        // Initialize prettyPhoto plugin
        $(".portfolio a[rel^='prettyPhoto']").prettyPhoto({
            autoplay_slideshow: false,
            overlay_gallery: false,
            show_title: true
        });


        // Clone portfolio items to get a second collection for Quicksand plugin
        var $portfolioClone = $(".portfolio").clone();

        // Attempt to call Quicksand on every click event handler
        $(".filter a").click(function (e) {

            $(".filter li").removeClass("current");

            // Get the class attribute value of the clicked link
            var $filterClass = $(this).parent().attr("class");

            if ($filterClass == "all") {
                var $filteredPortfolio = $portfolioClone.find("li");
            } else {
                var $filteredPortfolio = $portfolioClone.find("li[data-type~=" + $filterClass + "]");
            }

            // Call quicksand
            $(".portfolio").quicksand($filteredPortfolio, {
                duration: 1000,
                easing: 'easeInOutQuad'
            }, function () {

                // Call prettyphoto
                $(".portfolio a[rel^='prettyPhoto']").prettyPhoto({
                    autoplay_slideshow: false,
                    overlay_gallery: false,
                    show_title: true
                });

               
            });


            $(this).parent().addClass("current");


            // Prevent the browser jump to the link anchor
            e.preventDefault();


        })
    });


    /////////////////* AJAX CONTACT FORM */////////////////////////

    var messageDelay = 2000;  // How long to display status messages (in milliseconds)

    // Init the form once the document is ready
    $(init);


    // Initialize the form

    function init() {

        // Hide the form initially.
        // Make submitForm() the form's submit handler.
        // Position the form so it sits in the centre of the browser window.
        $('#contactForm').hide().submit(submitForm).addClass('positioned');

        // When the "Send us an email" link is clicked:
        // 1. Fade the content out
        // 2. Display the form
        // 3. Move focus to the first field
        // 4. Prevent the link being followed

        $('a[href="#contactForm"]').click(function () {
            $('#content').fadeTo('slow', .2);
            $('#contactForm').fadeIn('slow', function () {
                $('#senderName').focus();
            })

            return false;
        });

        // When the "Cancel" button is clicked, close the form
        $('#cancel').click(function () {
            $('#contactForm').fadeOut();
            $('#content').fadeTo('slow', 1);
        });

        // When the "Escape" key is pressed, close the form
        $('#contactForm').keydown(function (event) {
            if (event.which == 27) {
                $('#contactForm').fadeOut();
                $('#content').fadeTo('slow', 1);
            }
        });

    }


    // Submit the form via Ajax

    function submitForm() {
        var contactForm = $(this);

        // Are all the fields filled in?

        if (!$('#senderName').val() || !$('#senderEmail').val() || !$('#message').val()) {

            // No; display a warning message and return to the form
            $('#incompleteMessage').fadeIn().delay(messageDelay).fadeOut();
            contactForm.fadeOut().delay(messageDelay).fadeIn();

        } else {

            // Yes; submit the form to the PHP script via Ajax

            $('#sendingMessage').fadeIn();
            contactForm.fadeOut();

            $.ajax({
                url: contactForm.attr('action') + "?ajax=true",
                type: contactForm.attr('method'),
                data: contactForm.serialize(),
                success: submitFinished
            });
        }

        // Prevent the default form submission occurring
        return false;
    }


    // Handle the Ajax response

    function submitFinished(response) {
        response = $.trim(response);
        $('#sendingMessage').fadeOut();

        if (response == "success") {

            // Form submitted successfully:
            // 1. Display the success message
            // 2. Clear the form fields
            // 3. Fade the content back in

            $('#successMessage').fadeIn().delay(messageDelay).fadeOut();
            $('#senderName').val("");
            $('#senderEmail').val("");
            $('#message').val("");

            $('#content').delay(messageDelay + 500).fadeTo('slow', 1);

        } else {

            // Form submission failed: Display the failure message,
            // then redisplay the form
            $('#failureMessage').fadeIn().delay(messageDelay).fadeOut();
            $('#contactForm').delay(messageDelay + 500).fadeIn();
        }
    }

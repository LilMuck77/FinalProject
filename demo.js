$(document).ready(function () {
    // The next slide to be displayed
    var nextSlideIndex = 0;
    // The current timer
    var timer;
    // The number of images in the slideshow
    var numImages;
    // The relative path to the directory holding the images
    var imgPath = "img/";
    // All the images, names only
    var imgSrc = ["lights.jpg", "mountain.jpg", "trees.jpg", "snow.jpg"];
    // The image descriptions to be overlayed on the slideshow
    var imgText = ["Northern Lights", "Mountain River", "Valley of Trees", "Snow-Covered Peaks"];
    // The number of images in the slideshow
    numImages = imgSrc.length;

    // For every image in the slideshow
    for (var i = 0; i < numImages; i++) {
        // Create a main div to hold the image and all its info
        var mainDiv = $("<div>").addClass("mySlides fade");
        // Create a child div to hold the numbering (e.g. "1 / 3")
        var numberDiv = $("<div>").addClass("numberText").text((i + 1) + " / " + numImages);
        // Create the image element
        var image = $("<img>").attr("src", imgPath + imgSrc[i]);
        // Create the image description caption div
        var textDiv = $("<div>").addClass("text").text(imgText[i]);

        // Add all the child divs to the main div
        mainDiv.append(numberDiv);
        mainDiv.append(image);
        mainDiv.append(textDiv);

        // Add the main div to the slideshow
        $(".slideshow-container").append(mainDiv);

        // Capture current value of i
        const dotIndex = i;

        // Create a clickable dot to select images
        var dot = $("<span>").addClass("dot").click(function () {
            setCurrentSlide(dotIndex);
        });

        // Add the dot to its container
        $("#dots").append(dot);
    }

    // To use an event handler with parameters, it must be wrapped inside another function
    $("a.prev").click(function () {
        plusSlides(-1);
    });

    $("a.next").click(function () {
        plusSlides(1)
    });

    // Show the first image to start the slideshow
    startSlideshow();


    // Next/previous controls
    function plusSlides(n) {
        // Stop the current timer
        clearTimeout(timer);
        // Set the desired slide number
        nextSlideIndex += n - 1;
        // Restart the timer
        startSlideshow();
    }

    // Dot controls to jump to a particular image
    function setCurrentSlide(n) {
        // Stop the current timer
        clearTimeout(timer);
        // Set the desired slide number
        nextSlideIndex = n;
        // Restart the timer
        startSlideshow();
    }

    // Controls the slideshow progression
    function startSlideshow() {
        // Wrap around if it reaches the end/beginning of the slideshow
        if (nextSlideIndex >= numImages) {
            nextSlideIndex = 0;
        } else if (nextSlideIndex < 0) {
            nextSlideIndex = numImages - 1;
        }
        // Show the desired slide
        showSlide(nextSlideIndex);
        // Advance the counter for next time
        nextSlideIndex++;
        // Start a time to call this function in 3 seconds
        timer = setTimeout(startSlideshow, 3000);
    }

    // Makes the slide at index n the visible one
    function showSlide(n) {
        // Hides all the slide divs and shows only the desired one
        $(".mySlides").hide().eq(n).show();
        // Removes the 'active' class from all dots, then adds it only to the desired one
        $("span.dot").removeClass("active").eq(n).addClass("active");
    }

});

$(document).on("page:change", function() {
  $("#header").sticky({topSpacing:0, zIndex: 9999});

  $(window).scroll(function() {
    if($(window).scrollTop() >= 25) {
      $("#header").find(".logo").hide();
    }
    else {
      $("#header").find(".logo").show();
    }

    $("#header").sticky("update");
  });

  $(".owl-carousel").owlCarousel({
    items: 1
  });
});

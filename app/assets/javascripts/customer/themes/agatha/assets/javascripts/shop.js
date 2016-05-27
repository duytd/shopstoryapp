$(document).on("page:change", function() {
  $("#header").sticky({topSpacing:0, zIndex: 9999});

  $(".owl-carousel").owlCarousel({
    items: 1,
    dots: false
  });
});

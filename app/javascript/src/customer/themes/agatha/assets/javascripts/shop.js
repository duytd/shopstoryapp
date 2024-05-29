$(document).on("turbolinks:load", function() {
  $(".owl-carousel").owlCarousel({
    items: 1,
    dots: false,
    autoplay: true,
    rewind: true
  });

  $("#addToCart").click(function() {
    $("span.cart").scrollView();
  })
});

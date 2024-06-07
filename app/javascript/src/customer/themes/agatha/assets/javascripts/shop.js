$(document).ready(() => {
  $(".owl-carousel").owlCarousel({
    items: 1,
    dots: false,
    autoplay: true,
    rewind: true
  });

  $("#addToCart").click(() => {
    $("span.cart").scrollView();
  })
});

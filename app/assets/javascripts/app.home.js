var Page = function() {
  this.$topSection = $('#home-fullscreen'),
  this.$topNavbar = $("#navbar-menu"),
  this.$stickyElem = $("#sticky-nav"),
  this.$backToTop = $('#back-to-top'),
  this.$contactForm = $("#contact-form")
};

Page.prototype.init = function () {
  var $this = this;

  //Handling load event
  var windowHeight = $(window).height();
    // adding height attr to top section
  $this.$topSection.css('height', windowHeight);

  //init sticky
  console.log($this.$stickyElem.attr("id"));
  $this.$stickyElem.sticky({topSpacing: 0});

  //Handling the resize event
  $(window).on('resize', function() {
    var windowHeight = $(window).height();
    $this.$topSection.css('height', windowHeight);
  });

  //Handling the scroll event
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $this.$backToTop.fadeIn();
    } else {
      $this.$backToTop.fadeOut();
    }
  });

  //on click on navbar - Smooth Scroll To Anchor (requires jQuery Easing plugin)
  this.$topNavbar.on('click', function(event) {
    var $anchor = $(event.target);
    if ($($anchor.attr('href')).length > 0 && $anchor.is('a.nav-link')) {
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 0
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    }
  });

  //back-to-top button
  $this.$backToTop.click(function(){
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });
}

$(document).on('ready', function() {
  $.Page = new Page, $.Page.Constructor = Page;
  $.Page.init()
})

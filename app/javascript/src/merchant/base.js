import PerfectScrollbar from 'perfect-scrollbar';

$(document).ready(() => {
  const $sideBar = $("aside.left-panel");
  const $content = $("section.content");
  const ps = new PerfectScrollbar('aside.left-panel');

  $('aside.left-panel').animate({
    scrollTop: $('.navigation .item.active').position().top
  }, 1000);

  $(".navbar-toggler").click(() => {
    $sideBar.toggleClass("collapsed");
    $content.toggleClass("expansed");
    $(".subitems").hide();

    ps.update();
  });

  $(window).on("scroll", () => {
    if ($(window).scrollTop() >= 47) {
      $("#Intercom").addClass('scrolled')
    }
    else {
      $("#Intercom").removeClass('scrolled')
    }

    var $fixedElement = $(".form-submit.fixed");
    if($(window).scrollTop() + $(window).height() >= $(document).height() - $fixedElement.height()) {
      if (!$fixedElement.hasClass("scrolled")) {
        $fixedElement.addClass("scrolled");
      }
    }
    else {
      if ($fixedElement.hasClass("scrolled")) {
        $fixedElement.removeClass("scrolled");
      }
    }
  })
});

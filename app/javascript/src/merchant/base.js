import PerfectScrollbar from 'perfect-scrollbar';

$(document).ready(() => {
  const $sideBar = $("aside.left-panel");
  const $content = $("section.content");
  const ps = new PerfectScrollbar('aside.left-panel');
  const activeItemPosition = $('.navigation .item.active').position();

  if (typeof activeItemPosition !== 'undefined') {
    $('aside.left-panel').animate({
      scrollTop:activeItemPosition.top
    }, 1000);
  }

  $(".navbar-toggler").click(() => {
    $sideBar.toggleClass("collapsed");
    $content.toggleClass("expansed");

    ps.update();
  });

  $(window).on("scroll", () => {
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

import PerfectScrollbar from 'perfect-scrollbar';

$(document).ready(function() {
  const $sideBar = $("aside.left-panel");
  const $content = $("section.content");
  const ps = new PerfectScrollbar('aside.left-panel');

  $(".navbar-toggler").click(function() {
    $sideBar.toggleClass("collapsed");
    $content.toggleClass("expansed");
    $(".subitems").hide();

    ps.update();
  });

  $("aside.left-panel .item").on("click", function(){
    if ($(this).find(".item-label").css("display") != "none") {
      $(this).find(".subitems").toggleClass("hide");
    }
  });

  $(window).on("scroll", function() {
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

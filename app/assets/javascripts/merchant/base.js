$(document).on("turbolinks:load", function() {
  $sideBar = $("aside.left-panel");
  $content = $("section.content");

  $sideBar.perfectScrollbar();

  $(".navbar-toggle").click(function() {
    $sideBar.toggleClass("collapsed");
    $content.toggleClass("expansed");
    $(".subitems").hide();
    $sideBar.perfectScrollbar("update");
  });

  $sideBar.on("click", ".item", function(){
    if ($(this).find(".item-label").css("display") != "none") {
      $(this).find(".subitems").slideToggle("slow", "swing", function() {
        $sideBar.perfectScrollbar("update");
      });
    }
  });

  $(window).on("scroll", function() {
    if($(window).scrollTop() >= 47) {
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

$(document).on("page:change", function() {
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

  NProgress.configure({ showSpinner: false });

  $(".summernote").summernote({
    height: 200,
    toolbar: [
      ['action',['undo','redo']],
      ['style', ['style','bold', 'italic','strikethrough','underline', 'clear']],
      ['table', ['table']],
      ['media', ['link','picture','hr']],
      ['para', ['ul','ol','paragraph']],
      ['fullscreen',['codeview', 'fullscreen']],
    ]
  });

  $(".summernote").each( function() {
    $(this).summernote("code", $(this).val());
  });

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() >= $(document).height() - 34) {
      if (!$(".form-submit.fixed").hasClass("scrolled")) {
        $(".form-submit.fixed").addClass("scrolled");
      }
    }
    else {
      if ($(".form-submit.fixed").hasClass("scrolled")) {
        $(".form-submit.fixed").removeClass("scrolled");
      }
    }
  })
});

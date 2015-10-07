$(document).on("page:change", function() {
  $sideBar = $("aside.left-panel");
  $content = $("section.content");

  $sideBar.niceScroll({
    cursorcolor: "#5c6d7e",
    background: "#34495e",
    cursorborder: "none",
    cursorwidth: "7px",
    autohidemode: false
  });

  $(".navbar-toggle").click(function() {
    $sideBar.toggleClass("collapsed");
    $content.toggleClass("expansed");
    $(".subitems").hide();
    $sideBar.getNiceScroll().resize();
  });

  $sideBar.on("click", ".item", function(){
    if (!$sideBar.hasClass("collapsed") || $(window).width() <= 768) {
      $(this).find(".subitems").slideToggle("slow", "swing", function() {
        $sideBar.getNiceScroll().resize();
      });
    }
  });

  NProgress.configure({ showSpinner: false });

  $(".summernote").summernote({
    height: 100,
    toolbar: [
      ['action',['undo','redo']],
      ['style', ['style','bold', 'italic','strikethrough','underline', 'clear']],
      ['table', ['table']],
      ['media', ['link','picture','hr']],
      ['para', ['ul','ol','paragraph']],
      ['fullscreen',['codeview', 'fullscreen']],
    ]
  });
});

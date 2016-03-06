$(document).on("page:change", function() {
  $sideBar = $("aside.left-panel");
  $content = $("section.content");

  $sideBar.perfectScrollbar();

  $(".navbar-toggle").click(function() {
    $sideBar.toggleClass("collapsed");
    $content.toggleClass("expansed");
    $(".subitems").hide();
    $sideBar.getNiceScroll().resize();
  });

  $sideBar.on("click", ".item", function(){
    if (!$sideBar.hasClass("collapsed")) {
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
});

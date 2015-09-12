$(document).on("page:change", function() {
  $sideBar = $("aside.left-panel");
  $content = $("section.content");

  $sideBar.niceScroll({
    cursorcolor: "#5c6d7e",
    background: "#34495e",
    cursorborder: "none"
  });

  $(".navbar-toggle").click(function() {
    $sideBar.toggleClass("collapsed");
    $content.toggleClass("expansed");
    $sideBar.find(".subitems, .item-label, .merchant-logo .name").toggleClass("hide");
  });

  $sideBar.on("click", ".item", function(){
    $(this).find(".subitems").slideToggle();
  })

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

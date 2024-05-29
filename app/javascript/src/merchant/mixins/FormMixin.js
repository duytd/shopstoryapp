/* To use this mixin, an items state and submit method must be set */
var FormMixin = {
  loadSummernote: function() {
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
  }
}

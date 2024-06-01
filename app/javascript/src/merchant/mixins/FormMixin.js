import React from 'react'

const withFormMixins = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    loadSummernote() {
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
}

export default withFormMixins;

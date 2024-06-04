import React from 'react';
import Quill from 'quill';

const withFormMixins = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      this.loadSummernote();
    }

    loadSummernote = () => {
      $(".quill-editor").each(function() {
        const id = $(this).attr('id')
        const quill = new Quill(`#${id}`, {theme: 'snow'});
        const valueInput = $(`#${id}_value`);
        const htmlContent = quill.clipboard.dangerouslyPasteHTML(valueInput.val());
        quill.setContents(htmlContent);

        quill.on('text-change', (_delta, _oldDelta, _source) => {
          valueInput.val(quill.root.innerHTML);
        });
      });
    }
  }
}

export default withFormMixins;

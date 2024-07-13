import React from 'react';
import Quill from 'quill';
import ImageCompress from 'quill-image-compress';

const withFormMixins = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      this.loadSummernote();
    }

    loadSummernote = () => {
      Quill.register('modules/imageCompress', ImageCompress);

      const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'align': [] }],
      ];

      $(".quill-editor").each(function() {
        const id = $(this).attr('id')
        const quill = new Quill(`#${id}`, {
          modules: {
            toolbar: toolbarOptions,
            imageCompress: {
              quality: 0.5,
              maxWidth: 1000,
              maxHeight: 1000,
              imageType: 'image/jpeg',
              debug: true,
              suppressErrorLogging: false,
              insertIntoEditor: undefined,
            }
          },
          theme: 'snow'
        });
        const valueInput = $(`#${id}_value`);
        quill.root.innerHTML = valueInput.val();

        quill.on('text-change', (_delta, _oldDelta, _source) => {
          valueInput.val(quill.root.innerHTML);
        });
      });
    }
  }
}

export default withFormMixins;

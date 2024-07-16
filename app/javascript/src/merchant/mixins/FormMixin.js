import React from 'react';
import Quill from 'quill';
import ImageCompress from 'quill-image-compress';
import ImageUploader from "quill-image-uploader";
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import htmlEditButton from "quill-html-edit-button";

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
      Quill.register("modules/imageUploader", ImageUploader);
      Quill.register("modules/htmlEditButton", htmlEditButton);

      const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        ['link', 'image'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'align': [] }],
      ];

      $(".quill-editor").each(function() {
        const id = $(this).attr('id')
        const quill = new Quill(`#${id}`, {
          modules: {
            toolbar: {
              container: toolbarOptions
            },
            imageCompress: {
              quality: 0.3,
              maxWidth: 1000,
              maxHeight: 1000,
              imageType: 'image/jpeg',
              debug: true,
              suppressErrorLogging: false,
              insertIntoEditor: undefined,
            },
            imageUploader: {
              upload: (file) => {
                return new Promise((resolve, reject) => {
                  var url = Routes.merchant_image_assets_path.localize();
                  var formData = new FormData();
                  formData.append('image_asset[image]', file);

                  $.ajax({
                    url: url,
                    method: "post",
                    dataType: "json",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(asset) {
                      const url = asset.image.url;
                      resolve(url);
                    },
                    error: function(xhr) {
                      alert(xhr.responseText);
                      reject(xhr.responseText);
                    }
                  })
                })
              },
            },
            htmlEditButton: {}
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

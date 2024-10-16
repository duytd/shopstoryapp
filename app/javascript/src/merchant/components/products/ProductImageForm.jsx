import Dropzone from 'dropzone/dist/dropzone';
import React from 'react';
import I18n from 'i18n-js';


export default class ProductImageForm extends React.Component {
  componentDidMount() {
    if ($("#product_dropzone").length) {
      var $form = $("#product_dropzone").closest("form");
      var url = $form.attr("action");
      var authToken = $('meta[name="csrf-token"]').attr("content");
      var headers = {"X-CSRF-Token": authToken};
      var template = '<div class="dz-preview dz-file-preview"><div class="dz-image">' +
                     '<img data-dz-thumbnail width="200" height="auto" /></div><div class="dz-details"><div class="dz-filename"><span data-dz-name></span></div><div class="dz-size" data-dz-size></div></div>' +
                     '<i class="fa fa-trash" data-dz-remove></i><i class="fa fa-star hide"></i>' +
                     '</div>';

      Dropzone.autoDiscover = false;

      Dropzone.prototype._getParamName = function(n) {
        if (typeof this.options.paramName === "function") {
          return this.options.paramName(n);
        } else {
          return "" + this.options.paramName1 + (this.options.uploadMultiple ? "[" + n + "]" : "") + this.options.paramName2 + "";
        }
      };

      var productDropzone = new Dropzone("div#product_dropzone", {
        previewTemplate: template,
        acceptedFiles: "image/*",
        url: url,
        method: "put",
        headers: headers,
        paramName1: "product[product_images_attributes]",
        paramName2: "[image]",
        uploadMultiple: true,
        autoProcessQueue: true,
        thumbnailWidth: 200,
        thumbnailHeight: null,
      });

      productDropzone.on("thumbnail", (file) => {
        var $element = $(".dz-preview i.fa-star:not(.added)");
        $element.bind("click", () => {
          var data = "product[product_images_attributes][0][id]=" + file.id +
            "&product[product_images_attributes][0][featured]=1";
          $("#preview_image_" + file.id).parent().addClass("featured");
          $("#preview_image_" + file.id).parent().siblings().removeClass("featured");
          this.featureImage(data);
        });

        $element.addClass("added");

        if (typeof file.id !== "undefined") {
          $element.data("id", file.id);
          $element.attr("id", "preview_image_" + file.id);
          $element.removeClass("hide");
          $element.parent().find(".dz-details").empty();
        }

        if (file.featured) {
          $element.parent().addClass("featured");
        }
      })

      productDropzone.on("removedfile", (file) => {
        if (file.id) {
          var data = "product[id]=" + this.props.product.id +
            "&product[product_images_attributes][0][id]=" + file.id +
            "&product[product_images_attributes][0][_destroy]=" + true;

          this.deleteImage(data);
        }
      });
    }

    this.props.productImages.forEach((value) => {
      var mockFile = {id: value.id, name: value.name, featured: value.featured};

      productDropzone.emit("addedfile", mockFile);
      productDropzone.emit("thumbnail", mockFile, value.url);
    });

    this.props.updateDropzone(productDropzone);
  }

  render() {
    return (
      <div className="mb-3 dropzone" id="product_dropzone">
        <div className="dz-message">
          {I18n.t("merchant.admin.forms.dropzone_instruction")}
        </div>
      </div>
    )
  }

  deleteImage = (data) => {
    var url = Routes.merchant_product_path.localize(this.props.product.slug);

    $.ajax({
      data: data,
      url: url,
      method: "put",
      dataType: "json"
    })
  }

  featureImage = (data) => {
    var url = Routes.merchant_product_path.localize(this.props.product.slug);

    $.ajax({
      data: data,
      url: url,
      method: "put",
      dataType: "json",
    })
  }
}

var ProductForm = React.createClass({
  getInitialState: function () {
    var variationOptions = (this.props.variation_options) ? this.props.variation_options : [];
    var variations = (this.props.variations) ? this.props.variations : [];
    var productImages = (this.props.product_images) ? this.props.product_images : [];

    variationOptions.map(function(option) {
      if (option.option_values.length == 0) {
        option.option_values.push(null);
      }

      option.deleted_option_values = [];
      return option;
    })

    return {
      errors: {},
      koCount: 0,
      enCount: 0,
      product: this.props.product,
      method: this.props.method,
      variations: variations,
      variationOptions: variationOptions,
      deletedVariationOptions: [],
      deletedVariations: [],
      productImages: productImages
    };
  },
  componentDidMount: function() {
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
      productDropzone = new Dropzone("div#product_dropzone", {
        previewTemplate: template,
        acceptedFiles: ".png, .jpg, .jpeg, .gif",
        url: url,
        method: "put",
        headers: headers,
        paramName1: "product[product_images_attributes]",
        paramName2: "[image]",
        uploadMultiple: true,
        autoProcessQueue: false,
        thumbnailWidth: 200,
        thumbnailHeight: null,
      });

      productDropzone.on("thumbnail", function(file) {
        $element = $(".dz-preview i.fa-star:not(.added)");
        $element.bind("click", function() {
          var data = "product[product_images_attributes][0][id]=" + file.id +
            "&product[product_images_attributes][0][featured]=1";
          $("#preview_image_" + file.id).parent().addClass("featured");
          $("#preview_image_" + file.id).parent().siblings().removeClass("featured");
          this.handleFeatureImage(data);
        }.bind(this));

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
      }.bind(this))

      productDropzone.on("removedfile", function(file) {
        if (file.id) {
          var data = "product[id]=" + this.state.product.id +
            "&product[product_images_attributes][0][id]=" + file.id +
            "&product[product_images_attributes][0][_destroy]=" + true;

          this.handleDeleteImage(data);
        }
      }.bind(this));
    }

    this.state.productImages.forEach(function (value) {
      var mockFile = {id: value.id, name: value.name, featured: value.featured};

      productDropzone.emit("addedfile", mockFile);
      productDropzone.emit("thumbnail", mockFile, value.url);
    });
  },
  render: function () {
    var url = this.state.product ? Routes.merchant_product_path(this.state.product.id) : Routes.merchant_products_path();

    var variationNodes = this.state.variations.map(function(variation, index) {
      return (
        <Variation
          key={"variation_" + index}
          index={index}
          lastItem={(this.state.variations.length == index + 1) ? true : false}
          variation={variation}
          validateInt={this.validateInt}
          validateNumber={this.validateNumber}
          variationOptions={this.state.variationOptions}
          uploadVariationImage={this.uploadVariationImage}
          addVariation={this.addVariation}
          deleteVariation={this.deleteVariation} />
      )
    }.bind(this));

    var deletedVariationNodes = this.state.deletedVariations.map(function(variation, index) {
      return (
        <Variation
          key={"variation_" + (this.state.variations.length + index)}
          index={this.state.variations.length + index}
          variation={variation}
          deleted={true} />
      )
    }.bind(this));

    var variationOptionNodes = this.state.variationOptions.map(function(variationOption, index) {
      return (
        <VariationOption
          key={"variation_option_" + index}
          index={index}
          lastItem={(this.state.variationOptions.length == index + 1) ? true : false}
          defaultNames={this.props.default_option_names}
          addVariationOption={this.addVariationOption}
          deleteVariationOption={this.deleteVariationOption}
          addOptionValue={this.addOptionValue}
          deleteOptionValue={this.deleteOptionValue}
          variationOption={variationOption} />
      )
    }.bind(this));

    var deletedVariationOptionNodes = this.state.deletedVariationOptions.map(function(variationOption, index) {
      return (
        <VariationOption
          deleted={true}
          index={this.state.variationOptions.length + index}
          key={"variation_option_" + (this.state.variationOptions.length + index)}
          variationOption={variationOption} />
      )
    }.bind(this));

    return (
      <form ref="form" id="product-form" className="row product-form" action={url}
        acceptCharset="UTF-8" method={this.props.method} onSubmit={this.submit}
        encType="multipart/form-data" >
        <div className="col-md-9">
          <div className="block">
            <LocaleNavTab ko_errors_count={this.state.koCount} en_errors_count={this.state.enCount} />

            <div className="tab-content">
              <div id="ko" className="tab-pane fade in active">
                <div className="form-group">
                  <label className="label">{I18n.t("activerecord.attributes.product.name")}</label>
                  <div className="form-errors">
                    { (this.state.errors.name_ko) ? this.state.errors.name_ko.map(function(object){
                      return object;
                    }) : ""}
                  </div>
                  <input ref="name_ko" type="text" name="product[name_ko]"
                    className="form-control" defaultValue={this.state.product ? this.state.product.name_ko : ""} />
                </div>
                <div className="form-group">
                  <label className="label">{I18n.t("activerecord.attributes.product.description_ko")}</label>
                  <textarea ref="description_ko" name="product[description_ko]"
                    className="form-control summernote" defaultValue={this.state.product ? this.state.product.description_ko : ""}>
                  </textarea>
                </div>
              </div>
              <div id="en" className="tab-pane fade">
                <div className="form-group">
                  <label className="label">{I18n.t("activerecord.attributes.product.name")}</label>
                  <div className="form-errors">
                    {(this.state.errors.name_en) ? this.state.errors.name_en.map(function(object){
                      return object;
                    }) : ""}
                  </div>
                  <input ref="name_en" type="text" name="product[name_en]"
                    className="form-control" defaultValue={this.state.product ? this.state.product.name_en : ""} />
                </div>
                <div className="form-group">
                  <label className="label">{I18n.t("activerecord.attributes.product.description_en")}</label>
                  <div className="form-errors">
                    {(this.state.errors.description_en) ? this.state.errors.description_en.map(function(object){
                      return object;
                    }) : null}
                  </div>
                  <textarea ref="description_en" name="product[description_en]"
                    className="form-control summernote" defaultValue={this.state.product ? this.state.product.description_en : ""}>
                  </textarea>
                </div>
              </div>
            </div>

            {(this.state.product && this.state.product.slug) ?
              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.product.slug")}</label>

                <FormErrors errors={this.state.errors.slug} />
                <input type="text" name="product[slug]"
                  className="form-control" defaultValue={this.state.product.slug} />
              </div>
            : null}
          </div>

          <div className="block">
            <h4>{I18n.t("merchant.admin.forms.pricing_title")}</h4>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.product.price")}</label>
                <div className="form-errors">
                  {(this.state.errors.price) ? this.state.errors.price.map(function(object){
                    return object;
                  }) : null}
                </div>
                <input type="text" onBlur={this.validateNumber} className="form-control" name="product[price]"
                  defaultValue={(this.props.product) ? this.state.product.price.toString().toKoreanFormat() : 0} />
              </div>

              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.product.sale_off")} (%)</label>
                <input type="text" onBlur={this.validateNumber} className="form-control" name="product[sale_off]"
                  defaultValue={(this.props.product) ? this.state.product.sale_off : "0.00"} />
              </div>
            </div>
          </div>

          <div className="block">
            <h4>{I18n.t("merchant.admin.forms.images_title")}</h4>
            <div className="form-group dropzone" id="product_dropzone">
              <div className="dz-message">
                {I18n.t("merchant.admin.forms.dropzone_instruction")}
              </div>
            </div>
          </div>

          <div className="block">
            <h4>{I18n.t("merchant.admin.forms.variations_title")}</h4>
            <div className={(this.state.variations.length > 0) ? "hide" : "form-group"}>
              <label className="label">{I18n.t("activerecord.attributes.product.in_stock")}</label>
              <input type="text" ref="in_stock" onBlur={this.validateInt} className="form-control"
                name="product[in_stock]" defaultValue={(this.state.product) ? this.state.product.in_stock : "0"} />
            </div>

            {(this.state.product) ?
            <div className="variation-wrapper">
              {(this.state.variationOptions.length == 0) ?
              <button className="btn btn-sm btn-primary" onClick={this.addVariationOption}>
                {I18n.t("merchant.admin.products.buttons.add_option_type")}
              </button> : null}
              <div className={(this.state.variationOptions.length > 0) ? "row variation-options" : "hide"}>
                <div className="col-xs-5">
                  <label className="label">{I18n.t("activerecord.attributes.variation_option.name")}</label>
                </div>
                <div className="col-xs-2">
                </div>
                <div className="col-xs-5">
                  <label className="label">{I18n.t("activerecord.attributes.variation_option.value")}</label>
                </div>
              </div>
              {deletedVariationOptionNodes}
              {variationOptionNodes}
              {(this.state.variationOptions.length > 0 && this.state.variations.length == 0) ?
              <button className="btn btn-sm btn-primary" onClick={this.populateVariation}>
                {I18n.t("merchant.admin.products.buttons.populate_variation")}
              </button> : null}
              <hr/>
              {deletedVariationNodes}
              {variationNodes}
            </div> : null}
          </div>
        </div>

        <div className="col-md-3">
          <div className="block">
            <h4>{I18n.t("merchant.admin.forms.visibility_title")}</h4>
            <div className="form-group">
              <label className="styled-cb">
                <input type="hidden" name="product[visibility]" value="0" />
                <input ref="checkbox" type="checkbox" name="product[visibility]" value="1"
                  defaultChecked={(this.props.product) ? this.state.product.visibility : true} />
                <i className="fa"></i>
                {I18n.t("merchant.admin.forms.online")}
              </label>
            </div>

            <h4>{I18n.t("merchant.admin.forms.featured_title")}</h4>
            <div className="form-group">
              <label className="styled-cb">
                <input type="hidden" name="product[featured]" value="0" />
                <input ref="checkbox" type="checkbox" name="product[featured]" value="1"
                  defaultChecked={(this.state.product) ? this.state.product.featured : false} />
                <i className="fa"></i>
                {I18n.t("merchant.admin.forms.mark_as_featured")}
              </label>
            </div>
          </div>

          <div className="block">
            <h4>{I18n.t("merchant.admin.forms.inventory_title")}</h4>
            <div className="form-group">
              <label className="label">{I18n.t("activerecord.attributes.product.sku")}</label>
              <input type="text" className="form-control" name="product[sku]"
                defaultValue={(this.props.product) ? this.state.product.sku : ""}/>
            </div>
            <div className="form-group">
              <label className="label">{I18n.t("activerecord.attributes.product.vendor")}</label>
              <input type="text" className="form-control" name="product[vendor]"
                defaultValue={(this.props.product) ? this.state.product.vendor : ""}/>
            </div>
          </div>

          <div className="block">
            <h4>{I18n.t("merchant.admin.forms.categories_title")}</h4>
            <div className="row">
              {this.props.categories.map(function(category){
                return (
                  <div className="col-xs-6" key={"category_" + category.id}>
                    <label className="styled-cb" >
                      <input type="hidden" name="product[category_ids][]" value="" />
                      <input ref="checkbox" type="checkbox" name="product[category_ids][]" value={category.id}
                        defaultChecked={this.props.category_ids && this.props.category_ids.indexOf(category.id) > -1} />
                      <i className="fa"></i>
                      {translate(category, "name")}
                    </label>
                  </div>
                );
              }.bind(this))}
            </div>
          </div>

          <div className="block">
            <h4>{I18n.t("merchant.admin.forms.shipping_title")}</h4>
            <div className="form-group">
              <label className="label">{I18n.t("activerecord.attributes.product.flat_shipping_rate")}</label>
              <input type="text" className="form-control" name="product[flat_shipping_rate]"
                defaultValue={(this.props.product) ? this.state.product.flat_shipping_rate : ""}/>
            </div>

            <div className="form-group">
              <label className="styled-cb">
                <input type="hidden" name="product[pay_shipping_on_delivery]" value="0" />
                <input ref="checkbox" type="checkbox" name="product[pay_shipping_on_delivery]" value="1"
                  defaultChecked={(this.props.product) ? this.state.product.pay_shipping_on_delivery : false} />
                <i className="fa"></i>
                {I18n.t("activerecord.attributes.product.pay_shipping_on_delivery")}
              </label>
            </div>
          </div>

          <SeoTag modelName="product" seo_tag={this.props.seo_tag} errors={this.state.errors} />
        </div>

        <div className="col-md-9 text-right">
          <SubmitButtons redirect_url={this.props.redirect_url} fixed={true} />
        </div>
      </form>
    )
  },
  validateInt: function(e) {
    var integer = e.target.value.trim();

    if (!integer || isNaN(integer)) {
      e.target.value = 0;
    }
    else {
      e.target.value = parseInt(integer);
    }
  },
  validateNumber: function(e) {
    var number = e.target.value.trim();

    if (!number || isNaN(number.toString().replace(/[,.]/g, ""))) {
      e.target.value = 0;
    }
    else {
      e.target.value = parseFloat(number).toString().toKoreanFormat();
    }
  },
  addOptionValue: function(parentIndex) {
    var variationOptions = this.state.variationOptions;
    variationOptions[parentIndex].option_values.push(null);

    this.setState({variationOptions: variationOptions});
  },
  deleteOptionValue: function(parentIndex, index) {
    var variationOptions = this.state.variationOptions;
    var optionValues = variationOptions[parentIndex].option_values;
    var deletedOptionValues = variationOptions[parentIndex].deleted_option_values;
    var value = optionValues[index];

    optionValues.splice(index, 1);

    if (value != null) {
      deletedOptionValues.push(value);
    }

    if (optionValues.length == 0) {
      optionValues.push(null);
    }

    this.setState({variationOptions: variationOptions});
  },
  addVariationOption: function(e) {
    e.preventDefault();
    var variationOptions = this.state.variationOptions;
    variationOptions.push({option_values: [null], deleted_option_values: []});

    this.setState({variationOptions: variationOptions});
  },
  deleteVariationOption: function(index) {
    var variationOptions = this.state.variationOptions;
    var variationOption = variationOptions[index];
    var deletedVariationOptions = this.state.deletedVariationOptions;

    variationOptions.splice(index, 1);

    if (variationOption != null) {
      deletedVariationOptions.push(variationOption);
    }

    this.setState({
      variationOptions: variationOptions,
      deletedVariationOptions: deletedVariationOptions
    });
  },
  deleteVariation: function(index) {
    var variations = this.state.variations;
    var variation = variations[index];
    var deletedVariations = this.state.deletedVariations;

    variations.splice(index, 1);

    if (typeof variation.id !== "undefined") {
      deletedVariations.push(variation);
    }

    this.setState({
      variations: variations,
      deletedVariations: deletedVariations
    });
  },
  addVariation: function() {
    var variations = this.state.variations;
    variations.push({});

    this.setState({variations: variations});
  },
  uploadVariationImage: function(image, index) {
    var variations = this.state.variations;
    variation = variations[index];
    variation.previewImage = image;

    this.setState({variations: variations});
  },
  populateVariation: function(e) {
    e.preventDefault();
    this.submit(e, function() {
      var url = Routes.merchant_product_variations_path(this.state.product.id);

      $.ajax({
        url: url,
        method: "post",
        success: function(variations) {
          this.setState({variations: variations, deletedVariations: []});
        }.bind(this),
        error: function(xhr) {
          console.log(xhr.responseText);
        }
      })
    })
  },
  submit: function(e, callback) {
    if (typeof e !== "undefined" && e != null) {
      e.preventDefault();
    }

    var description_en = $(this.refs.description_en).summernote("code");
    var description_ko = $(this.refs.description_ko).summernote("code");

    this.refs.description_en.value = description_en;
    this.refs.description_ko.value = description_ko;

    if (this.state.variations.length > 0) {
      this.refs.in_stock.value = "0";
    }

    var form = $(this.refs.form);

    this.handleProductSubmit(form, callback);
  },
  handleProductSubmit: function(form, callback) {
    var method = this.state.product ? "put" : "post";
    var url = this.state.product ? Routes.merchant_product_path(this.state.product.id) : Routes.merchant_products_path();

    $.ajax({
      data: new FormData(form[0]),
      url: url,
      method: method,
      dataType: "json",
      contentType: false,
      processData: false,
      success: function(response) {
        var productId = response.product.id;
        this.postImages(productId, Routes.merchant_product_path(productId));

        if (this.state.product && !$.isFunction(callback)) {
          Turbolinks.visit(this.props.redirect_url);
        }
        else {
          var variationOptions = response.variation_options;

          variationOptions.map(function(option) {
            if (option.option_values.length == 0) {
              option.option_values.push(null);
            }

            option.deleted_option_values = [];
            return option
          })

          this.setState({
            errors: [],
            koCount: 0,
            enCount: 0,
            product: response.product,
            variationOptions: variationOptions,
            deletedVariationOptions: [],
            method: "put"
          }, callback);
        }
      }.bind(this),
      error: function(xhr) {
        var koCount = 0;
        var enCount = 0;
        var errors = xhr.responseJSON;

        koCount += (errors.name_ko) ? errors.name_ko.length : 0;
        koCount += (errors.description_ko) ? errors.description_ko.length : 0;
        enCount += (errors.name_en) ? errors.name_en.length : 0;
        enCount += (errors.description_en) ? errors.description_en.length : 0;

        this.setState({
          errors: errors,
          koCount: koCount,
          enCount: enCount,
        });
      }.bind(this)
    });
  },
  postImages: function(productId, url) {
    productDropzone.on("sending", function(file, xhr, formData) {
      formData.append("product[id]", productId);
    });

    productDropzone.options.url = url;
    productDropzone.processQueue();
  },
  handleDeleteImage: function(data) {
    var url = Routes.merchant_product_path(this.state.product.id);

    $.ajax({
      data: data,
      url: url,
      method: "put",
      dataType: "json"
    })
  },
  handleFeatureImage: function(data) {
    var url = Routes.merchant_product_path(this.state.product.id);

    $.ajax({
      data: data,
      url: url,
      method: "put",
      dataType: "json",
    })
  }
})

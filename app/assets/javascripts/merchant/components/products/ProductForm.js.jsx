var ProductForm = React.createClass({
  getInitialState: function () {
    var variationOptions = (this.props.variation_options) ? this.props.variation_options : [];
    var variations = (this.props.variations) ? this.props.variations : [];
    var productImages = (this.props.product_images) ? this.props.product_images : [];

    variationOptions.forEach(function(variationOption, index) {
      if (!variationOption.isNew) {
        variationOption["isDeleted"] = false;
        variationOption["isNew"] = false;
      }
    })

    variations.forEach(function(variation, index) {
      if (!variation.isNew) {
        variation["isDeleted"] = false;
        variation["isNew"] = false;
      }
    })

    return {
      errors: {},
      koCount: 0,
      enCount: 0,
      product: this.props.product,
      enProduct: this.props.en_product,
      koProduct: this.props.ko_product,
      variations: variations,
      method: this.props.method,
      variationCount: variations.length,
      variationOptions: variationOptions,
      variationOptionCount: variationOptions.length,
      productImages: productImages
    };
  },
  componentDidMount: function() {
    if ($("#product_dropzone").length) {
      var $form = $("#product_dropzone").closest("form");
      var url = $form.attr("action");
      var authToken = $('meta[name="csrf-token"]').attr("content");
      var headers = {"X-CSRF-Token": authToken};
      var template = '<div class="dz-preview dz-file-preview"><div className="dz-details">' +
                     '<img data-dz-thumbnail width="200" height="auto" /></div>' +
                     '<i class="fa fa-trash" data-dz-remove></i>' +
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
        thumbnailHeight: null
      });

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
      var mockFile = {id: value.id, name: value.name};

      productDropzone.options.addedfile.call(productDropzone, mockFile);
      productDropzone.options.thumbnail.call(productDropzone, mockFile, value.url);
    });
  },
  render: function () {
    var variationCount = this.state.variationCount;
    var url = this.state.product ? Routes.merchant_product_path(this.state.product.id) : Routes.merchant_products_path();

    var variationNodes = this.state.variations.map(function(variation, index) {
      return (
        <Variation
          key={"variation_" + Math.random()}
          index={index}
          variation={variation}
          submit={this.submit}
          validateInt={this.validateInt}
          validateNumber={this.validateNumber}
          variationCount={variationCount}
          variationOptions={this.state.variationOptions}
          addVariation={this.addVariation}
          deleteVariation={this.deleteVariation} />
      )
    }.bind(this));

    var variationOptionNodes = this.state.variationOptions.map(function(variationOption, index) {
      return (
        <VariationOption
          key={"variation_option_" + Math.random()}
          index={index}
          variationOption={variationOption}
          deleteVariationOption={this.deleteVariationOption}
          submit={this.submit}
          defaultNames={this.props.default_option_names} />
      )
    }.bind(this));

    return (
      <form ref="form" id="product-form" className="product-form" action={url}
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
                    className="form-control" defaultValue={(this.state.koProduct) ? this.props.ko_product.name : ""} />
                </div>
                <div className="form-group">
                  <label className="label">{I18n.t("activerecord.attributes.product.description_ko")}</label>
                  <textarea ref="description_ko" name="product[description_ko]"
                    className="form-control summernote" defaultValue={(this.state.koProduct) ? this.props.ko_product.description : ""}>
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
                    className="form-control" defaultValue={(this.state.enProduct) ? this.state.enProduct.name : ""} />
                </div>
                <div className="form-group">
                  <label className="label">{I18n.t("activerecord.attributes.product.description_en")}</label>
                  <div className="form-errors">
                    {(this.state.errors.description_en) ? this.state.errors.description_en.map(function(object){
                      return object;
                    }) : null}
                  </div>
                  <textarea ref="description_en" name="product[description_en]"
                    className="form-control summernote" defaultValue={(this.state.enProduct) ? this.state.enProduct.description : ""}>
                  </textarea>
                </div>
              </div>
            </div>
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
            <h4>{I18n.t("merchant.admin.forms.variations_title")}</h4>
            <div className={(variationCount > 0) ? "hide" : "form-group"}>
              <label className="label">{I18n.t("activerecord.attributes.product.in_stock")}</label>
              <input type="text" ref="in_stock" onBlur={this.validateInt} className="form-control"
                name="product[in_stock]" defaultValue={(this.props.product) ? this.state.product.in_stock : "0"} />
            </div>
            <button className="btn btn-sm btn-primary" onClick={this.addVariationOption}>
              {I18n.t("merchant.admin.products.buttons.add_option_type")}
            </button>
            <div className={(this.state.variationOptions.length > 0) ? "row variation-options" : "hide"}>
              <div className="col-xs-5">
                <label className="label">{I18n.t("activerecord.attributes.variation_option.name")}</label>
              </div>
              <div className="col-xs-5">
                <label className="label">{I18n.t("activerecord.attributes.variation_option.value")}</label>
              </div>
              <div className="col-xs-2">
              </div>
            </div>
            {variationOptionNodes}
            {(this.state.variationOptions.length > 0 && this.state.variations.length == 0) ?
              <button className="btn btn-sm btn-primary" onClick={this.populateVariation}>
                {I18n.t("merchant.admin.products.buttons.populate_variation")}
              </button> :
              null
            }
            <hr/>
            {variationNodes}
          </div>

          <div className="block">
            <h4>{I18n.t("merchant.admin.forms.images_title")}</h4>
            <div className="form-group dropzone" id="product_dropzone">
              <div className="dz-message">
                {I18n.t("merchant.admin.forms.dropzone_instruction")}
              </div>
            </div>
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
          </div>

          <div className="block">
            <h4>{I18n.t("merchant.admin.forms.inventory_title")}</h4>
            <div className="form-group">
              <label className="label">{I18n.t("activerecord.attributes.product.sku")}</label>
              <input type="text" className="form-control" name="product[sku]"
                defaultValue={(this.props.product) ? this.state.product.sku : ""}/>
            </div>
          </div>

          <div className="block">
            <h4>{I18n.t("merchant.admin.forms.categories_title")}</h4>
            {this.props.categories.map(function(category){
              return (
                <label className="styled-cb" key={category.id}>
                  <input type="hidden" name="product[category_ids][]" value="" />
                  <input ref="checkbox" type="checkbox" name="product[category_ids][]" value={category.id}
                    defaultChecked={this.props.category_ids && this.props.category_ids.indexOf(category.id) > -1} />
                  <i className="fa"></i>
                  {(category.name == "") ? category.name_en : category.name}
                </label>
              );
            }.bind(this))}
          </div>
        </div>

        <div className="col-md-9 text-right">
          <SubmitButtons redirect_url={this.props.redirect_url} />
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
  addVariationOption: function(e) {
    e.preventDefault();

    this.submit(null, {name: "new_option"});
  },
  populateVariation: function(e) {
    e.preventDefault();
    var url = Routes.merchant_product_variations_path(this.state.product.id);

    $.ajax({
      url: url,
      method: "post",
      success: function(variations) {
        this.setState({variations: variations, variationCount: variations.length});
      }.bind(this),
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    })
  },
  deleteVariationOption: function(variationOption) {
    var variationOptions = this.state.variationOptions;
    var index = variationOptions.indexOf(variationOption);
    var variationOptionCount = this.state.variationOptionCount - 1;

    if (variationOption.isNew) {
      variationOptions.splice(index, 1);
    }
    else {
      variationOptions[index].isDeleted = true;
    }

    this.setState({variationOptionCount: variationOptionCount}, this.submit);
  },
  addVariation: function() {
    this.submit(null, {name: "new_variation"});
  },
  deleteVariation: function(variation) {
    var variations = this.state.variations;
    var index = variations.indexOf(variation);
    var variationCount = this.state.variationCount - 1;

    if (variation.isNew) {
      variations.splice(index, 1);
    }
    else {
      variations[index].isDeleted = true;
    }

    this.setState({variations: variations, variationCount: variationCount}, this.submit);
  },
  submit: function(e, trigger) {
    if (typeof e !== "undefined" && e != null) {
      e.preventDefault();
    }

    var description_en = $(this.refs.description_en).summernote("code");
    var description_ko = $(this.refs.description_ko).summernote("code");

    this.refs.description_en.value = description_en;
    this.refs.description_ko.value = description_ko;

    if (this.state.variationCount > 0) {
      this.refs.in_stock.value = "0";
    }

    var form = $(this.refs.form);

    this.handleProductSubmit(form, trigger);
  },
  handleProductSubmit: function(form, trigger = null) {
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

        if (trigger != null) {
          switch(trigger.name) {
            case "new_option":
              response.variation_options.push({isNew: true});
              break;
            case "new_variation":
              response.variations.push({isNew: true, price: this.state.product.price})
              break;
            case "new_option_value":
              response.variation_options.forEach(function(option) {
                if (option.id == trigger.id) {
                  option.option_values.push({isNew: true});
                }
              })
            default:
              break;
          }
        }

        this.setState({
          errors: [],
          koCount: 0,
          enCount: 0,
          product: response.product,
          en_product: response.en_product,
          ko_product: response.ko_product,
          product: response.product,
          variations: response.variations,
          variationOptions: response.variation_options,
          variationCount: response.variations.length,
          variationOptionCount: response.variation_options.length,
          method: "put"
        });
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
    var url = this.props.url;

    $.ajax({
      data: data,
      url: url,
      method: "put",
      dataType: "json"
    })
  }
})

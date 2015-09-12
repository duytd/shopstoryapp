var ProductForm = React.createClass({
  getInitialState: function () {
    var variations = (this.props.variations) ? this.props.variations : [];
    var product_images = (this.props.product_images) ? this.props.product_images : [];

    variations.forEach(function(variation, index) {
      variation["position"] = index;
      variation["isDeleted"] = false;
      variation["isNew"] = false;
    })

    return {
      errors: {},
      ko_count: 0,
      en_count: 0,
      variation_count: variations.length,
      variations: variations,
      product_images: product_images
    };
  },
  componentDidMount: function() {
    if ($("#product_dropzone").length) {
      var $form = $("#product_dropzone").closest("form");
      var url = $form.attr("action");
      var auth_token = $('meta[name="csrf-token"]').attr("content");
      var headers = {"X-CSRF-Token": auth_token};
      var template = '<div class="dz-preview dz-file-preview"><div className="dz-details">' +
                     '<img data-dz-thumbnail width="120" height="120" /></div>' +
                     '<div class="dz-progress"><span className="dz-upload" data-dz-uploadprogress></span></div>' +
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
        autoProcessQueue: false
      });

      productDropzone.on("removedfile", function(file) {
        if (file.id) {
          var data = "product[id]=" + this.props.product.id +
            "&product[product_images_attributes][0][id]=" + file.id +
            "&product[product_images_attributes][0][_destroy]=" + true;

          this.handleDeleteImage(data);
        }
      }.bind(this));
    }

    this.state.product_images.forEach(function (value) {
      var mockFile = {id: value.id, name: value.name};

      productDropzone.options.addedfile.call(productDropzone, mockFile);
      productDropzone.options.thumbnail.call(productDropzone, mockFile, value.url);
    });
  },
  render: function () {
    var variationNodes = this.state.variations.map(function (variation) {
      return <Variation key={variation.position} validateInt={this.validateInt} variation={variation} 
        deleteVariation={this.deleteVariation} />
    }.bind(this));

    return (
      <form ref="form" id="product-form" className="product-form" action={this.props.url}
        accept-charset="UTF-8" method={this.props.method} onSubmit={this.handleSubmit}
        encType="multipart/form-data" >
        <div className="col-md-9">
          <div className="block">
            <LocaleNavTab ko_errors_count={this.state.ko_count} en_errors_count={this.state.en_count} />

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
                    className="form-control" defaultValue={(this.props.ko_product) ? this.props.ko_product.name : ""} />
                </div>
                <div className="form-group">
                  <label className="label">{I18n.t("activerecord.attributes.product.description_ko")}</label>
                  <div className="form-errors">
                    {(this.state.errors.description_ko) ? this.state.errors.description_ko.map(function(object){
                      return object;
                    }) : ""}
                  </div>
                  <textarea ref="description_ko" name="product[description_ko]" 
                    className="form-control summernote" defaultValue={(this.props.ko_product) ? this.props.ko_product.description : ""}>
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
                    className="form-control" defaultValue={(this.props.en_product) ? this.props.en_product.name : ""} />
                </div>
                <div className="form-group">
                  <label className="label">{I18n.t("activerecord.attributes.product.description_en")}</label>
                  <div className="form-errors">
                    {(this.state.errors.description_en) ? this.state.errors.description_en.map(function(object){
                      return object;
                    }) : ""}
                  </div>
                  <textarea ref="description_en" name="product[description_en]" 
                    className="form-control summernote" defaultValue={(this.props.en_product) ? this.props.en_product.description : ""}>
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
                  }) : ""}
                </div>
                <input type="text" onBlur={this.validateNumber} className="form-control" name="product[price]"
                  defaultValue={(this.props.product) ? this.props.product.price : "0.00"} />
              </div>

              <div className="form-group col-md-6">
                <label className="label">{I18n.t("activerecord.attributes.product.sale_off")} (%)</label>
                <input type="text" onBlur={this.validateNumber} className="form-control" name="product[sale_off]"
                  defaultValue={(this.props.product) ? this.props.product.sale_off : "0.00"} />
              </div>
            </div>
          </div>

          <div className="block">
            <h4>{I18n.t("merchant.admin.forms.variations_title")}</h4>
            <div className={(this.state.variation_count > 0) ? "hide" : "form-group"}>
              <label className="label">{I18n.t("activerecord.attributes.product.in_stock")}</label>
              <input type="text" ref="in_stock" onBlur={this.validateInt} className="form-control" 
                name="product[in_stock]" defaultValue={(this.props.product) ? this.props.product.in_stock : "0"} />
            </div>
            <button className="btn btn-sm btn-primary" onClick={this.addVariation}>
              {I18n.t("merchant.admin.buttons.add_variation")}
            </button>
            <table className={(this.state.variation_count > 0) ? "table" : "hide"}>
              <thead>
                <tr>
                  <th>{I18n.t("activerecord.attributes.variation.color")}</th>
                  <th>{I18n.t("activerecord.attributes.variation.size")}</th>
                  <th>{I18n.t("activerecord.attributes.variation.in_stock")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {variationNodes}
              </tbody>
            </table>
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
                  defaultChecked={this.props.product && this.props.product.visibility} />
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
                defaultValue={(this.props.product) ? this.props.product.sku : ""}/>
            </div>
          </div>

          <div className="block">
            <h4>{I18n.t("merchant.admin.forms.categories_title")}</h4>
            {this.props.categories.map(function(category){
              return  <label className="styled-cb" key={category.id}>
                        <input type="hidden" name="product[category_ids][]" value="" />
                        <input ref="checkbox" type="checkbox" name="product[category_ids][]" value={category.id} 
                          defaultChecked={this.props.category_ids && this.props.category_ids.indexOf(category.id) > -1} />
                        <i className="fa"></i>
                        {(category.name == "") ? category.name_en : category.name}
                      </label>;
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
      e.target.value = "0";
    }
    else {
      e.target.value = parseInt(integer);
    }
  },
  validateNumber: function(e) {
    var number = e.target.value.trim();

    if (!number || isNaN(number)) {
      e.target.value = "0.00";
    }
    else {
      e.target.value = parseFloat(number).toFixed(2);
    }
  },
  addVariation: function(e) {
    e.preventDefault();
    var variations = this.state.variations;
    var variation_count = this.state.variation_count + 1;

    variations.push({position: variations.length, isNew: true});
    this.setState({variations: variations, variation_count: variation_count});
  },
  deleteVariation: function(variation) {
    var variations = this.state.variations;
    var index = variations.indexOf(variation);
    var variation_count = this.state.variation_count - 1;

    if (variation.isNew) {
      variations.splice(index, 1);
    }
    else {
      variations[index]["isDeleted"] = true;
    }

    this.setState({variations: variations, variation_count: variation_count});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var description_en = $(this.refs.description_en.getDOMNode()).code();
    var description_ko = $(this.refs.description_ko.getDOMNode()).code();

    this.refs.description_en.value = description_en;
    this.refs.description_ko.value = description_ko;

    if (this.state.variation_count > 0) {
      this.refs.in_stock.getDOMNode().value = "0";
    }

    var formData = $(this.refs.form.getDOMNode()).serialize();

    this.handleProductSubmit(formData, this.props.url, this.props.method);
  },
  handleProductSubmit: function(formData, action, method) {
    $.ajax({
      data: formData,
      url: action,
      method: method,
      dataType: "json",
      success: function(data) {
        if (data.status == "success") {
          var productId = data.data.id;

          this.postImages(productId);
          Turbolinks.visit(this.props.redirect_url);
        }
        else {
          var ko_count = 0;
          var en_count = 0;

          ko_count += (data.data.name_ko) ? data.data.name_ko.length : 0; 
          ko_count += (data.data.description_ko) ? data.data.description_ko.length : 0;
          en_count += (data.data.name_en) ? data.data.name_en.length : 0;
          en_count += (data.data.description_en) ? data.data.description_en.length : 0;

          this.setState({
            errors: data.data, 
            ko_count: ko_count,
            en_count: en_count
          });
        }
      }.bind(this)
    });
  },
  postImages: function(productId) {
    productDropzone.on("sending", function(file, xhr, formData) {
      formData.append("product[id]", productId);
    });

    productDropzone.processQueue();
  },
  handleDeleteImage: function(data) {
    var url = this.props.url;

    $.ajax({
      data: data,
      url: url,
      method: "put",
      dataType: "json"
    });
  }
});

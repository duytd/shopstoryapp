var DiscountForm = React.createClass({
  getInitialState: function () {
    var discountType = this.props.discount ? this.props.discount.discount_type : "percentage";

    return {
      discountType: discountType,
      errors: {},
    };
  },
  renderPercentageInput: function() {
    return (
      <div className="input-group">
        <span className="input-group-addon">%</span>
        <input type="text" name="discount[amount]" className="form-control"/>
      </div>
    )
  },
  componentDidMount: function() {
    this.loadDatePicker();
  },
  componentDidUpdate: function() {
    this.loadDatePicker();
  },
  renderFixedAmountInput: function() {
    return (
      <div className="input-group">
        <span className="input-group-addon">{this.props.currency}</span>
        <input type="text" name="discount[amount]" className="form-control"/>
      </div>
    )
  },
  render: function () {
    return (
      <form ref="form" className="discount-form" action={this.props.url}
        acceptCharset="UTF-8" method={this.props.method} onSubmit={this.submit}>
        <div className="block">
          <div className="form-group">
            <label className="label">{I18n.t("activerecord.attributes.discount.code")}</label>
            <span className="pull-right"><a onClick={this.generateCode}>{I18n.t("merchant.admin.buttons.generate_code")}</a></span>
            <FormErrors errors={this.state.errors.code} />
            <input ref="code" type="text" name="discount[code]" className="form-control"
              defaultValue={this.props.discount ? this.props.discount.code : ""} />
          </div>

          <div className="form-group">
            <label className="label">{I18n.t("activerecord.attributes.discount.discount_type")}</label>
            <div className="select">
              <FormErrors errors={this.state.errors.type} />
              <select ref="discount_type" name="discount[discount_type]" className="form-control" onChange={this.switchDiscountType} defaultValue={this.state.discountType}>
                {["percentage", "fixed_amount"].map(function(type, index) {
                  return <option value={type} key={"discount_type_" + index}>{I18n.t("merchant.admin.discounts." + type)}</option>
                })}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="label">{I18n.t("activerecord.attributes.discount.amount")}</label>
            <FormErrors errors={this.state.errors.amount} />
            {(this.state.discountType == "percentage") ? this.renderPercentageInput() : this.renderFixedAmountInput()}
          </div>

          <div className="form-group">
            <label className="label">{I18n.t("activerecord.attributes.discount.start_date")}</label>
            <FormErrors errors={this.state.errors.start_date} />
            <input type="text" name="discount[start_date]" className="datepicker form-control"
              defaultValue={this.props.discount ? this.props.discount.start_date : ""} />
          </div>

         <div className="form-group">
            <label className="label">{I18n.t("activerecord.attributes.discount.expiry_date")}</label>
            <FormErrors errors={this.state.errors.expiry_date} />
            <input type="text" name="discount[expiry_date]" className="datepicker form-control"
              defaultValue={this.props.discount ? this.props.discount.expiry_date : ""} />
          </div>
        </div>

        <div className="row col-md-12">
          <SubmitButtons redirect_url={this.props.redirect_url} />
        </div>
      </form>
    )
  },
  loadDatePicker: function() {
    $(".datepicker").datepicker({
      locale: I18n.locale,
      format: "yyyy-mm-dd"
    });
  },
  switchDiscountType: function() {
    var discountType = this.refs.discount_type.value;
    this.setState({discountType: discountType});
  },
  generateCode: function() {
    var code = this.randomCode();
    this.refs.code.value = code;
  },
  randomCode: function() {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
    var code = "";
    for (var x = 0; x < 8; x++) {
        var i = Math.floor(Math.random() * chars.length);
        code += chars.charAt(i);
    }
    return code;
  },
  submit: function(e) {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();
    var method = this.props.method;
    var url = this.props.url;

   $.ajax({
      data: formData,
      url: url,
      method: method,
      dataType: "json",
      success: function(data) {
        Turbolinks.visit(Routes.merchant_discounts_path.localize());
      },
      error: function(xhr) {
        var errors = xhr.responseJSON;

        this.setState({
          errors: errors,
        });
      }.bind(this)
    });
  }
})

import React from 'react';
import I18n from 'i18n-js';

export default class PaymentMethod extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      payment_method: this.props.payment_method
    };
  }

  render() {
    var options = this.state.payment_method.payment_method_options.map(function(option, index){
      return (
        <div className="mb-3 col-md-6" key={"payment_method_" + index}>
          <label>{option.title}</label>
          <input type="hidden" name={"payment_method[payment_method_options_attributes][" + index + "][id]"} value={option.id} />
          <input type="text" className="form-control" name={"payment_method_shop[payment_method_options_attributes][" + index + "][value]"} defaultValue={option.value} />
        </div>
      )
    }.bind(this));

    return (
      <div className="row">
        <div className="col-sm-2">
          <h3 className="title">{this.props.payment_method.name}</h3>
          <p className="small">{this.props.payment_method.description}</p>
          <input ref="activator" type="checkbox" name="payment_method_shop[active]" defaultChecked={this.state.payment_method.active} onChange={this.activate} />
        </div>
        <div className="col-sm-10">
          <div className="block">
            <form ref="form" id="paymentMethod" acceptCharset="UTF-8" onSubmit={this.submit}>
              <input type="hidden" ref="active" name="payment_method_shop[active]" value={this.state.payment_method.active} />
              <div className="row">
                <div className="mb-3 col-md-12">
                  {(this.state.errors.length > 0) ? <Errors errors={this.state.errors} /> : null}
                </div>
              </div>
              <div className="row">
                {options}
              </div>
              <div className="row">
                <div className="mb-3 col-md-12">
                  <button type="submit" className="btn btn-success">
                    {I18n.t("merchant.admin.buttons.save")}
                    <span ref="loading" className="d-none">
                      <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>
                      <span className="sr-only">Loading...</span>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  activate = () => {
    if (this.refs.activator.checked) {
      this.refs.active.value = true;
    }
    else {
      this.refs.active.value = false;
    }
    this.submit();
  }

  submit = (e) => {
    if (typeof e !== "undefined")
      e.preventDefault();

    var loading = $(this.refs.loading),
      form = $(this.refs.form);

    $.ajax({
      url: Routes.merchant_payment_method_path.localize(this.state.payment_method.id),
      method: "PUT",
      data: new FormData(form[0]),
      contentType: false,
      processData: false,
      dataType: "json",
      beforeSend: function() {
        loading.removeClass("d-none");
      },
      complete: function() {
        loading.addClass("d-none");
      },
      success: function(response) {
        this.setState({payment_method: response, errors: []});
      }.bind(this),
      error: function(xhr) {
        this.setState({errors: xhr.responseJSON}, function() {
          var state = this.state.payment_method.active;
          $(this.refs.activator).bootstrapSwitch("state", state, true);
        }.bind(this));
      }.bind(this)
    });
  }
};

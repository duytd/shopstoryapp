export default class CustomerForm extends React.Component {
  getInitialState() {
    return {
      errors: {},
      country: "KR"
    }
  },
  render() {
    var countryNodes = this.props.countries.map(function (country, index) {
      return <option key={index} value={country[0]}>{country[1]}</option>
    }.bind(this));

    return (
      <div className="customer-form">
        <div className="row">
          <div className="col-sm-8">
            <div className="block">
              <form ref="form"  action={this.props.url}
                acceptCharset="UTF-8" method={this.props.method} onSubmit={this.submit}>

                {(this.state.country != "KR") ?
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label className="label">{i18n.t("activerecord.attributes.customer.first_name")}</label>
                    <input type="text" name="customer[first_name]"
                      className="form-control" defaultValue={this.props.customer.first_name} />
                  </div>

                  <div className="form-group col-sm-6">
                    <label className="label">{i18n.t("activerecord.attributes.customer.last_name")}</label>
                    <input type="text" name="customer[last_name]"
                      className="form-control" defaultValue={this.props.customer.first_name} />
                  </div>
                </div> : null}

                {(this.state.country == "KR") ?
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label className="label">{i18n.t("activerecord.attributes.customer.name")}</label>
                    <input type="text" name="customer[last_name]"
                      className="form-control" defaultValue={this.props.customer.first_name} />
                  </div>
                </div> : null}

                <div className="row">
                  <div className="form-group col-sm-6">
                    <label className="label">{i18n.t("activerecord.attributes.customer.email")}</label>
                    <FormErrors errors={this.state.errors.email} />
                    <input type="text" name="customer[email]"
                      className="form-control" defaultValue={this.props.customer.email} />
                  </div>

                  <div className="form-group col-sm-6">
                    <label className="label">{i18n.t("activerecord.attributes.customer.phone")}</label>
                    <input type="text" name="customer[phone]"
                      className="form-control" defaultValue={this.props.customer.phone} />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-md-12">
                    <label className="label">{i18n.t("activerecord.attributes.customer.country")}</label>
                    <div className="select">
                      <select ref="country" className="form-control" name="customer[country]" onChange={this.updateCountry}
                        defaultValue={(this.props.customer.country) ? this.props.customer.country : this.props.default_country}>
                        {countryNodes}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-8">
                    <label className="label">{i18n.t("activerecord.attributes.customer.address")}</label>
                    <input ref="address" type="text" name="customer[address]"
                      className="form-control" defaultValue={this.props.customer.address} onClick={this.streetClick} />
                  </div>

                  <div className="form-group col-sm-4">
                    <label className="label">{i18n.t("activerecord.attributes.customer.zip_code")}</label>
                    <input ref="zipcode" type="text" name="customer[zip_code]"
                      className="form-control" defaultValue={this.props.customer.zip_code} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <SubmitButtons redirect_url={Routes.merchant_customers_path.localize()} />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="block">
              <label className="label">{i18n.t("activerecord.attributes.customer.total_spent")}</label>
              <p>{this.props.customer.total_spent}</p>
              <hr/>
              <label className="label">{i18n.t("activerecord.attributes.customer.total_orders")}</label>
              <p>{this.props.customer.total_orders}</p>
              <hr/>
              <label className="label">{i18n.t("activerecord.attributes.customer.last_sign_in_at")}</label>
              <p>{this.props.customer.last_sign_in_at}</p>
              <hr/>
              <label className="label">{i18n.t("activerecord.attributes.customer.last_order")}</label>
              {(this.props.orders.length > 0) ?
              <p>
                <a href={Routes.edit_merchant_product_order_path.localize(this.props.orders[this.props.orders.length - 1].id)}>
                  {"#" + this.props.orders[this.props.orders.length - 1].id}
                </a>
              </p> : null}
            </div>
          </div>
        </div>

        <div className="block">
          <h3>{i18n.t("merchant.admin.customers.customer_orders")}</h3>
          {this.props.orders.length > 0 ?
            <CustomerOrderList orders={this.props.orders} />
            : <p>{i18n.t("merchant.admin.customers.no_order")}</p>}
        </div>
      </div>
    )
  },
  updateCountry(e) {
    this.setState({country: e.target.value})
  },
  streetClick() {
    if (this.state.country == "KR") {
      openDaumPostcode(function(data) {
        var address = data.address,
          zipcode = data.zonecode;

        this.setAddress(address, zipcode);
      }.bind(this))
    }
  },
  setAddress(address, zipcode) {
    address = typeof address !== "undefined" ? address : "";
    zipcode = typeof zipcode !== "undefined" ? zipcode : "";

    this.refs.address.value = address;
    this.refs.zipcode.value = zipcode;
  },
  submit(e) {
    e.preventDefault();
    var data = $(this.refs.form).serialize(),
      url = this.props.url,
      method = this.props.method;

    $.ajax({
      data: data,
      url: url,
      method: method,
      dataType: "json",
      success: function(data) {
        this.setState({errors: []})
      }.bind(this),
      error: function(xhr) {
        var errors = xhr.responseJSON;

        this.setState({errors: errors});
      }.bind(this)
    });
  },
};

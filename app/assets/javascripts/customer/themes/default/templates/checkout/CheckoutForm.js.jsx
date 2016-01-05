var CheckoutForm = React.createClass({
  getInitialState: function() {
    return {
      order: this.props.order
    }
  },
  render: function() {
    var steps = ["shipping", "billing"];

    var stepHeaders = steps.map(function(step, index){
      var active = (this.state.order.current_step == step) ? "active" : "";
      return (
        <li>
          <span className={"badge " + active}>{index+1}</span>
          {I18n.t("checkout.steps." + step)}
        </li>
      )
    }.bind(this))

    var form = (this.state.order.shipping_address) ?
      <BillingForm
        mobile={this.props.globalVars.mobile}
        order={this.state.order}
        updateOrder={this.updateOrder}
        lang={this.props.globalVars.lang}
        countries={this.props.countries}
        payment_methods={this.props.payment_methods}
        default_country={this.props.default_country} /> :
      <ShippingForm
        editing={false}
        order={this.state.order}
        updateOrder={this.updateOrder}
        lang={this.props.globalVars.lang}
        countries={this.props.countries}
        default_country={this.props.default_country} />;

    return (
      <Layout globalVars={this.props.globalVars}>
        <div className="row checkout-form">
          <div className="col-sm-8">
            <ul className="steps">
              {stepHeaders}
            </ul>
            {form}
          </div>

          <div className="col-sm-4">
            <Summary
              step={this.state.order.current_step}
              order={this.state.order}
              cart={this.props.globalVars.cart}
              currency={this.props.globalVars.currency}
            />

            <ShippingForm
              editing={true}
              order={this.state.order}
              updateOrder={this.updateOrder}
              lang={this.props.globalVars.lang}
              countries={this.props.countries}
              default_country={this.props.default_country} />
          </div>
        </div>
      </Layout>
    )
  },
  updateOrder: function(order) {
    this.setState({order: order})
  }
})

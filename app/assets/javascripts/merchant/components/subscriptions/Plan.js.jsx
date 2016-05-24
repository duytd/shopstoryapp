var Plan = React.createClass({
  componentDidMount: function() {
    var script = document.createElement("script");
    var stripe = document.getElementById("stripe_" + this.props.plan.id);
    var label = I18n.t("merchant.admin.buttons.choose");

    if (stripe != null) {
      script.src = "https://checkout.stripe.com/checkout.js";
      script.setAttribute("class", "stripe-button");
      script.setAttribute("data-key", this.props.stripe_key);
      script.setAttribute("data-amount", this.props.price);
      script.setAttribute("data-email", this.props.email);
      script.setAttribute("data-currency", "krw");
      script.setAttribute("data-label", label);

      stripe.parentNode.insertBefore(script, stripe);
    }
  },
  render: function() {
    var featureNodes = this.props.plan.parsed_features.map(function(feature, index) {
      return <li key={"feature" + index}><b>{feature[0].capitalize()}</b> {feature[1].capitalize()}</li>
    })

    var method = (this.props.current_subscription) ? "put" : "post";
    var action = (this.props.current_subscription) ? Routes.merchant_subscription_path.localize(this.props.current_subscription.id) : Routes.merchant_subscriptions_path.localize();

    return (
      <div className="plan col-sm-4">
        <div className="block">
          <div className="heading">
            <div className="name">
              {this.props.plan.name}
            </div>

            <div className="price">
              KRW {this.props.plan.price}
            </div>
          </div>
          <ul>
            {featureNodes}
          </ul>
          {(this.props.current_subscription && this.props.current_subscription.plan.id == this.props.plan.id) ?
            <button disabled="true" className="btn btn-default btn-lg">{I18n.t("merchant.admin.buttons.current_plan")}</button> :
            <form method="post" action={action}>
              {(method == "put") ?
                <input type="hidden" name="_method" value="put"/> : null}
              <input type="hidden" name="plan_id" value={this.props.plan.stripe_id} />
              <div id={"stripe_" + this.props.plan.id}></div>
            </form>
          }
        </div>
      </div>
    )
  }
})

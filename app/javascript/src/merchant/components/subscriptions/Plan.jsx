import React from 'react';
import I18n from 'i18n-js';


export default class Plan extends React.Component {
  render() {
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
              USD {this.props.plan.price}
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
}

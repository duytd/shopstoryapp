export default class Account extends React.Component {
  render() {
    return (
      <div className="account">
        <div className="block">
          <div className="row">
            <div className="col-sm-4">
              <label>{I18n.t("merchant.admin.pages.account.email")}</label>
              <p>{this.props.user.email}</p>
            </div>
            <div className="col-sm-4">
              <label>{I18n.t("merchant.admin.pages.account.member_since")}</label>
              <p>{this.props.user.created_at}</p>
            </div>
            <div className="col-sm-4">
              <label>{I18n.t("merchant.admin.pages.account.plan")}</label>
              <p>{this.props.subscription ? this.props.subscription.plan.name : I18n.t("merchant.admin.pages.account.free_trial") + " - " + I18n.t("merchant.admin.pages.account.day_left", {count: this.props.remaining_trial})} </p>
              {this.props.subscription ?
                <p>{this.props.subscription.start_at} - {this.props.subscription.end_at}</p> : null}
            </div>
          </div>
        </div>

        <Subscription
          current_subscription={this.props.subscription}
          user={this.props.user}
          plans={this.props.plans}
          stripe_key={this.props.stripe_key} />
      </div>
    )
  }
}

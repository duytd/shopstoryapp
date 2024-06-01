export default class Subscription extends React.Component {
  render() {
    var planNodes = this.props.plans.map(function(plan, index) {
      return (
        <Plan
          plan={plan}
          key={"plan_" + index}
          current_subscription={this.props.current_subscription}
          stripe_key={this.props.stripe_key}
          email={this.props.user.email} />
      )
    }.bind(this))

    return (
      <div className="row subscriptions">
        {planNodes}
      </div>
    )
  }
}

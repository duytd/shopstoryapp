var CheckoutForm = React.createClass({
  getInitialState: function() {
    return {
      order: this.props.order
    }
  },
  render: function() {
    var steps = ["shipping", "billing"];

    var stepHeaders = steps.map(function(step){

    })

    return (
      <Layout globalVars={this.props.globalVars}>
        <div className="checkout-form">

        </div>
      </Layout>
    )
  }
})

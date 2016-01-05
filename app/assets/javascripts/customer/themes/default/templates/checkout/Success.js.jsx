var Success = React.createClass({
  render: function() {
    var transactionInfo = "";

    if (this.props.order_info.transaction_info) {
      var transactionInfoNodes = this.props.order_info.transaction_info.map(function(info){
        return (
          <div className="row">
            <div className="col-xs-6 text-right">
              <label>{info.label + ":"}</label>
            </div>
            <div className="col-xs-6 text-left">
              {info.value}
            </div>
          </div>
        )
      });

      transactionInfo = (
        <div className="col-md-6 col-md-offset-3">
          <p>{I18n.t("checkout.texts.payment_info")}</p>
          {transactionInfoNodes}
        </div>
      )
    }

    return (
      <Layout globalVars={this.props.globalVars}>
        <div className="row text-center">
          <h1>{I18n.t("checkout.texts.thank_you")}</h1>
          <p>{I18n.t("checkout.texts.order_info", {order_number: this.props.order_info.order_number})}</p>
          <div className="row">
            {transactionInfo}
          </div>
          <br/>
          <p className="small"><i>{I18n.t("checkout.texts.delivery_info")}</i></p>
          <p className="small"><i>{I18n.t("checkout.texts.support", {email: this.props.order_info.support_email})}</i></p>
        </div>
      </Layout>
    );
  }
})

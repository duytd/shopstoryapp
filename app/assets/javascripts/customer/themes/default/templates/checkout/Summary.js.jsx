var Summary = React.createClass({
  render: function() {
    var subtotal = 0;
    var cartItems = this.props.cart.map(function(item, index) {
      subtotal += parseInt(item.unit_price);

      return (
        <div className="row item" key={index}>
          <div className="col-xs-3">
            <img src={item.product.images[0].image.thumb.url} className="img-responsive image" />
          </div>

          <div className="col-xs-3">
            <strong>{item.product.name.toUpperCase()}</strong>
          </div>

          <div className="col-xs-3">
            <p className="price">{item.unit_price}</p>
          </div>

          <div className="col-xs-3">
            <span className="quantity">{item.quantity}</span>
          </div>
        </div>
      )
    })

    return (
      <div className="summary">
        <h2>{I18n.t("checkout.summary.title")}</h2>
        <p>
          <label>{I18n.t("checkout.summary.subtotal")} :</label>
          {subtotal}{this.props.currency}
        </p>
        <p>
          <label>{I18n.t("checkout.summary.shipping")} :</label>
          <i>{(this.props.step == "shipping") ? I18n.t("checkout.summary.not_yet_calculated") : this.props.order.shipping}</i>
        </p>
        <div className="cart-items">
          {cartItems}
        </div>
       </div>
    )
  }
})

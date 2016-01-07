var ProductListItem = React.createClass({
  render: function () {
    return (
      <div className="col-sm-3 text-center">
        <a href={Routes.customer_product_path(this.props.product.id)}>
          <div className="product-image">
            <img className="img-responsive" src={this.props.product.images[0].url}/>
          </div>
        </a>
        <a href={Routes.customer_product_path(this.props.product.id)}>
          <h3>{this.props.product.name}</h3>
        </a>
        <p>
          <strong>{I18n.toCurrency(this.props.product.price, {precision: 0, unit: this.props.currency})}</strong>
        </p>
      </div>
    )
  }
})

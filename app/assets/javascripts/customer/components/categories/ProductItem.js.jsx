var ProductItem = React.createClass({
  render: function() {
    return (
      <div className="product-item col-md-4">
        <a href={"/products/" + this.props.product.id}>
          <img src={this.props.product.images[0].image.thumb.url} className="img-responsive" />
        </a>
        <a href={"/products/" + this.props.product.id}>
          <p className="name">{this.props.product.name}</p>
        </a>
        <p className="price">{I18n.toNumber(this.props.product.price, {precision: 0})} {this.props.currency}</p>
      </div>
    );
  }
});

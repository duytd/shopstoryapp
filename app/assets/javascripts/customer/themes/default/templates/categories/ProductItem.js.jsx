/* Product item in category grid layout */

var ProductItem = React.createClass({
  render: function() {
    return (
      <div className="product-item col-md-4">
        <img src={this.props.product.images[0].image.thumb.url} className="img-responsive" />
        <p className="name">{this.props.product.name}</p>
        <p className="price">{this.props.product.price} {this.props.currency}</p>
      </div>
    );
  }
});

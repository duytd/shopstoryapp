var ProductList = React.createClass({
  render: function() {
    var headers = [
      I18n.t("activerecord.attributes.product.id"),
      "",
      I18n.t("activerecord.attributes.product.name"),
      I18n.t("activerecord.attributes.product.price"),
      I18n.t("activerecord.attributes.product.sku"),
      I18n.t("activerecord.attributes.product.vendor"),
      I18n.t("activerecord.attributes.product.in_stock"),
      I18n.t("activerecord.attributes.product.visibility")
    ];

    return (
      <List
        type="product"
        items={this.props.products}
        headers={headers}
        page={this.props.page}
        totalPage={this.props.totalPage}
        redirectUrl={this.props.url}
        deleteAllUrl={this.props.url} />
        exportable={true}
        handleExport={this.handleExport} />
    )
  },
  handleExport: function(productIds) {
    var url = this.props.export_url;

    $.ajax({
      url: url,
      method: "POST",
      data: {product_ids: productIds},
      success: function(data) {
        this.props.downloadCSV(data);
      }.bind(this)
    })
  }
})

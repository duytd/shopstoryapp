export default class ProductList extends React.Component {
  render() {
    var headers = [
      i18n.t("activerecord.attributes.product.id"),
      "",
      i18n.t("activerecord.attributes.product.name"),
      i18n.t("activerecord.attributes.product.price"),
      i18n.t("activerecord.attributes.product.sku"),
      i18n.t("activerecord.attributes.product.vendor"),
      i18n.t("activerecord.attributes.product.in_stock"),
      i18n.t("activerecord.attributes.product.featured"),
      i18n.t("activerecord.attributes.product.visibility")
    ];

    return (
      <List
        type="product"
        items={this.props.products}
        headers={headers}
        sortable={true}
        sortableColumns={[
          {
            index: 2,
            name: "name"
          },
          {
            index: 3,
            name: "price"
          },
          {
            index: 4,
            name: "sku"
          },
          {
            index: 5,
            name: "vendor"
          },
          {
            index: 7,
            name: "featured"
          }
        ]}
        page={this.props.page}
        totalPage={this.props.totalPage}
        redirectUrl={this.props.url}
        deleteAllUrl={this.props.url}
        exportable={true}
        sorting={this.props.sorting}
        updateData={this.props.updateData}
        handleExport={this.handleExport} />
    )
  },
  handleExport(productIds) {
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
}

var ProductBox = React.createClass({
  render: function() {
    var productList = (
      <ProductList
        page={this.props.page}
        totalPage={this.props.total_page}
        url={this.props.url}
        products={this.props.products} />
    )

    if (this.props.products.length == 0) {
      productList = (
        <div className="text-center">
          <p>{I18n.t("merchant.admin.messages.no_product")}</p>
          <a href={this.props.url} className="btn btn-lg btn-primary">
            {I18n.t("merchant.admin.buttons.add")}
          </a>
        </div>
      )
    }

    var pagination = (
      <Pagination
        page={this.props.page}
        totalPage={this.props.total_page}
        url={this.props.url} />
    )

    return (
      <Box name="product"
        list={productList}
        url={this.props.new_url}
        pagination={pagination}
        title={I18n.t("merchant.admin.products.title")} />
    );
  }
})

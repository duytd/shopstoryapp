var ProductBox = React.createClass({
  render: function() {
    var productList = (
      <ProductList
        page={this.props.page}
        totalPage={this.props.total_page}
        url={this.props.url}
        downloadCSV={this.downloadCSV}
        export_url={this.props.export_url}
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
        handleExportAll={this.handleExportAll}
        title={I18n.t("merchant.admin.products.title")} />
    );
  },
  handleExportAll: function() {
    var url = this.props.export_url;

    $.ajax({
      url: url,
      method: "POST",
      data: {all: true},
      success: function(data) {
        this.downloadCSV(data);
      }.bind(this)
    })
  },
  downloadCSV: function(data) {
    var link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURI(data);
    link.style = "visibility:hidden";
    link.target = "_blank";
    link.download = (new Date()).getTime() + ".csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
})

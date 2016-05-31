var DiscountBox = React.createClass({
  render: function() {
    var discountList = (
      <DiscountList
        page={this.props.page}
        totalPage={this.props.total_page}
        url={this.props.url}
        discounts={this.props.discounts} />
    )

    if (this.props.discounts.length == 0) {
      discountList = (
        <div className="text-center">
          <p>{I18n.t("merchant.admin.messages.no_discount")}</p>
          <a href={this.props.new_url} className="btn btn-lg btn-primary">
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
      <Box
        name="discount"
        list={discountList}
        url={this.props.new_url}
        pagination={pagination}
        title={I18n.t("merchant.admin.discounts.title")} />
    );
  }
})

import React from 'react';
import I18n from 'i18n-js';

import DiscountList from './DiscountList';
import Box from '../../components/general/Box';
import Pagination from '../../components/general/Pagination';

export default class DiscountBox extends React.Component {
  render() {
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
          <a href={this.props.new_url} className="btn btn-lg btn-success">
            {I18n.t("merchant.admin.buttons.add")}
          </a>
        </div>
      )
    }

    var pagination = (
      <Pagination
        page={this.props.page}
        totalPage={this.props.total_page}
        size={this.props.discounts.length}
        total={this.props.total}
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
}

import React from 'react';
import I18n from 'i18n-js';
import * as Routes from '../../../routes';

import List from '../../components/general/List';

export default class ShippingRateList extends React.Component {
  render() {
    var headers = [
      I18n.t("activerecord.attributes.shipping_rate.name")
    ];

    return (
      <List
        type="shipping_rate"
        items={this.props.shipping_rates}
        headers={headers}
        deleteAllUrl={Routes.merchant_shipping_rates_path.localize()} />
    )
  }
}

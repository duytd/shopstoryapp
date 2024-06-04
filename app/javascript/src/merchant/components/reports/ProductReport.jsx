import React from 'react';
import I18n from 'i18n-js';
import BarChart from '../charts/BarChart';
import * as Routes from '../../../routes';
import { translate } from '../../../functions';

export default class ProductReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
    };
  }

  render() {
    return (
      <div className="reports block">
        <div className="chart">
          <a className="btn btn-sm btn-info pull-right" href={Routes.product_merchant_reports_path({"format": "csv", "locale": I18n.locale})}>
            {I18n.t("merchant.admin.buttons.export")}
          </a>
          <BarChart data={this.state.data} dataSetLabel={I18n.t("merchant.admin.reports.product.data_title")} />
        </div>

        <div className="report-table table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>{I18n.t("activerecord.attributes.product.id")}</th>
                <th>{I18n.t("activerecord.attributes.product.name")}</th>
                <th>{I18n.t("activerecord.attributes.product.total_sale")}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(function(d, index) {
                return (
                  <tr key={"d_" + index}>
                    <td>{d.product.id}</td>
                    <td>{translate(d.product, "name")}</td>
                    <td>{d.total_sale}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

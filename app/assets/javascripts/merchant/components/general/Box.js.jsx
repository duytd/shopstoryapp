var Box = React.createClass({
  render: function() {
    return (
      <div className={this.props.name + "-box block"}>
        <div className="block-header">
          <span className="title">{this.props.title}</span>
          <a className="btn btn-sm btn-primary pull-right" href={this.props.url}>{I18n.t("merchant.admin.buttons.add")}</a>
        </div>
        <div className="block-body">
          {this.props.list}
        </div>
      </div>
    );
  }
});

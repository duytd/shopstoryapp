var Box = React.createClass({
  render: function() {
    var wrapper = (this.props.wrapper) ? this.props.wrapper : "block";

    return (
      <div className={this.props.name + "-box " + wrapper}>
        <div className="block-header">
          <span className="title">{this.props.title}</span>
          {(this.props.url) ?
          <a className="btn btn-sm btn-primary pull-right" href={this.props.url}>
            {I18n.t("merchant.admin.buttons.add")}
          </a> : null}
        </div>
        <div className="block-body">
          {this.props.list}
          {this.props.pagination ? this.props.pagination : null}
        </div>
      </div>
    );
  }
});

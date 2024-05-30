export default class EmailTemplatePreview extends React.Component {
  componentDidUpdate() {
  },
  render() {
    return (
      <div className={this.props.preview ? "modal fade in" : "modal fade"} role="dialog" style={this.props.preview ? {display: "block"} : {display: "none"}}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.props.closePreview}>&times;</button>
              <h4 className="modal-title">{I18n.t("merchant.admin.email_templates.preview")}</h4>
            </div>
            <div className="modal-body">
              <iframe src={"data:text/html;charset=UTF-8," + encodeURIComponent(this.props.data)}></iframe>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.props.closePreview}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


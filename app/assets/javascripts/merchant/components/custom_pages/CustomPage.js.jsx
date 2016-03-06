var CustomPage = React.createClass({
  render: function() {
    return (
      <td className="name">
        <a href={Routes.edit_merchant_custom_page_path(this.props.custom_page.slug)}>
          {(this.props.custom_page.title == "") ? this.props.custom_page.title_en : this.props.custom_page.title}
        </a>
      </td>
    );
  }
});

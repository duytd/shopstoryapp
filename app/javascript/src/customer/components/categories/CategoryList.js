var CategoryBox = React.createClass({
  mixins: [PaginationMixin],
  getInitialState: function() {
    return {
      products: []
    }
  },
  render: CategoryListRT,
  componentDidMount: function() {
    var url = Routes.customer_category_products_path(this.props.category.slug, {limit: this.props.limit, format: "json"});
    var loading = $(this.refs.loading);

    $.ajax({
      url: url,
      method: "GET",
      beforeSend: function() {
        loading.removeClass("d-none");
      },
      success: function(data) {
        loading.addClass("d-none");
        this.setState({products: data})
      }.bind(this),
      error: function(xhr) {
        alert(xhr.responseText);
      }
    })
  }
})

module.exports = CategoryBox;

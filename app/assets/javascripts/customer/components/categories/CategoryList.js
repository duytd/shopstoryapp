var CategoryBox = React.createClass({
  getInitialState: function() {
    return {
      products: []
    }
  },
  render: CategoryListRT,
  componentDidMount: function() {
    var url = Routes.customer_category_products_path(this.props.category.slug, {limit: this.props.limit});
    var loading = $(this.refs.loading);

    $.ajax({
      url: url,
      method: "GET",
      beforeSend: function() {
        loading.removeClass("hide");
      },
      success: function(data) {
        loading.addClass("hide");
        this.setState({products: data})
      }.bind(this),
      error: function(xhr) {
        alert(xhr.responseText);
      }
    })
  }
})

module.exports = CategoryBox;

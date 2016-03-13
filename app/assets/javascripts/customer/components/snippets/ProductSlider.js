var ProductSlider = React.createClass({
  getInitialState: function() {
    return {
      images: this.props.images,
      activeIndex: 0
    }
  },
  componentDidMount: function() {
    this.loadElevateZoom();
  },
  componentDidUpdate: function() {
    this.loadElevateZoom();
  },
  render: ProductSliderRT,
  activateImage: function(e) {
    var index = parseInt(e.target.getAttribute("data-index"));

    this.setState({activeIndex: index});
  },
  loadElevateZoom: function() {
    $(".ps-feature img").elevateZoom({
      zoomType: "inner",
      cursor: "crosshair"
    });
  }
})

module.exports = ProductSlider;

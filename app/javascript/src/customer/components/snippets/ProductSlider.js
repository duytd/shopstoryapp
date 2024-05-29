var ProductSlider = React.createClass({
  getInitialState: function() {
    return {
      activeIndex: 0
    }
  },
  componentDidMount: function() {
    if (!this.props.mobile) {
      this.loadElevateZoom();
    }
  },
  componentDidUpdate: function() {
    if (!this.props.mobile) {
      this.loadElevateZoom();
    }
  },
  render: ProductSliderRT,
  activateImage: function(e) {
    var index = parseInt(e.target.getAttribute("data-index"));

    this.setState({activeIndex: index});
  },
  loadElevateZoom: function() {
    var zoomType = this.props.zoomType || "lens";
    var cursor = this.props.cursor || "crosshair";

    $(".ps-feature img").elevateZoom({
      cursor: cursor,
      zoomType: zoomType
    });
  }
})

module.exports = ProductSlider;

import React from 'react';

export default class ProductSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };
  }

  render() {
    return ProductSliderRT.apply(this);
  }

  componentDidMount() {
    if (!this.props.mobile) {
      this.loadElevateZoom();
    }
  }

  componentDidUpdate() {
    if (!this.props.mobile) {
      this.loadElevateZoom();
    }
  }

  activateImage = (e) => {
    var index = parseInt(e.target.getAttribute("data-index"));

    this.setState({activeIndex: index});
  }

  loadElevateZoom = () => {
    var zoomType = this.props.zoomType || "lens";
    var cursor = this.props.cursor || "crosshair";

    $(".ps-feature img").elevateZoom({
      cursor: cursor,
      zoomType: zoomType
    });
  }
}

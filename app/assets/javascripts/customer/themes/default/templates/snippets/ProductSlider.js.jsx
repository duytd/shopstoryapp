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
  render: function() {
    var sliderImageNodes = this.state.images.map(function(image, index) {
      return <li className={(index == this.state.activeIndex) ? "active" : ""} key={index}>
        <img src={image.image.url} alt={image.name} className="img-responsive" />
      </li>;
    }.bind(this));

    var sliderButtonNodes = "";

    if (this.state.images.length > 1) {
      sliderButtonNodes = this.state.images.map(function(image, index) {
        return <li key={index}>
          <img src={image.image.thumb.url} data-index={index} width="50" height="50" 
            className="image-controls" onClick={this.activateImage} />
        </li>;
      }.bind(this));
    }

    return (
      <div className="ps-container">
        <ul className="ps-feature">
          {sliderImageNodes}
        </ul>

        <fieldset className="ps-navigation-container">
          <ul role="navigation" className="ps-navigation">
            {sliderButtonNodes}
          </ul>
        </fieldset>
      </div>
    );
  },
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

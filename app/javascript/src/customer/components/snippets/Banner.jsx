import React from 'react';

export default class Banner extends React.Component {
  componentDidMount() {
    $(".owl-carousel").owlCarousel({
      items: 1,
      dots: false,
      autoplay: true,
      rewind: true
    })
  }

  render() {
    return BannerRT.apply(this);
  }
}

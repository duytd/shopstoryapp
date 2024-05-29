var SocialShare = React.createClass({
  render: SocialShareRT,
  componentDidMount: function() {
    var title = this.props.title,
      description = this.props.description,
      image = this.props.image,
      url = this.props.url;

    var shareButton = new ShareButton({
      ui: {
        buttonText: '',
        networkOrder: [
          'kakaotalk',
          'kakaostory',
          'naverline',
          'naverband',
          'naverblog',
          'facebook',
          'twitter',
          'pinterest',
          'googlePlus',
          'whatsapp',
          'reddit',
          'email'
        ]
      },
      title: title,
      url: url,
      description: description,
      image: image,
      networks: {
        kakaotalk: {
          appKey: 'ca27b61ccb79cbbb7e56847a38d586c2'
        },
        linkedin: {
          enabled: false
        },
        pinterest: {
          enabled: false
        },
        reddit: {
          enabled: false
        },
        email: {
          enabled: false,
        },
        whatsapp: {
          enabled: false
        }
      }
    });
  }
})

module.exports = SocialShare;

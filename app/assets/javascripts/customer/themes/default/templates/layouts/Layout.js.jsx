var Layout = React.createClass({
  render: function() {
    return (
      <div className="main-wrapper">
        <Header globalVars={this.props.globalVars} />
        <div className="container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
});

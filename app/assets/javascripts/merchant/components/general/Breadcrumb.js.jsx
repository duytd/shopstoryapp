var Breadcrumb = React.createClass({
  render: function() {
    return (
      <div className="breadcrumb">
        {this.props.breadcrumb.map(function(item, index) {
          return (
            <span key={"breadcrumb_" + index}>
              <a href={item.url}>{item.label}</a>
            </span>
          )
        })}
      </div>
    )
  }
})

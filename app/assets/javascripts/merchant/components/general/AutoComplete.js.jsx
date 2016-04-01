var AutoComplete = React.createClass({
  getInitialState: function() {
    return {
      chosen: null,
      data: []
    }
  },
  componentDidMount: function() {
    var chosenSource = this.props.chosenSource;

    if (chosenSource) {
      $.getJSON(chosenSource, function(chosen) {
        this.setState({chosen: chosen});
      }.bind(this))
    }
  },
  render: function() {
    return (
      <div className="autocomplete">
        {(this.state.chosen) ?
          <div className="chosen-autocomplete">
            <input type="hidden" value={this.state.chosen.id} name={this.props.name} />
            <p>
              {this.state.chosen.name}
              <span className="pull-right">
                <a onClick={this.removeChosen}><i className="fa fa-times-circle-o"></i></a>
              </span>
            </p>
          </div> : null}

        {(!this.state.chosen) ?
            <div className="autocomplete-input">
            <input className="form-control" type="text" onChange={this.getData} />
            <ul className="autocomplete-data">
              {this.state.data.map(function(element, index) {
                return <li onClick={this.setChosen.bind(this, element)}>{element.name_en}</li>
              }.bind(this))}
            </ul>
          </div> : null}
      </div>
    )
  },
  getData: function(e) {
    var q = e.target.value;
    var url = this.props.url;

    $.getJSON(url, {q: q}, function(data) {
      this.setState({data: data});
    }.bind(this))
  },
  removeChosen: function() {
    this.setState({chosen: null});
  },
  setChosen: function(element) {
    this.setState({chosen: element, data: []})
  }
})

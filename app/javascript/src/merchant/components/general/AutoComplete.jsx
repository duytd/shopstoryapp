import React from 'react';

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chosen: null,
      data: []
    }
  }

  componentDidMount() {
    var chosenSource = this.props.chosenSource;

    if (chosenSource) {
      $.getJSON(chosenSource, function(chosen) {
        this.setState({chosen: chosen});
      }.bind(this))
    }
  }

  render() {
    return (
      <div className="autocomplete">
        {(this.state.chosen) ?
        <div className="chosen-autocomplete">
          <input type="hidden" value={this.state.chosen.id} name={this.props.name} />
          <p>
            {translate(this.state.chosen, "name")}
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
              return <li onClick={this.setChosen.bind(this, element)} key={"autocomplete_result_" + index}>{translate(element, "name")}</li>
            }.bind(this))}
          </ul>
        </div> : null}
      </div>
    )
  }

  getData(e) {
    var q = e.target.value;
    var url = this.props.url;

    $.getJSON(url, {q: q}, function(data) {
      this.setState({data: data});
    }.bind(this))
  }

  removeChosen() {
    this.setState({chosen: null});
  }

  setChosen(element) {
    this.setState({chosen: element, data: []})
  }
}

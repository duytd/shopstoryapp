import React from 'react';
import I18n from 'i18n-js';
import SearchList from './SearchList';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      categories: [],
      customers: [],
      pages: [],
      hasInput: false
    };
  }

  render() {
    return (
      <div>
        <form className="form-inline search-form navbar-left hidden-xs">
          <input type="text" ref="query" className="form-control" placeholder={I18n.t("merchant.admin.menu.search")} onChange={this.search} name="q" />
          {(this.state.hasInput) ?
            <a onClick={this.reset} className="pull-right"><i className="fa fa-times-circle-o"></i></a> : null}
        </form>

        <SearchList
          products={this.state.products}
          categories={this.state.categories}
          customers={this.state.customers}
          pages={this.state.pages} />
      </div>
    )
  }

  setVisible() {
    if (this.state.products.length > 0 || this.state.categories.length > 0 || this.state.customers.length > 0 || this.state.pages.length > 0) {
      $("section.content > .main-wrapper").animate({opacity: "0.6", marginLeft: "400px"}, function() {
        if ($(".search-list").hasClass("d-none")) {
          $(".search-list").removeClass("d-none");
        }
      });
    }
    else {
      $("section.content > .main-wrapper").animate({opacity: "1", marginLeft: "0px"}, 100, function(){
        if (!$(".search-list").hasClass("d-none")) {
          $(".search-list").addClass("d-none");
        }
      });
    }
  }

  search() {
    var query = $(this.refs.query).val();
    var hasInput = (query != "") ? true : false;

    $.get(Routes.merchant_search_path({q: query, locale: I18n.locale}), function(response) {
      this.setState({hasInput: hasInput, products: response.products, categories: response.categories, customers: response.customers, pages: response.custom_pages}, function() {
        this.setVisible();
      }.bind(this))
    }.bind(this))
  }

  reset() {
    $(this.refs.query).val("");
    this.search();
  }
}


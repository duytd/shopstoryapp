var SeoTag = React.createClass({
  render: function() {
    this.props.errors["seo_tag.title_ko"] = this.props.errors["seo_tag.title_ko"] || [];
    this.props.errors["seo_tag.title_en"] = this.props.errors["seo_tag.title_en"] || [];
    this.props.errors["seo_tag.meta_description_ko"] = this.props.errors["seo_tag.meta_description_ko"] || [];
    this.props.errors["seo_tag.meta_description_en"] = this.props.errors["seo_tag.meta_description_en"] || [];
    this.props.errors["seo_tag.meta_keywords_ko"] = this.props.errors["seo_tag.meta_keywords_ko"] || [];
    this.props.errors["seo_tag.meta_keywords_en"] = this.props.errors["seo_tag.meta_keywords_en"] || [];

    var ko_errors_count = this.props.errors["seo_tag.title_ko"].length + this.props.errors["seo_tag.meta_description_ko"].length + this.props.errors["seo_tag.meta_keywords_ko"].length;
    var en_errors_count = this.props.errors["seo_tag.title_en"].length + this.props.errors["seo_tag.meta_description_en"].length + this.props.errors["seo_tag.meta_keywords_en"].length;

    return (
      <div className="seo-tag">
        <h4>{I18n.t("merchant.admin.seo_tags.title")}</h4>
        <div className="block">
          {this.props.seo_tag ?
          <input type="hidden" name={this.props.modelName + "[seo_tag_attributes][id]"} value={this.props.seo_tag.id} /> : null}

          <LocaleNavTab ko_errors_count={ko_errors_count} en_errors_count={en_errors_count} enTabId="seo_en" koTabId="seo_ko" />

          <div className="tab-content">
            <div id="seo_ko" className="tab-pane fade in active">
              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.seo_tag.title")}</label>
                <FormErrors errors={this.props.errors["seo_tag.title_ko"]} />
                <input type="text" name={this.props.modelName + "[seo_tag_attributes][title_ko]"}
                  className="form-control" defaultValue={(this.props.seo_tag) ? this.props.seo_tag.title_ko : ""} />
              </div>

              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.seo_tag.meta_description")}</label>
                <FormErrors errors={this.props.errors["seo_tag.meta_description_ko"]} />
                <textarea className="form-control" name={this.props.modelName + "[seo_tag_attributes][meta_description_ko]"}
                  defaultValue={(this.props.seo_tag) ? this.props.seo_tag.meta_description_ko : ""}></textarea>
              </div>

              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.seo_tag.meta_keywords")}</label>
                <FormErrors errors={this.props.errors["seo_tag.meta_keywords_ko"]} />
                <input type="text" name={this.props.modelName + "[seo_tag_attributes][meta_keywords_ko]"}
                  className="form-control" defaultValue={(this.props.seo_tag) ? this.props.seo_tag.meta_keywords_ko : ""} />
              </div>
            </div>

            <div id="seo_en" className="tab-pane fade">
              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.seo_tag.title")}</label>
                <FormErrors errors={this.props.errors["seo_tag.title_en"]} />
                <input type="text" name={this.props.modelName + "[seo_tag_attributes][title_en]"}
                  className="form-control" defaultValue={(this.props.seo_tag) ? this.props.seo_tag.title_en : ""} />
              </div>

              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.seo_tag.meta_description")}</label>
                <FormErrors errors={this.props.errors["seo_tag.meta_description_en"]} />
                <textarea className="form-control" name={this.props.modelName + "[seo_tag_attributes][meta_description_en]"}
                  defaultValue={(this.props.seo_tag) ? this.props.seo_tag.meta_description_en : ""}></textarea>
              </div>

              <div className="form-group">
                <label className="label">{I18n.t("activerecord.attributes.seo_tag.meta_keywords")}</label>
                <FormErrors errors={this.props.errors["seo_tag.meta_keywords_en"]} />
                <input type="text" name={this.props.modelName + "[seo_tag_attributes][meta_keywords_en]"}
                  className="form-control" defaultValue={(this.props.seo_tag) ? this.props.seo_tag.meta_keywords_en : ""} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

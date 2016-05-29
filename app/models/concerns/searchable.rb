module Searchable
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model

    settings index: {
      number_of_shards: 1,
      analysis: {
        filter: {
          ngram_filter: {
            type: "nGram",
            min_gram: 2,
            max_gram: 15
          }
        },
        analyzer: {
          ngram_analyzer: {
            tokenizer: "standard",
            filter: ["standard", "lowercase", "ngram_filter"],
            type: "custom"
          }
        }
      }
    }
  end

  class_methods do
    def search query
      begin
        index_name "#{Rails.env}-#{Apartment::Tenant.current}-#{self.name.tableize}"

        __elasticsearch__.search(
          {
            query: {
              multi_match: {
                query: "*#{query}*",
                fields: search_fields
              }
            },
            highlight: {
              pre_tags: ["<em class='highlight'>"],
              post_tags: ["</em>"],
              fields: {
                "*": {},
              }
            }
          }
        )
      rescue Elasticsearch::Transport::Transport::Errors::NotFound
        []
      end
    end
  end
end

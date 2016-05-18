namespace :indexer do
  task index_product: :environment do
    ProductIndexer.import
  end
end

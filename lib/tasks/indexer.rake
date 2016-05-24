namespace :indexer do
  task index_all: :environment do
    Rake::Task["indexer:index_product"].invoke
    Rake::Task["indexer:index_category"].invoke
    Rake::Task["indexer:index_customer"].invoke
    Rake::Task["indexer:index_custom_page"].invoke
  end

  task index_product: :environment do
    Indexer.import Product, Customer::ProductPresenter, :product_images
  end

  task index_category: :environment do
    Indexer.import Category, Customer::CategoryPresenter
  end

  task index_customer: :environment do
    Indexer.import Customer, Customer::CustomerPresenter
  end

  task index_custom_page: :environment do
    Indexer.import CustomPage, Customer::CustomPagePresenter
  end
end

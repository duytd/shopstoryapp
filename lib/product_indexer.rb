module ProductIndexer
  def self.import
    Shop.all.each do |shop|
      Apartment::Tenant.switch shop.subdomain
      Product.includes(:product_images).find_in_batches do |products|
        bulk_index products
      end
    end
  end

  def self.prepare_records products
    products.map do |product|
      {
        index: {
          _id: product.id,
          data: Customer::ProductPresenter.new(product),
        }
      }
    end
  end

  def self.bulk_index products
    index = "#{Rails.env}-#{Apartment::Tenant.current}-products"
    Product.__elasticsearch__.client.indices.delete index: index  rescue nil

    Product.__elasticsearch__.client.indices.create(
      index: index,
      body: {
        settings: Product.__elasticsearch__.settings.to_hash,
        mappings: Product.__elasticsearch__.mappings.to_hash
      }
    )

    Product.__elasticsearch__.client.bulk({
      index: index,
      type: Product.__elasticsearch__.document_type,
      body: prepare_records(products)
    })
  end
end

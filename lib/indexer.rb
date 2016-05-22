module Indexer
  def self.import klass, presenter_klass, associations=[]
    Shop.all.each do |shop|
      Apartment::Tenant.switch shop.subdomain
      klass.includes(associations).find_in_batches do |records|
        bulk_index klass, presenter_klass, records
      end
    end
  end

  def self.prepare_records presenter_klass, records
    records.map do |record|
      {
        index: {
          _id: record.id,
          data: presenter_klass.new(record),
        }
      }
    end
  end

  def self.bulk_index klass, presenter_klass, records
    index_name = "#{Rails.env}-#{Apartment::Tenant.current}-#{klass.name.tableize}"
    klass.__elasticsearch__.client.indices.delete index: index_name  rescue nil
    create_index klass, index_name

    klass.__elasticsearch__.client.bulk({
      index: index_name,
      type: klass.__elasticsearch__.document_type,
      body: prepare_records(presenter_klass, records)
    })
  end

  def self.create_index klass, index_name
    klass.__elasticsearch__.client.indices.delete index: index_name  rescue nil

    klass.__elasticsearch__.client.indices.create(
      index: index_name,
      body: {
        settings: klass.__elasticsearch__.settings.to_hash,
        mappings: klass.__elasticsearch__.mappings.to_hash
      }
    )
  end
end

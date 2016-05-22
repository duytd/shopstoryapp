class IndexerWorker
  include Sidekiq::Worker
  sidekiq_options queue: "elasticsearch", retry: false

  Logger = Sidekiq.logger.level == Logger::DEBUG ? Sidekiq.logger : nil
  Client = Elasticsearch::Client.new host: "localhost:9200", logger: Logger

  def perform operation, record_id, klass_name, presenter_klass_name
    klass = klass_name.constantize
    presenter_klass = presenter_klass_name.constantize
    logger.debug [operation, "ID: #{record_id}"]
    index_name = "#{Rails.env}-#{Apartment::Tenant.current}-#{klass.name.tableize}"

    case operation.to_s
      when /index/
        record = klass.find record_id
        Client.index  index: index_name, type: klass.__elasticsearch__.document_type, id: record.id, body: presenter_klass.new(record)
      when /delete/
        Client.delete index: index_name, type: klass.__elasticsearch__.document_type, id: record_id
      else raise ArgumentError, "Unknown operation '#{operation}'"
    end
  end
end

module CacheHelper
  def cache_fetch name, object, params, options = nil, &block
    params = params.map{|k,v| "#{k}=#{v}"}.join("&") unless params.nil?
    object_id = object ? object.id : nil
    object_timestamp = object ? object.updated_at.to_i : nil
    cache_key = [Apartment::Tenant.current, "customer", name, object_id, object_timestamp, params].reject{|a| a.nil?}.join("|")
    Rails.cache.fetch(cache_key, options, &block)
  end

  def convert_to_paginatable_array items
    Kaminari::PaginatableArray.new(items.to_a, limit: items.limit_value, offset: items.offset_value, total_count: items.total_count)
  end
end

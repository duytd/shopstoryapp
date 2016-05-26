class Customer::CategoryPresenter < Customer::BasePresenter
  def initialize object, options={}
    super object
    @limit = options[:limit]
  end

  def as_json(*)
    products = if @limit.nil?
      []
    else
      @object.products.limit @limit
    end

    {
      id: @object.id,
      slug: @object.slug,
      name_en: @object.name_en,
      name_ko: @object.name_ko,
      products: products.map{|p| present(p)}
    }
  end
end

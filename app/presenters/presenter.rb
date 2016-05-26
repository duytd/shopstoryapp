class Presenter
  def initialize object, options={}
    @object = object
  end

  def as_json
    raise "as_json called on parent"
  end
end

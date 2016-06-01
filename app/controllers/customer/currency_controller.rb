class Customer::CurrencyController < Customer::BaseController
  def change
    if params[:currency].present? && ["usd", "krw"].include?(params[:currency].downcase)
      session[:currency] = params[:currency]
    end

    render json: {currency: session[:currency]}, status: :ok
  end
end

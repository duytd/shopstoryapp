class Admin::PlansController < Admin::BaseController
  before_action :load_plan, only: [:edit, :update, :destroy]

  def index
    @plans = Plan.all
  end

  def new
    @plan = Plan.new
  end

  def create
    @plan = Plan.new plan_params

    if @plan.save
      redirect_to admin_plans_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @plan.update plan_params
      redirect_to admin_plans_path
    else
      render :new
    end
  end

  def destroy
    @plan.destroy
    redirect_to admin_plans_path
  end

  private
  def load_plan
    @plan = Plan.find params[:id]
  end

  def plan_params
    params.require(:plan).permit :name, :price, :interval, :features, :highlight, :position
  end
end

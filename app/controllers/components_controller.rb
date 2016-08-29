class ComponentsController < ApplicationController
  before_action :set_component, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!
  before_filter do
   redirect_to :root unless current_user && current_user.admin?
  end
  # GET /components
  # GET /components.json
  def index
    @components = Component.all
  end

  # GET /components/1
  # GET /components/1.json
  def show
  end

  # GET /components/new
  def new
    @measurements = Measurement.all
    @component = Component.new
  end

  # GET /components/1/edit
  def edit
    @measurements = Measurement.all
  end

  # POST /components
  # POST /components.json
  def create
    @component = Component.new(component_params)

    respond_to do |format|
      if @component.save
        binding.pry
        @component.measurements.clear
        params[:measurements].each do |measurement|
          @component.measurements.push(Measurement.find(measurement))
        end

        format.html { redirect_to @component, notice: 'Component was successfully created.' }
        format.json { render :show, status: :created, location: @component }
      else
        format.html { render :new }
        format.json { render json: @component.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /components/1
  # PATCH/PUT /components/1.json
  def update
    respond_to do |format|
      if @component.update(component_params)
        format.html { redirect_to @component, notice: 'Component was successfully updated.' }
        format.json { render :show, status: :ok, location: @component }
      else
        format.html { render :edit }
        format.json { render json: @component.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /components/1
  # DELETE /components/1.json
  def destroy
    @component.destroy
    respond_to do |format|
      format.html { redirect_to components_url, notice: 'Component was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_component
      @component = Component.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def component_params
      params.require(:component).permit(:name, :icon)
    end
end

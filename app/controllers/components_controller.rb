class ComponentsController < ApplicationController
  before_action :set_component, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!
  skip_before_filter :authenticate_user!, only: [:search]

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
    @options = Option.all
    @amputation_levels  = AmputationLevel.all
    @component_types = ComponentType.all
    @component = Component.new
    @terminal_devices = TerminalDevice.all
    @component_measurements = @component.measurements
    @component_amputation_level = @component.amputation_levels
    @current_component_types= @component.component_types
    @component_options = @component.options
    @component_tds = @component.terminal_devices
  end

  # GET /components/1/edit
  def edit
    @amputation_levels  = AmputationLevel.all
    @component_amputation_level = @component.amputation_levels
    @options = Option.all
    @component_options = @component.options
    @measurements = Measurement.all
    @component_measurements = @component.measurements
    @component_types = ComponentType.all
    @current_component_types= @component.component_types
    @terminal_devices = TerminalDevice.all
    @component_tds = @component.terminal_devices
  end

  # POST /components
  # POST /components.json
  def create
    @component = Component.new(component_params)

    respond_to do |format|
      if @component.save
        #set measurements
        if params[:measurements]
          params[:measurements].each do |measurement|
            @component.measurements.push(Measurement.find(measurement))
          end
        end
        #set levels
        if params[:levels]
          params[:levels].each do |level|
            @component.amputation_levels.push(AmputationLevel.find(level))
          end
        end
        #set options
        if params[:options]
          params[:options].each do |option|
            @component.options.push(Option.find(option))
          end
        end
        #set tds
        if params[:terminal_devices]
          params[:terminal_devices].each do |td|
            @component.terminal_devices.push(TerminalDevice.find(td))
          end
        end
        #set component Types
        if params[:component_types]
          params[:component_types].each do |type|
            @component.component_types.push(ComponentType.find(type))
          end
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
        @component.measurements.clear
        #reset measurements
        if params[:measurements]
          params[:measurements].each do |measurement|
            @component.measurements.push(Measurement.find(measurement))
          end
        end
        #reset levels
        if params[:levels]
          @component.amputation_levels.clear
          params[:levels].each do |level|
            @component.amputation_levels.push(AmputationLevel.find(level))
          end
        end
        #reset options
        if params[:options]
          @component.options.clear
          params[:options].each do |option|
            @component.options.push(Option.find(option))
          end
        end
        #reset component Types
        if params[:component_types]
          @component.component_types.clear
          params[:component_types].each do |type|
            @component.component_types.push(ComponentType.find(type))
          end
        end
        #reset tds
        if params[:terminal_devices]
          @component.terminal_devices.clear
          params[:terminal_devices].each do |td|
            @component.terminal_devices.push(TerminalDevice.find(td))
          end
        end
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

  def search
  	@components = AmputationLevel.find_by_name(params[:query]).component
  	if request.xhr?
  		render :json => @components.to_json
  	else
  		render :index
  	end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_component
      @component = Component.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def component_params
      params.require(:component).permit(:name, :icon, :version)
    end
end

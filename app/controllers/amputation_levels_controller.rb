class AmputationLevelsController < ApplicationController
  before_action :set_amputation_level, only: [:show, :edit, :update, :destroy]

  # GET /amputation_levels
  # GET /amputation_levels.json
  def index
    @amputation_levels = AmputationLevel.all
  end

  # GET /amputation_levels/1
  # GET /amputation_levels/1.json
  def show
  end

  # GET /amputation_levels/new
  def new
    @amputation_level = AmputationLevel.new
  end

  # GET /amputation_levels/1/edit
  def edit
  end

  # POST /amputation_levels
  # POST /amputation_levels.json
  def create
    @amputation_level = AmputationLevel.new(amputation_level_params)

    respond_to do |format|
      if @amputation_level.save
        format.html { redirect_to @amputation_level, notice: 'Amputation level was successfully created.' }
        format.json { render :show, status: :created, location: @amputation_level }
      else
        format.html { render :new }
        format.json { render json: @amputation_level.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /amputation_levels/1
  # PATCH/PUT /amputation_levels/1.json
  def update
    respond_to do |format|
      if @amputation_level.update(amputation_level_params)
        format.html { redirect_to @amputation_level, notice: 'Amputation level was successfully updated.' }
        format.json { render :show, status: :ok, location: @amputation_level }
      else
        format.html { render :edit }
        format.json { render json: @amputation_level.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /amputation_levels/1
  # DELETE /amputation_levels/1.json
  def destroy
    @amputation_level.destroy
    respond_to do |format|
      format.html { redirect_to amputation_levels_url, notice: 'Amputation level was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_amputation_level
      @amputation_level = AmputationLevel.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def amputation_level_params
      params.require(:amputation_level).permit(:name, :description)
    end
end

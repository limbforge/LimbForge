class TerminalDevicesController < ApplicationController
  before_action :set_terminal_device, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!
  skip_before_filter :authenticate_user!, only: [:search]

  # GET /terminal_devices
  # GET /terminal_devices.json
  def index
    @terminal_devices = TerminalDevice.all
  end

  # GET /terminal_devices/1
  # GET /terminal_devices/1.json
  def show
  end

  # GET /terminal_devices/new
  def new
    @terminal_device = TerminalDevice.new
  end

  # GET /terminal_devices/1/edit
  def edit
  end

  # POST /terminal_devices
  # POST /terminal_devices.json
  def create
    @terminal_device = TerminalDevice.new(terminal_device_params)

    respond_to do |format|
      if @terminal_device.save
        format.html { redirect_to @terminal_device, notice: 'Terminal device was successfully created.' }
        format.json { render :show, status: :created, location: @terminal_device }
      else
        format.html { render :new }
        format.json { render json: @terminal_device.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /terminal_devices/1
  # PATCH/PUT /terminal_devices/1.json
  def update
    respond_to do |format|
      if @terminal_device.update(terminal_device_params)
        format.html { redirect_to @terminal_device, notice: 'Terminal device was successfully updated.' }
        format.json { render :show, status: :ok, location: @terminal_device }
      else
        format.html { render :edit }
        format.json { render json: @terminal_device.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /terminal_devices/1
  # DELETE /terminal_devices/1.json
  def destroy
    @terminal_device.destroy
    respond_to do |format|
      format.html { redirect_to terminal_devices_url, notice: 'Terminal device was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def search
    @tds = Component.find(params[:query]).terminal_devices
    if request.xhr?
      render :json => @tds.to_json
    else
      render :index
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_terminal_device
      @terminal_device = TerminalDevice.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def terminal_device_params
      params.require(:terminal_device).permit(:name)
    end
end

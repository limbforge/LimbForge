require 'test_helper'

class TerminalDevicesControllerTest < ActionController::TestCase
  setup do
    @terminal_device = terminal_devices(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:terminal_devices)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create terminal_device" do
    assert_difference('TerminalDevice.count') do
      post :create, terminal_device: { name: @terminal_device.name }
    end

    assert_redirected_to terminal_device_path(assigns(:terminal_device))
  end

  test "should show terminal_device" do
    get :show, id: @terminal_device
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @terminal_device
    assert_response :success
  end

  test "should update terminal_device" do
    patch :update, id: @terminal_device, terminal_device: { name: @terminal_device.name }
    assert_redirected_to terminal_device_path(assigns(:terminal_device))
  end

  test "should destroy terminal_device" do
    assert_difference('TerminalDevice.count', -1) do
      delete :destroy, id: @terminal_device
    end

    assert_redirected_to terminal_devices_path
  end
end

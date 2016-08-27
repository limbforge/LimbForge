require 'test_helper'

class MeasurementsControllerTest < ActionController::TestCase
  setup do
    @measurement = measurements(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:measurements)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create measurement" do
    assert_difference('Measurement.count') do
      post :create, measurement: { default: @measurement.default, diagram: @measurement.diagram, instructions: @measurement.instructions, lower_range: @measurement.lower_range, measurement_unit: @measurement.measurement_unit, name: @measurement.name, step: @measurement.step, upper_range: @measurement.upper_range }
    end

    assert_redirected_to measurement_path(assigns(:measurement))
  end

  test "should show measurement" do
    get :show, id: @measurement
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @measurement
    assert_response :success
  end

  test "should update measurement" do
    patch :update, id: @measurement, measurement: { default: @measurement.default, diagram: @measurement.diagram, instructions: @measurement.instructions, lower_range: @measurement.lower_range, measurement_unit: @measurement.measurement_unit, name: @measurement.name, step: @measurement.step, upper_range: @measurement.upper_range }
    assert_redirected_to measurement_path(assigns(:measurement))
  end

  test "should destroy measurement" do
    assert_difference('Measurement.count', -1) do
      delete :destroy, id: @measurement
    end

    assert_redirected_to measurements_path
  end
end

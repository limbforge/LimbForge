require 'test_helper'

class ComponentTypesControllerTest < ActionController::TestCase
  setup do
    @component_type = component_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:component_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create component_type" do
    assert_difference('ComponentType.count') do
      post :create, component_type: { name: @component_type.name }
    end

    assert_redirected_to component_type_path(assigns(:component_type))
  end

  test "should show component_type" do
    get :show, id: @component_type
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @component_type
    assert_response :success
  end

  test "should update component_type" do
    patch :update, id: @component_type, component_type: { name: @component_type.name }
    assert_redirected_to component_type_path(assigns(:component_type))
  end

  test "should destroy component_type" do
    assert_difference('ComponentType.count', -1) do
      delete :destroy, id: @component_type
    end

    assert_redirected_to component_types_path
  end
end

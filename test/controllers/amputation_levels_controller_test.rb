require 'test_helper'

class AmputationLevelsControllerTest < ActionController::TestCase
  setup do
    @amputation_level = amputation_levels(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:amputation_levels)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create amputation_level" do
    assert_difference('AmputationLevel.count') do
      post :create, amputation_level: { description: @amputation_level.description, name: @amputation_level.name }
    end

    assert_redirected_to amputation_level_path(assigns(:amputation_level))
  end

  test "should show amputation_level" do
    get :show, id: @amputation_level
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @amputation_level
    assert_response :success
  end

  test "should update amputation_level" do
    patch :update, id: @amputation_level, amputation_level: { description: @amputation_level.description, name: @amputation_level.name }
    assert_redirected_to amputation_level_path(assigns(:amputation_level))
  end

  test "should destroy amputation_level" do
    assert_difference('AmputationLevel.count', -1) do
      delete :destroy, id: @amputation_level
    end

    assert_redirected_to amputation_levels_path
  end
end

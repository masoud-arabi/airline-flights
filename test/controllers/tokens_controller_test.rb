require "test_helper"

class TokensControllerTest < ActionDispatch::IntegrationTest
  test "should get login" do
    get tokens_login_url
    assert_response :success
  end
end

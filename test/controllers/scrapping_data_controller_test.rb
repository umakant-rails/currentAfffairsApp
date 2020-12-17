require "test_helper"

class ScrappingDataControllerTest < ActionDispatch::IntegrationTest
  setup do
    @scrapping_datum = scrapping_data(:one)
  end

  test "should get index" do
    get scrapping_data_url
    assert_response :success
  end

  test "should get new" do
    get new_scrapping_datum_url
    assert_response :success
  end

  test "should create scrapping_datum" do
    assert_difference('ScrappingDatum.count') do
      post scrapping_data_url, params: { scrapping_datum: {  } }
    end

    assert_redirected_to scrapping_datum_url(ScrappingDatum.last)
  end

  test "should show scrapping_datum" do
    get scrapping_datum_url(@scrapping_datum)
    assert_response :success
  end

  test "should get edit" do
    get edit_scrapping_datum_url(@scrapping_datum)
    assert_response :success
  end

  test "should update scrapping_datum" do
    patch scrapping_datum_url(@scrapping_datum), params: { scrapping_datum: {  } }
    assert_redirected_to scrapping_datum_url(@scrapping_datum)
  end

  test "should destroy scrapping_datum" do
    assert_difference('ScrappingDatum.count', -1) do
      delete scrapping_datum_url(@scrapping_datum)
    end

    assert_redirected_to scrapping_data_url
  end
end

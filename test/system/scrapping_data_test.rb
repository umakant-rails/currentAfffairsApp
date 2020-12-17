require "application_system_test_case"

class ScrappingDataTest < ApplicationSystemTestCase
  setup do
    @scrapping_datum = scrapping_data(:one)
  end

  test "visiting the index" do
    visit scrapping_data_url
    assert_selector "h1", text: "Scrapping Data"
  end

  test "creating a Scrapping datum" do
    visit scrapping_data_url
    click_on "New Scrapping Datum"

    click_on "Create Scrapping datum"

    assert_text "Scrapping datum was successfully created"
    click_on "Back"
  end

  test "updating a Scrapping datum" do
    visit scrapping_data_url
    click_on "Edit", match: :first

    click_on "Update Scrapping datum"

    assert_text "Scrapping datum was successfully updated"
    click_on "Back"
  end

  test "destroying a Scrapping datum" do
    visit scrapping_data_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Scrapping datum was successfully destroyed"
  end
end

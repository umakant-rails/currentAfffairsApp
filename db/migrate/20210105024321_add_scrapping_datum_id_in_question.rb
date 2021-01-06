class AddScrappingDatumIdInQuestion < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :scrapping_datum_id, :integer
  end
end

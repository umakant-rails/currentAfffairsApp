class CreateScrappingData < ActiveRecord::Migration[6.1]
  def change
    create_table :scrapping_data do |t|
      t.string :title
      t.text :description
      t.string :source
      t.text :keypoints
      t.date :ca_date
      t.integer :state_id
      t.integer :category_id

      t.timestamps
    end
  end
end

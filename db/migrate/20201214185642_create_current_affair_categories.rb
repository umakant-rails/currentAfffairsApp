class CreateCurrentAffairCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :current_affair_categories do |t|
      t.string :name

      t.timestamps
    end
  end
end

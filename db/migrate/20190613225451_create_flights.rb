class CreateFlights < ActiveRecord::Migration[5.2]
  def change
    create_table :flights do |t|
      t.string :date
      t.string :model
      t.string :identification
      t.string :arrival
      t.string :departure
      t.float :airplane_sel
      t.float :airplane_mel
      t.float :dual_received
      t.float :pic_hours
      t.float :day_hours
      t.float :night_hours
      t.float :cross_country_hours
      t.float :actual_instrument
      t.float :simulated_instrument
      t.float :ground_trainer
      t.float :num_instrument_approaches
      t.float :num_landings_day
      t.float :num_landings_night
      t.float :solo_hours
      t.float :total_duration
      t.text :maneuvers
      t.text :comments
      t.belongs_to :user, foreign_key: true
      t.timestamps
    end
  end
end

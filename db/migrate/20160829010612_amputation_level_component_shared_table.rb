class AmputationLevelComponentSharedTable < ActiveRecord::Migration
  def self.up
      create_table :amputation_levels_components, :id => false do |t|
        t.integer :amputation_level_id
        t.integer :component_id
      end

      add_index :amputation_levels_components, [:amputation_level_id, :component_id], unique: true, name: 'amputation_levels_components_unique'
    end

    def self.down
      drop_table :amputation_levels_components
      remove_index :amputation_levels_components, name: 'amputation_levels_components_unique'
    end
end

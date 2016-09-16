class ComponentComponentTypeSharedTable < ActiveRecord::Migration
  def self.up
      create_table :component_types_components, :id => false do |t|
        t.integer :component_id
        t.integer :component_type_id
      end

      add_index :component_types_components, [:component_id, :component_type_id], unique: true, name: 'component_types_components_unique'
    end

    def self.down
      drop_table :component_types_components
      remove_index :components_component_types, name: 'component_types_components_unique'
    end
end

class ComponentAndOptionSharedTable < ActiveRecord::Migration
  def self.up
      create_table :components_options, :id => false do |t|
        t.integer :component_id
        t.integer :option_id
      end

      add_index :components_options, [:component_id, :option_id], unique: true, name: 'components_options_unique'
    end

    def self.down
      drop_table :components_options
      remove_index :components_options, name: 'components_options_unique'
    end
end

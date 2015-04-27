Sequel.migration do
  change do
    run %{
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE EXTENSION IF NOT EXISTS "citext";
    }

    create_table :messages do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :name, :citext, null: false
      column :message, :citext, null: false
      column :created_at, 'timestamp without time zone'
      column :updated_at, 'timestamp without time zone'

      primary_key [:id]
    end
  end
end

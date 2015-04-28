Sequel.migration do
  change do
    run %{
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE EXTENSION IF NOT EXISTS "citext";
    }

    create_table :messages do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :author, :citext, null: false
      column :body, :citext, null: false
      column :published_at, 'timestamp without time zone'
      column :created_at, 'timestamp without time zone'

      primary_key [:id]
    end
  end
end

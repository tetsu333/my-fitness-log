create_table :users, force: :cascade do |t|
  t.string  "name", null: false
  t.string  "email", null: false
  t.string  "password_digest", null: false
  t.string  "profile", null: false, default: ""
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
end

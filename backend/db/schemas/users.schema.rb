create_table :users, force: :cascade do |t|
  t.string "name", null: false
  t.string "email", null: false
  t.string "password_digest", null: false
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
end

add_index "users", "name", unique: true
add_index "users", "email", unique: true

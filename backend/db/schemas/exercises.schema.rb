create_table :exercises, force: :cascade do |t|
  t.bigint "user_id", null: false
  t.string "name", null: false
  t.integer "exercise_type", null: false
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
end

add_index "exercises", "user_id", using: :btree
add_foreign_key "exercises", "users"

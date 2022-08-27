create_table :repetitions, force: :cascade do |t|
  t.bigint "user_id", null: false
  t.bigint "exercise_id", null: false
  t.integer "repetition_num", null: false
  t.float "weight", null: false
  t.date "exercise_date", null: false
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
end

add_index "repetitions", "user_id", using: :btree
add_foreign_key "repetitions", "users"
add_index "repetitions", "exercise_id", using: :btree
add_foreign_key "repetitions", "exercises"

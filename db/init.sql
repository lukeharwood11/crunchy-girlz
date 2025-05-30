-- Initial database setup
-- Add your database initialization scripts here

-- Enable pgvector extension for vector similarity search
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ingredients table
CREATE TABLE IF NOT EXISTS ingredient (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    unit_id INTEGER REFERENCES unit_of_measure(id) ON DELETE CASCADE,
    name_embedding vector(2000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipes table
CREATE TABLE IF NOT EXISTS recipe (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT NOT NULL,
    prep_time_minutes INTEGER,
    cook_time_minutes INTEGER,
    servings INTEGER,
    difficulty_level VARCHAR(20),
    title_embedding vector(2000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipe ingredients junction table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS recipe_ingredient_link (
    id BIGSERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipe(id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredient(id) ON DELETE CASCADE,
    quantity DECIMAL(10,2) NOT NULL,
    unit_id INTEGER REFERENCES unit_of_measure(id) ON DELETE CASCADE,
    preparation TEXT, -- e.g., "chopped" | "sliced" | "diced" | "minced" | "grated" | "pureed" | "mashed" | "crushed" | "whole" | "other"
    notes TEXT, -- e.g., organic | non-GMO
    UNIQUE(recipe_id, ingredient_id)
);

CREATE TABLE IF NOT EXISTS unit_of_measure (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type_id INTEGER REFERENCES unit_of_measure_type(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS unit_of_measure_type (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meal plans table
CREATE TABLE IF NOT EXISTS meal_plan (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    name_embedding vector(2000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meal plan recipes junction table (maintains order of recipes in meal plan)
CREATE TABLE IF NOT EXISTS meal_plan_recipes (
    id BIGSERIAL PRIMARY KEY,
    meal_plan_id INTEGER REFERENCES meal_plan(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipe(id) ON DELETE CASCADE,
    day_of_plan INTEGER NOT NULL, -- 1, 2, 3, etc. for ordering
    meal_type_id INTEGER REFERENCES meal_type(id) ON DELETE CASCADE,
    servings INTEGER DEFAULT 1,
    notes TEXT,
    UNIQUE(meal_plan_id, recipe_id, day_of_plan, meal_type_id)
);

CREATE TABLE IF NOT EXISTS meal_type (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_recipe_user_id ON recipe(user_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredient_link_recipe_id ON recipe_ingredient_link(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredient_link_ingredient_id ON recipe_ingredient_link(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_meal_plan_user_id ON meal_plan(user_id);
CREATE INDEX IF NOT EXISTS idx_meal_plan_recipes_meal_plan_id ON meal_plan_recipes(meal_plan_id);
CREATE INDEX IF NOT EXISTS idx_meal_plan_recipes_recipe_id ON meal_plan_recipes(recipe_id);
CREATE INDEX IF NOT EXISTS idx_meal_plan_recipes_day_meal ON meal_plan_recipes(meal_plan_id, day_of_plan, meal_type_id);

-- Create vector similarity search indexes using HNSW
CREATE INDEX IF NOT EXISTS idx_ingredient_name_embedding ON ingredient USING hnsw (name_embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_recipe_title_embedding ON recipe USING hnsw (title_embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_meal_plan_name_embedding ON meal_plan USING hnsw (name_embedding vector_cosine_ops);
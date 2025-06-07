-- Initial database setup
-- Add your database initialization scripts here

CREATE SCHEMA IF NOT EXISTS core;

-- DROP all tables in the core schema
DROP TABLE IF EXISTS core.recipe_ingredient_link CASCADE;
DROP TABLE IF EXISTS core.recipe_instruction CASCADE;
DROP TABLE IF EXISTS core.recipe CASCADE;
DROP TABLE IF EXISTS core.ingredient CASCADE;
DROP TABLE IF EXISTS core.unit_of_measure CASCADE;
DROP TABLE IF EXISTS core.unit_of_measure_type CASCADE;
DROP TABLE IF EXISTS core.meal_plan_recipes CASCADE;
DROP TABLE IF EXISTS core.meal_plan CASCADE;
DROP TABLE IF EXISTS core.meal_type CASCADE;

-- Enable pgvector extension for vector similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Unit of measure type table (no dependencies)
CREATE TABLE IF NOT EXISTS core.unit_of_measure_type (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Unit of measure table (depends on unit_of_measure_type)
CREATE TABLE IF NOT EXISTS core.unit_of_measure (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type_id INTEGER REFERENCES core.unit_of_measure_type(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ingredients table (depends on unit_of_measure)
CREATE TABLE IF NOT EXISTS core.ingredient (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    name_embedding vector(2000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipes table (depends on auth.users which should exist in Supabase)
CREATE TABLE IF NOT EXISTS core.recipe (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    prep_time_minutes INTEGER,
    cook_time_minutes INTEGER,
    servings INTEGER,
    difficulty_level VARCHAR(20),
    title_embedding vector(2000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipe instructions table (depends on recipe)
CREATE TABLE IF NOT EXISTS core.recipe_instruction (
    id BIGSERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES core.recipe(id) ON DELETE CASCADE,
    step INTEGER NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(20) NOT NULL DEFAULT 'instruction', -- 'instruction' or 'note'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(recipe_id, step)
);

-- Recipe ingredients junction table (depends on recipe and ingredient)
CREATE TABLE IF NOT EXISTS core.recipe_ingredient_link (
    id BIGSERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES core.recipe(id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES core.ingredient(id) ON DELETE CASCADE,
    quantity DECIMAL(10,2) NOT NULL,
    unit_id INTEGER REFERENCES core.unit_of_measure(id) ON DELETE CASCADE,
    preparation TEXT, -- e.g., "chopped" | "sliced" | "diced" | "minced" | "grated" | "pureed" | "mashed" | "crushed" | "whole" | "other"
    notes TEXT, -- e.g., organic | non-GMO
    UNIQUE(recipe_id, ingredient_id)
);

-- Meal type table (no dependencies)
CREATE TABLE IF NOT EXISTS core.meal_type (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meal plans table (depends on auth.users)
CREATE TABLE IF NOT EXISTS core.meal_plan (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    name_embedding vector(2000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meal plan recipes junction table (depends on meal_plan, recipe, and meal_type)
CREATE TABLE IF NOT EXISTS core.meal_plan_recipes (
    id BIGSERIAL PRIMARY KEY,
    meal_plan_id INTEGER REFERENCES core.meal_plan(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES core.recipe(id) ON DELETE CASCADE,
    day_of_plan INTEGER NOT NULL, -- 1, 2, 3, etc. for ordering
    meal_type_id INTEGER REFERENCES core.meal_type(id) ON DELETE CASCADE,
    servings INTEGER DEFAULT 1,
    notes TEXT,
    UNIQUE(meal_plan_id, recipe_id, day_of_plan, meal_type_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_recipe_user_id ON core.recipe(user_id);
CREATE INDEX IF NOT EXISTS idx_recipe_instruction_recipe_id ON core.recipe_instruction(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_instruction_step ON core.recipe_instruction(recipe_id, step);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredient_link_recipe_id ON core.recipe_ingredient_link(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredient_link_ingredient_id ON core.recipe_ingredient_link(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_meal_plan_user_id ON core.meal_plan(user_id);

-- Create vector similarity search indexes using HNSW
CREATE INDEX IF NOT EXISTS idx_ingredient_name_embedding ON core.ingredient USING hnsw (name_embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_recipe_title_embedding ON core.recipe USING hnsw (title_embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_meal_plan_name_embedding ON core.meal_plan USING hnsw (name_embedding vector_cosine_ops);
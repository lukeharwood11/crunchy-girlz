# Crunchy Girlz API

A comprehensive recipe and meal planning API built with FastAPI and Supabase.

## Features

- **Ingredients Management**: CRUD operations for ingredients with categories and units
- **Recipe Management**: Create, read, update, and delete recipes with ingredients
- **Meal Planning**: Create meal plans and organize recipes by day and meal type
- **Unit Management**: Manage units of measure and their types
- **Authentication**: JWT-based authentication using Supabase
- **Search**: Text search capabilities for ingredients, recipes, and meal plans
- **Vector Embeddings**: Support for AI-powered semantic search (pgvector)

## API Structure

### Models
- **Ingredient**: Food ingredients with categories and nutritional info
- **Recipe**: Cooking recipes with instructions and ingredient lists
- **MealPlan**: Organized meal planning with recipes scheduled by day
- **UnitOfMeasure**: Measurement units (cups, grams, etc.)
- **MealType**: Types of meals (breakfast, lunch, dinner, snack)

### Authentication

The API uses Supabase JWT authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### Ingredients (`/api/v1/ingredients`)
- `GET /` - List all ingredients (public)
- `GET /{id}` - Get ingredient by ID (public)
- `POST /` - Create ingredient (authenticated)
- `PUT /{id}` - Update ingredient (authenticated)
- `DELETE /{id}` - Delete ingredient (authenticated)
- `GET /search/` - Search ingredients (public)

#### Recipes (`/api/v1/recipes`)
- `GET /` - List user's recipes (authenticated)
- `GET /{id}` - Get recipe by ID (public/user-specific)
- `POST /` - Create recipe (authenticated)
- `PUT /{id}` - Update recipe (authenticated, owner only)
- `DELETE /{id}` - Delete recipe (authenticated, owner only)
- `GET /search/` - Search recipes (public/user-specific)
- `POST /{id}/ingredients` - Add ingredient to recipe (authenticated)
- `GET /{id}/ingredients` - Get recipe ingredients (public)
- `PUT /ingredients/{link_id}` - Update recipe ingredient (authenticated)
- `DELETE /ingredients/{link_id}` - Remove ingredient from recipe (authenticated)

#### Units (`/api/v1/units`)
- `GET /` - List all units (public)
- `GET /{id}` - Get unit by ID (public)
- `POST /` - Create unit (authenticated)
- `PUT /{id}` - Update unit (authenticated)
- `DELETE /{id}` - Delete unit (authenticated)
- `GET /types` - List unit types (public)
- `POST /types` - Create unit type (authenticated)
- `PUT /types/{id}` - Update unit type (authenticated)
- `DELETE /types/{id}` - Delete unit type (authenticated)

#### Meal Plans (`/api/v1/meal-plans`)
- `GET /` - List user's meal plans (authenticated)
- `GET /{id}` - Get meal plan by ID (authenticated, owner only)
- `POST /` - Create meal plan (authenticated)
- `PUT /{id}` - Update meal plan (authenticated, owner only)
- `DELETE /{id}` - Delete meal plan (authenticated, owner only)
- `GET /search/` - Search meal plans (authenticated)
- `POST /{id}/recipes` - Add recipe to meal plan (authenticated)
- `GET /{id}/recipes` - Get meal plan recipes (authenticated, owner only)
- `PUT /recipes/{recipe_id}` - Update meal plan recipe (authenticated)
- `DELETE /recipes/{recipe_id}` - Remove recipe from meal plan (authenticated)
- `GET /types` - List meal types (public)
- `POST /types` - Create meal type (authenticated)
- `PUT /types/{id}` - Update meal type (authenticated)
- `DELETE /types/{id}` - Delete meal type (authenticated)

## Setup

### Environment Variables

Create a `.env` file with the following variables:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
OPENAI_API_KEY=your_openai_api_key
DEBUG=false
API_V1_PREFIX=/api
```

### Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the development server:
```bash
uvicorn api.main:app --reload
```

3. Access the API documentation at `http://localhost:8000/docs`

## Database Schema

The API uses the following PostgreSQL schema with pgvector extension:

- `core.ingredient` - Ingredients with vector embeddings
- `core.recipe` - Recipes with vector embeddings
- `core.recipe_ingredient_link` - Many-to-many recipe-ingredient relationships
- `core.meal_plan` - Meal plans with vector embeddings
- `core.meal_plan_recipes` - Meal plan recipe scheduling
- `core.unit_of_measure` - Measurement units
- `core.unit_of_measure_type` - Unit categories
- `core.meal_type` - Meal types (breakfast, lunch, etc.)

## Security

- JWT authentication via Supabase
- User-based data isolation for recipes and meal plans
- Public read access for ingredients and units
- Authenticated write access for all operations

## Response Format

All endpoints return responses in the following format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

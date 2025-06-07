export enum RecipeInstructionType {
  INSTRUCTION = "instruction",
  NOTE = "note"
}

export interface RecipeInstruction {
  step: number;
  description: string;
  type: RecipeInstructionType;
}

export interface RecipeBase {
  title: string;
  description?: string | null;
  instructions?: RecipeInstruction[] | null;
  prep_time_minutes?: number | null;
  cook_time_minutes?: number | null;
  servings?: number | null;
  difficulty_level?: string | null;
}

export interface RecipeCreate extends RecipeBase {
  user_id?: string | null;
  title_embedding?: number[] | null;
}

export interface RecipeUpdate {
  title?: string | null;
  description?: string | null;
  instructions?: RecipeInstruction[] | null;
  prep_time_minutes?: number | null;
  cook_time_minutes?: number | null;
  servings?: number | null;
  difficulty_level?: string | null;
  title_embedding?: number[] | null;
}

export interface Ingredient {
  id: number;
  name: string;
  description?: string | null;
  category?: string | null;
  created_at: string;
  updated_at: string;
}

export interface IngredientCreate {
  name: string;
  description?: string | null;
  category?: string | null;
}

export interface UnitOfMeasure {
  id: number;
  name: string;
  abbreviation?: string | null;
  type?: string | null;
  created_at: string;
  updated_at: string;
}

export interface UnitOfMeasureCreate {
  name: string;
  abbreviation?: string | null;
  type?: string | null;
}

export interface RecipeIngredientLinkBase {
  recipe_id: number;
  ingredient_id?: number | null;
  quantity: string; // Decimal as string
  unit_id?: number | null;
  preparation?: string | null;
  notes?: string | null;
}

export interface RecipeIngredientLinkCreate extends RecipeIngredientLinkBase {
  ingredient?: IngredientCreate | null;
  unit?: UnitOfMeasureCreate | null;
}

export interface RecipeIngredientLinkUpdate {
  quantity?: string | null;
  unit_id?: number | null;
  preparation?: string | null;
  notes?: string | null;
}

export interface RecipeIngredientLink extends RecipeIngredientLinkBase {
  id: number;
}

export interface RecipeIngredientLinkExpanded extends RecipeIngredientLinkBase {
  id: number;
  ingredient?: Ingredient | null;
  unit?: UnitOfMeasure | null;
}

export interface Recipe extends RecipeBase {
  id: number;
  user_id?: string | null;
  title_embedding?: number[] | null;
  ingredients?: RecipeIngredientLinkExpanded[] | null;
  created_at: string;
  updated_at: string;
}

export interface GetRecipesParams {
  skip?: number;
  limit?: number;
  difficulty_level?: string;
}

export interface SearchRecipesParams {
  q: string;
  limit?: number;
}

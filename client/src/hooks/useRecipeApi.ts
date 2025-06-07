import { useCallback } from 'react';
import useAxios from './useAxios';
import {
  Recipe,
  RecipeCreate,
  RecipeUpdate,
  RecipeIngredientLinkExpanded,
  RecipeIngredientLinkCreate,
  RecipeIngredientLinkUpdate,
  GetRecipesParams,
  SearchRecipesParams,
} from '../types/recipe';

interface SuccessResponse<T = any> {
  message: string;
  data?: T;
}

interface UseRecipeApiReturn {
  // Recipe CRUD operations
  createRecipe: (recipeData: RecipeCreate) => Promise<Recipe | null>;
  getRecipe: (recipeId: number) => Promise<Recipe | null>;
  getRecipes: (params?: GetRecipesParams) => Promise<Recipe[] | null>;
  updateRecipe: (recipeId: number, recipeData: RecipeUpdate) => Promise<Recipe | null>;
  deleteRecipe: (recipeId: number) => Promise<boolean>;
  searchRecipes: (params: SearchRecipesParams) => Promise<Recipe[] | null>;
  
  // Recipe ingredient operations
  addIngredientToRecipe: (
    recipeId: number,
    ingredientData: RecipeIngredientLinkCreate
  ) => Promise<RecipeIngredientLinkExpanded | null>;
  getRecipeIngredients: (recipeId: number) => Promise<RecipeIngredientLinkExpanded[] | null>;
  updateRecipeIngredient: (
    linkId: number,
    ingredientData: RecipeIngredientLinkUpdate
  ) => Promise<RecipeIngredientLinkExpanded | null>;
  removeIngredientFromRecipe: (linkId: number) => Promise<boolean>;
  
  // Loading and error states from the underlying axios hook
  loading: boolean;
  error: Error | null;
}

export const useRecipeApi = (): UseRecipeApiReturn => {
  const { loading, error, execute } = useAxios<SuccessResponse>();

  const createRecipe = useCallback(async (recipeData: RecipeCreate): Promise<Recipe | null> => {
    const response = await execute('/api/v1/recipes', {
      method: 'POST',
      data: recipeData,
    });
    return response?.data || null;
  }, [execute]);

  const getRecipe = useCallback(async (recipeId: number): Promise<Recipe | null> => {
    const response = await execute(`/api/v1/recipes/${recipeId}`);
    return response?.data || null;
  }, [execute]);

  const getRecipes = useCallback(async (params?: GetRecipesParams): Promise<Recipe[] | null> => {
    const response = await execute('/api/v1/recipes/', {
      params,
    });
    return response?.data || null;
  }, [execute]);

  const updateRecipe = useCallback(async (
    recipeId: number,
    recipeData: RecipeUpdate
  ): Promise<Recipe | null> => {
    const response = await execute(`/api/v1/recipes/${recipeId}`, {
      method: 'PUT',
      data: recipeData,
    });
    return response?.data || null;
  }, [execute]);

  const deleteRecipe = useCallback(async (recipeId: number): Promise<boolean> => {
    const response = await execute(`/api/v1/recipes/${recipeId}`, {
      method: 'DELETE',
    });
    return !!response;
  }, [execute]);

  const searchRecipes = useCallback(async (params: SearchRecipesParams): Promise<Recipe[] | null> => {
    const response = await execute('/api/v1/recipes/search', {
      params,
    });
    return response?.data || null;
  }, [execute]);

  const addIngredientToRecipe = useCallback(async (
    recipeId: number,
    ingredientData: RecipeIngredientLinkCreate
  ): Promise<RecipeIngredientLinkExpanded | null> => {
    const response = await execute(`/api/v1/recipes/${recipeId}/ingredients`, {
      method: 'POST',
      data: ingredientData,
    });
    return response?.data || null;
  }, [execute]);

  const getRecipeIngredients = useCallback(async (
    recipeId: number
  ): Promise<RecipeIngredientLinkExpanded[] | null> => {
    const response = await execute(`/api/v1/recipes/${recipeId}/ingredients`);
    return response?.data || null;
  }, [execute]);

  const updateRecipeIngredient = useCallback(async (
    linkId: number,
    ingredientData: RecipeIngredientLinkUpdate
  ): Promise<RecipeIngredientLinkExpanded | null> => {
    const response = await execute(`/api/v1/recipes/ingredients/${linkId}`, {
      method: 'PUT',
      data: ingredientData,
    });
    return response?.data || null;
  }, [execute]);

  const removeIngredientFromRecipe = useCallback(async (linkId: number): Promise<boolean> => {
    const response = await execute(`/api/v1/recipes/ingredients/${linkId}`, {
      method: 'DELETE',
    });
    return !!response;
  }, [execute]);

  return {
    // Recipe CRUD operations
    createRecipe,
    getRecipe,
    getRecipes,
    updateRecipe,
    deleteRecipe,
    searchRecipes,
    
    // Recipe ingredient operations
    addIngredientToRecipe,
    getRecipeIngredients,
    updateRecipeIngredient,
    removeIngredientFromRecipe,
    
    // State from underlying axios hook
    loading,
    error,
  };
};

export default useRecipeApi;

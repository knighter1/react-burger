import React from 'react';
import { IngredientData } from '../components/IngredientMenuItem/IngredientMenuItem';

interface IDataContext
{
    ingredients: IngredientData[];
}

export const DataContext = React.createContext<IDataContext>({ingredients: []});
import { createContext } from 'react';
import type { AppContextType } from './types'; 

export const AppContext = createContext<AppContextType>({} as AppContextType);


import {createContext,useContext} from 'react';
import {arabicColorText} from './colorTranslation';
export const ColorLanguage=createContext('en');
const identity=value=>value;
export function useColorText(){return useContext(ColorLanguage)==='ar'?arabicColorText:identity;}

import fs from 'fs';
import path from 'path';
export function useThemeData() {
    const filePath=path.join(process.cwd(), 'data/researchThemes','themes.json')
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData);
  
    return data;
}
import fs from 'fs';
import path from 'path';
export function useThemeData() {
    const filePath=path.join(process.cwd(), '/data/fullJson', 'fullCatJson.json')
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const themedata = JSON.parse(jsonData);
  
    return themedata;
}
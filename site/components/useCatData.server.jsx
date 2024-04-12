import fs from 'fs';
import path from 'path';

export function useCatData() {
  const filePath = path.join(process.cwd(), 'data', 'test2.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);

  return data;
}
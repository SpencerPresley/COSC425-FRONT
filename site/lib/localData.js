import fsPrommises from 'fs/promises';
import path from 'path';


export async function getStaticProps() {
    // Path to the JSON file
    const filePath = path.join(process.cwd(), 'public/test2.json');
    
    // Read the JSON file
    const jsonData =await fsPrommises.readFile(filePath)
    const data = JSON.parse(jsonData);
  
    // Pass the items array to the page via props
    return {
        props: { localData }
    }
}

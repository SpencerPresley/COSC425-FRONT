import { CardAZ } from "@/components/cardAZ"//gets cardaz component
import { CatAZPag } from "@/components/catAzPag"//gets card az pag line component

async function getLetterData(letter) {//returns data of a specific letter that was passed from the parameter
  const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());//gets json file

  // Find the category object based on the first letter in url property
  const filtEntries = Object.entries(data).filter(([_, item]) => item.url.startsWith(letter));//filters topics begining with letter

  if (filtEntries) {//returns the found data in a specfic format
    const letterData = filtEntries.map(([categoryName, entry]) => ({ categoryName, ...entry }));//formats the data received from json
    return letterData;
  }

  return null;
}

async function getAllData(letter) {//returns all entries in a certain format
  const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());//gets json file
  const letterData = Object.entries(data).map(([categoryName, ...entry]) => ({categoryName, ...entry}));//formats the data received from json
  return letterData;
}

export default async function Page({ params }) {//accepts the parameters from the url as a variable
  const { letter } = params;//converts it into a useable varible
  let letterData = null;//sets up data reveived from parameter

  if (letter == "all")//checks to see if parameter is the all slection, or just a letter
    letterData = await getAllData(letter);//returns all data of topics
  else
    letterData = await getLetterData(letter);//returns specific letter data of topics

  if (!letterData) {
    // Handle the case when letterData is undefined
    return <div>Letter not found</div>;
  }

  const entrySets = [];//sets up the entries
  for (let i = 0; i < letterData.length; i += 4) {//goes through four topicsand then slicing them to an 2d array of rows and col
    entrySets.push(letterData.slice(i, i + 4));//slices data received
  }

  return (
    <div className="bg-suMaroon w-full flex flex-col space-y-4 rounded-lg outline outline-3 outline-su-extra-light-grey">{/**sets up topic AZ body background */}
      <div className="m-8 text-5xl font-bold text-white text-center">Topic A-Z</div>
      <CatAZPag />{/**displays the begginig topic letter filter */}
      <div>
        {/*goes through each row*/}
        {entrySets.map((set, setIndex) => ( 
          <div key={setIndex} className="flex flex-col space-y-2 m-8">
            <div className="flex lg:flex-row flex-col shrink- w-full h-60 rounded-lg">
              {/*goes through each column 4 times for each row*/}
              {set.map((entry, index) => (
                // displays simple topic data cards
                <CardAZ
                  title={entry.categoryName}
                  facultyCount={entry.faculty_count}
                  departmentCount={entry.department_count}
                  articleCount={entry.article_count}
                  url={entry.url}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export const CatTitle = ({ data }) => {
    // console.log(data);
    return (
        <div>
            {Object.entries(data).map(([category, details]) => (
                <div key={category} className="text-5xl">
                   {category}                    
                </div>
            ))}
        </div>
    );
};
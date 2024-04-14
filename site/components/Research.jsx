export const Themes = ({ themedata }) => {
    return (
        <div>
            <h1 className="font-bold">Research Topics</h1>
            {Object.entries(themedata).map(([theme, details]) => (
                <div key={theme}>
                    <h2>{theme}</h2>
                    <hr />
                    {Object.entries(details).map(([category, items]) => (
                        <div key={category}>
                            <h3>{category}</h3>
                            <ul>
                                {Object.entries(items).map(([subCategory, subItems]) => (
                                    <li key={subCategory}>
                                        <h4>{subCategory}</h4>
                                    </li>
                                ))}
                            </ul>
                            <hr />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
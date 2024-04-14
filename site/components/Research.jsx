export const Themes = ({ themedata }) => {
    return (
        <div>
            <h1 className="font-bold">Research Topics</h1>
            {Object.entries(themedata).map(([theme, details]) => (
                <div key={theme}>
                    <ul>
                        {Object.entries(details).map(([category, items]) => (
                            <li key={category}>
                                <h3>{category}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
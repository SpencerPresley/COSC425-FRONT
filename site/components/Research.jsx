export const Themes = ({ data }) => {
    return (
        <div>
            <h1 className="font-bold underline flex justify-center">Research Topics</h1>
            {Object.entries(data).map(([theme, details]) => (
                <div key={theme}>
                    <br />
                    {Object.entries(details.Themes).map(([section, themes]) => (
                        <ul>
                            <li>{themes}</li>
                        </ul>
                    ))}
                    <br />
                </div>
            ))}
        </div>
    );
};
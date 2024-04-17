export const Themes = ({ themes }) => {
    return (
        <div>
            <h1 className="font-bold underline flex justify-center">Research Topics</h1>
                <div>
                    <br />
                    {themes.map((themes) => (
                        <ul>
                            <li key={index}>{themes}</li>
                        </ul>
                    ))}
                    <br />
                </div>
        </div>
    );
};
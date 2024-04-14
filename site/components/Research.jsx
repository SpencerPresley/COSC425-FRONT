
// export const Themes = () => {
//     return (
//         <div>
//             <h1 className="text-white font-bold">Research Themes</h1>
//             <ul>
//                 <li className="text-sm text-white">Item 1</li>
//                 <li className="text-sm text-white">Item 2</li>
//                 <li className="text-sm text-white">Item 3</li>
//                 <li className="text-sm text-white">Item 4</li>
//             </ul>
//         </div>
//     );
// };

export const Themes = () => {
    return (
        <div>
            <div value="faculty" className=" px-10 pb-10 ">
                <h2>Research Themes(in order of activity level):</h2>
                <div className="px-10">
                    <div className="text-sm list-disk;">
                        <li>
                            Natural Language Models                        </li>
                    </div>
                    <div className="text-sm list-disk">
                        <li>
                            Generative Software Appliations
                        </li>
                    </div>
                    <div className="text-sm list-disk">
                        <li>
                            Software Coding with AI 
                        </li>
                    </div>
                    <div className="text-sm list-disk">
                        <li>
                            Workforce Displacement  
                        </li>
                    </div>
                    <div className="text-sm list-disk">
                        <li>
                            Prompt Engineering  
                        </li>
                    </div>
                    <div className="text-sm list-disk">
                        <li>
                            Machine Learning  
                        </li>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
// export const LabSpace= () =>{
// return (
//     <div className="text-white">
//         <h1 className="font-bold">Associated Lab Space
//         </h1>
//         <h2 className="text-decoration-line: underline">Henson High Performance Computer Lab
//         </h2>
//         <p className="text-sm">The Henson High Performance Computing Lab is a Beowulf cluster
//          designed for classroom use as well as a research cluster</p>
//          <ul className="text-sm">
//             <li>Sq ft: 530
//             </li>
//             <li className="text-decoration-line: underline">List of Equipment</li>
//          </ul>
//     </div>
// );
// };

export const LabSpace = () => {
    return (
        <div>
            <div value="faculty" className="text-white px-10 pb-10">
                <h2>Associated Lab Space:</h2>
                <div className="px-10">
                    <div className="text-sm list-disk;">
                        <h2 className="text-decoration-line: underline">Henson High Performance Computer Lab</h2>
                        <p>The Henson High Performance Computing Lab is a Beowulf cluster designed for both classroom instruction as well as a research cluster</p>
                    </div>
                    <div className="text-sm list-disk pl-5">
                        <li>
                            Sq ft: 530
                        </li>
                        <li className="text-decoration-line: underline">
                            List of Equipment
                        </li>
                    </div>
                </div>
            </div>
        </div>
    );
};
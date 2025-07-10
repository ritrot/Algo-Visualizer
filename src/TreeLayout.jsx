import { useState } from "react";
import TreeCanvas from "./Tree";
import { insertNode } from "./Algo/BST";

export default function TreeLayout() {
    const [tree, setTree] = useState(null);
    const [value, setValue] = useState("");

    const handleInsert = () => {
        const val = parseInt(value);
        if (!isNaN(val)) {
            const updated = insertNode(tree, val);
            setTree(updated);
            setValue("");
        }
    };

    return (
        <div className="flex items-center mb-10 gap-10 justify-between flex-col">
            {/* Header */}
            <div className="w-full text-white flex items-center justify-between p-4 shadow-md">
                <div className="text-2xl font-bold ">Tree Visualizer 🌲</div>

                <div className="flex items-center gap-4">
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        type="number"
                        placeholder="Enter value"
                        className="px-4 py-2 rounded border border-gray-400 focus:outline-none"
                    />
                    <button
                        onClick={handleInsert}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
                    >
                        Insert
                    </button>
                </div>
            </div>

            {/* Tree canvas */}

            <div className=" bg-gray-800 min-h-[500px] border border-gray-700 rounded p-4 shadow-lg">
                <TreeCanvas tree={tree} />

            </div>

        </div>
    );
}

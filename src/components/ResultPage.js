
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResultPage = () => {
    const navigate = useNavigate(); // Hook used inside the component
    const location = useLocation();

    const backToLuckygame = () => {
        navigate('/'); // Programmatically navigate to '/'
    };

    const message = location.state?.message || "No result available";
    const item = location.state?.item;

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-900 to-indigo-950 text-white">
            <h1 className="text-5xl mt-10 font-extrabold mb-4 text-yellow-300">🎉 Congratulations 🎉</h1>
            <div className="p-8 bg-yellow-500 text-white rounded-lg shadow-2xl text-center border-4 border-yellow-300  transform hover:scale-105 transition duration-300">
                <p className="text-3xl font-semibold mb-4">{message}</p>
                
                {item?.image && (
                    <div>
                        <img
                            src={item.image}
                            alt={item.itemName ? `You won ${item.itemName}` : "Winning item"}
                            className="mt-4 rounded-lg shadow-lg border-4 border-yellow-300"
                            style={{ width: '480px', height: 'auto' }}
                        />
                    </div>
                )}
            </div>
            <div>
                <button
                    type="button"
                    onClick={backToLuckygame}
                    className="w-full bg-gray-300 mt-20 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200 transform hover:scale-105 shadow-md"
                >
                    Back to Lucky Game
                </button>
            </div>
        </div>
    );
};

export default ResultPage;

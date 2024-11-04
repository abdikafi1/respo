import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HeroSection() {
    const [message, setMessage] = useState('');
    const [item, setItem] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const [selectedNumbers, setSelectedNumbers] = useState([]); // Tracks clicked numbers
    const navigate = useNavigate();

    const handleNumberClick = async (number) => {
        try {
            // Add the clicked number to selectedNumbers to disable it and change its color
            setSelectedNumbers((prev) => [...prev, number]);

            // Fetch item data based on the clicked number
            const response = await axios.get(`http://localhost:5000/api/items/name/${number}`);
            const { itemName, image } = response.data;

            let resultMessage = itemName ? `🎉 You won a ${itemName}! 🎉` : "😢 No win ! 🌟";
            setMessage(resultMessage);
            setItem({ itemName, image });
            setCountdown(3); // Start 3-second countdown
        } catch (error) {
            console.error("Error fetching item data:", error);
            setMessage("😢 No win ! 😢 ");
            setItem(null);
            setCountdown(3);
        }
    };

    useEffect(() => {
        if (countdown === 0) {
            navigate('/result', { state: { message, item } });
        }
        if (countdown !== null && countdown > 0) {
            const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [countdown, navigate, message, item]);

    const formatCountdown = (time) => {
        const seconds = String(time).padStart(2, '0');
        return `00:00:${seconds}`;
    };

    return (
        <div className="bg-blue-950 w-full h-screen flex flex-col items-center">
            <header className="bg-blue-600 text-white p-4 shadow-md w-full">
                <h1 className="text-[35px] font-poppins text-center font-bold">
                    Mr<span className="text-blue-500"> Lucky</span>
                </h1>
            </header>

            <div className="mt-10 rounded-lg p-6 max-w-4xl text-center">
                {!countdown && (
                    <div className="grid grid-cols-10 ml-[200px] gap-4">
                        {[...Array(50)].map((_, index) => {
                            const number = index + 1;
                            const isSelected = selectedNumbers.includes(number);

                            return (
                                <button
                                    key={number}
                                    className={`${
                                        isSelected ? 'bg-red-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
                                    } text-white font-semibold py-2 rounded`}
                                    onClick={() => !isSelected && handleNumberClick(number)} // Disable click if already selected
                                    disabled={isSelected} // Disable button if selected
                                >
                                    {number}
                                </button>
                            );
                        })}
                    </div>
                )}

                {countdown !== null && (
                    <div className="flex justify-center mt-6 space-x-2 text-white text-6xl font-mono font-bold">
                        {formatCountdown(countdown).split('').map((char, index) => (
                            <div
                                key={index}
                                className="bg-black rounded-lg shadow-lg w-20 h-28 flex items-center justify-center"
                            >
                                {char}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HeroSection;

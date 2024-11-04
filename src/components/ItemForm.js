// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

// function ItemForm() {
//     const [number, setNumber] = useState("");
//     const [itemName, setItemName] = useState("");
//     const [image, setImage] = useState(null);
//     const [message, setMessage] = useState("");
//     const [errors, setErrors] = useState({});
//     const [editId, setEditId] = useState(null);

//     // Display success or error message temporarily
//     useEffect(() => {
//         if (message) {
//             const timer = setTimeout(() => setMessage(""), 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [message]);

//     // Input change handlers
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (name === "number") setNumber(value);
//         if (name === "itemName") setItemName(value);
//     };

//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//     };

//     // Validate form fields
//     const validate = () => {
//         const validationErrors = {};
//         if (!number || number <= 0) validationErrors.number = "Item number must be a positive integer.";
//         if (!itemName || itemName.length < 3) validationErrors.itemName = "Item name must be at least 3 characters long.";
//         if (!image) validationErrors.image = "Please upload an image.";
//         setErrors(validationErrors);
//         return Object.keys(validationErrors).length === 0;
//     };

//     // Add or update item based on `editId`
//     const handleAddOrUpdateItem = async (e) => {
//         e.preventDefault();
//         if (!validate()) return;

//         const formData = new FormData();
//         formData.append("number", number);
//         formData.append("itemName", itemName);
//         formData.append("image", image);

//         try {
//             const url = editId ? `http://localhost:5000/api/items/${editId}` : "http://localhost:5000/api/items";
//             const method = editId ? "put" : "post";

//             await axios({
//                 method,
//                 url,
//                 data: formData,
//                 headers: { "Content-Type": "multipart/form-data" }
//             });

//             setMessage(editId ? "Item updated successfully" : "Item registered successfully");
//             clearForm();
//         } catch (error) {
//             console.error("Error:", error);
//             setMessage("Failed to add or update item");
//         }
//     };

//     // Clear form after submission or cancellation
//     const clearForm = () => {
//         setNumber("");
//         setItemName("");
//         setImage(null);
//         setErrors({});
//         setEditId(null);
//     };

//     // Handle item deletion
//     const handleDelete = async () => {
//         if (!editId) return setMessage("Please select an item to delete");

//         try {
//             await axios.delete(`http://localhost:8080/api/items/${editId}`);
//             setMessage("Item deleted successfully");
//             clearForm();
//         } catch (error) {
//             console.error("Error deleting item:", error);
//             setMessage("Failed to delete item");
//         }
//     };

//     return (
//         <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
//             <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
//                 {editId ? "Edit Item" : "Add Item"}
//             </h2>
//             <form onSubmit={handleAddOrUpdateItem} className="space-y-4">
//                 <div>
//                     <label className="block text-xl font-medium text-gray-700">Item Number</label>
//                     <input
//                         value={number}
//                         onChange={handleInputChange}
//                         name="number"
//                         type="number"
//                         className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter item number"
//                         required
//                     />
//                     {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-xl font-medium text-gray-700">Item Name</label>
//                     <input
//                         value={itemName}
//                         onChange={handleInputChange}
//                         name="itemName"
//                         type="text"
//                         className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter item name"
//                         required
//                     />
//                     {errors.itemName && <p className="text-red-500 text-sm mt-1">{errors.itemName}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-xl font-medium text-gray-700">Item Image</label>
//                     <input
//                         onChange={handleImageChange}
//                         type="file"
//                         className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         accept="image/*"
//                         required
//                     />
//                     {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
//                 </div>
//                 <div className="flex space-x-3">
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
//                     >
//                         {editId ? "Update Item" : "Save"}
//                     </button>
//                     {editId && (
//                         <button
//                             type="button"
//                             onClick={handleDelete}
//                             className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
//                         >
//                             Delete
//                         </button>
//                     )}
//                     <button
//                         type="button"
//                         onClick={clearForm}
//                         className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition duration-300"
//                     >
//                         Cancel
//                     </button>
//                 </div>
//             </form>
//             {message && (
//                 <div className={`mt-6 flex items-center space-x-2 ${message.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
//                     {message.includes("Failed") ? <AiOutlineCloseCircle size={20} /> : <AiOutlineCheckCircle size={20} />}
//                     <p>{message}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ItemForm;

//________________________________________________________________________




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const ItemForm = () => {
    const [formData, setFormData] = useState({ number: '', itemName: '', image: '' });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate form fields
    const validate = () => {
        const errors = {};

        if (!formData.number || formData.number <= 0) {
            errors.number = "Item number must be a positive integer.";
        }

        if (!formData.itemName || formData.itemName.length < 3) {
            errors.itemName = "Item name must be at least 3 characters long.";
        }

        if (!formData.image) {
            errors.image = "Please provide a valid image URL.";
        } 
        else if (!/\.(jpg|jpeg|png|gif)$/i.test(formData.image)) {
            errors.image = "Image URL must end with .jpg, .jpeg, .png, or .gif.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle add item
    const addItem = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.post('http://localhost:5000/api/items', formData);
            setMessage('Item added successfully');
            setFormData({ number: '', itemName: '', image: '' });
        } catch (error) {
            console.error('Error adding item:', error);
            setMessage('Failed to add item');
        }
    };

    // Handle update item
    const updateItem = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.put(`http://localhost:5000/api/items/${editId}`, formData);
            setMessage('Item updated successfully');
            setFormData({ number: '', itemName: '', image: '' });
            setEditId(null);
        } catch (error) {
            console.error('Error updating item:', error);
            setMessage('Failed to update item');
        }
    };

    // Handle delete item
    const handleDelete = async () => {
        if (editId) {
            try {
                await axios.delete(`http://localhost:5000/api/items/${editId}`);
                setMessage('Item deleted successfully');
                setFormData({ number: '', itemName: '', image: '' });
                setEditId(null);
            } catch (error) {
                console.error('Error deleting item:', error);
                setMessage('Failed to delete item');
            }
        } else {
            setMessage('Please select an item to delete');
        }
    };

    // Handle edit item
    const handleEdit = (item) => {
        setFormData({ number: item.number, itemName: item.itemName, image: item.image });
        setEditId(item._id);
        setMessage('Editing item...');
    };

    // Cancel editing
    const handleCancel = () => {
        setFormData({ number: '', itemName: '', image: '' });
        setEditId(null);
        navigate('/dashboard');
    };

    return (
        <div className="max-w-lg mx-auto mt-20 bg-white p-8 rounded-lg shadow-lg transition-shadow hover:shadow-2xl transform hover:-translate-y-1 duration-300">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                {editId ? 'Edit Item' : 'Add Item'}
            </h2>
            <form className="space-y-6" onSubmit={editId ? updateItem : addItem}>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Win Number</label>
                    <input
                        type="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        className={`w-full p-3 border ${errors.number ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150`}
                        placeholder="Enter item number"
                    />
                    {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Item Name</label>
                    <input
                        type="text"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        className={`w-full p-3 border ${errors.itemName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150`}
                        placeholder="Enter item name"
                    />
                    {errors.itemName && <p className="text-red-500 text-sm mt-1">{errors.itemName}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className={`w-full p-3 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150`}
                        placeholder="Enter image URL"
                    />
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                </div>
                <div className="flex space-x-3">
                    {editId ? (
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 transform hover:scale-105 shadow-md"
                        >
                            Update Item
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105 shadow-md"
                        >
                            Add Item
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 transform hover:scale-105 shadow-md"
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200 transform hover:scale-105 shadow-md"
                    >
                        Cancel
                    </button>
                </div>
            </form>

            {message && (
                <div className={`mt-6 flex items-center space-x-2 ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
                    {message.includes('Failed') ? (
                        <AiOutlineCloseCircle size={20} />
                    ) : (
                        <AiOutlineCheckCircle size={20} />
                    )}
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default ItemForm;

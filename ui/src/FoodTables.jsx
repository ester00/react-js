import React, { useState, useMemo, useEffect } from 'react';
import { fetchFoods, addNewFood as addFoodApi } from './utils/api';

const FoodTables = () => {
    const [allFoods, setAllFoods] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newFood, setNewFood] = useState({ description: '', kcal: 0, protein: 0, fat: 0, carbs: 0 });
    const [isFormVisible, setIsFormVisible] = useState(false);

    const addNewFood = (e) => {
        e.preventDefault();
        addFoodApi(newFood)
            .then(data => {
                setIsFormVisible(false);
                setNewFood({ description: '', kcal: 0, protein: 0, fat: 0, carbs: 0 });
                fetchFoods().then(setAllFoods);
            })
            .catch((error) => console.error('Error adding new food:', error));
    };

    useEffect(() => {
        fetchFoods().then(setAllFoods).catch((error) => console.error("Error setting foods:", error));
    }, []);

    const filteredFoods = useMemo(() => {
        return allFoods.filter(food => food.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, allFoods]);

    const addToSelectedFoods = (food) => {
        const isExisting = selectedFoods.some(selected => selected.id === food.id);
        if (!isExisting) {
            setSelectedFoods(prev => [...prev, food]);
        }
    };

    const totals = useMemo(() => {
        return selectedFoods.reduce((acc, curr) => ({
            kcal: acc.kcal + curr.kcal,
            protein: acc.protein + curr.protein,
            fat: acc.fat + curr.fat,
            carbs: acc.carbs + curr.carbs,
        }), { kcal: 0, protein: 0, fat: 0, carbs: 0 });
    }, [selectedFoods]);

    return (
        <div className="p-5">
            <button onClick={() => setIsFormVisible(!isFormVisible)} className="mb-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700">
                {isFormVisible ? 'Hide Form' : 'Add New Food'}
            </button>

            {isFormVisible && (
                <div className="mb-10">
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">Add New Food</h2>
                        <form onSubmit={addNewFood} className="mb-6">
                            <input type="text" value={newFood.description} onChange={(e) => setNewFood({ ...newFood, description: e.target.value })} placeholder="Description" className="mb-5 px-5 py-3 border rounded block w-full" />
                            <input type="number" value={newFood.kcal} onChange={(e) => setNewFood({ ...newFood, kcal: Number(e.target.value) })} placeholder="Calories" className="mb-5 px-5 py-3 border rounded block w-full" />
                            <input type="number" value={newFood.protein} onChange={(e) => setNewFood({ ...newFood, protein: Number(e.target.value) })} placeholder="Protein (g)" className="mb-5 px-5 py-3 border rounded block w-full" />
                            <input type="number" value={newFood.fat} onChange={(e) => setNewFood({ ...newFood, fat: Number(e.target.value) })} placeholder="Fat (g)" className="mb-5 px-5 py-3 border rounded block w-full" />
                            <input type="number" value={newFood.carbs} onChange={(e) => setNewFood({ ...newFood, carbs: Number(e.target.value) })} placeholder="Carbs (g)" className="mb-5 px-5 py-3 border rounded block w-full" />
                            <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full">Submit</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Selected Foods</h2>
                <div className="overflow-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Kcal</th>
                                <th className="px-4 py-2">Protein (g)</th>
                                <th className="px-4 py-2">Fat (g)</th>
                                <th className="px-4 py-2">Carbs (g)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedFoods.map((food, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{food.description}</td>
                                    <td className="border px-4 py-2">{food.kcal}</td>
                                    <td className="border px-4 py-2">{food.protein}</td>
                                    <td className="border px-4 py-2">{food.fat}</td>
                                    <td className="border px-4 py-2">{food.carbs}</td>
                                </tr>
                            ))}
                            <tr className="bg-gray-100 font-semibold">
                                <td className="border px-4 py-2">Total</td>
                                <td className="border px-4 py-2">{totals.kcal}</td>
                                <td className="border px-4 py-2">{totals.protein}</td>
                                <td className="border px-4 py-2">{totals.fat}</td>
                                <td className="border px-4 py-2">{totals.carbs}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Search Foods</h2>
                <input
                    type="text"
                    className="mb-5 px-5 py-3 border rounded block w-full"
                    placeholder="Search..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="overflow-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Kcal</th>
                                <th className="px-4 py-2">Protein (g)</th>
                                <th className="px-4 py-2">Fat (g)</th>
                                <th className="px-4 py-2">Carbs (g)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFoods.map((food, index) => (
                                <tr key={index} onClick={() => addToSelectedFoods(food)} className="cursor-pointer hover:bg-gray-100">
                                    <td className="border px-4 py-2">{food.description}</td>
                                    <td className="border px-4 py-2">{food.kcal}</td>
                                    <td className="border px-4 py-2">{food.protein}</td>
                                    <td className="border px-4 py-2">{food.fat}</td>
                                    <td className="border px-4 py-2">{food.carbs}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

};

export default FoodTables;

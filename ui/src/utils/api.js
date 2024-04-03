const BASE_URL = 'http://localhost:3000/foods';

export const fetchFoods = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error;
    }
};

export const addNewFood = async (newFood) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFood),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error adding new food:', error);
        throw error;
    }
};

import React from 'react';

function CategorySelect({categories, selectedCategory, onChange}) {
    return (
        <select 
            value={selectedCategory} 
            onChange={(event) => onChange(event.target.value)} 
            className="p-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-full">
            <option value="">Select Category</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
            );
}
    
export default CategorySelect;

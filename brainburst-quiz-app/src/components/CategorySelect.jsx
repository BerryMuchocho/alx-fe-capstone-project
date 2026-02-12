import React from 'react';

function CategorySelect({categories, selectCategory, onChange}) {
    return (
        <select value={selectedCategory} onChange={onChange} className="p-2 border rounded">
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
            );
}
    
export default CategorySelect;

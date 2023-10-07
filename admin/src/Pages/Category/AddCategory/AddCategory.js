import React, { useState } from 'react';
import './AddCategory.css';
import InputText from '../../../components/InputText/InputText';
import { useCategoriesApi } from '../../../contexts/CategoriesApiContext';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const { addCategory } = useCategoriesApi();

  const handleAddCategory = () => {
    const newCategory = {
      name: categoryName
    };
    addCategory(newCategory);
  };

  return (
    <div className='container-page-add-category-cont'>
      <h1 className='title-page-add-category'>Ajouter une catégorie</h1>
      <div className='container-input-add-category'>
        <InputText
          labelText = "Intitulé de la catégorie"
          className = "input-add-category"
          value     = {categoryName}
          onChange  = {e => setCategoryName(e.target.value)}
        />
        <button className='btn-add-category-b' onClick={handleAddCategory}>Ajouter la catégorie</button>
      </div>
    </div>
  );
}
export default AddCategory;

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditCategory.css';
import { useCategoriesApi } from '../../../contexts/CategoriesApiContext';
import InputText from '../../../components/InputText/InputText';

const EditCategory = () => {
  const { categoryId } = useParams();
  const { categoryName, setCategoryName, isLoading, getCategoryById, editCategory } = useCategoriesApi();

  useEffect(() => {
    const ListCategoryById = async () => {
      try {
        const categoryData = await getCategoryById(categoryId);
        setCategoryName(categoryData.name);
      } catch (error) {
        console.error('Error loading category detail', error);
      }
    };
    ListCategoryById();
  }, [categoryId]);
  
  const handleSubmitCategory = async () => {
    const updatedCategory = {
      name: categoryName,
    }; 
    try {
      await editCategory(id,updatedCategory);
      window.location.reload();
    } catch (error) {
      console.error('Error updating category detail', error);
    }
  };
  return (
    <div className='update-category'>
      <h1 className='title-page'>Mettre à jour la catégorie</h1>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <div className='content-edit-category'>
          <InputText
            labelText = "Nom de l'instrument"
            className='input-edit-category'
            value     = {categoryName}
            onChange  = {e => setCategoryName(e.target.value)}
          />
          <button className='btn-edit-category' onClick={handleSubmitCategory}>Mettre à jour la catégorie</button>
        </div>
      )}
    </div>
  );
};

export default EditCategory;

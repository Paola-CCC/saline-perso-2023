import React from 'react';
import { useParams } from 'react-router-dom';
import { useCategoriesApi } from '../../../contexts/CategoriesApiContext';
import './DeleteCategory.css';

const DeleteCategory = () => {
    const { categoryId } = useParams();
    const { isDeleting, deleteCategory } = useCategoriesApi();

    const handleDeleteCategory = async () => {
        await deleteCategory(categoryId);
    };

    return (
        <div className='category'>
            <h2 className='title-page-delete'>Suppression </h2>
            <p className='description-page'>Etes-vous sûr(e) de vouloir supprimer cette catégorie ?</p>
            <div className='container-btn'>
                <button className='btn-delete-category' onClick={handleDeleteCategory} disabled={isDeleting}>
                    {isDeleting ? 'Suppression...' : 'Suppression'}
                </button>
            </div>
        </div>
    );
};

export default DeleteCategory;
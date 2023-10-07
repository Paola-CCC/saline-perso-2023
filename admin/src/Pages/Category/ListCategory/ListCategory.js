import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListCategory.css';
import { useCategoriesApi } from '../../../contexts/CategoriesApiContext';

const ListCategory = () => {
  const { categories, isLoading, ListCategories } = useCategoriesApi();

  useEffect(() => {
    ListCategories();
  }, []);

  return (
    <div className='categories'>
      <div className='categories-header-list'>
         <h1 className="title-pages">Liste des catégories</h1>
          <div className='add-category-list'>
            <Link className='a-list-category-btn' to="/add-category">
              <button className='add-btn-list'>Ajouter une catégorie</button>
            </Link>
          </div>
      </div>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
          <div>
            <ul className="ul-listcategory">
              {categories.map(category => {
                return (
                  <li className="li-listcategory" key={category.id}>
                    <p><strong>{category.name}</strong></p>
                    <div className='btnlistcategory'>
                      <Link className='a-list-instrument-btn' to={`/delete-category/${category.id}`}>
                          <button className='delete-btn-list'>Suppression</button>
                      </Link>
                      <Link className='a-list-category-btn' to={`/edit-category/${category.id}`}>
                          <button className='edit-btn-list'>Edition</button>
                      </Link>
                   </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
    </div>
  );
};

export default ListCategory;

import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategoriesApiContext = createContext();

export const useCategoriesApi = () => useContext(CategoriesApiContext);

export const CategoriesApiContextProvider = ({ children }) => {
    const [categories, setCategories] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const ListCategories = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/all`);
            const categoryData = response.data;
            setCategories(categoryData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error loading categories', error);
            setIsLoading(false);
        }
    };

    const getCategoryById = async (categoryId) => {
        try {
          setIsLoading(true);
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/${categoryId}`);
            const categoryData = response.data;
            setCategoryName(categoryData.name);
            setIsLoading(false);
            return categoryData;
        }
        catch(error) {
            console.error('Error loading category detail', error);
            setIsLoading(false);
            throw error;
        };
    };

    const addCategory = async (newCategory) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/category/new`, newCategory);
            console.log('Category created successfully');
            navigate('/categories');
        } catch (error) {
            console.error('Error adding category', error);
        }
    };
    
    const editCategory = async (categoryId, updatedCategoryData) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/category/${categoryId}/edit`, updatedCategoryData);
            console.log('Category updated successfully');
            navigate('/categories');
        } catch (error) {
            console.error('Error updating category', error);
        }
    };

    const deleteCategory = async (categoryId) => {
        setIsDeleting(true);
        try {
            const response = await axios.delete(process.env.REACT_APP_API_URL+`/category/${categoryId}`)
            console.log('Category deleted successfully');
            setIsDeleting(false);
            navigate('/categories');
        } catch (error) {
            console.error('Error deleting category', error);
            setIsDeleting(false);
        }
    };

    return (
        <CategoriesApiContext.Provider value={{ categories, categoryName, setCategoryName, isLoading, isDeleting, ListCategories, addCategory, editCategory, getCategoryById, deleteCategory }}>
            {children}
        </CategoriesApiContext.Provider>
    );
};

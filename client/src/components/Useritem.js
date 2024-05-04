import axios from "axios";
import React, { useEffect, useState } from "react";

const Useritem = ({ userId, productId, isListedItem }) => {
    const [products, setProducts] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://short-ecommerce-backendapi.vercel.app/api/products/getProductById/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleListedDelete = async () => {
        try {
            await axios.delete(`https://short-ecommerce-backendapi.vercel.app/api/products/deleteProductById/${productId}`);
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handlefavoriteDelete = async () => {
        try {
            await axios.delete(`https://short-ecommerce-backendapi.vercel.app/api/users/removeFav/${userId}&${productId}`);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    if (!product) {
        return <></>;
    }
    return (
        <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product._id}</td>
            <td> <button onClick={isListedItem ? handleListedDelete : handlefavoriteDelete}> Delete</button></td>
        </tr>
    );
};

export default Useritem;
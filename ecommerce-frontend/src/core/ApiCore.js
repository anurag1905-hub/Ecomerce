import queryString from 'query-string';
import Product from './Product';

const getProducts = (sortBy) => {
    return fetch(`${process.env.REACT_APP_API_URL}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

const getCategories = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/categories`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

const getFilteredProducts = (skip,limit,filters={}) => {
    const data = {
        limit,skip,filters
    };
    return fetch(`${process.env.REACT_APP_API_URL}/products/by/search`,{
        method:"POST",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        console.log(err);
    })
};

const list = params => {
    const query = queryString.stringify(params);
    console.log('query',query);
    return fetch(`${process.env.REACT_APP_API_URL}/products/search?${query}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

const read = (productId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/product/${productId}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

const listRelated = (productId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/products/related/${productId}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

const getBrainTreeClientToken = (userId,token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/braintree/getToken/${userId}`, {
        method: 'GET',
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export {getProducts,getCategories,getFilteredProducts,list,read,listRelated,getBrainTreeClientToken};
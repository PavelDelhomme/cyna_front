import { API_BASE_URL } from './config';

const BASE_URL = `${API_BASE_URL}/products`;

// src/api/products.js

export async function fetchProducts() {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`Erreur ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    return [];
  }
}

export async function fetchProduct(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error(`Erreur ${res.status}`);
  return res.json();
}

export async function updateProduct(data, isMultipart = false) {
  const token = localStorage.getItem('token');
  const id = data instanceof FormData ? data.get('id') : data.id;
  
  let options = {
    method: 'PUT',
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: data
  };

  // Si ce n'est pas un FormData, on envoie en JSON
  if (!isMultipart) {
    const { id, ...dataSansId } = data;
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(dataSansId);
  }

  const res = await fetch(`${BASE_URL}/${id}`, options);
  if (!res.ok) throw new Error(`Erreur ${res.status}`);
  return res.json();
}

export async function deleteProduct(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error(`Erreur ${res.status}`);
  return;
}

export async function addProduct(data, isMultipart = false) {
  const token = localStorage.getItem('token');
  let options = {
    method: 'POST',
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: data
  };

  // Si ce n'est pas un FormData, on envoie en JSON comme avant
  if (!isMultipart) {
    const { id, ...dataSansId } = data;
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(dataSansId);
  }

  const res = await fetch(BASE_URL, options);
  if (!res.ok) throw new Error(`Erreur ${res.status}`);
  return res.json();
}

export async function fetchAvailablePromoCodes() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/promo-codes`, {
    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error(`Erreur ${res.status}`);
  return res.json();
}

export async function checkProductDependencies(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/${id}/dependencies`, {
    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error(`Erreur ${res.status}`);
  return res.json();
}
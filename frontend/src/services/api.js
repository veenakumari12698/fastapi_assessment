import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
})

export async function getProducts() {
    const response = await api.get('/products')
    return response.data
}

export async function createProduct(payload) {
    const response = await api.post('/products', payload)
    return response.data
}

export async function updateProduct(productId, payload) {
    const response = await api.put(`/products/${productId}`, payload)
    return response.data
}

export async function deleteProduct(productId) {
    await api.delete(`/products/${productId}`)
}

export async function getCustomers() {
    const response = await api.get('/customers')
    return response.data
}

export async function createCustomer(payload) {
    const response = await api.post('/customers', payload)
    return response.data
}

export async function deleteCustomer(customerId) {
    await api.delete(`/customers/${customerId}`)
}

export async function getOrders() {
    const response = await api.get('/orders')
    return response.data
}

export async function getOrder(orderId) {
    const response = await api.get(`/orders/${orderId}`)
    return response.data
}

export async function createOrder(payload) {
    const response = await api.post('/orders', payload)
    return response.data
}

export async function deleteOrder(orderId) {
    await api.delete(`/orders/${orderId}`)
}

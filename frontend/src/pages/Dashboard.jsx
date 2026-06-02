import { useEffect, useState } from 'react'
import { getCustomers, getOrders, getProducts } from '../services/api'

function Dashboard() {
    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])
    const [orders, setOrders] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadData() {
            try {
                const [productData, customerData, orderData] = await Promise.all([
                    getProducts(),
                    getCustomers(),
                    getOrders(),
                ])
                setProducts(productData)
                setCustomers(customerData)
                setOrders(orderData)
            } catch (e) {
                setError(e?.response?.data?.detail || 'Unable to load dashboard data')
            }
        }

        loadData()
    }, [])

    const lowStock = products.filter((item) => item.quantity <= 5)

    return (
        <div className="grid grid-4">
            <div className="card">
                <h3>Total Products</h3>
                <p className="status-pill">{products.length}</p>
            </div>
            <div className="card">
                <h3>Total Customers</h3>
                <p className="status-pill">{customers.length}</p>
            </div>
            <div className="card">
                <h3>Total Orders</h3>
                <p className="status-pill">{orders.length}</p>
            </div>
            <div className="card">
                <h3>Low Stock Items</h3>
                {lowStock.length > 0 ? (
                    <ul>
                        {lowStock.slice(0, 4).map((product) => (
                            <li key={product.id}>{product.name} ({product.quantity})</li>
                        ))}
                    </ul>
                ) : (
                    <p>No low stock products</p>
                )}
            </div>
            {error && (
                <div className="card alert">
                    <p>{error}</p>
                </div>
            )}
        </div>
    )
}

export default Dashboard

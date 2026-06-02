import { useEffect, useState } from 'react'
import { createOrder, deleteOrder, getCustomers, getOrders, getProducts } from '../services/api'
import OrderForm from '../components/OrderForm'

function Orders() {
    const [orders, setOrders] = useState([])
    const [customers, setCustomers] = useState([])
    const [products, setProducts] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [message, setMessage] = useState(null)

    const loadData = async () => {
        try {
            const [orderList, customerList, productList] = await Promise.all([
                getOrders(),
                getCustomers(),
                getProducts(),
            ])
            setOrders(orderList)
            setCustomers(customerList)
            setProducts(productList)
        } catch (error) {
            setMessage(error?.response?.data?.detail || 'Unable to load order data')
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleCreate = async (payload) => {
        try {
            await createOrder(payload)
            setMessage('Order placed successfully')
            setSelectedOrder(null)
            loadData()
        } catch (error) {
            setMessage(error?.response?.data?.detail || 'Failed to place order')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Cancel this order and restore inventory?')) return
        try {
            await deleteOrder(id)
            setMessage('Order cancelled successfully')
            if (selectedOrder?.id === id) {
                setSelectedOrder(null)
            }
            loadData()
        } catch (error) {
            setMessage(error?.response?.data?.detail || 'Failed to cancel order')
        }
    }

    return (
        <div className="grid grid-4">
            <OrderForm customers={customers} products={products} onSubmit={handleCreate} />

            <div className="card" style={{ gridColumn: 'span 3' }}>
                <div className="list-header">
                    <h3>Orders</h3>
                </div>
                {message && <div className="alert">{message}</div>}
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Items</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{customers.find((c) => c.id === order.customer_id)?.name || 'Unknown'}</td>
                                    <td>${order.total_amount.toFixed(2)}</td>
                                    <td>{order.items.length}</td>
                                    <td>
                                        <button className="secondary" type="button" onClick={() => setSelectedOrder(order)}>
                                            Details
                                        </button>
                                        <button className="danger" type="button" onClick={() => handleDelete(order.id)}>
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {selectedOrder && (
                    <div className="card" style={{ marginTop: '20px' }}>
                        <h3>Order Details</h3>
                        <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                        <p><strong>Customer:</strong> {customers.find((c) => c.id === selectedOrder.customer_id)?.name || 'Unknown'}</p>
                        <p><strong>Total Amount:</strong> ${selectedOrder.total_amount.toFixed(2)}</p>
                        <div className="table-wrapper" style={{ marginTop: '16px' }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Qty</th>
                                        <th>Unit Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.items.map((item) => (
                                        <tr key={item.id}>
                                            <td>{products.find((p) => p.id === item.product_id)?.name || `#${item.product_id}`}</td>
                                            <td>{item.quantity}</td>
                                            <td>${item.unit_price.toFixed(2)}</td>
                                            <td>${item.total_price.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders

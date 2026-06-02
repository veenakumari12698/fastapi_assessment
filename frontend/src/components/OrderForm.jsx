import { useEffect, useState } from 'react'

const emptyItem = { product_id: '', quantity: '' }

function OrderForm({ customers, products, onSubmit }) {
    const [orderData, setOrderData] = useState({
        customer_id: '',
        items: [emptyItem],
    })

    useEffect(() => {
        if (customers.length > 0 && !orderData.customer_id) {
            setOrderData((current) => ({ ...current, customer_id: customers[0].id }))
        }
    }, [customers])

    const handleCustomerChange = (value) => {
        setOrderData((current) => ({ ...current, customer_id: Number(value) }))
    }

    const handleItemChange = (index, field, value) => {
        const items = orderData.items.map((item, itemIndex) =>
            itemIndex === index ? { ...item, [field]: field === 'quantity' ? Number(value) : Number(value) } : item
        )
        setOrderData((current) => ({ ...current, items }))
    }

    const addItem = () => {
        setOrderData((current) => ({ ...current, items: [...current.items, emptyItem] }))
    }

    const removeItem = (index) => {
        setOrderData((current) => ({
            ...current,
            items: current.items.filter((_, itemIndex) => itemIndex !== index),
        }))
    }

    const submitForm = (event) => {
        event.preventDefault()
        onSubmit({
            customer_id: Number(orderData.customer_id),
            items: orderData.items
                .filter((item) => item.product_id && item.quantity > 0)
                .map((item) => ({
                    product_id: Number(item.product_id),
                    quantity: Number(item.quantity),
                })),
        })
        setOrderData({ customer_id: orderData.customer_id, items: [emptyItem] })
    }

    return (
        <form className="card" onSubmit={submitForm}>
            <div className="list-header">
                <h3>Create Order</h3>
            </div>
            <div className="form-row-full">
                <label>
                    Customer
                    <select value={orderData.customer_id} onChange={(e) => handleCustomerChange(e.target.value)} required>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name} ({customer.email})
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            {orderData.items.map((item, index) => (
                <div className="card" key={index} style={{ padding: '16px' }}>
                    <div className="form-row">
                        <label>
                            Product
                            <select
                                value={item.product_id}
                                onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                                required
                            >
                                <option value="">Select product</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} - {product.sku} ({product.quantity} in stock)
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Quantity
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-actions">
                        {orderData.items.length > 1 && (
                            <button type="button" className="secondary" onClick={() => removeItem(index)}>
                                Remove item
                            </button>
                        )}
                    </div>
                </div>
            ))}
            <div className="form-actions">
                <button type="button" className="secondary" onClick={addItem}>
                    Add Another Product
                </button>
                <button type="submit" className="primary">
                    Place Order
                </button>
            </div>
        </form>
    )
}

export default OrderForm

import { useEffect, useState } from 'react'

function ProductForm({ onSubmit, initialData, buttonLabel, onCancel }) {
    const [form, setForm] = useState({
        name: '',
        sku: '',
        price: '',
        quantity: '',
    })

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name,
                sku: initialData.sku,
                price: initialData.price,
                quantity: initialData.quantity,
            })
        }
    }, [initialData])

    const handleChange = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }))
    }

    const submitForm = (event) => {
        event.preventDefault()
        onSubmit({
            name: form.name,
            sku: form.sku,
            price: Number(form.price),
            quantity: Number(form.quantity),
        })
        setForm({ name: '', sku: '', price: '', quantity: '' })
    }

    return (
        <form className="card" onSubmit={submitForm}>
            <div className="list-header">
                <h3>{buttonLabel}</h3>
            </div>
            <div className="form-row">
                <label>
                    Product Name
                    <input
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                    />
                </label>
                <label>
                    SKU / Code
                    <input
                        value={form.sku}
                        onChange={(e) => handleChange('sku', e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Price
                    <input
                        type="number"
                        step="0.01"
                        value={form.price}
                        onChange={(e) => handleChange('price', e.target.value)}
                        required
                    />
                </label>
                <label>
                    Quantity
                    <input
                        type="number"
                        value={form.quantity}
                        onChange={(e) => handleChange('quantity', e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className="form-actions">
                <button type="submit" className="primary">{buttonLabel}</button>
                {onCancel && (
                    <button type="button" className="secondary" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}

export default ProductForm

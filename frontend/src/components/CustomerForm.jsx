import { useEffect, useState } from 'react'

function CustomerForm({ onSubmit, initialData, buttonLabel, onCancel }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
    })

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name,
                email: initialData.email,
                phone: initialData.phone,
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
            email: form.email,
            phone: form.phone,
        })
        setForm({ name: '', email: '', phone: '' })
    }

    return (
        <form className="card" onSubmit={submitForm}>
            <div className="list-header">
                <h3>{buttonLabel}</h3>
            </div>
            <div className="form-row">
                <label>
                    Full Name
                    <input
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email Address
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className="form-row-full">
                <label>
                    Phone Number
                    <input
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
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

export default CustomerForm

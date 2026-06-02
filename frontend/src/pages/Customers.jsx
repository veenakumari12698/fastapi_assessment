import { useEffect, useState } from 'react'
import { createCustomer, deleteCustomer, getCustomers } from '../services/api'
import CustomerForm from '../components/CustomerForm'

function Customers() {
    const [customers, setCustomers] = useState([])
    const [message, setMessage] = useState(null)

    const loadCustomers = async () => {
        try {
            const list = await getCustomers()
            setCustomers(list)
        } catch (error) {
            setMessage(error?.response?.data?.detail || 'Unable to load customers')
        }
    }

    useEffect(() => {
        loadCustomers()
    }, [])

    const handleCreate = async (payload) => {
        try {
            await createCustomer(payload)
            setMessage('Customer added successfully')
            loadCustomers()
        } catch (error) {
            setMessage(error?.response?.data?.detail || 'Failed to add customer')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this customer?')) return
        try {
            await deleteCustomer(id)
            setMessage('Customer deleted successfully')
            loadCustomers()
        } catch (error) {
            setMessage(error?.response?.data?.detail || 'Failed to delete customer')
        }
    }

    return (
        <div className="grid grid-4">
            <CustomerForm onSubmit={handleCreate} buttonLabel="Add Customer" />

            <div className="card" style={{ gridColumn: 'span 3' }}>
                <div className="list-header">
                    <h3>Customers</h3>
                </div>
                {message && <div className="alert">{message}</div>}
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td>
                                        <button className="danger" type="button" onClick={() => handleDelete(customer.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Customers

import { useEffect, useState } from 'react'
import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from '../services/api'
import ProductForm from '../components/ProductForm'

function Products() {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [message, setMessage] = useState(null)

    const loadProducts = async () => {
        try {
            const productList = await getProducts()
            setProducts(productList)
        } catch (error) {
            setMessage(error?.response?.data?.detail || 'Unable to fetch products')
        }
    }

    useEffect(() => {
        loadProducts()
    }, [])

    const handleCreate = async (payload) => {
        try {
            await createProduct(payload)
            setMessage('Product created successfully')
            setSelectedProduct(null)
            loadProducts()
        } catch (error) {
            setMessage(error?.response?.data?.detail || 'Failed to create product')
        }
    }

    const handleUpdate = async (payload) => {
        try {
            await updateProduct(selectedProduct.id, payload)
            setMessage('Product updated successfully')
            setSelectedProduct(null)
            loadProducts()
        } catch (error) {
            setMessage(error?.response?.data?.detail || 'Failed to update product')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return
        try {
            await deleteProduct(id)
            setMessage('Product deleted successfully')
            if (selectedProduct?.id === id) {
                setSelectedProduct(null)
            }
            loadProducts()
        } catch (error) {
            setMessage(error?.response?.data?.detail || 'Failed to delete product')
        }
    }

    return (
        <div className="grid grid-4">
            <ProductForm
                initialData={selectedProduct}
                onSubmit={selectedProduct ? handleUpdate : handleCreate}
                buttonLabel={selectedProduct ? 'Update Product' : 'Add Product'}
                onCancel={selectedProduct ? () => setSelectedProduct(null) : null}
            />

            <div className="card" style={{ gridColumn: 'span 3' }}>
                <div className="list-header">
                    <h3>Product List</h3>
                </div>
                {message && <div className="alert">{message}</div>}
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>SKU</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.sku}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <button className="secondary" type="button" onClick={() => setSelectedProduct(product)}>
                                            Edit
                                        </button>
                                        <button className="danger" type="button" onClick={() => handleDelete(product.id)}>
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

export default Products

function Sidebar({ activeView, onNavigate }) {
    return (
        <aside className="sidebar">
            <h2>Admin Panel</h2>
            <button
                type="button"
                className={`nav-button ${activeView === 'dashboard' ? 'active' : ''}`}
                onClick={() => onNavigate('dashboard')}
            >
                Dashboard
            </button>
            <button
                type="button"
                className={`nav-button ${activeView === 'products' ? 'active' : ''}`}
                onClick={() => onNavigate('products')}
            >
                Products
            </button>
            <button
                type="button"
                className={`nav-button ${activeView === 'customers' ? 'active' : ''}`}
                onClick={() => onNavigate('customers')}
            >
                Customers
            </button>
            <button
                type="button"
                className={`nav-button ${activeView === 'orders' ? 'active' : ''}`}
                onClick={() => onNavigate('orders')}
            >
                Orders
            </button>
        </aside>
    )
}

export default Sidebar

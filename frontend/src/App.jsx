import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Customers from './pages/Customers'
import Orders from './pages/Orders'

function App() {
    const [view, setView] = useState('dashboard')

    return (
        <div className="app-shell">
            <Sidebar activeView={view} onNavigate={setView} />
            <main className="app-main">
                <header className="app-header">
                    <div>
                        <p className="eyebrow">Inventory & Order Management</p>
                        <h1>{view === 'dashboard' ? 'Dashboard' : view.charAt(0).toUpperCase() + view.slice(1)}</h1>
                    </div>
                </header>

                <section className="app-content">
                    {view === 'dashboard' && <Dashboard />}
                    {view === 'products' && <Products />}
                    {view === 'customers' && <Customers />}
                    {view === 'orders' && <Orders />}
                </section>
            </main>
        </div>
    )
}

export default App

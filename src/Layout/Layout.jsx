import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../pages/navbar/Sidebar'
import Header from '../pages/navbar/Header'
const Layout = () => {
  return (
    <div>
        <Sidebar/>
        <div className="flex-1 lg:ml-64 flex flex-col">
        
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>

      </div>
        
    </div>
  )
}

export default Layout
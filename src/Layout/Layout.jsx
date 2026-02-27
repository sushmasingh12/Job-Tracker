import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/common/Sidebar'
import Navbar from '../components/common/Navbar'
const Layout = () => {
  return (
    <div>
        <Sidebar/>
        <div className="flex-1 lg:ml-64 flex flex-col">
        
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>

      </div>
        
    </div>
  )
}

export default Layout
// shared/components/AppLayouts.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../../shared/components/Sidebar";
import Navbar from "../../shared/components/Navbar";

const AppLayouts = () => {
  return (
    <div className="flex h-screen overflow-hidden">

      <Sidebar />

      {/* ✅ ml-64 sirf lg+ pe — mobile pe 0 */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden lg:ml-64 h-screen">

        {/* ✅ Navbar mobile pe top-16 pe push hoga (mobile header ki height) */}
        <div className="pt-16 lg:pt-0">
          <Navbar />
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AppLayouts;
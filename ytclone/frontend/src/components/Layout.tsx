import React, { useState } from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <main
        className={`pt-14 transition-all duration-300 ${
          sidebarOpen ? 'ml-60' : 'ml-16'
        }`}
      >
        <div className="min-h-[calc(100vh-3.5rem)]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
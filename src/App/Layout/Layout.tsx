import Header from './Header';
import React from 'react';

const Layout: React.FC<{ children: JSX.Element[] }> = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;

// Layout.js
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
    }
type Props = LayoutProps;    

const Layout = ({ children }: Props) => {
  return (
    <div className="body-bg mx-4  md:mx-36">
      {children}
    </div>
  );
};

export default Layout;
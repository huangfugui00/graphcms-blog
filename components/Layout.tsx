import React from 'react';
import Header from './Header';

type layoutProp = {
    children: React.ReactNode
}
const Layout = ({ children }:layoutProp) => (
  <div className="my-container ">
    <Header />
    {children}
  </div>
);

export default Layout;
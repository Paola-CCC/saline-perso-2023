import React, { FC } from 'react';
import './Sidebar.scss';

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => (
  <div className="Sidebar" data-testid="Sidebar">
    Sidebar Component
  </div>
);

export default Sidebar;

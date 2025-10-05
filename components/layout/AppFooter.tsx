import React from 'react';
import { Link } from 'react-router-dom';

const AppFooter: React.FC = () => (
  <div className="mt-auto p-4 border-t border-[var(--border-color)]">
    <div className="flex justify-between items-center text-xs text-text-muted">
      <span>© {new Date().getFullYear()} NEXUM Labs</span>
      <div className="space-x-2">
        <Link to="/settings" className="hover:text-text-secondary">Ayuda</Link>
        <span>•</span>
        <span>v1.0</span>
      </div>
    </div>
  </div>
);

export default AppFooter;
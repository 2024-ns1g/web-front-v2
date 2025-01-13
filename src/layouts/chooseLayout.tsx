import React from 'react';

interface ChooseLayoutProps {
  children: React.ReactNode;
}

const ChooseLayout: React.FC<ChooseLayoutProps> = ({ children }) => {

  return (
    <div className="flex flex-col h-screen">

      {/* メインコンテンツ部分 */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default ChooseLayout;

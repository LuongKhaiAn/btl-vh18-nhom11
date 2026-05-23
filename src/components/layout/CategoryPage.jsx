import React from "react";
import DataBase from "../../database.json";
import { PAGE_META } from "../../config/pages";

const CategoryPage = ({ pageId }) => {
  const meta = PAGE_META[pageId];
  const items = DataBase[meta.dataKey] ?? [];

  return (
    <main className="category-page">
      <div className="category-page-inner">
        <header className="category-page-header">
          <h1 className="category-page-title">{meta.title}</h1>
          <p className="category-page-subtitle">
            Tìm thấy {items.length} kết quả
          </p>
        </header>
      </div>
    </main>
  );
};

export default CategoryPage;

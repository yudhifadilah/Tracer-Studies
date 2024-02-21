"use client"
import React, { useState, useEffect } from 'react';
import { Spacer } from '@nextui-org/react';
import CustomComponent from './Divider';
import ArticleCard from '../blog/Card';

interface Article {
  id: number;
  Title: string;
  Content: string;
  Img1: string;
  Status: string;
}

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/Artikel', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data artikel');
        }

        const data = await response.json();
        setArticles(data.Artikels);
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    };

    fetchArticles();
  }, []);

  const activeArticles = articles.filter((article) => article.Status === 'active');

  return (
    <div>
      <CustomComponent />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {activeArticles.map((article) => (
          <React.Fragment key={article.id}>
            <ArticleCard article={article} />
          </React.Fragment>
        ))}
      </div>
      </div>
  );
};

export default ArticlesPage;

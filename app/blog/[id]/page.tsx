"use client"
import React, { useState, useEffect } from 'react';
import Cardss from '../[id]/CardBy';
import { Spacer } from '@nextui-org/react';

interface Article {
  id: number;
  Title: string;
  Content: string;
  Img1: string;
  Status: string;
}

const ArticlessPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleId, setArticleId] = useState<number | null>(null);

  useEffect(() => {
    const fetchArticleId = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/Artikel', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil ID artikel');
        }

        const data = await response.json();
        // Pastikan data.articleId tidak bernilai undefined atau null
        if (data.articleId == null) {
          throw new Error('ID artikel tidak valid');
        }
        setArticleId(data.articleId);
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    };

    fetchArticleId();
  }, []);

  useEffect(() => {
    const fetchArticleById = async () => {
      try {
        // Pastikan articleId tidak bernilai null atau undefined sebelum melakukan fetch
        if (articleId == null) {
          console.error('ID artikel tidak valid');
          return;
        }

        const response = await fetch(`http://localhost:8080/api/Artikel/getBy/${articleId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data artikel');
        }

        const data = await response.json();
        setArticles([data.Artikel]);
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    };

    fetchArticleById();
  }, [articleId]);

  return (
    <div>
      <h1>Daftar Artikel</h1>
      <div className="flex">
        {articles.map((article) => (
          <React.Fragment key={article.id}>
            <Spacer x={4} />
            <Cardss article={article} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ArticlessPage;

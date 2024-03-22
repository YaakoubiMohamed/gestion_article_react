import React, { useEffect, useState  } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AfficheArticle() {
  const [article, setArticle] = useState({});
  const [error, setError] = useState(null);
  const { articleId } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/articles/${articleId}`
        );
        setArticle(response.data);
        console.log(article);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchArticle();
  }, [articleId]);
  return (
    <>
      <div>AfficheArticle</div>
      {article && 
      <div>
      <h2>{article.titre}</h2>
      <h2>{article.contenu}</h2>
      <h2>{article.auteur}</h2>
      <h2>{article.statut}</h2>
      <h2>{article.tags}</h2>
      <h2>{article.categorie}</h2>
      <h2>{article.datePublication}</h2>
      </div>
      }
    </>
  );
}

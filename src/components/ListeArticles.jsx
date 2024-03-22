import axios from "axios";
import { useEffect, useState } from "react";

export default function ListeArticles() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null)

    useEffect( () => {
        const fetchArticles = async () =>{
            try{
                const response = await axios.get('http://localhost:5000/api/articles');
                setArticles( response.data);
                console.log(articles);
            }catch(error){
                setError( error.message );
            }
        }
        fetchArticles();
    }, [articles] )
  return (
    <div>
      <h1>Liste des articles</h1>
      <a href="/articles/new" className="btn btn-primary">Ajouter un article</a>
      <table className="table table-bordered table-striped table-hover">
        <thead>
            <tr>
                <th>#ID</th>
                <th>Titre</th>
                <th>Contenu</th>
                <th>Auteur</th>
                <th>Categorie</th>
                <th>Tags</th>
                <th>Statut</th>
                <th>Date de publication</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {articles.map((article)=>(
            <tr key={article._id}>
                <td>{article._id}</td>
                <td>{article.titre}</td>
                <td>{article.contenu}</td>
                <td>{article.auteur}</td>
                <td>{article.categorie}</td>
                <td>{article.tags}</td>
                <td>{article.statut}</td>
                <td>
                    {new Date(article.datePublication).toLocaleString("fr-FR")}
                </td>
                <td>
                    <a href={`/articles/${article._id}`} 
                    className="btn btn-info">
                        Afficher
                    </a>
                    <a href={`/articles/${article._id}/edit`} 
                    className="btn btn-success">
                        Modifier
                    </a>
               
                </td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

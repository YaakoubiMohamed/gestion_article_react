import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export default function ArticleForm() {
    const [titre, setTitre] = useState("");
    const [contenu, SetContenu] = useState("");
    const [categorie, setCategorie] = useState("");
    const [tags, setTags] = useState("");
    const [statut, setStatut] = useState("");
    const [auteur, setAuteur] = useState("");
    const [error, setError] = useState("");
    const { articleId} = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        if(articleId){
            const fetchArticle = async () =>{
            try{
                const response = await axios.get(
                    `http://localhost:5000/api/articles/${articleId}`
                  );
                  setTitre(response.data.titre);
                  SetContenu(response.data.contenu)
                  setCategorie(response.data.categorie);
                  setTags(response.data.tag);
                  setStatut(response.data.statut);
                  setAuteur(response.data.auteur);

            } catch(error) {
                setError(error)
            }
        }
        fetchArticle();
        }
    },[articleId])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        if(!titre || !contenu||!categorie||!tags){
            return setError('Veuillez  remplir tous les champs')
        }
        try{
            const data = {
                titre, contenu, categorie, tags, statut, auteur
            }
            console.log(data);
            const response = articleId
            ? await axios.put(`http://localhost:5000/api/articles/${articleId}`, data )
            : await axios.post(`http://localhost:5000/api/articles`,data)
            navigate('/');
        } catch(error){
            setError(error.message)
        }
    }
  return (
    
<div>
    <h1>Nouvelle article</h1>
    <form onSubmit={handleSubmit}>
        <input type="text"
        className='form-control'
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        placeholder='titre'
        required />
        <input type="text"
        className='form-control'
        value={contenu}
        onChange={(e) => SetContenu(e.target.value)}
        placeholder='contenu'
        required />
        <input type="text"
        className='form-control'
        value={auteur}
        onChange={(e) => setAuteur(e.target.value)}
        placeholder='auteur'
        required />
        <input type="text"
        className='form-control'
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder='tags'
        required />
        <select value={categorie} 
        onChange={(e)=> setCategorie(e.target.value)}>
            <option value="">Selectionner une categorie</option>
            <option value="Informatique">Informatique</option>
            <option value="Mode">Mode</option>
            <option value="Voyage">Voyage</option>
        </select>
        <select value={statut}
        onChange={(e)=> setStatut(e.target.value)}>
            <option value="publie">Publie</option>
            <option value="draft">Draft</option>
        </select>

        <button type='submit' className='btn btn-primary'>
            {articleId ? "Modifier" : "Ajouter"}
            </button>
        {error &&  <p className='text-danger'>{error}</p>}
    </form>
</div>
  )
}

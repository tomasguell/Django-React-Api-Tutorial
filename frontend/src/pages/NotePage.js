import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa el hook useHistory
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg';
import { Link } from 'react-router-dom';

const NotePage = () => {
  const  noteId  = useParams(); // Usa el hook useParams para obtener los parámetros de la ruta
  const [note, setNote] = useState(null);
  const navigate = useNavigate(); // Obtiene el objeto history usando el hook useHistory

  useEffect(() =>{
    getNote()
  },[noteId])

  const getNote = async () => {
    if (noteId.id === 'new') return
    let response = await fetch(`/api/note/${noteId.id}/`);
    let data = await response.json();
    setNote(data);
  }

  const updateNote = async () => {
    let response = await fetch(`/api/note/${noteId.id}/update/`, {
      method:"PUT",
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify(note)
    })
  }

  const createNote = async () => {
    let response = await fetch(`/api/notes/`, {
      method:"POST",   
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify(note)
    })
  }

  const deleteNote = async() =>{
    fetch(`/api/note/${noteId.id}/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'

      }

    })
    navigate('/')
  }




  const handleSubmit = () => {
    if (noteId.id !== 'new' && !note.body){
      deleteNote()
      console.log('deleteando')
    }else if(noteId.id !== 'new'){
      updateNote()
      console.log('updateando')

    }else if(noteId.id == 'new' && note!== null){
      createNote()
      console.log('creando')

    }
    navigate('/'); // Llama a history.push con la ruta a la que deseas navegar
  }

  return (
    <div className='note'>
      <div className='note-header'>

        <h3>
          <ArrowLeft onClick={handleSubmit}/>
        </h3>
        {console.log(noteId)}
      {noteId.id !== 'new'?(
      <button onClick={deleteNote}>Delete</button>

      ):(
      <button onClick={handleSubmit}> Done </button>
      )}  

      </div>
      <textarea onChange={(e) => {setNote({...note, "body": e.target.value})}} value={note?.body}></textarea>
    </div>
  );
};

export default NotePage;

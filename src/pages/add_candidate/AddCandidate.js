import './AddCandidate.css';
import { useSearchParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';

function AddCandidate() {

  let [searchParams, setSearchParams] = useSearchParams();
  const [msg, setMsg] = useState();

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status !== 200) {
       window.location.href = '/login'
      }

      const data = await response.json()
      if (data.role !== 'admin') {
        window.location.href = '/my_rooms'
      }

      let value = searchParams.get('retry')
      if (value != null && value === "true") {
        setMsg('Error en los datos ingresados')
      }
    }
    init();
  }, [searchParams]);
  return (
    <div className="AddCandidate">
      <header className="AddCandidate-header">
      <form action="/candidates" method="post">
          <div className='AddCandidate-header'>
            <p className='AddCandidateAlert'>{msg}</p>
            <p>Ingresar los datos del nuevo candidato</p>
            <label for="candidate_id"><b>Identificador del candidato</b></label>
            <input type="text" placeholder="Numero de candidato" name="candidate_id" required/>
            <label for="list_id"><b>Lista a la que pertenece</b></label>
            <input type="text" placeholder="Numero de lista" name="list_id" required/>
            <label for="name"><b>Nombre del candidato</b></label>
            <input type="text" placeholder="Nombre" name="name" required/>
            <label for="role"><b>Rol del candidato</b></label>
            <input type="text" placeholder="Rol" name="role" required/>
            <button type="submit">Enviar</button>
            <a href='/admin' class='AddAdmin-link'>Volver</a>
          </div>
        </form>      
      </header>
    </div>
  );
}

export default AddCandidate;

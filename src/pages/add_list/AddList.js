import './AddList.css';
import { useSearchParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';

function AddList() {

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
    <div className="AddList">
      <header className="AddList-header">
      <form action="/lists" method="post">
          <div className='AddList-header'>
            <p className='AddListAlert'>{msg}</p>
            <p>Ingresar los datos de la nueva lista</p>
            <label for="list_id"><b>Numero de Lista</b></label>
            <input type="text" placeholder="Numero de Lista" name="list_id" required/>
            <label for="name"><b>Nombre de Lista</b></label>
            <input type="text" placeholder="Nombre de Lista" name="name" required/>
            <button type="submit">Enviar</button>
            <a href='/admin' class='AddAdmin-link'>Volver</a>
          </div>
        </form>      
      </header>
    </div>
  );
}

export default AddList;

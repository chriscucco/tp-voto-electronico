import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';

function AddList() {

  let [searchParams, setSearchParams] = useSearchParams();
  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status !== 200) {
        navigate('/login');
      }

      const data = await response.json()
      if (data.role !== 'admin') {
        navigate('/my_rooms');
      }

      let value = searchParams.get('retry')
      if (value != null && value === "true") {
        setMsg('Error en los datos ingresados')
      }
    }
    init();
  }, [searchParams, navigate]);


  const onFinish = (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    fetch('/lists', requestOptions).then( function(response) {
      if (response.ok){
        window.location.href = "/admin"
      } else {
        window.location.href = "/add_list?retry=true"
      }
    }).catch((err) => {  window.location.href = "/add_list?retry=true" })
  };


  return (
    <div>
      <p>{msg}</p>
      <p>Ingresar los datos de la nueva lista</p>
      <Form onFinish={onFinish}>
        <Form.Item
          label="Número de lista"
          name="listId"
          rules={[{ required: true, message: 'Agregar el número de lista' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nombre de la lista"
          name="listName"
          rules={[{ required: true, message: 'Agregar el nombre de la lista' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>   
    </div>
  );
}

export default AddList;

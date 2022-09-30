import { useSearchParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';

function AddVoters() {

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
        let retryMessage = searchParams.get('msg')
        if (retryMessage) {
          setMsg('Error: ' + retryMessage)
        } else {
          setMsg('Error en los datos ingresados')
        }
      }
    }
    init();
  }, [searchParams]);

  const onFinish = (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    fetch('/voters/add', requestOptions).then( function(response) {
      if (response.ok) {
        window.location.href = "/admin"
        return undefined
      } else {
        return response.json()
      }
    }).then( function(data) {
      if (data != undefined) {
        window.location.href = "/add_voters?retry=true&msg=" + data
      } else {
        window.location.href = "/admin"
      }
    }).catch((err) => {  window.location.href = "/add_voters?retry=true"})
  };

  return (
    <div>
      <p>{msg}</p>
      <p>Ingresar DNI de los votantes a agregar separados por coma</p>
      <Form onFinish={onFinish}>
        <Form.Item
          label="DNI de votantes"
          name="voterIds"
          rules={[{ required: true, message: "Ingresar los DNI's de los votantes" }]}
        >
          <Input placeholder="Ej: 40128001,18995293..." />
        </Form.Item>

        <Form.Item
          label="Acto electoral"
          name="roomId"
          rules={[{ required: true, message: "Ingresar ID del acto electoral" }]}
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

export default AddVoters;

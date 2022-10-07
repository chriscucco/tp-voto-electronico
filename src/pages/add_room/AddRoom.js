import { useSearchParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import { Form, DatePicker, Button, Input } from 'antd';

function AddRoom() {

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

  const onFinish = (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    fetch('/rooms', requestOptions).then( function(response) {
      if (response.ok){
        window.location.href = "/admin"
      } else {
        window.location.href = "/add_room?retry=true"
      }
    }).catch((err) => {  window.location.href = "/add_room?retry=true" })
  };


  const { RangePicker } = DatePicker;

  return (
    <div>
      <p>{msg}</p>
      <p>Ingresar fecha de inicio y fin del acto electoral</p>
      <Form onFinish={onFinish}>
        <Form.Item
          label="Descripción del acto"
          name="description"
          rules={[{ required: true, message: 'Agregar descripción del acto electoral' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label="Fecha y hora de inicio" 
          name="dates"
        >
          <RangePicker />
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

export default AddRoom;

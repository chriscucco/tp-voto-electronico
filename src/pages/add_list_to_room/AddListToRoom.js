import { useSearchParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';

function AddListToRoom() {

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
        setMsg('Error: ' + retryMessage)
      }
    }
    init();
  }, [searchParams]);
  return (
    <div>
      <p>Ingresar los numeros de lista separados por coma</p>
      <Form>
        <Form.Item
          label="Números de lista"
          name="listsId"
          rules={[{ required: true, message: 'Al menos un número de lista es requerido' }]}
        >
          <Input placeholder="Ej: 1, 2, 3, 4..."/>
        </Form.Item>

        <Form.Item
          label="Número de acto electoral"
          name="roomId"
          rules={[{ required: true, message: 'Ingresar el número de acto electoral' }]}
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

export default AddListToRoom;

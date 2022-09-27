import { useSearchParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import { Form, DatePicker, Button } from 'antd';

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

  const { RangePicker } = DatePicker;

  return (
    <div>
      <p>Ingresar fecha de inicio y fin del acto electoral</p>
      <Form>
        <Form.Item label="Fecha y hora de inicio">
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

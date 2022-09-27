import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';

function AddAdmin() {

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
        setMsg('Usuario invalido')
      }
    }
    init();
  }, [searchParams]);
  
  return (
    <div>
      <Form>
        <Form.Item
          label="Usuario o DNI"
          name="newAdmin"
          rules={[{ required: true, message: 'Agregar el usuario o DNI del nuevo administrador' }]}
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

export default AddAdmin;

import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';

function AddAdmin() {

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
        setMsg('Usuario invalido')
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
    fetch('/roles/add', requestOptions).then( function(response) {
      if (response.ok){
        window.location.href = "/admin"
      } else {
        window.location.href = "/add_admin?retry=true"
      }
    }).catch((err) => {  window.location.href = "/add_admin?retry=true" })
  };
  
  return (
    <div>
      <p>{msg}</p>
      <p>Ingresar nombre de usuario o DNI del usuario a agregar como administrador</p>
      <Form onFinish={onFinish}>
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

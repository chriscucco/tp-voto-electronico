import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';

function Users() {
    let [searchParams, setSearchParams] = useSearchParams();

  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status === 200) {
        navigate('/home')
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
    fetch('/users', requestOptions).then( function(response) {
      if (response.ok){
        window.location.href = "/"
      } else {
        window.location.href = "/users?retry=true"
      }
    }).catch((err) => {  window.location.href = "/users?retry=true" })
  };

  return (
    <div>
      <p>{msg}</p>
      <p>Ingresa tus datos para registrarte</p>
      <Form onFinish={onFinish}>
        <Form.Item
          label="Usuario"
          name="userId"
          rules={[{ required: true, message: "Ingresar el nombre de usuario" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="DNI"
          name="dni"
          rules={[{ required: true, message: "Ingresar DNI del usuario" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nombre"
          name="userFirstName"
          rules={[{ required: true, message: "Ingresar el primer nombre del usuario" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Apellido"
          name="userLastName"
          rules={[{ required: true, message: "Ingresar el apellido del usuario" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: "Ingresar una contraseña" }]}
        >
          <Input.Password />
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

export default Users
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';

function Login() {
  let [searchParams, setSearchParams] = useSearchParams();

  const [msg, setMsg] = useState();

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status === 200) {
       window.location.href = '/home'
      }
      let value = searchParams.get('retry')
      if (value != null && value === "true") {
        setMsg('Usuario o contraseña invalido')
      }
    }
    init();
  }, [searchParams]);

  return (
    <div className='Login'>
      <p>Ingresa usuario y contraseña para empezar</p>
      <Form>
        <Form.Item
          label="Usuario"
          name="username"
          rules={[{ required: true, message: "Ingresar el nombre de usuario" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: "Ingresar una contraseña" }]}
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

export default Login;

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
  
  const onFinish = (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    fetch('/login', requestOptions).then( function(response) {
      if (response.ok){
        window.location.href = "/home"
      } else {
        window.location.href = "/login?retry=true"
      }
    }).catch((err) => {  window.location.href = "/login?retry=true" })
  };

  return (
    <div className='Login'>
      <p>{msg}</p>
      <p>Ingresa usuario y contraseña para empezar</p>
      <Form onFinish={onFinish}>
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

export default Login;

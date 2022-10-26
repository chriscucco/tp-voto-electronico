import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { buttonWidth, topMargin } from '../../CommonStyles';

function AddVoters() {

  let [searchParams, setSearchParams] = useSearchParams();
  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  const { Title } = Typography;

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
        let retryMessage = searchParams.get('msg')
        if (retryMessage) {
          setMsg('Error: ' + retryMessage)
        } else {
          setMsg('Error en los datos ingresados')
        }
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
    fetch('/voters/add', requestOptions).then( function(response) {
      if (response.ok) {
        window.location.href = "/admin"
        return undefined
      } else {
        return response.json()
      }
    }).then( function(data) {
      if (data !== undefined) {
        window.location.href = "/add_voters?retry=true&msg=" + data
      } else {
        window.location.href = "/admin"
      }
    }).catch((err) => {  window.location.href = "/add_voters?retry=true"})
  };

  return (
    <div>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
        <Col span={24} align='middle'>
          <Title level={3}>Ingresar DNI de los votantes a agregar separados por coma</Title>
        </Col>
        <Col span={24} align='middle'>
          <Form onFinish={onFinish}>
            <Form.Item
              label="DNI de votantes"
              name="voterIds"
              rules={[{ required: true, message: "Ingresar los DNI's de los votantes" }]}
              style={{ width: buttonWidth }}
            >
              <Input placeholder="Ej: 40128001,18995293..." />
            </Form.Item>

            <Form.Item
              label="Acto electoral"
              name="roomId"
              rules={[{ required: true, message: "Ingresar ID del acto electoral" }]}
              style={{ width: buttonWidth }}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: buttonWidth }}>
                Enviar
              </Button>
            </Form.Item>
          </Form>  
        </Col>
        <Col span={24} align='middle'>
          <Button style={{ width: buttonWidth }} onClick={() => navigate('/admin')}>Volver</Button>
        </Col>
      </Row>  
    </div>
  );
}

export default AddVoters;

import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { buttonWidth, topMargin } from '../../CommonStyles';

function AddListToRoom() {

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
    fetch('/roomLists/add', requestOptions).then( function(response) {
      if (response.ok) {
        window.location.href = "/admin"
        return undefined
      } else {
        return response.json()
      }
    }).then( function(data) {
      if (data !== undefined) {
        window.location.href = "/add_list_to_room?retry=true&msg=" + data
      } else {
        window.location.href = "/admin"
      }
    }).catch((err) => {  window.location.href = "/add_list_to_room?retry=true"})
  };

  return (
    <div>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
        <Col span={24} align='middle'>
          <Title level={3}>Ingresar los numeros de lista separados por coma</Title>
        </Col>
        <Col span={24} align='middle'>
          <Form onFinish={onFinish}>
            <Form.Item
              label="Números de lista"
              name="listsId"
              rules={[{ required: true, message: 'Al menos un número de lista es requerido' }]}
              style={{ width: buttonWidth }}
            >
              <Input placeholder="Ej: 1, 2, 3, 4..."/>
            </Form.Item>

            <Form.Item
              label="Número de acto electoral"
              name="roomId"
              rules={[{ required: true, message: 'Ingresar el número de acto electoral' }]}
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

export default AddListToRoom;

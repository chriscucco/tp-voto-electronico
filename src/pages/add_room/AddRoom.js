import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, DatePicker, Button, Input, Typography, Row, Col } from 'antd';
import { buttonWidth, topMargin } from '../../CommonStyles';

function AddRoom() {

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
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
        <Col span={24} align='middle'>
          <Title level={3}>Ingresar fecha de inicio y fin del acto electoral</Title>
        </Col>
        <Col span={24} align='middle'>
          <Form onFinish={onFinish}>
            <Form.Item
              label="Descripción del acto"
              name="description"
              style={{ width: buttonWidth }}
              rules={[{ required: true, message: 'Agregar descripción del acto electoral' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
              label="Fecha y hora de inicio" 
              name="dates"
              style={{ width: buttonWidth }}
            >
              <RangePicker />
            </Form.Item>
            <Form.Item>
              <Button style={{ width: buttonWidth }} htmlType="submit">
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

export default AddRoom;

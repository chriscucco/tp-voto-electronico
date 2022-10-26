import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { buttonWidth, topMargin } from '../../CommonStyles';

function AddList() {

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
    fetch('/lists', requestOptions).then( function(response) {
      if (response.ok){
        window.location.href = "/admin"
      } else {
        window.location.href = "/add_list?retry=true"
      }
    }).catch((err) => {  window.location.href = "/add_list?retry=true" })
  };


  return (
    <div>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
        <Col span={24} align='middle'>
          <Title level={2}>Ingresar los datos de la nueva lista</Title>
        </Col>
        <Col span={24} align='middle'>
          <Form onFinish={onFinish}>
            <Form.Item
              label="Número de lista"
              name="listId"
              rules={[{ required: true, message: 'Agregar el número de lista' }]}
              style={{ width: buttonWidth }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nombre de la lista"
              name="listName"
              rules={[{ required: true, message: 'Agregar el nombre de la lista' }]}
              style={{ width: buttonWidth }}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" style={{ width: buttonWidth }}>
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

export default AddList;

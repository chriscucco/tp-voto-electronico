import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, Typography } from 'antd';
import { buttonWidth, topMargin } from '../../CommonStyles';

function Home() {

  const navigate = useNavigate();

  const { Title } = Typography;

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status !== 200) {
       navigate('/login')
      }

      const data = await response.json()
      if (data.role !== 'admin') {
        navigate('/my_rooms')
      }
    }
    init();
  }, [navigate]);
  
  return (
    <div>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
        <Col span={24} align='middle'>
          <Title level={3}>Seleccionar la forma de ingreso</Title>
        </Col>
        <Col span={24} align='middle'>
          <Button style={{ width: buttonWidth }} onClick={() => navigate('/my_rooms')}>Modo Usuario</Button>
        </Col>
        <Col span={24} align='middle'>
          <Button style={{ width: buttonWidth }} onClick={() => navigate('/admin')}>Modo Administrador</Button>
        </Col>
      </Row>
    </div>
  );
}

export default Home;

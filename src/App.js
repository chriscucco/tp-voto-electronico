import { useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import { buttonWidth, topMargin } from './CommonStyles'

function App() {

  const navigate = useNavigate();

  return (
    <div>
      <Row gutter={[24, 24]} align='middle' style={{ marginTop: topMargin }}>
        <Col span={24} align='middle'>
          <Button style={{ width: buttonWidth }} onClick={() => navigate('/login')}>Ingresar</Button>
        </Col>
        <Col span={24} align='middle'>
          <Button style={{ width: buttonWidth }} onClick={() => navigate('/users')}>Crear cuenta</Button>
        </Col>
      </Row>
    </div>
  );
}

export default App;

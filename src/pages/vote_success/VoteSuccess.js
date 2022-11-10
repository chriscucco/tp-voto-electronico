import { useSearchParams, useNavigate } from 'react-router-dom';
import { Col, Row, Button, Typography} from 'antd';
import { useEffect, useState } from 'react';
import { topMargin, buttonWidth } from '../../CommonStyles';


function VoteSuccess() {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { Title } = Typography;

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status !== 200) {
        navigate('/login');
      }
    }
    init();
  }, [searchParams, navigate]);


  return (
    <div>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
        <Col span={24} align='middle'>
          <Title level={2}>¡Voto emitido correctamente!</Title>
        </Col>
        <Col span={24} align='middle'>
          <Button style={{ width: buttonWidth }} onClick={() => navigate('/home')}>Volver</Button>
        </Col>
      </Row>  
    </div>
  );
}

export default VoteSuccess;

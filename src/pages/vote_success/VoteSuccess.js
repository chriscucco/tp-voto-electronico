import { useSearchParams, useNavigate } from 'react-router-dom';
import { Col, Row, Button, Typography} from 'antd';
import { useEffect, useState } from 'react';
import { topMargin, buttonWidth, smallButtonWidth, smallMaginTop, smallMarginRight, smallMarginLeft, logoWidth, smallMarginBottom } from '../../CommonStyles';
import Logo from './../../logo.png'

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

  const logout = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    };
    fetch('/logout', requestOptions).then( function(response) {
      navigate('/')
    }).catch((err) => {  
      navigate('/')
    })
  };


  return (
    <div>
      <Col>
        <Button  style={{ float: 'right', width: smallButtonWidth, marginTop: smallMaginTop, marginRight: smallMarginRight }} onClick={() => logout()}>Cerrar Sesión</Button>
        <img  style={{float: 'left', marginTop: smallMaginTop, width: logoWidth, marginLeft: smallMarginLeft }} src={Logo} alt="Logo"/>
      </Col>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
        <Col span={24} align='middle'>
          <Title level={2}>¡Voto emitido correctamente!</Title>
        </Col>
        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: buttonWidth }} onClick={() => navigate('/home')}>Volver</Button>
        </Col>
      </Row>  
    </div>
  );
}

export default VoteSuccess;

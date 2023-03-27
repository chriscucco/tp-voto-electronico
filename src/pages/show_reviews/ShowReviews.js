import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, Typography } from 'antd';
import { topMargin, buttonWidth, smallButtonWidth, smallMaginTop, smallMarginRight, smallMarginLeft, smallMarginBottom, logoWidth } from '../../CommonStyles';
import Logo from './../../logo.png'

function ShowReviews() {

  const navigate = useNavigate();

  const { Title } = Typography;

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status !== 200) {
       navigate('/login')
      }

      const data = await response.json()
      if (data.role !== 'reviewer') {
        if (data.role === 'admin'){
          navigate('/home')
        } else {
          navigate('/my_rooms')
        }
      }
    }
    init();
  }, [navigate]);

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
          <Title level={3}>Seleccionar la forma de ingreso</Title>
        </Col>
        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: buttonWidth }} onClick={() => navigate('/my_rooms')}>Modo Usuario</Button>
        </Col>
        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: buttonWidth, marginBottom: smallMarginBottom }} onClick={() => navigate('/reviewer')}>Modo Fiscal</Button>
        </Col>
      </Row>
    </div>
  );
}

export default ShowReviews;

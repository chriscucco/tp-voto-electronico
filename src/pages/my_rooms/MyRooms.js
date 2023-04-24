import { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { topMargin, buttonWidth, smallButtonWidth, smallMaginTop, smallMarginRight, smallMarginLeft, logoWidth, smallMarginBottom } from '../../CommonStyles';
import Logo from './../../logo.png'

function MyRooms() {

  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const { Title } = Typography;

  const goToRoomDetail = (roomId) => navigate(`/room_detail/${roomId}`);

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status !== 200) {
        navigate('/login');
      }

      let roomsRequest = await fetch('/my_rooms/rooms')
      const data = await roomsRequest.json()
      setRooms(data)
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
  
  const createCard = (room) => 
    <Card 
        key={room.id}
        title={room.title} 
        bordered={true} 
        actions={[<Button type='primary' onClick={() => goToRoomDetail(room.room_id)}> {room.actionName}</Button>]}
      >
        {room.description}
      </Card>

  return (
    <div>
      <Col>
        <Button  style={{ float: 'right', width: smallButtonWidth, marginTop: smallMaginTop, marginRight: smallMarginRight }} onClick={() => logout()}>Cerrar Sesión</Button>
        <img  style={{float: 'left', marginTop: smallMaginTop, width: logoWidth, marginLeft: smallMarginLeft }} src={Logo} alt="Logo"/>
      </Col>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin, marginLeft: smallMarginLeft }}>
        <Col span={24} align='middle'>
            <Title>Actos electorales</Title>
        </Col>
        {
          rooms.map(room =>
            <Col key={room.id} span={8}>
              {createCard(room)}
            </Col> 
          )
        }
        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: '30vw', marginBottom: smallMarginBottom }} onClick={() => navigate('/home')}>Volver</Button>
        </Col>
      </Row>    
  </div>
  );
}

export default MyRooms;

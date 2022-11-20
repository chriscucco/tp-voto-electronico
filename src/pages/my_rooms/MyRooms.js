import { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { topMargin } from '../../CommonStyles';

function MyRooms() {

  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
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
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
        {
          rooms.map(room =>
            <Col key={room.id} span={8}>
              {createCard(room)}
            </Col> 
          )
        }
        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: '30vw' }} onClick={() => navigate('/home')}>Volver</Button>
        </Col>
      </Row>    
  </div>
  );
}

export default MyRooms;

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

      // const data = await roomsRequest.json()
      // console.log(data)
      // setRooms(data)

      const data = testingData();
      setRooms(data);

      // await fetchRoom(1)
    }
    init();
  }, [navigate]);
  
  const fetchRoom = async (roomId) => {
    //console.log("Fetching room")
    const response = await fetch(`http://localhost:8001/rooms/${roomId}`);
    const room = await response.json()
    //console.log(room);
  }

  const testingData = () => {
    return [
      {
        id: 1,
        title: 'Room 1',
        description: 'Room 1 description'
      },
      {
        id: 2,
        title: 'Room 2',
        description: 'Room 2 description'
      },
      {
        id: 3,
        title: 'Room 3',
        description: 'Room 3 description'
      },
      {
        id: 4,
        title: 'Room 4',
        description: 'Room 4 description'
      }
    ]
  }
  
  const createCard = (room) =>
    <Card 
        key={room.id}
        title={room.title} 
        bordered={true} 
        actions={[<Button onClick={() => goToRoomDetail(room.id)}> Vote!</Button>]}
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
          <Button style={{ width: '30vw' }} onClick={() => navigate('/home')}>Volver</Button>
        </Col>
      </Row>    
  </div>
  );
}

export default MyRooms;

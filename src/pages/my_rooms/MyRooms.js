import {  useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'antd';

function MyRooms() {

  const [rooms, setRooms] = useState([]);

  let data

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status !== 200) {
       window.location.href = '/login'
      }

      const roomsRequest = await fetch('/my_rooms/rooms')
      if (roomsRequest.status !== 200) {
        window.location.href = '/home'
      }

      data = await roomsRequest.json()
      setRooms(data)

      // await fetchRoom(1)
    }
    init();
  }, []);
  
  const fetchRoom = async (roomId) => {
    //console.log("Fetching room")
    const response = await fetch(`http://localhost:8001/rooms/${roomId}`);
    const room = await response.json()
    //console.log(room);
  }

  const redirectToDetail = (roomId) => {
    console.log("/////////////////////////")
    console.log("REDIRECT")
    console.log(roomId)
  }

  const testingData = () => {
    return (<Col span={8}>
      <Card title="Card title 2" bordered={true}actions={[<Button onClick={() => redirectToDetail('2')}> Vote!</Button>]}>
        Card content
      </Card>
    </Col>
    )
  }
  
  return (
    <div>
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Card title" bordered={true}actions={[<Button onClick={() => redirectToDetail('1')}> Vote!</Button>]}>
          Card content
        </Card>
      </Col>
      {console.log(rooms)}
    </Row>
  </div>
  );
}

export default MyRooms;

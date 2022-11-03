import { useEffect, useState } from 'react';
import { Col, Row, Button, Card, Typography, Radio } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { topMargin, buttonWidth } from '../../CommonStyles';

function MyRooms() {
        const [lists, setLists] = useState([]);
    const { roomId } = useParams();
    const navigate = useNavigate();

    const { Title } = Typography;

    useEffect(() => {
        const init = async () => {
            const response = await fetch('/auth')
            if (response.status !== 200) {
                navigate('/login')
            }

            const roomInfoRequest = await fetch(`/my_rooms/rooms/info/${roomId}`)
            if (roomInfoRequest.status !== 200) {
                navigate('/home')
            }

            let data = await roomInfoRequest.json()
            setLists(data)
        }
        init();
    }, [navigate]);
  
  
    const createCard = (list) => 
    <Card 
        key={list.list_id}
        title={list.name} 
        bordered={true} 
    >
    {
        list.candidates.president.map( candidate =>
            <p><b>{candidate.name}</b></p>
        )
    }
    {
        list.candidates.vicepresident.map( candidate =>
            <p><b>{candidate.name}</b></p>
        )
    }
    {
        list.candidates.other.map( candidate =>
            <p>{candidate.name}</p>
        )
    }
    </Card>

    return (
    <div>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
        <Col span={24} align='middle'>
            <Title>Información del acto</Title>
        </Col>
        {
          lists.map(list =>
            <Col key={list.list_id} span={8}>
              {createCard(list)}
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

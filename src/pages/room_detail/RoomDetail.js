import { useEffect, useState } from 'react';
import { Col, Row, Button, Typography, Radio } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { topMargin, buttonWidth } from '../../CommonStyles';

function MyRooms() {
    
    const [vote, setVote] = useState('');
    const { roomId } = useParams();
    const navigate = useNavigate();

    const { Title } = Typography;

    const onChangeRadio = (e) => setVote(e.target.value);

    const hasSelectedVote = () => vote !== ''

    const roomData = {
        id: roomId,
        title: `Room ${roomId} title`,
        description: `Room ${roomId} description`,
        lists: ['List1', 'List2', 'List3']
    }

    useEffect(() => {
        const init = async () => {
            const response = await fetch('/auth')
            if (response.status !== 200) {
                navigate('/login')
            }

            const roomsRequest = await fetch('/my_rooms/rooms')
            if (roomsRequest.status !== 200) {
                navigate('/home')
            }           
        }
        init();
    }, [navigate]);
  
  return (
        <div>
            <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
                <Col span={24} align='middle'>
                    <Title>{roomData.title}</Title>
                </Col>
                <Col span={24} align='middle'>
                    <Title level={2}>{roomData.description}</Title>
                </Col>
                <Col span={24} align='middle'>
                    <Title level={4}>Listas:</Title>
                </Col>
                <Col span={24} align='middle'>
                    <Radio.Group onChange={onChangeRadio}>
                        {roomData.lists.map(list => <Radio key={list} value={list}>{list}</Radio>)}
                    </Radio.Group>
                </Col>
                <Col span={24} align='middle'>
                    <Button disabled={!hasSelectedVote()} style={{ width: buttonWidth }} onClick={() => console.log(vote)}>Votar</Button>
                </Col>
                <Col span={24} align='middle'>
                    <Button style={{ width: buttonWidth }} onClick={() => navigate('/my_rooms')}>Volver</Button>
                </Col>
            </Row>
         </div>
  );
}

export default MyRooms;

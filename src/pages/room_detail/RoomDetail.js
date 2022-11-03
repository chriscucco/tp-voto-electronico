import { useEffect, useState } from 'react';
import { Col, Row, Button, Card, Typography, Radio } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { topMargin, buttonWidth } from '../../CommonStyles';

function MyRooms() {
    
    // const [vote, setVote] = useState('');
    const [lists, setLists] = useState([]);
    const { roomId } = useParams();
    const navigate = useNavigate();
    const emitVote = (listId) => {
        navigate(`/room_vote/${roomId}/list/${listId}`);
    }

     const { Title } = Typography;

    // const onChangeRadio = (e) => setVote(e.target.value);

    // const hasSelectedVote = () => vote !== ''

    // let roomData = {
    //     id: roomId,
    //     title: `¡Emití tu voto!`,
    //     lists: ['List1', 'List2', 'List3']
    // }

    useEffect(() => {
        const init = async () => {
            const response = await fetch('/auth')
            if (response.status !== 200) {
                navigate('/login')
            }

            const roomDetailsRequest = await fetch(`/my_rooms/rooms/details/${roomId}`)
            if (roomDetailsRequest.status === 401) {
                navigate('/home')
            }

            let data = await roomDetailsRequest.json()
            if (roomDetailsRequest.status !== 200) {
                if (data == 'results') {
                    navigate(`/room_results/${roomId}`)
                } else if (data == 'information') {
                    navigate(`/room_info/${roomId}`)
                } else {
                    navigate('/home')
                }
            }

            setLists(data.lists)
        }
        init();
    }, [navigate]);
  
  
    const createCard = (list) => 
    <Card 
        key={list.list_id}
        title={list.name} 
        bordered={true} 
        actions={[<Button onClick={() => emitVote(list.list_id)}> Votar</Button>]}
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
            <Title>¡Emití tu voto!</Title>
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
  /*return (
        <div>
            <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
                <Col span={24} align='middle'>
                    <Title>{roomData.title}</Title>
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
  );*/

export default MyRooms;

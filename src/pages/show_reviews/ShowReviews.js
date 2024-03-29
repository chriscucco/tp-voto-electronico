import { useEffect, useState } from 'react';
import { Col, Row, Button, Card, Typography, Radio } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { topMargin, buttonWidth, smallButtonWidth, smallMaginTop, smallMarginRight, smallMarginLeft, logoWidth, smallMarginBottom } from '../../CommonStyles';
import Logo from './../../logo.png'

function ShowReviews() {
    const [rooms, setRooms] = useState([]);
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

            const roomInfoRequest = await fetch(`/rooms/show/all/ready_for_review/${data.user_id}`)
            if (roomInfoRequest.status !== 200) {
                navigate('/home')
            }

            let roomData = await roomInfoRequest.json()
            setRooms(roomData)
        }
        init();
    }, [navigate]);

    const goToRoomDetail = (roomId) => navigate(`/show_reviews_detail/${roomId}`);

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
        key={room.room_id}
        title={room.name} 
        bordered={true}
        actions={[<Button type='primary' onClick={() => goToRoomDetail(room.room_id)}> Revisar</Button>]}
    >
    {
        <p><b>Inicio: </b>{room.initDate}</p>   
    }
    {
        <p><b>Finaliza: </b>{room.endDate}</p>     
    }
    {
        <p>Numero de sala: {room.room_id}</p>
    }
    </Card>

    return (
    <div>
      <Col>
        <Button  style={{ float: 'right', width: smallButtonWidth, marginTop: smallMaginTop, marginRight: smallMarginRight }} onClick={() => logout()}>Cerrar Sesión</Button>
        <img  style={{float: 'left', marginTop: smallMaginTop, width: logoWidth, marginLeft: smallMarginLeft }} src={Logo} alt="Logo"/>
      </Col>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin, marginLeft: smallMarginLeft, marginRight: smallMarginRight}}>
        <Col span={24} align='middle'>
            <Title>Actos electorales pendientes</Title>
        </Col>
        {
          rooms.map(room =>
            <Col key={room.room_id} span={8}>
              {createCard(room)}
            </Col> 
          )
        }
        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: '30vw' , marginBottom: smallMarginBottom }} onClick={() => navigate('/home')}>Volver</Button>
        </Col>
      </Row>    
    </div>
  );
}

export default ShowReviews;

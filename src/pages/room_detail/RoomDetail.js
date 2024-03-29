import { useEffect, useState } from 'react';
import { Col, Row, Button, Card, Typography, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { topMargin, buttonWidth, smallButtonWidth, smallMaginTop, smallMarginRight, smallMarginLeft, logoWidth, smallMarginBottom } from '../../CommonStyles';
import Logo from './../../logo.png'

function MyRooms() {
    const [lists, setLists] = useState([]);
    const [selectedListToVote, setSelectedListToVote] = useState({});
    const { roomId } = useParams();
    const navigate = useNavigate();
    const emitVote = (listId) => {
        navigate(`/room_vote/${roomId}/list/${listId}`);
    }

    const { Title } = Typography;


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (list) => {
      setSelectedListToVote(list);
      setIsModalOpen(true);
    };

    const handleOk = () => {
      emitVote(selectedListToVote.list_id)
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setSelectedListToVote({});
      setIsModalOpen(false);
    };  
    
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

    const createCard = (list) => 
    <Card 
        key={list.list_id}
        title={list.name} 
        bordered={true} 
        actions={[<Button type='primary' onClick={() => showModal(list)}> Votar</Button>]}
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

    console.log(selectedListToVote);

    return (
    <div>
      <Modal title="Está seguro de su voto?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        Desea votar a {selectedListToVote.name}?
      </Modal>
      <Col>
        <Button  style={{ float: 'right', width: smallButtonWidth, marginTop: smallMaginTop, marginRight: smallMarginRight }} onClick={() => logout()}>Cerrar Sesión</Button>
        <img  style={{float: 'left', marginTop: smallMaginTop, width: logoWidth, marginLeft: smallMarginLeft }} src={Logo} alt="Logo"/>
      </Col>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin, marginLeft: smallMarginLeft, marginRight: smallMarginRight}}>
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
          <Button type='primary' style={{ width: '30vw', marginBottom: smallMarginBottom }} onClick={() => navigate('/home')}>Volver</Button>
        </Col>
      </Row>    
    </div>
  );
}

export default MyRooms;

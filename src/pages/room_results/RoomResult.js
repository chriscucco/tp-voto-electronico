import { useEffect, useState } from 'react';
import { Col, Row, Button, Card, Typography, Radio } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { topMargin, buttonWidth, smallButtonWidth, smallMaginTop, smallMarginRight, smallMarginLeft, logoWidth, smallMarginBottom } from '../../CommonStyles';
import Logo from './../../logo.png'
import ClipLoader from 'react-spinners/ClipLoader';
import Paragraph from 'antd/lib/skeleton/Paragraph';


function MyRooms() {
    const [lists, setLists] = useState();
    const [isLoading, setLoading] = useState(true);
    const { roomId } = useParams();
    const navigate = useNavigate();
    const loader = document.querySelector('.loader');
    const { Title } = Typography;



    useEffect(() => {
        const init = async () => {
            const response = await fetch('/auth')
            if (response.status !== 200) {
                navigate('/login')
            }

            const roomInfoRequest = await fetch(`/vote/count/${roomId}`)
            if (roomInfoRequest.status !== 200) {
                navigate('/home')
            }

            let data = await roomInfoRequest.json()
            setLists(data)
            setLoading(false)
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

    const createDescription = (data) =>
    <Col span={24} align='middle'>
      {
        <p>Votantes en el padrón: <b>{data.totalVoters}</b></p>
      }
      {
        <p>Votos efectuados: <b>{data.totalVotes}</b></p>
      }
      {
        <p>Porcentaje de participación: <b>{Number((data.votesRatio).toFixed(2))}%</b></p>
      }
    </Col>

    const createCard = (list) => 
    <Card 
        key={list.list_id}
        title={list.name} 
        bordered={true} 
    >
    {
      <p>Votos totales: <b>{list.votes}</b></p>
    }
    {
      <p>Porcentaje de votos: <b>{Number((list.ratio).toFixed(2))}%</b></p>
    }
    </Card>

    return (
    <div>
      <Col>
        <Button  style={{ float: 'right', width: smallButtonWidth, marginTop: smallMaginTop, marginRight: smallMarginRight }} onClick={() => logout()}>Cerrar Sesión</Button>
        <img  style={{float: 'left', marginTop: smallMaginTop, width: logoWidth, marginLeft: smallMarginLeft }} src={Logo} alt="Logo"/>
      </Col>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin, marginLeft: smallMarginLeft, marginRight: smallMarginRight }}>
        <Col span={24} align='middle'>
            <Title>Resultados del acto</Title>
        </Col>
        {
            isLoading ? (
                <Col span={24} align='middle'>
                  <ClipLoader color={'#505050'} size={120} />
                </Col>
            ) : (
                lists.listData.map(list =>
                    <Col key={list.list_id} span={8}>
                      {createCard(list)}
                    </Col> 
                )
            )
        }
        {
          isLoading ? (
            <Col span={24} align='middle'>
            </Col>
          ) : (
            createDescription(lists.votingRoomInfo)
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

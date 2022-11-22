import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row, Button, Typography} from 'antd';
import { topMargin, buttonWidth, smallButtonWidth, smallMaginTop, smallMarginRight, smallMarginLeft, logoWidth, smallMarginBottom } from '../../CommonStyles';
import Logo from './../../logo.png'
import ClipLoader from 'react-spinners/ClipLoader';


function RoomVoting() {
    const { roomId, listId } = useParams();
    const navigate = useNavigate();

    const { Title } = Typography;


    useEffect(() => {
        const init = async () => {
            const response = await fetch('/auth')
            if (response.status !== 200) {
                navigate('/login')
            }

            const roomInfoRequest = await fetch(`/vote/create/${roomId}/list/${listId}`)
            if (roomInfoRequest.status !== 200) {
                navigate('/vote_error')
            } else {
                navigate('/vote_success')
            }
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

    return (
    <div>
      <Col>
        <Button  style={{ float: 'right', width: smallButtonWidth, marginTop: smallMaginTop, marginRight: smallMarginRight }} onClick={() => logout()}>Cerrar Sesión</Button>
        <img  style={{float: 'left', marginTop: smallMaginTop, width: logoWidth, marginLeft: smallMarginLeft }} src={Logo} alt="Logo"/>
      </Col>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
        <Col span={24} align='middle'>
          <Title level={2}>Procesando el voto...</Title>
        </Col>
        <Col span={24} align='middle'>
          <ClipLoader color={'#505050'} size={120} />
        </Col>
      </Row>  
    </div>
  );
}

export default RoomVoting;

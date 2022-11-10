import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row, Typography} from 'antd';
import { topMargin, buttonWidth } from '../../CommonStyles';
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

    return (
    <div>
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

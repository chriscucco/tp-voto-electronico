import { useEffect } from 'react';
import {  Row} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { topMargin } from '../../CommonStyles';

function MyRooms() {
    const { roomId, listId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            const response = await fetch('/auth')
            if (response.status !== 200) {
                navigate('/login')
            }

            const roomInfoRequest = await fetch(`/vote/create/${roomId}/list/${listId}`)
            if (roomInfoRequest.status !== 200) {
                navigate('/vote-error')
            } else {
                navigate('/vote-success')
            }

            //let data = await roomInfoRequest.json()
        }
        init();
    }, [navigate]);

    return (
    <div>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
        <p>Procesando el voto...</p>
      </Row>    
    </div>
  );
}

export default MyRooms;

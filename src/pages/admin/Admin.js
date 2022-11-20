import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import { buttonWidth, topMargin } from '../../CommonStyles';

function Admin() {

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status !== 200) {
       navigate('/login')
      }

      const data = await response.json()
      if (data.role !== 'admin') {
        navigate('/my_rooms')
      }
    }
    init();
  }, [navigate]);
  return (
    <>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: buttonWidth }} onClick={() => navigate('/add_admin')}>Dar permisos de Administrador</Button>
        </Col>

        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: buttonWidth }} onClick={() => navigate('/add_room')}>Crear nuevo acto electoral</Button>
        </Col>

        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: buttonWidth }} onClick={() => navigate('/add_list')}>Crear nueva lista</Button>
        </Col>

        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: buttonWidth }} onClick={() => navigate('/add_candidate')}>Crear nuevo candidato</Button>
        </Col>

        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: buttonWidth }} onClick={() => navigate('/add_voters')}>Agregar votantes a acto electoral</Button>
        </Col>

        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: buttonWidth }} onClick={() => navigate('/add_list_to_room')}>Agregar listas a acto electoral</Button>
        </Col>

        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: buttonWidth }} onClick={() => navigate('/home')}>Volver</Button>
        </Col>
      </Row>
    </>
  );
}

export default Admin;

import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, DatePicker, Button, Input, Typography, Row, Col } from 'antd';
import ClipLoader from 'react-spinners/ClipLoader';
import { topMargin, buttonWidth, style } from '../../CommonStyles';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function AddRoom() {

  let [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false)
  const [roomId, setRoomId] = useState()
  const navigate = useNavigate();

  const { Title } = Typography;

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status !== 200) {
        navigate('/login');
      }

      const data = await response.json()
      if (data.role !== 'admin') {
        navigate('/my_rooms');
      }
    }
    init();
  }, [searchParams, navigate]);


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    setLoading(true)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    fetch('/rooms', requestOptions).then( function(response) {
      if (response.ok) {
        return response.json()
      } else {
        return undefined
      }
    }).then( function(data) {
      if (data !== undefined) {
        setRoomId(data)
        setLoading(false)
        setShowModal(true)
        setSuccess(true)
        handleOpen()
      } else {
        setLoading(false)
        setShowModal(true)
        setSuccess(false)
        handleOpen()
      }
    }).catch((err) => {  
      setLoading(false)
      setShowModal(true)
      setSuccess(false)
      handleOpen() 
    })
  };


  const { RangePicker } = DatePicker;

  return (
    <div>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
        <Col span={24} align='middle'>
          <Title level={3}>Ingresar fecha de inicio y fin del acto electoral</Title>
        </Col>
        <Col span={24} align='middle'>
          <Form onFinish={onFinish}>
            <Form.Item
              label="Descripción del acto"
              name="description"
              style={{ width: buttonWidth }}
              rules={[{ required: true, message: 'Agregar descripción del acto electoral' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
              label="Fecha y hora de inicio" 
              name="dates"
              style={{ width: buttonWidth }}
            >
              <RangePicker showTime />
            </Form.Item>
            <Form.Item>
              <Button type='primary' style={{ width: buttonWidth }} htmlType="submit">
                Enviar
              </Button>
            </Form.Item>
          </Form> 
        </Col>
        <Col span={24} align='middle'>
          <Button  type='primary' style={{ width: buttonWidth }} onClick={() => navigate('/admin')}>Volver</Button>
        </Col>
        {
            isLoading ? (
                <Col span={24} align='middle'>
                  <ClipLoader color={'#505050'} size={120} />
                  <h4>Creando el acto electoral...</h4>
                </Col>

            ) : ""
        }
        {
          showModal ? ( success ? (
            <Col span={24} align='middle'>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 400, alignItems:'center', alignContent:'center', alignSelf:'center' }}>
                  <h2 align='center' id="parent-modal-title">¡Sala Creada!</h2>
                  <p align='center' id="parent-modal-description">
                    Se creo la sala correctamente con identificador de sala: <b>{roomId}</b>.
                  </p>
                  {
                    <Col span={24} align='middle'>
                      <Button type='primary' onClick={() => navigate('/admin')}>
                        Continuar
                      </Button>
                    </Col>
                  }
                </Box>
              </Modal>
            </Col>
          ) : (
            <Col span={24} align='middle'>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 400, alignItems:'center', alignContent:'center', alignSelf:'center' }}>
                  <h2 align='center' id="parent-modal-title">Error</h2>
                  <p align='center' id="parent-modal-description">
                    Error en la creación de la sala.
                  </p>
                  {
                    <Col span={24} align='middle'>
                      <Button type='primary' onClick={() => handleClose()}>
                        Reintentar
                      </Button>
                    </Col>
                  }
                </Box>
              </Modal>
            </Col>
          )) : ""
        }
      </Row>
    </div>
  );
}

export default AddRoom;

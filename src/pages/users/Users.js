import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Typography} from 'antd';
import { topMargin, buttonWidth, style } from '../../CommonStyles';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function Users() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { Title } = Typography;
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status === 200) {
        navigate('/home')
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
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    fetch('/users', requestOptions).then( function(response) {
      if (response.ok){
        setShowModal(true)
        setSuccess(true)
        handleOpen()
      } else {
        setShowModal(true)
        setSuccess(false)
        handleOpen()
      }
    }).catch((err) => {  
      setShowModal(true)
      setSuccess(false)
      handleOpen() 
    })
  };

  return (
    <div>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
      <Col span={24} align='middle'>
          <Title level={3}>Ingresa tus datos para registrarte</Title>
      </Col>
      <Col span={24} align='middle'>
        <Form onFinish={onFinish}>
          <Form.Item
            label="Usuario"
            name="userId"
            rules={[{ required: true, message: "Ingresar el nombre de usuario" }]}
            style={{ width: buttonWidth }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="DNI"
            name="dni"
            rules={[{ required: true, message: "Ingresar DNI del usuario" }]}
            style={{ width: buttonWidth }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="userFirstName"
            rules={[{ required: true, message: "Ingresar el primer nombre del usuario" }]}
            style={{ width: buttonWidth }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Apellido"
            name="userLastName"
            rules={[{ required: true, message: "Ingresar el apellido del usuario" }]}
            style={{ width: buttonWidth }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Ingresar una contraseña" }]}
            style={{ width: buttonWidth }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" style={{ width: '30vw' }} htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={24} align='middle'>
          <Button type="primary" style={{ width: '30vw' }} onClick={() => navigate('/')}>Volver</Button>
      </Col>
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
                <h2 align='center' id="parent-modal-title">¡Usuario creado!</h2>
                <p align='center' id="parent-modal-description">
                  Usuario creado con éxito, ahora inicia sesión para acceder.
                </p>
                {
                  <Col span={24} align='middle'>
                    <Button type='primary' onClick={() => navigate('/')}>
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
                <h2 align='center' id="parent-modal-title">Error en creación de usuario</h2>
                <p align='center' id="parent-modal-description">
                  Error en los datos ingresados, revisar y volver a intentarlo
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
          )
        ) : ""
      }
      </Row>
    </div>
  );
}

export default Users
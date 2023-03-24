import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { topMargin, buttonWidth, style, smallButtonWidth, smallMaginTop, smallMarginRight, smallMarginLeft, logoWidth, smallMarginBottom } from '../../CommonStyles';
import Logo from './../../logo.png'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function AddList() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false)
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
        if (data.role === 'reviewer'){
          navigate('/reviewer_home')
        } else {
          navigate('/my_rooms')
        }
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
    fetch('/lists', requestOptions).then( function(response) {
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
      <Row gutter={[24, 24]} style={{ marginTop: topMargin}}>
        <Col span={24} align='middle'>
          <Title level={2}>Ingresar los datos de la nueva lista</Title>
        </Col>
        <Col span={24} align='middle'>
          <Form onFinish={onFinish}>
            <Form.Item
              label="Número de lista"
              name="listId"
              rules={[{ required: true, message: 'Agregar el número de lista' }]}
              style={{ width: buttonWidth }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nombre de la lista"
              name="listName"
              rules={[{ required: true, message: 'Agregar el nombre de la lista' }]}
              style={{ width: buttonWidth }}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType="submit" style={{ width: buttonWidth }}>
                Enviar
              </Button>
            </Form.Item>
          </Form> 
        </Col>
        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: buttonWidth, marginBottom: smallMarginBottom }} onClick={() => navigate('/admin')}>Volver</Button>
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
                <h2 align='center' id="parent-modal-title">¡Lista creada!</h2>
                <p align='center' id="parent-modal-description">
                  La lista fue creada exitosamente.
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

export default AddList;

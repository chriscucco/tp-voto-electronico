import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Typography} from 'antd';
import { topMargin, buttonWidth, style, smallButtonWidth, smallMaginTop, smallMarginRight, smallMarginLeft, logoWidth, smallMarginBottom } from '../../CommonStyles';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Logo from './../../logo.png'


function AddAdmin() {

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


  const onFinish = (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    fetch('/roles/add', requestOptions).then( function(response) {
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
      <Col>
          <Button  style={{ float: 'right', width: smallButtonWidth, marginTop: smallMaginTop, marginRight: smallMarginRight }} onClick={() => logout()}>Cerrar Sesión</Button>
          <img  style={{float: 'left', marginTop: smallMaginTop, width: logoWidth, marginLeft: smallMarginLeft }} src={Logo} alt="Logo"/>
      </Col>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin}}>
        <Col span={24} align='middle'>
          <Title level={4}>Ingresar nombre de usuario o DNI del usuario a agregar como administrador</Title>
        </Col>
        <Col span={24} align='middle'>
          <Form onFinish={onFinish}>
            <Form.Item
              label="Usuario o DNI"
              name="newAdmin"
              rules={[{ required: true, message: 'Agregar el usuario o DNI del nuevo administrador' }]}
              style={{ width: buttonWidth }}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type='primary' style={{ width: buttonWidth }} htmlType="submit">
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
                  <h2 align='center' id="parent-modal-title">¡Usuario modificado!</h2>
                  <p align='center' id="parent-modal-description">
                    Se dieron permisos de administrador al usuario solicitado.
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
                    Error en los datos ingresados, usuario inválido.
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

export default AddAdmin;

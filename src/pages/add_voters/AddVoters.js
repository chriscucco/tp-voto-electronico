import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { topMargin, buttonWidth, style, smallButtonWidth, smallMaginTop, smallMarginRight, smallMarginLeft, logoWidth, smallMarginBottom } from '../../CommonStyles';
import Logo from './../../logo.png'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function AddVoters() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [msg, setMsg] = useState();
  const [modalTitle, setModalTitle] = useState()
  const [redirectUrl, setRedirectUrl] = useState();
  const [showRedirectButton, setShowRedirectButton] = useState(false);
  const [buttonText, setButtonText] = useState();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRedirect = () => {
    navigate(redirectUrl)
  }

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

  const onFinish = (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    fetch('/voters/add', requestOptions).then( function(response) {
      if (response.ok) {
        return undefined
      } else {
        return response.json()
      }
    }).then( function(data) {
      if (data !== undefined) {
        setMsg(data)
        setModalTitle("Error al procesar la solicitud")
        setButtonText("Reintentar")
        setShowRedirectButton(false)
        setShowModal(true)
        handleOpen()
      } else {
        setMsg("Todos los votantes fueron agregados correctamente al acto electoral")
        setRedirectUrl("/admin")
        setModalTitle("¡Votantes agregados!")
        setShowRedirectButton(true)
        setButtonText("Continuar")
        setShowModal(true)
        handleOpen()
      }
    }).catch((err) => {  
      setModalTitle("Error al procesar la solicitud")
      setMsg("Error en el servicio de agregado de votantes a actos electorales")
      setButtonText("Reintentar")
      setShowRedirectButton(false)
      setShowModal(true)
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
          <Title level={3}>Ingresar DNI de los votantes a agregar separados por coma</Title>
        </Col>
        <Col span={24} align='middle'>
          <Form onFinish={onFinish}>
            <Form.Item
              label="DNI de votantes"
              name="voterIds"
              rules={[{ required: true, message: "Ingresar los DNI's de los votantes" }]}
              style={{ width: buttonWidth }}
            >
              <Input placeholder="Ej: 40128001,18995293..." />
            </Form.Item>

            <Form.Item
              label="Acto electoral"
              name="roomId"
              rules={[{ required: true, message: "Ingresar ID del acto electoral" }]}
              style={{ width: buttonWidth }}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: buttonWidth }}>
                Enviar
              </Button>
            </Form.Item>
          </Form>  
        </Col>
        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: buttonWidth, marginBottom: smallMarginBottom }} onClick={() => navigate('/admin')}>Volver</Button>
        </Col>
        {
            showModal ? (
                <Col span={24} align='middle'>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box sx={{ ...style, width: 400, alignItems:'center', alignContent:'center', alignSelf:'center' }}>
                      <h2 align='center' id="parent-modal-title">{modalTitle}</h2>
                      <p align='center' id="parent-modal-description">
                        {msg}
                      </p>
                      {
                        showRedirectButton ? (
                          <Col span={24} align='middle'>
                            <Button type='primary' 
                              onClick={() => handleRedirect()}>
                              {buttonText}
                            </Button>
                          </Col>
                        ) : (
                          <Col span={24} align='middle'>
                            <Button 
                              type="primary" 
                              onClick={() => handleClose()}>
                              {buttonText}
                            </Button>
                          </Col>
                        )
                      }
                    </Box>
                  </Modal>
                </Col>
            ) : ""
        }
      </Row>  
    </div>
  );
}

export default AddVoters;

import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import ClipLoader from 'react-spinners/ClipLoader';
import { topMargin, buttonWidth, style, smallButtonWidth, smallMaginTop, smallMarginRight, smallMarginLeft, logoWidth, smallMarginBottom } from '../../CommonStyles';
import Logo from './../../logo.png'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function AddListToRoom() {

  let [searchParams, setSearchParams] = useSearchParams();
  const [msg, setMsg] = useState();
  const [isLoading, setLoading] = useState(false);
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
    setLoading(true)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    fetch('/roomLists/add', requestOptions).then( function(response) {
      if (response.ok) {
        return undefined
      } else {
        return response.json()
      }
    }).then( function(data) {
      if (data !== undefined) {
        setMsg(data)
        setLoading(false)
        setShowModal(true)
        setSuccess(false)
        handleOpen()
      } else {
        setLoading(false)
        setShowModal(true)
        setSuccess(true)
        handleOpen()
      }
    }).catch((err) => {
      setMsg("Error agregando listas al acto electoral")
      setLoading(false)
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
      <Row gutter={[24, 24]} style={{ marginTop: topMargin }}>
        <Col span={24} align='middle'>
          <Title level={3}>Ingresar los numeros de lista separados por coma</Title>
        </Col>
        <Col span={24} align='middle'>
          <Form onFinish={onFinish}>
            <Form.Item
              label="Números de lista"
              name="listsId"
              rules={[{ required: true, message: 'Al menos un número de lista es requerido' }]}
              style={{ width: buttonWidth }}
            >
              <Input placeholder="Ej: 1, 2, 3, 4..."/>
            </Form.Item>

            <Form.Item
              label="Número de acto electoral"
              name="roomId"
              rules={[{ required: true, message: 'Ingresar el número de acto electoral' }]}
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
            isLoading ? (
                <Col span={24} align='middle'>
                  <ClipLoader color={'#505050'} size={120} />
                  <h4>Agregando lista/s a acto electoral...</h4>
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
                  <h2 align='center' id="parent-modal-title">¡Listas agregadas!</h2>
                  <p align='center' id="parent-modal-description">
                    Se agregaron correctamente las listas al acto electoral.
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
                    {msg}
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

export default AddListToRoom;

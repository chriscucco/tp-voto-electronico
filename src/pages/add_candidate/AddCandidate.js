import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, Select } from 'antd';
import { topMargin, buttonWidth, style } from '../../CommonStyles';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function AddCandidate() {
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

  const onFinish = (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    fetch('/candidates', requestOptions).then( function(response) {
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
          <Title level={3}>Ingresar los datos del nuevo candidato</Title>
        </Col>
        <Col span={24} align='middle'>
          <Form onFinish={onFinish}>
            <Form.Item
              label="Identificador del candidato"
              name="candidateId"
              rules={[{ required: true, message: 'Agregar el identificador del candidato' }]}
              style={{ width: buttonWidth }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Lista del candidato"
              name="listId"
              rules={[{ required: true, message: 'Agregar la lista a la que pertenece el candidato' }]}
              style={{ width: buttonWidth }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nombre del candidato"
              name="candidateName"
              rules={[{ required: true, message: 'Agregar el nombre del candidato' }]}
              style={{ width: buttonWidth }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Rol del candidato"
              name="candidateRole"
              rules={[{ required: true, message: 'Agregar el rol del candidato' }]}
              style={{ width: buttonWidth }}
            >
              <Select>
                <Select.Option value="Presidente">Presidente</Select.Option>
                <Select.Option value="VicePresidente">VicePresidente</Select.Option>
                <Select.Option value="Otro">Otro</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: buttonWidth }}>
                Enviar
              </Button>
            </Form.Item>
          </Form> 
        </Col>
        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: buttonWidth }} onClick={() => navigate('/admin')}>Volver</Button>
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
                <h2 align='center' id="parent-modal-title">¡Candidato creado!</h2>
                <p align='center' id="parent-modal-description">
                  El candidato fue creado correctamente y agregado a la lista.
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

export default AddCandidate;

import { useEffect, useState } from 'react';
import { Col, Row, Button, Card, Typography, Radio } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { topMargin, style, buttonWidth, smallButtonWidth, smallMaginTop, smallMarginRight, smallMarginLeft, logoWidth, smallMarginBottom } from '../../CommonStyles';
import Logo from './../../logo.png'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function ShowReviewsDetail() {
    const [state, setState] = useState({lists: [], voters: []});
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false)
    const { roomId } = useParams();
    const navigate = useNavigate();
    
     const { Title } = Typography;

    useEffect(() => {
        const init = async () => {
            const response = await fetch('/auth')
            if (response.status !== 200) {
                navigate('/login')
            }

            const data = await response.json()
            if (data.role !== 'reviewer') {
              if (data.role === 'admin'){
                navigate('/home')
              } else {
                navigate('/my_rooms')
              }
            }

            const roomDetailsRequest = await fetch(`/my_rooms/rooms/info/${roomId}/admin`)
            if (roomDetailsRequest.status === 401) {
                navigate('/home')
            }

            const votersRequest = await fetch(`/voters/user_detail?room_id=${roomId}`)
            let votersProcessedRequest = await votersRequest.json()
            let roomData = await roomDetailsRequest.json()
            setState({lists: roomData, voters: votersProcessedRequest})
        }
        init();
    }, [navigate]);


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  const onFinish = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`/rooms/set_ready/${roomId}`, requestOptions).then( function(response) {
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

    const createCard = (list) => 
    <Card 
        key={list.list_id}
        title={list.name} 
        bordered={true} 
    >
    {
        list.candidates.president.map( candidate =>
            <p><b>{candidate.name}</b></p>
        )
    }
    {
        list.candidates.vicepresident.map( candidate =>
            <p><b>{candidate.name}</b></p>
        )
    }
    {
        list.candidates.other.map( candidate =>
            <p>{candidate.name}</p>
        )
    }
    </Card>

    return (
    <div>
      <Col>
        <Button  style={{ float: 'right', width: smallButtonWidth, marginTop: smallMaginTop, marginRight: smallMarginRight }} onClick={() => logout()}>Cerrar Sesión</Button>
        <img  style={{float: 'left', marginTop: smallMaginTop, width: logoWidth, marginLeft: smallMarginLeft }} src={Logo} alt="Logo"/>
      </Col>
      <Row gutter={[24, 24]} style={{ marginTop: topMargin, marginLeft: smallMarginLeft, marginRight: smallMarginRight}}>
        <Col span={24} align='middle'>
            <Title>Detalle de acto electoral</Title>
        </Col>
        {
          state.lists.map(list =>
            <Col key={list.list_id} span={8}>
              {createCard(list)}
            </Col> 
          )
        }
        <Col span={24} align='middle'>
            <Title>Padrón del acto electoral</Title>
        </Col>
        {
            state.voters.map(v =>
                <Col key={v.dni} span={8}>
                    <p> - <b>{v.dni}</b>: {v.last_name}, {v.name}</p>
                </Col>
            )
        }
        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: '30vw', marginBottom: '1vw' }} onClick={() => {onFinish()}}>Marcar como revisado</Button>
        </Col>
        <Col span={24} align='middle'>
          <Button type='primary' style={{ width: '30vw', marginBottom: smallMarginBottom }} onClick={() => navigate('/home')}>Volver</Button>
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
                <h2 align='center' id="parent-modal-title">¡Solicitud procesada!</h2>
                <p align='center' id="parent-modal-description">
                  El acto fue revisado correctamente.
                </p>
                {
                  <Col span={24} align='middle'>
                    <Button type='primary' onClick={() => navigate('/reviewer_home')}>
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
                  Error al procesar la solicitud
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

export default ShowReviewsDetail;

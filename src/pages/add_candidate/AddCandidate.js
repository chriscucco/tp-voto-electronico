import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';

function AddCandidate() {

  let [searchParams, setSearchParams] = useSearchParams();
  const [msg, setMsg] = useState();

  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status !== 200) {
       window.location.href = '/login'
      }

      const data = await response.json()
      if (data.role !== 'admin') {
        window.location.href = '/my_rooms'
      }

      let value = searchParams.get('retry')
      if (value != null && value === "true") {
        setMsg('Error en los datos ingresados')
      }
    }
    init();
  }, [searchParams]);
  return (
    <div>
      <p>Ingresar los datos del nuevo candidato</p>
      <Form>
        <Form.Item
          label="Identificador del candidato"
          name="candidateId"
          rules={[{ required: true, message: 'Agregar el identificador del candidato' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Lista del candidato"
          name="listId"
          rules={[{ required: true, message: 'Agregar la lista a la que pertenece el candidato' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nombre del candidato"
          name="candidateName"
          rules={[{ required: true, message: 'Agregar el nombre del candidato' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Rol del candidato"
          name="candidateRole"
          rules={[{ required: true, message: 'Agregar el rol del candidato' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form> 
    </div>
  );
}

export default AddCandidate;

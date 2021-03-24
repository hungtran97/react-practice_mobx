import { observer } from 'mobx-react';
import React, { useState } from 'react';
import {
  Card,
  Form,
  Button,
  Container,
  Image,
  Row,
  Col,
} from 'react-bootstrap';
import { Redirect } from 'react-router';

import './home.css';
import avatar from '../avatar.jpeg';

const Home: React.FC<any> = observer(({ store }) => {
  const [url, setUrl] = useState('');
  const changeAvatar = (f: FileList): any => {
    let reader = new FileReader();
    const file = f[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUrl(reader.result as string);
    };
  };
  if (store.isLogin)
    return (
      <>
        <h1> Home </h1>
        <Card className='home'>
          <Card.Body>
            <Container>
              <Row>
                <Col md='12'>
                  <Image
                    style={{ overflow: 'hidden', maxHeight: '100px' }}
                    src={url ? url : avatar}
                    roundedCircle
                  />
                </Col>
                <Col md='12'>
                  <Form>
                    <Form.Group className='avatar-select'>
                      <input
                        name='avatar'
                        type='file'
                        onChange={(e) =>
                          changeAvatar(e.target.files as FileList)
                        }
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col md='12'>{localStorage.getItem('email')}</Col>
              </Row>
              <Row>
                <Col md='12'>
                  <Button size='sm' onClick={store.logout()}>
                    Logout
                  </Button>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </>
    );
  else return <Redirect to='/login' />;
});

export default Home;

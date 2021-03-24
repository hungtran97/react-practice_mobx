import { observer } from 'mobx-react';
import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Redirect } from 'react-router';

// type LoginState = {
//   type: string;
//   target: string;
//   message: string;
// };
const Login: React.FC<any> = observer(({ store }) => {
  const [res, setRes] = useState({ type: '', target: '', message: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response = await store.login(email, password);
    setRes(response);
    store.setAlert(response.type, response.message);
  };
  if (store.isLogin) {
    return <Redirect to='/home' />;
  } else {
    return (
      <>
        <h1> Login </h1>
        <Card className='form-login'>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='email'>
                <Form.Label> Email </Form.Label>
                <Form.Control
                  type='text'
                  name='email'
                  placeholder='admin@ows.vn'
                  onChange={handleChangeEmail}
                />
                <Form.Text className='text-danger'>
                  {res.target === 'email' ? res.message : ''}
                </Form.Text>
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label> Password </Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  placeholder='ows'
                  onChange={handleChangePassword}
                />
                <Form.Text className='text-danger'>
                  {res.target === 'password' ? res.message : ''}
                </Form.Text>
              </Form.Group>
              <Form.Group controlId='remember'>
                <Form.Check
                  type='checkbox'
                  name='remember'
                  label='remember me?'
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }
});

export default Login;

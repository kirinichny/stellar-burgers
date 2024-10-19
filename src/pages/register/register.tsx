import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { getError } from '../../services/auth/auth-slice';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, registerUser } from '../../services/auth/auth-thunks';
import { TLoginData, TRegisterData } from '@api';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registerData: TRegisterData = { name: userName, email, password };
  const loginData: TLoginData = { email, password };
  const dispatch = useDispatch();
  const error = useSelector(getError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(registerUser(registerData)).then(() =>
      dispatch(loginUser(loginData))
    );
  };

  return (
    <RegisterUI
      errorText={error?.message}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};

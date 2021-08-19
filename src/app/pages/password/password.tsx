import React from 'react';
import style from './password.module.css';
import { useParams } from 'react-router';

const Password = (): JSX.Element => {
  const { service } = useParams<{ service: string }>();
  return <div className={style.container}> {service} </div>;
};

export default Password;

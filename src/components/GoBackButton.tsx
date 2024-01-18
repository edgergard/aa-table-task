import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button onClick={goBack} className="button">
      <i className="fa-solid fa-arrow-left" style={{ marginRight: '12px' }}/>
      Go Back
    </Button>
  );
};

export default GoBackButton;
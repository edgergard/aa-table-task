import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

type Props = {
  path: string;
};

export const GoBackButton: React.FC<Props> = ({ path }) => {
  return (
    <Link to={path} className="button">
      <Button>
        <i className="fa-solid fa-arrow-left" style={{ marginRight: '12px' }}/>
        Go Back
      </Button>
    </Link>
  );
};
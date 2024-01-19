import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSearchParams } from 'react-router-dom';
import './Filter.css';

type Props = {
  label: string;
};

export const FilterInput: React.FC<Props> = ({ label }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get('query') || '');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    params.set('page', `1`);
    setSearchParams(params);
  };

  const handleQueryClear = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    params.delete('page');
    setSearchParams(params);
  };

  return (
    <InputGroup className="mb-3 input-container">
      <InputGroup.Text onClick={handleQueryClear} className="cancel-button">
        <i className="fa-solid fa-xmark" />
      </InputGroup.Text>
      <Form.Control
        value={query}
        onChange={handleQueryChange}
        placeholder={label}
        aria-label={label}
        aria-describedby="basic-addon1"
      />
    </InputGroup>
  );
};
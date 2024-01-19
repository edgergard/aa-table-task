import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useSearchParams } from 'react-router-dom';
import './Filter.css';

const FILTER_OPTIONS = [
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
];

export const FilterSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const year = (searchParams.get('year') || '');

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('year', event.target.value);
    params.set('page', `1`);
    setSearchParams(params);
  };

  const handleYearClear = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('year');
    params.delete('page');
    setSearchParams(params);
  };

  return (
    <InputGroup className="mb-3 input-container">
      <InputGroup.Text onClick={handleYearClear} className="cancel-button">
        <i className="fa-solid fa-xmark" />
      </InputGroup.Text>
      <Form.Select
        aria-label="Default select example"
        onChange={handleYearChange}
        value={year}
        className="input"
      >
        <option value="all">All</option>
        {FILTER_OPTIONS.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    </InputGroup>
  );
};
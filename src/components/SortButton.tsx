import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

type Props = {
  sortType: string;
};

const SortButton: React.FC<Props> = ({ sortType }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const order = (searchParams.get('order') || '');
  const sort = (searchParams.get('sort') || '');

  const handleSortChange = (sortType: string) => {
    const params = new URLSearchParams(searchParams);
  
    if (sortType !== sort) {
      params.set('sort', sortType);
      params.set('order', 'asc');
    } else {
      order === 'asc' ? params.set('order', 'desc') : params.delete('order');
      order === 'asc' ? params.set('sort', sortType) : params.delete('sort');
    }
  
    setSearchParams(params);
  };

  return (
    <i
      onClick={() => handleSortChange(sortType)}
      className={classNames('sort-icon', {
        "fa-solid fa-sort": sort !== sortType,
        "fa-solid fa-sort-up": sort === sortType && order === 'asc',
        "fa-solid fa-sort-down": sort === sortType && order === 'desc',
      })}
    />
  );
};

export default SortButton;
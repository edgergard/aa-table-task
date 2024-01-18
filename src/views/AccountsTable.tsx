import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import Table from 'react-bootstrap/Table';
import './style.css';
import accountsData from '../data/ACCOUNTS.json';
import { Account, AccountSort } from '../types';
import SortButton from '../components/SortButton';
import { toDate } from '../utils/functions';

const tableHead = ['id', 'email', 'date'];

function prepareAccounts (
  accounts: Account[], 
  page: number, 
  sortType: string, 
  order: string,
) {
  let preparedAccounts = [...accounts];

  const sortFunctions: Record<string, AccountSort> = {
    id: (a, b) => a.accountId - b.accountId,
    email: (a, b) => a.email.localeCompare(b.email),
    date: (a, b) => toDate(a.creationDate) - toDate(b.creationDate),
  };

  if (sortType && sortFunctions[sortType]) {
    preparedAccounts.sort(sortFunctions[sortType]);
  }

  if (order === 'desc') {
    preparedAccounts.reverse();
  }

  preparedAccounts = preparedAccounts.slice((page - 1) * 15, page * 15);

  return preparedAccounts;
}

const AccountsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page') || '1');
  const order = (searchParams.get('order') || '');
  const sort = (searchParams.get('sort') || '');

  const handlePageChange = (value: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', `${value}`);
    setSearchParams(params);
  };

  const accounts = prepareAccounts(accountsData, page, sort, order);

  return (
    <div className="container">
      <h1 className="title">Accounts Table</h1>

      <div className="table">
        <Table bordered hover>
          <thead>
            <tr>
              {tableHead.map(th => (
                <th key={th} className="th">
                  {th}
                  <SortButton sortType={th} />
                </th>
              ))}
              <th>
                Auth Token
              </th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(({ 
              accountId,
              email,
              authToken,
              creationDate
            }) => (
              <tr key={accountId}>
                <td>
                  <Link to={`account/${accountId}`}>
                    {accountId}
                  </Link>
                </td>
                <td>{email}</td>
                <td>{creationDate}</td>
                <td>{authToken}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <PaginationControl 
        page={page}
        between={3}
        total={accountsData.length}
        limit={15}
        changePage={handlePageChange}
      />
    </div>
  );
};

export default AccountsTable;
import './Table.css';

import accountsData from '../data/ACCOUNTS.json';
import Table from 'react-bootstrap/Table';
import { Link, useSearchParams } from 'react-router-dom';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Account, AccountSort, Order, Sort } from '../types';
import { toDate, checkQuery } from '../utils/functions';
import { FilterInput, FilterSelect } from '../components/filter';
import { SortButton } from '../components/buttons';

const tableHead = ['id', 'email', 'date'];
const ITEMS_PER_PAGE = 15;

function prepareAccounts (
  accounts: Account[],
  sortType: Sort,
  order: Order,
  filter: { query: string, year: string },
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

  if (order === Order.Desc) {
    preparedAccounts.reverse();
  }

  if (filter.query) {
    preparedAccounts = preparedAccounts.filter((
      account => checkQuery(account.email, filter.query)
    ));
  }

  if (filter.year !== 'all') {
    preparedAccounts = preparedAccounts.filter((
      account => checkQuery(account.creationDate, filter.year)
    ));
  }

  return preparedAccounts;
}

function paginateAccounts (accounts: Account[], page: number) {
  return accounts = accounts.slice(
    (page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE
  );
}

export const AccountsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = +(searchParams.get('page') || '1');
  const order = (searchParams.get('order') || '');
  const sort = (searchParams.get('sort') || '');
  const query = (searchParams.get('query') || '');
  const year = (searchParams.get('year') || '');

  const handlePageChange = (value: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', `${value}`);
    setSearchParams(params);
  };

  const accounts = prepareAccounts(
    accountsData, sort as Sort, order as Order, {query, year}
  );
  
  const paginatedAccounts = paginateAccounts(accounts, page);

  return (
    <div className="container">
      <h1 className="title">Accounts Table</h1>

      <div className="filter">
        <div className="filter-container">
          <h4>Email filter</h4>
          <FilterInput
            label="Email"
          />
        </div>

        <div className="filter-container">
          <h4>{`Date filter`}</h4>
          <FilterSelect
          />
        </div>
      </div>

      {accounts.length ? (
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
                <th className="table-row">
                  Auth Token
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedAccounts.map(({ 
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
                  <td className="table-row">{email}</td>
                  <td className="table-row">{creationDate}</td>
                  <td>{authToken}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ): (
        <h2>No accounts found</h2>
      )}

      <PaginationControl
        page={page}
        between={3}
        total={accounts.length}
        limit={ITEMS_PER_PAGE}
        changePage={handlePageChange}
      />
    </div>
  );
};

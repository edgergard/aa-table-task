import './Table.css';

import profilesData from '../data/PROFILES.json';
import { Table } from 'react-bootstrap';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Order, Profile, ProfileSort, Sort } from '../types';
import { checkQuery } from '../utils/functions';
import { FilterInput } from '../components/filter';
import { GoBackButton, SortButton } from '../components/buttons';

const tableHead = ['id', 'country', 'marketplace'];

function prepareProfiles (
  profiles: Profile[],
  accountId: string,
  sortType: Sort,
  order: Order,
  filter: { query: string },
) {
  let preparedProfiles = [...profiles];
  const id = +accountId;

  const sortFunctions: Record<string, ProfileSort> = {
    id: (a, b) => a.profileId - b.profileId,
    country: (a, b) => a.country.localeCompare(b.country),
    marketplace: (a, b) => a.marketplace.localeCompare(b.marketplace),
  };

  if (sortType && sortFunctions[sortType]) {
    preparedProfiles.sort(sortFunctions[sortType]);
  }

  if (order === Order.Desc) {
    preparedProfiles.reverse();
  }

  if (filter.query) {
    preparedProfiles = preparedProfiles.filter((
      profile => checkQuery(profile.country, filter.query)
    ));
  }

  return preparedProfiles.filter(profile => profile.accountId === id);
}

export const ProfilesTable = () => {
  const [searchParams] = useSearchParams();
  const order = (searchParams.get('order') || '');
  const sort = (searchParams.get('sort') || '');
  const query = (searchParams.get('query') || '');

  const { accountId } = useParams();
  const profiles = prepareProfiles(
    profilesData,
    accountId ?? '',
    sort as Sort,
    order as Order,
    { query }
  );

  return (
    <div className="container">
      <div 
        className="title d-flex justify-content-center align-items-center gap-4"
      >
        <GoBackButton path="/" />

        <h1>Profiles Table</h1>
      </div>
      
      <div className="filter filter-container">
        <h4>Country filter</h4>

        <FilterInput label="Country"
        />
      </div>


      {profiles.length ? (
        <Table bordered hover>
          <thead>
            <tr>
              {tableHead.map(th => (
                <th key={th} className="th">
                  {th}
                  <SortButton sortType={th} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {profiles.map(({ 
              profileId,
              country,
              marketplace,
            }) => (
              <tr key={profileId} >
                <td>
                  <Link to={`profile/${profileId}`}>
                    {profileId}
                  </Link>
                </td>
                <td>{country}</td>
                <td>{marketplace}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h2>No profiles found</h2>
      )}
    </div>
  );
};
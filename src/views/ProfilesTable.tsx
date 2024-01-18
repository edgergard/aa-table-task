import React from 'react';
import { Table } from 'react-bootstrap';
import './style.css';
import profilesData from '../data/PROFILES.json';
import { Link, useParams, useSearchParams, } from 'react-router-dom';
import GoBackButton from '../components/GoBackButton';
import { Profile, ProfileSort } from '../types';
import SortButton from '../components/SortButton';

const tableHead = ['id', 'country', 'marketplace'];

function prepareProfiles (
  profiles: Profile[], 
  accountId: string,
  sortType: string,
  order: string,
) {
  const preparedProfiles = [...profiles];
  const id = +accountId;

  const sortFunctions: Record<string, ProfileSort> = {
    id: (a, b) => a.profileId - b.profileId,
    country: (a, b) => a.country.localeCompare(b.country),
    marketplace: (a, b) => a.marketplace.localeCompare(b.marketplace),
  };

  if (sortType && sortFunctions[sortType]) {
    preparedProfiles.sort(sortFunctions[sortType]);
  }

  if (order === 'desc') {
    preparedProfiles.reverse();
  }

  return preparedProfiles.filter(profile => profile.accountId === id);
}

const ProfilesTable = () => {
  const [searchParams] = useSearchParams();
  const order = (searchParams.get('order') || '');
  const sort = (searchParams.get('sort') || '');

  const { accountId } = useParams();
  const profiles = prepareProfiles(profilesData, accountId ?? '', sort, order);

  return (
    <div className="container">
      <div className="
        title d-flex justify-content-center align-items-center gap-4"
      >
        <GoBackButton />
        <h1>Profiles Table</h1>
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

export default ProfilesTable;
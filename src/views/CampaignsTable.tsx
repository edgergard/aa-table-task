import React from 'react';
import { Table } from 'react-bootstrap';
import './style.css';
import campaignsData from '../data/CAMPAIGNS.json';
import { useParams, useSearchParams } from 'react-router-dom';
import GoBackButton from '../components/GoBackButton';
import { Campaign, CampaignSort } from '../types';
import SortButton from '../components/SortButton';
import { toDate } from '../utils/functions';

const tableHead = ['id', 'clicks', 'cost', 'date'];

function prepareCampaigns(
  campaigns: Campaign[], 
  profileId: string,
  sortType: string,
  order: string,
) {
  const preparedCampaigns = [...campaigns];
  const id = +profileId;

  const sortFunctions: Record<string, CampaignSort> = {
    id: (a, b) => a.campaignId - b.campaignId,
    clicks: (a, b) => a.clicks - b.clicks,
    cost: (a, b) => a.cost - b.cost,
    date: (a, b) => toDate(a.date) - toDate(b.date),
  };

  if (sortType && sortFunctions[sortType]) {
    preparedCampaigns.sort(sortFunctions[sortType]);
  }

  if (order === 'desc') {
    preparedCampaigns.reverse();
  }

  return preparedCampaigns.filter(campaign => campaign.profileId === id);
}

const CampaignsTable = () => {
  const [searchParams] = useSearchParams();
  const order = (searchParams.get('order') || '');
  const sort = (searchParams.get('sort') || '');

  const { profileId } = useParams();
  const campaigns = prepareCampaigns(
    campaignsData, profileId ?? '', sort, order,
  );

  return (
    <div className="container">
      <div className="
        title d-flex justify-content-center align-items-center gap-4"
      >
        <GoBackButton />
        <h1>Campaigns Table</h1>
      </div>
      
      {campaigns.length ? (
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
            {campaigns.map(({ 
              campaignId,
              clicks,
              cost,
              date
            }) => (
              <tr key={campaignId} >
                <td>{campaignId}</td>
                <td>{clicks}</td>
                <td>{`${cost} $`}</td>
                <td>{date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h2>No campaigns found</h2>
      )}
    </div>
  );
};

export default CampaignsTable;
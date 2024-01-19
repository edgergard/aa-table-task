import './Table.css';

import campaignsData from '../data/CAMPAIGNS.json';
import { Table } from 'react-bootstrap';
import { useParams, useSearchParams } from 'react-router-dom';
import { Campaign, CampaignSort, Order, Sort } from '../types';
import { checkQuery, toDate } from '../utils/functions';
import { FilterInput, FilterSelect } from '../components/filter';
import { GoBackButton, SortButton } from '../components/buttons';

const tableHead = ['id', 'clicks', 'cost', 'date'];

function prepareCampaigns(
  campaigns: Campaign[], 
  profileId: string,
  sortType: Sort,
  order: Order,
  filter: { query: string, year: string },
) {
  let preparedCampaigns = [...campaigns];
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

  if (order === Order.Desc) {
    preparedCampaigns.reverse();
  }

  if (filter.query) {
    preparedCampaigns = preparedCampaigns.filter((
      campaign => checkQuery(campaign.cost.toString(), filter.query)
    ));
  }

  if (filter.year !== 'all') {
    preparedCampaigns = preparedCampaigns.filter((
      campaign => checkQuery(campaign.date, filter.year)
    ));
  }

  return preparedCampaigns.filter(campaign => campaign.profileId === id);
}

export const CampaignsTable = () => {
  const [searchParams] = useSearchParams();
  const order = (searchParams.get('order') || '');
  const sort = (searchParams.get('sort') || '');
  const query = (searchParams.get('query') || '');
  const year = (searchParams.get('year') || '');

  const { accountId, profileId } = useParams();
  const campaigns = prepareCampaigns(
    campaignsData,
    profileId ?? '',
    sort as Sort,
    order as Order,
    { query, year }
  );

  return (
    <div className="container">
      <div className="
        title d-flex justify-content-center align-items-center gap-4"
      >
        <GoBackButton path={`/account/${accountId}`} />

        <h1>Campaigns Table</h1>
      </div>

      <div className="filter">
        <div className="filter-container">
          <h4>Cost filter</h4>
          <FilterInput
            label="Cost"
          />
        </div>


        <div className="filter-container">
          <h4>{`Date filter`}</h4>
          <FilterSelect
          />
        </div>
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
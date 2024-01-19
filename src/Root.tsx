import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import { AccountsTable, CampaignsTable, ProfilesTable } from './pages';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<AccountsTable />} />
        <Route path="/account/:accountId" element={<ProfilesTable />} />
        <Route 
          path="/account/:accountId/profile/:profileId" 
          element={<CampaignsTable />} 
        />
      </Route>
    </Routes>
  </Router>
);
import Layout from './Layout/Layout';
import FilterPanel from '../components/FilterPanel';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import RepoFetch from '../components/RepoFetch';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <RepoFetch />
        <ReactRoutes>
          <Route path="/:repoName" element={<FilterPanel />} />
        </ReactRoutes>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;

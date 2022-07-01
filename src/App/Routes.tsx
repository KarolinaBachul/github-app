import Layout from './Layout/Layout';
import FilterPanel from '../components/FilterPanel';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as ReactRoutes,
} from 'react-router-dom';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <ReactRoutes>
          <Route path="/" element={<FilterPanel />} />
        </ReactRoutes>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;

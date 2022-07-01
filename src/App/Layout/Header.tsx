import { GithubOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

const Header: React.FC = () => {
  return (
    <div className="h-1/6 p-12 leading-8">
      <Divider style={{ fontSize: 23 }}>
        GitHub Search App <GithubOutlined />
      </Divider>
    </div>
  );
};
export default Header;

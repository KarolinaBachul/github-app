import { Button, Form, Input } from 'antd';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RepoFetch: React.FC = () => {
  const navigate = useNavigate();
  let location = useLocation();

  const pathName = decodeURIComponent(location.pathname);

  const onFinish = ({ repositoryName }: any) => {
    navigate(`/${encodeURIComponent(repositoryName)}`);
  };

  return (
    <div className="w-4/5 justify-center content-center m-auto mb-8">
      <Form
        name="fetch"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ repositoryName: pathName.slice(1) }}
      >
        <div className="m-auto max-w-screen-md d-flex">
          <Form.Item
            label="Repository name"
            name="repositoryName"
            rules={[
              {
                required: true,
                message: 'Please input searched repository name!',
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>

          <div className="flex justify-end">
            <Button type="primary" style={{ color: 'black' }} htmlType="submit">
              Fetch repository
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RepoFetch;

import { Button, Form, Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RepoFetch: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = ({ repositoryName }: any) => {
    navigate(`/${encodeURIComponent(repositoryName)}`);
  };

  return (
    <div className="w-4/5 justify-center content-center m-auto mb-8">
      <Form
        name="fetch"
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
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
            <Input />
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

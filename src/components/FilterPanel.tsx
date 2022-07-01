import React from 'react';
import { Button, Form, Input, Select, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
];

const FilterPanel: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="w-4/5 justify-center content-center m-auto">
      <Form
        name="search"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <div className="m-auto max-w-screen-md d-flex">
          <Form.Item
            label="Repository name"
            name="repository name"
            rules={[
              {
                required: true,
                message: 'Please input searched repository name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Searched phrase"
            name="searched phrase"
            rules={[
              { required: true, message: 'Please input searched phrase!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Select a user">
            <AutoComplete
              options={options}
              filterOption={(inputValue, option) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>
          <Form.Item label="Select a programming language">
            <Select>
              <Option value="go">Go</Option>
              <Option value="java">Java</Option>
              <Option value="javascript">JavaScript</Option>
            </Select>
          </Form.Item>
          <div className="flex justify-end">
            <Button
              type="primary"
              style={{ color: 'black' }}
              htmlType="submit"
              icon={<SearchOutlined />}
            >
              Search in repository
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FilterPanel;

import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button, Form, Input, Select, AutoComplete, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import SearchResultTable from './SearchResultTable';

const { Option } = Select;

const FilterPanel: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [searchCodeResult, setSearchCodeResult] = useState();
  let [searchParams, setSearchParams] = useSearchParams();
  let { repoName } = useParams();

  const options = users.map((u) => ({ value: u }));

  React.useEffect(() => {
    const fetchRepo = async () => {
      const res = await fetch(
        `https://api.github.com/repos/${repoName}/contributors`
      );
      const json = (await res.json()) as
        | { login: string }[]
        | { message: string };

      if (Array.isArray(json)) {
        const usersLogin = json.map((u) => {
          return u.login;
        });
        setUsers(usersLogin);
      } else {
        message.error(json.message);
      }
    };
    fetchRepo();
  }, [repoName]);

  React.useEffect(() => {
    const searchInRepo = async () => {
      const res = await fetch(
        //@ts-ignore
        `https://api.github.com/search/code?${decodeURIComponent(searchParams)}`
      );
      const json = await res.json();
      console.log(json);
    };
    searchInRepo();
  }, [searchParams]);

  const onFinish = (values: any) => {
    const query = `q=${values.searchedPhrase}+language:${values.language}+user:${values.user}+repo:${repoName}`;
    setSearchParams(query);
  };

  console.log('render');
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <React.Fragment>
      <div className="w-4/5 justify-center content-center m-auto">
        <Form
          name="search"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <div className="m-auto max-w-screen-md d-flex">
            <Form.Item
              label="Searched phrase"
              name="searchedPhrase"
              rules={[
                { required: true, message: 'Please input searched phrase!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="user" label="Select a user">
              <AutoComplete options={options} />
            </Form.Item>
            <Form.Item name="language" label="Select a programming language">
              <Select>
                <Option value="go">Go</Option>
                <Option value="java">Java</Option>
                <Option value="js">JavaScript</Option>
                <Option value="tsx">TypeScript JSX</Option>
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
      <SearchResultTable />
    </React.Fragment>
  );
};

export default FilterPanel;

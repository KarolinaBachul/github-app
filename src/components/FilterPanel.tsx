import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { Button, Form, Input, Select, AutoComplete, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import SearchResultTable from './SearchResultTable';
import { SearchCodeResult } from './SearchResultTable';

const { Option } = Select;

const FilterPanel: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [searchCodeResults, setSearchCodeResults] = useState<
    SearchCodeResult[] | null
  >(null);
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
      let query = `q=${searchParams.get('q')}+repo:${repoName}`;
      if (searchParams.has('language')) {
        query += `+language:${searchParams.get('language')}`;
      }
      if (searchParams.has('user')) {
        query += `+user:${searchParams.get('user')}`;
      }

      const res = await fetch(
        `https://api.github.com/search/code?${decodeURIComponent(query)}`
      );
      const json = await res.json();
      if (json.items.length) {
        const data = json.items.map((r: any) => {
          return {
            fileName: r.name,
            url: r.html_url,
            description: r.description,
            ownerName: r.repository.owner.login,
            ownerAvatar: r.repository.owner.avatar_url,
          };
        });
        setSearchCodeResults(data);
      } else {
        message.error(json.message || 'Nothing found');
        setSearchCodeResults(null);
      }
    };

    if (searchParams.toString()) {
      searchInRepo();
    } else {
      setSearchCodeResults(null);
      setSearchParams('');
    }
  }, [searchParams, repoName, setSearchParams]);

  const onFinish = (values: any) => {
    let query = `q=${values.searchedPhrase}`;
    if (values.language) {
      query += `&language=${values.language}`;
    }
    if (values.user) {
      query += `&user=${values.user}`;
    }
    setSearchParams(query);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <React.Fragment>
      <div className="w-4/5 justify-center content-center m-auto">
        <Form
          name="search"
          initialValues={{
            remember: true,
            searchedPhrase: searchParams.get('q') || '',
            user: searchParams.get('user') || '',
            language: searchParams.get('language') || '',
          }}
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
              <Input allowClear />
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
      {searchCodeResults && (
        <SearchResultTable searchCodeResults={searchCodeResults} />
      )}
    </React.Fragment>
  );
};

export default FilterPanel;

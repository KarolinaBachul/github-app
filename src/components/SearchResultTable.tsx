import { Table, Divider, Button } from 'antd';
import React from 'react';

const SearchResultTable: React.FC = () => {
  const { Column } = Table;

  interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    tags: string[];
  }

  const data: DataType[] = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <div className="w-4/5 justify-center content-center m-auto">
      <Divider />
      <Table dataSource={data}>
        <Column title="File Name" dataIndex="fileName" key="fileName" />
        <Column
          title=""
          key="action"
          render={(_: any, record: DataType) => <Button>Go to file</Button>}
        />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="User name" dataIndex="userName" key="userName" />
        <Column
          title=""
          key="action"
          render={(_: any, record: DataType) => (
            <Button>Show user's avatar</Button>
          )}
        />
      </Table>
    </div>
  );
};

export default SearchResultTable;

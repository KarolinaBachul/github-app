import { Table, Divider, Button, Modal, Avatar } from 'antd';
import React, { useState } from 'react';

export type SearchCodeResult = {
  description?: undefined | string;
  fileName: string;
  url: string;
  ownerAvatar: string;
  ownerName: string;
};

type Props = {
  searchCodeResults: SearchCodeResult[];
};

const SearchResultTable: React.FC<Props> = ({ searchCodeResults }) => {
  const [avatarSource, setAvatarSource] = useState<string | null>(null);

  const { Column } = Table;

  return (
    <React.Fragment>
      {avatarSource && (
        <Modal
          title="Owner's Avatar on GitHub"
          visible={Boolean(avatarSource)}
          footer={null}
          onCancel={() => {
            setAvatarSource(null);
          }}
        >
          <Avatar size={200} style={{ marginLeft: '26%' }} src={avatarSource} />
        </Modal>
      )}
      <div className="w-4/5 justify-center content-center m-auto">
        <Divider />
        <Table
          dataSource={searchCodeResults.map((scr, i) => ({
            ...scr,
            key: scr.ownerName + i,
          }))}
          pagination={{
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
          }}
        >
          <Column title="File Name" dataIndex="fileName" key="fileName" />
          <Column
            key="action"
            render={(_: any, record: SearchCodeResult) => (
              <Button
                onClick={() => {
                  window.open(record.url);
                }}
              >
                Go to file
              </Button>
            )}
          />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
          />
          <Column title="Owner" dataIndex="ownerName" key="ownerName" />
          <Column
            key="action"
            render={(_: any, record: SearchCodeResult) => (
              <Button
                onClick={() => {
                  setAvatarSource(record.ownerAvatar);
                }}
              >
                Show owner's avatar
              </Button>
            )}
          />
        </Table>
      </div>
    </React.Fragment>
  );
};

export default SearchResultTable;

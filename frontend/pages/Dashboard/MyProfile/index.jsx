import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const MyProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title="Edit Your Profile"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
        <Button key="save" type="primary" onClick={handleOk}>Save Changes</Button>
      ]}
    >
      <div className="space-y-4">
        <Input placeholder="First Name" />
        <Input placeholder="Last Name" />
        <Input placeholder="Email" />
        <Input placeholder="Address" />
        <Input.Password placeholder="Current Password" />
        <Input.Password placeholder="New Password" />
        <Input.Password placeholder="Confirm New Password" />
      </div>
    </Modal>
  );
};

export default MyProfile;

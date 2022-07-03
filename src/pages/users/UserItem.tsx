import { Card } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from "../../models/IUser";


interface PostItemProps {
  user: IUser;
}

const UserItem: FC<PostItemProps> = ({ user }) => {

  return (
    <>
      <Card
      size="small"
      title={`${user.id}. ${user.name}`}
      extra={<Link to={`/users/${user.id}`}>Details</Link>}
      >
        User email - {user.email}
      </Card>
    </>
  );
};

export default UserItem;
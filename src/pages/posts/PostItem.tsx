import { Button, Card, Modal } from 'antd';
import React, { FC, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IPost } from "../../models/IPost";


interface PostItemProps {
  post: IPost;
  remove?: (post: IPost) => void;
  update?: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (remove) remove(post)
  }

  const handleUpdate = (event: React.MouseEvent) => {
    const title = prompt() || ""
    if (update) update({ ...post, title })
  }

  const info = () => {
    Modal.info({
      title: `Details for post id - ${post.id}.`,
      content: (
        <div>
          <p>Post title - {post.title}</p>
          <p>User id - {post.userId}</p>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <>
      <Card
      size="small"
      title={`${post.id}. ${post.title}`}
      extra={<Button onClick={info}>Details</Button>}
      actions={[
        <EditOutlined key="edit" onClick={handleUpdate} />,
        <DeleteOutlined key="delete" onClick={handleRemove} />,
      ]}
      >
        User id - {post.userId}
      </Card>
    </>
  );
};

export default PostItem;
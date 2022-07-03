import React, { useEffect, useState, useRef } from "react";
import { postAPI } from "../../services/PostService";
import { Button, Col, Row, Select, Space, Spin, Typography } from "antd";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from "./PostItem";
import { IPost } from "../../models/IPost";
const { Title, Paragraph } = Typography;
const { Option } = Select;

const PostsList = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  // const [totalCount, setTotalCount] = useState(0);
  const [postsDisplay, setPostsDisplay] = useState([]);
  const lastElement = useRef(null);
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery({limit, page});

  const [createPost, {}] = postAPI.useCreatePostMutation();
  const [updatePost, {}] = postAPI.useUpdatePostMutation();
  const [deletePost, {}] = postAPI.useDeletePostMutation();

  useEffect(() => {
    if(posts?.length) {
      setPostsDisplay([...postsDisplay, ...posts as []]);
    }
  }, [posts]);

  const handleCreate = async () => {
    const title = prompt();
    await createPost({ title, body: title, userId: 1 } as IPost);
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  const handleLimit = (value: string) => {
    setLimit(Number(value));
  };

  return (
    <div>
      <Row justify="center">
        <Typography>
          <Title level={2}>Posts List</Title>
          <Paragraph>Redux toolkit query; Redux toolkit; Infinity scroll; faked API (JSONPlacholder)</Paragraph>
        </Typography>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <Button onClick={handleCreate}>Add new post</Button>
          <Button onClick={() => refetch()}>Refetch</Button>
          <Select placeholder="Select items per page" style={{ width: '12rem' }} onChange={handleLimit}>
            <Option value="10">10</Option>
            <Option value="20">20</Option>
            <Option value="100">100</Option>
          </Select>
          {isLoading && <Spin />}
          {error && <h1>{JSON.stringify(error)}</h1>}
          <Space direction="vertical" size="small" style={{ display: 'flex', margin: '1rem 0' }}>
            <TransitionGroup>
              {posts &&
                posts.map((post) => (
                  <CSSTransition
                    key={post.id}
                    timeout={500}
                    classNames="postAnimation"
                  >
                    <PostItem
                      remove={handleRemove}
                      update={handleUpdate}
                      post={post}
                    />
                  </CSSTransition>
                ))
              }
            </TransitionGroup>
            <div ref={lastElement} style={{height: '20px'}} />
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default PostsList;

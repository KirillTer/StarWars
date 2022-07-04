import React, { useEffect, useState, useRef, MutableRefObject } from "react";
import { postAPI } from "../../services/PostService";
import { Button, Col, Row, Select, Space, Spin, Typography } from "antd";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostItem from "./PostItem";
import { IPost } from "../../models/IPost";
const { Title, Paragraph } = Typography;
const { Option } = Select;

const PostsList = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [postsDisplay, setPostsDisplay] = useState([]);
  const lastElement = useRef();
  const observer = useRef();
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
    if(isLoading) return;
    if(observer.current) (observer.current as IntersectionObserver).disconnect();
    const callback = function(entries: any) {
      if(entries[0].isIntersecting) {
        setPage(page + 1);
      }
    }
    observer.current = new IntersectionObserver(callback) as any;
    (observer.current as unknown as IntersectionObserver).observe(lastElement.current as unknown as Element);
  }, [postsDisplay]);

  useEffect(() => {
    if(posts?.length) {
      setPostsDisplay([...postsDisplay, ...posts as []]);
    }
  }, [posts]);

  useEffect(() => {
    refetch();
  }, [page]);

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
    setPage(1);
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
              {postsDisplay &&
                postsDisplay.map((post: IPost) => (
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
            <div ref={lastElement as any} style={{height: '20px'}} />
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default PostsList;

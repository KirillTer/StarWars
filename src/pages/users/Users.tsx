import React, { useEffect, useState } from "react";
import { fetchUsers } from '../../store/reducers/ActionCreators';
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Button, Col, Pagination, Row, Space, Spin, Typography } from "antd";
import UserItem from "./UserItem";
const { Title, Paragraph } = Typography;

const UsersList = () => {
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { resp, isLoading, error } = useAppSelector(state => state.usersReducer);
  
  useEffect(() => {
    dispatch(fetchUsers({limit, page}));
  }, [page]);

  useEffect(() => {
    setTotalCount(() => resp.headers['x-total-count']);
  }, [resp]);

  return (
    <div>
      <Row justify="center">
        <Typography>
          <Title level={2}>Users List</Title>
          <Paragraph>Redux toolkit; Plain Redux commented; Common pagination; Real API (JSONPlacholder)</Paragraph>
        </Typography>
      </Row>
      <Row style={{ marginBottom: '5rem' }}>
        <Col span={12} offset={6}>
          <Button onClick={() => dispatch(fetchUsers({limit, page}))}>Refetch</Button>
          {isLoading && <Spin />}
          {error && <h1>{error}</h1>}
          <Space direction="vertical" size="small" style={{ display: 'flex', margin: '1rem 0' }}>
            {resp.data &&
              resp.data.map((user) => (
                <UserItem
                  key={user.id}
                  user={user}
                />
              ))
            }
          </Space>
          <Pagination current={page} total={totalCount} onChange={(page, _) => setPage(page)} pageSize={limit}/>
        </Col>
      </Row>
    </div>
  );
};

export default UsersList;

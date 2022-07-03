import { Card, Col, Row, Spin, Typography } from 'antd';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserById } from '../../store/reducers/ActionCreators';
const { Title, Paragraph } = Typography;

function UserDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(fetchUserById(Number(id)));
  }, [dispatch]);

  return ( 
    <>
      <Row justify="center">
        <Typography>
          <Title level={2}>User Details</Title>
        </Typography>
      </Row>
      {isLoading && <Spin />}
      {error && <h1>{error}</h1>}
      <Col span={6} offset={9}>
        <Card
        size="small"
        title={`${user.id}. ${user.name}`}
        >
          User email - {user.email}
        </Card>
      </Col>
    </>
  );
}

export default UserDetails;
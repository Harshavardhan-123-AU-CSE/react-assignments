import React, { useEffect, useState } from 'react';
import { Layout, Input, Row, Col, Card, Modal, Button, Spin } from 'antd';
import axios from 'axios';
import './App.css';

const { Header, Content } = Layout;
const { Search } = Input;

function App() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
      setUsers(res.data);
      setFiltered(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    })
  }, []);

  const onSearch = (value) => {
    const q = value.toLowerCase();
    setFiltered(users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)));
  }

  const openModal = (user) => {
    setSelected(user);
    setIsModalOpen(true);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: '#fff', fontSize: 18 }}>Advanced React Assignment — Ant Design</Header>
      <Content style={{ padding: '24px' }}>
        <div className="search-bar">
          <Search placeholder="Search by name, username or email" onSearch={onSearch} enterButton loading={loading} allowClear />
        </div>
        {loading ? (
          <div className="spin-wrap"><Spin size="large" /></div>
        ) : (
          <Row gutter={[16,16]} style={{ marginTop: 16 }}>
            {filtered.map(user => (
              <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
                <Card hoverable onClick={() => openModal(user)} cover={<img alt={user.username} src={`https://avatars.dicebear.com/v2/avataaars/${encodeURIComponent(user.username)}.svg?options[mood][]=happy`} />}>
                  <Card.Meta title={user.name} description={<div><div>@{user.username}</div><div>{user.company.name}</div></div>} />
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <Modal title={selected?.name} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>Close</Button>
        ]}>
          {selected && (
            <div>
              <p><strong>Username:</strong> {selected.username}</p>
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Phone:</strong> {selected.phone}</p>
              <p><strong>Website:</strong> {selected.website}</p>
              <p><strong>Company:</strong> {selected.company.name}</p>
              <p><strong>Address:</strong> {selected.address.street}, {selected.address.suite}, {selected.address.city} - {selected.address.zipcode}</p>
            </div>
          )}
        </Modal>
      </Content>
    </Layout>
  )
}

export default App;

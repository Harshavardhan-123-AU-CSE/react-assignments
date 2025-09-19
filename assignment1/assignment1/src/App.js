import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './components/UserCard';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return (
      <div className="d-flex vh-100 align-items-center justify-content-center">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div><div className="sk-chase-dot"></div><div className="sk-chase-dot"></div><div className="sk-chase-dot"></div><div className="sk-chase-dot"></div><div className="sk-chase-dot"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Users Directory — Basic Assignment</h1>
      <div className="row">
        {users.map(user => (
          <div className="col-md-6 mb-4" key={user.id}>
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;

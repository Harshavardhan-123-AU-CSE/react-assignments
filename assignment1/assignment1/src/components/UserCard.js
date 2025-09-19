import React from 'react';

const UserCard = ({ user }) => {
  const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${encodeURIComponent(user.username)}.svg?options[mood][]=happy`;
  const address = `${user.address.street}, ${user.address.suite}, ${user.address.city} - ${user.address.zipcode}`;

  return (
    <div className="card h-100">
      <div className="row g-0 align-items-center">
        <div className="col-4 text-center p-3">
          <img src={avatarUrl} alt={user.username} className="img-fluid rounded-circle" />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text"><small className="text-muted">@{user.username}</small></p>
            <p className="mb-1"><strong>Email:</strong> {user.email}</p>
            <p className="mb-1"><strong>Phone:</strong> {user.phone}</p>
            <p className="mb-1"><strong>Website:</strong> {user.website}</p>
            <p className="mb-0"><strong>Company:</strong> {user.company.name}</p>
            <p className="mt-2"><small className="text-muted">{address}</small></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;

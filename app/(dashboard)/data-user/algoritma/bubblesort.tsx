// components/BubbleSortComponent.tsx

import React, { useState, useEffect } from 'react';

interface UserData {
  users: {
    id_user: number;
    username: string;
    firstname: string;
    role: string;
    status: string;
    Status_perkawinan: string;
    NoHP: string;
    Nisn: string;
    email: string;
    Tempat_tinggal: string;
    price: number;
  }[];
}

interface BubbleSortProps {
  userData?: UserData;
}

const BubbleSortComponent: React.FC<BubbleSortProps> = ({ userData = { users: [] } }) => {
  const [originalUsers, setOriginalUsers] = useState<UserData['users']>(userData.users);
  const [users, setUsers] = useState<UserData['users']>(userData.users);

  const bubbleSort = () => {
    const newUsers = [...users];

    for (let i = 0; i < newUsers.length - 1; i++) {
      for (let j = 0; j < newUsers.length - 1 - i; j++) {
        if (newUsers[j].username > newUsers[j + 1].username) {
          // Swap elements if they are in the wrong order
          const temp = newUsers[j];
          newUsers[j] = newUsers[j + 1];
          newUsers[j + 1] = temp;
        }
      }
    }

    setUsers(newUsers);
  };

  useEffect(() => {
    // Example of fetching data from a localhost API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/GetAllUsers'); // Adjust the API endpoint accordingly
        const data: UserData = await response.json();
        setOriginalUsers(data?.users || []); // Set the original data
        setUsers(data?.users || []); // Set the current data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount

  return (
    <div>
      <h2>Bubble Sort</h2>
      <div>
        <strong>Original Usernames:</strong>
        <ul>
          {originalUsers.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={bubbleSort}>Sort by Username</button>
      </div>
      <div>
        <strong>Sorted Usernames:</strong>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BubbleSortComponent;

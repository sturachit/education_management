import React, { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard';
import { Grid } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalAnnouncements, setTotalAnnouncements] = useState(0);

  useEffect(() => {
    // Fetch students count
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setTotalStudents(response.data.length))
      .catch(error => console.error('Error fetching students:', error));

    // Fetch teachers count (same fake API call as students)
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setTotalTeachers(response.data.length))
      .catch(error => console.error('Error fetching teachers:', error));

    // Fetch courses count
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setTotalCourses(response.data.length))
      .catch(error => console.error('Error fetching courses:', error));

    // Fetch announcements count (simulated with posts API)
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => setTotalAnnouncements(response.data.length))
      .catch(error => console.error('Error fetching announcements:', error));
  }, []);

  const cardsData = [
    { title: 'Total Students', count: totalStudents },
    { title: 'Total Teachers', count: totalTeachers },
    { title: 'Total Courses', count: totalCourses },
    { title: 'Announcements', count: totalAnnouncements }
  ];

  return (
    <Grid container spacing={2}>
      {cardsData.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <DashboardCard title={card.title} count={card.count} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;

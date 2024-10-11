import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const Timetable = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [dayFilter, setDayFilter] = useState('All');
  
  // Fake days array
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  useEffect(() => {
    // Fetch timetable data from a fake API or mock it locally
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const mappedData = response.data.map(item => ({
          id: item.id,
          subject: item.title,
          time: '09:00 - 10:00',  // Static time for example
          day: days[item.id % 5]   // Assign days dynamically based on id for the demo
        }));
        setTimetableData(mappedData);
      })
      .catch(error => console.error('Error fetching timetable data:', error));
  }, []);

  const handleDayChange = (event) => {
    setDayFilter(event.target.value);
  };

  const filteredTimetable = dayFilter === 'All'
    ? timetableData
    : timetableData.filter(item => item.day === dayFilter);

  return (
    <div>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="day-select-label">Filter by Day</InputLabel>
        <Select
          labelId="day-select-label"
          id="day-select"
          value={dayFilter}
          label="Filter by Day"
          onChange={handleDayChange}
        >
          <MenuItem value="All">All Days</MenuItem>
          {days.map(day => (
            <MenuItem key={day} value={day}>{day}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Day</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTimetable.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.subject}
                </TableCell>
                <TableCell align="center">{row.time}</TableCell>
                <TableCell align="center">{row.day}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Timetable;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Container, Form, Button, Table } from 'react-bootstrap';

function App() {
  const [stations, setStations] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trains, setTrains] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      const response = await fetch('http://localhost:5000/api/stations');
      const data = await response.json();
      setStations(data);
    };

    fetchStations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearched(false);

    const response = await fetch(
      `http://localhost:5000/api/trains?source=${source}&destination=${destination}`
    );
    const data = await response.json();

    setTrains(data);
    setSearched(true);
  };

  return (
    <div className="App" style={{ marginTop: '20px', backgroundSize: 'cover' }}>
      <Container className="app-container">
        <h1 className="text-center my-5">Train Search Application</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="source">
            <Form.Label>Source:</Form.Label>
            <Form.Control
              as="select"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            >
              <option value="">Select source station</option>
              {stations.map((station) => (
                <option key={station.station} value={station.station}>
                  {station.station}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="destination">
            <Form.Label>Destination:</Form.Label>
            <Form.Control
              as="select"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            >
              <option value="">Select destination station</option>
              {stations.map((station) => (
                <option key={station.station} value={station.station}>
                  {station.station}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <br></br>

          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
        {searched && (
          <div className="results my-5">
            {trains.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Train Name</th>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                    <th>Distance</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {trains.map((train, index) => (
                    <tr key={index}>
                      <td>{train.trainName}</td>
                      <td>{train.departureTime}</td>
                      <td>{train.arrivalTime}</td>
                      <td>{train.distance} Kms</td>
                      <td>Rs {train.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <h4 className="text-center">No trains available for the selected route</h4>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
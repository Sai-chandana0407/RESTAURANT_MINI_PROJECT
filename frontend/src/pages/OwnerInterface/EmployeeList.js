import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import { Card, Button, Form } from "react-bootstrap";
import "./EmployeeList.css"; // Importing the CSS file

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setEmployees([
      { id: "EMP001", name: "John Doe" },
      { id: "EMP002", name: "Jane Smith" },
      { id: "EMP003", name: "Alice Johnson" },
    ]);
  }, []);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main">
      <div className="container mt-4">
        <h4>EMPLOYEE DATA</h4>

        {/* Search Form */}
        <Form.Group className="form-group">
          <Form.Label>SEARCH:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>

        {/* Employee Cards */}
        <div className="employee-list">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="employee-card shadow">
              <div className="d-flex align-items-center w-100">
                {/* Avatar */}
                <div className="avatar">
                  <i className="bi bi-person"></i>
                </div>

                {/* Employee Info */}
                <div className="employee-info flex-grow-1">
                  <h5>ID-NO: {employee.id}</h5>
                  <p>{employee.name}</p>
                </div>

                {/* Open Button */}
                <div>
                  <Button className="open-button">OPEN</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
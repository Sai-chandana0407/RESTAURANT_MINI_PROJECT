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
      { 
        id: "EMP001", 
        name: "John Doe",
        position: "Senior Chef",
        email: "john.doe@homelybites.com",
        education: "Culinary Arts Degree",
        training: "Advanced Cooking Techniques",
        experience: "5 years in fine dining",
        expertise: "Italian and French Cuisine",
        passion: "Creating innovative dishes",
        hobbies: "Food photography, Travel",
        contact: "+1 234-567-8900"
      },
      { 
        id: "EMP002", 
        name: "Jane Smith",
        position: "Head Waiter",
        email: "jane.smith@homelybites.com",
        education: "Hospitality Management",
        training: "Customer Service Excellence",
        experience: "4 years in luxury dining",
        expertise: "Wine Pairing",
        passion: "Creating memorable dining experiences",
        hobbies: "Wine tasting, Photography",
        contact: "+1 234-567-8901"
      },
      { 
        id: "EMP003", 
        name: "Alice Johnson",
        position: "Sous Chef",
        email: "alice.johnson@homelybites.com",
        education: "Culinary Institute Graduate",
        training: "Modern Cooking Techniques",
        experience: "3 years in fine dining",
        expertise: "Asian Fusion Cuisine",
        passion: "Sustainable cooking",
        hobbies: "Gardening, Food blogging",
        contact: "+1 234-567-8902"
      }
    ]);
  }, []);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEmployeeClick = (employee) => {
    navigate('/profile', { state: { employee } });
  };

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
            <Card 
              key={employee.id} 
              className="employee-card shadow"
              onClick={() => handleEmployeeClick(employee)}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center w-100">
                {/* Avatar */}
                <div className="avatar">
                  <i className="bi bi-person"></i>
                </div>

                {/* Employee Info */}
                <div className="employee-info flex-grow-1">
                  <h5>ID-NO: {employee.id}</h5>
                  <p>{employee.name}</p>
                  <p className="position">{employee.position}</p>
                </div>

                {/* Open Button */}
                <div>
                  <Button 
                    className="open-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEmployeeClick(employee);
                    }}
                  >
                    VIEW PROFILE
                  </Button>
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
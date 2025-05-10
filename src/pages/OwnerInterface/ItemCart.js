import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ItemCart.css"; // Ensure styles are correctly linked

const items = [
  { name: "IDLI", description: "Description" },
  { name: "DOSA", description: "Description" },
  { name: "POHA", description: "Description" },
  { name: "BOYAA", description: "Description" },
  { name: "PESARATTU", description: "Description" },
  { name: "HYDERABADI BIRYANI", description: "Description" },
  { name: "GONGURA MUTTON", description: "Description" },
  { name: "PANEER BIRYANI", description: "Description" },
  { name: "BIRIYANI KEBABS", description: "Description" },
  { name: "EXTRA RICE & DAL FRY", description: "Description" },
  { name: "RAJMA CHAWAL", description: "Description" },
  { name: "MALAI TIKK", description: "Description" },
];

const ItemCart = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="item-cart-container">
      {/* Heading Section */}
      <div className="heading-container">
        <h2 className="text-center text-light">TODAY'S AVAILABLE ITEMS LIST</h2>
      </div>

      {/* Items Section */}
      <Row className="justify-content-center items-container">
        {items.map((item, index) => (
          <Col xs={12} sm={6} md={4} lg={4} key={index} className="mb-4">
            <Card className="item-card">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title className="item-title">{item.name}</Card.Title>
                  <Card.Text className="item-desc">{item.description}</Card.Text>
                </div>
                <label className="toggle-switch">
                <input type="checkbox" id={`switch-${index}`} />

                  <span className="slider"></span>
                </label>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemCart;
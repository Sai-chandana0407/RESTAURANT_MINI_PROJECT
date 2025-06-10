import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const tableData = [
  {
    id: 1,
    image: 'Table1.jpg',
    price: 1500,
    width: '100%',
    height: '200px',
  },
  {
    id: 2,
    image: 'Table2.jpg',
    price: 1200,
    width: '100%',
    height: '200px',
  },
  {
    id: 3,
    image: 'Table3.webp',
    price: 1800,
    width: '100%',
    height: '200px',
  },
  {
    id: 4,
    image: 'Table4.webp',
    price: 1800,
    width: '100%',
    height: '200px',
  },
  {
    id: 5,
    image: 'Table5.webp',
    price: 1800,
    width: '100%',
    height: '200px',
  },
  {
    id: 6,
    image: 'Table6.jpg',
    price: 1800,
    width: '100%',
    height: '200px',
  },
];

function ReserveTable() {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState(null);

  const handleBookNow = (table) => {
    setSelectedTable(table);
    // Store the table price in localStorage to be used in OrderSummary
    localStorage.setItem('tablePrice', table.price);
    // Navigate to order summary with the table price
    navigate('/orderSummary', { state: { tablePrice: table.price } });
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-5 fw-bold" style={{ color: '#ffffff' }}>RESERVE YOUR TABLE</h2>
      <div className="row">
        {tableData.map((table) => (
          <div className="col-md-4 mb-4" key={table.id}>
            <div className="card h-100 shadow">
              <img
                src={`/img/${table.image}`}
                alt={`Table ${table.id}`}
                style={{
                  width: table.width,
                  height: table.height,
                  objectFit: 'cover',
                  borderTopLeftRadius: '0.375rem',
                  borderTopRightRadius: '0.375rem',
                }}
              />
              <div className="card-body text-center">
                <h5 className="card-title" style={{ color: '#000' }}>PRICE TAG: Rs. {table.price}</h5>
                <button 
                  className="btn btn-warning fw-bold"
                  onClick={() => handleBookNow(table)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReserveTable;

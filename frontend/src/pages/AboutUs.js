import React, { useState } from 'react';
import { FaUtensils, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutUs.css';

function AboutUs() {
  const [activeTab, setActiveTab] = useState('story');

  const tabs = [
    { id: 'story', label: 'Our Story' },
    { id: 'mission', label: 'Our Mission' },
    { id: 'team', label: 'Our Team' }
  ];

  const content = {
    story: {
      title: 'Our Humble Beginnings',
      description: 'Founded in 2010, our restaurant started as a small family-owned business with a passion for authentic cuisine. Over the years, we\'ve grown into a beloved establishment known for our commitment to quality and exceptional dining experience.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    mission: {
      title: 'Our Commitment to Excellence',
      description: 'We are dedicated to providing our guests with an unforgettable dining experience. Our mission is to serve delicious, high-quality food made from the finest ingredients, while maintaining a warm and welcoming atmosphere.',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    team: {
      title: 'Meet Our Team',
      description: 'Our team consists of passionate professionals who are committed to delivering exceptional service. From our skilled chefs to our friendly waitstaff, everyone plays a crucial role in creating memorable dining experiences.',
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    }
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>About Homely Bites</h1>
          <p>Discover the story behind our passion for food</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Tabs Navigation */}
        <div className="tabs-container">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img 
                src={content[activeTab].image} 
                alt={content[activeTab].title}
                className="content-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/600x400?text=Restaurant+Image";
                }}
              />
            </div>
            <div className="col-md-6">
              <h2>{content[activeTab].title}</h2>
              <p>{content[activeTab].description}</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card">
                <FaUtensils className="feature-icon" />
                <h3>Authentic Cuisine</h3>
                <p>Experience the true taste of traditional recipes passed down through generations.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <FaClock className="feature-icon" />
                <h3>Open 7 Days</h3>
                <p>We're here to serve you delicious meals every day of the week.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <FaMapMarkerAlt className="feature-icon" />
                <h3>Convenient Location</h3>
                <p>Located in the heart of the city, easily accessible to all.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h2>Get in Touch</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="contact-info">
                <FaPhone className="contact-icon" />
                <h3>Phone</h3>
                <p>+1 234 567 8900</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-info">
                <FaEnvelope className="contact-icon" />
                <h3>Email</h3>
                <p>restauranthomelybites@gmail.com</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-info">
                <FaMapMarkerAlt className="contact-icon" />
                <h3>Address</h3>
                <p>123 Restaurant Street, Food City, 123456</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

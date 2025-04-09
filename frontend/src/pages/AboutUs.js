import react from 'react';
function AboutUs ()
{
  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      background: "url('/img/aboutimg.jpg') no-repeat center center fixed",
      backgroundSize: "cover",
      color: "white",
      margin: 0,
      padding: 0,
    },
    navbar: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: "10px 20px",
    },
    logo: {
      height: "40px",
      width: "40px",
      borderRadius: "50%", // Makes logo circular
      objectFit: "cover",
      marginRight: "10px",
    },
    aboutSection: {
      textAlign: "center",
      padding: "50px 20px",
      margin: "20px",
      borderRadius: "10px",
      height: "100vh",
    },
    aboutTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    aboutText: {
      fontSize: "25px",
      maxWidth: "900px",
      margin: "0 auto",
    },
    offerTitle: {
      fontSize: "22px",
      fontWeight: "bold",
      margin: "20px 0",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      margin: "20px 0",
    },
    button: {
      fontWeight: "bold",
      padding: "10px 20px",
    },
    missionSection: {
      marginTop: "30px",
      fontSize: "25px",
      maxWidth: "900px",
      margin: "0 auto",
    },
  };

  return (
    <div style={styles.body}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={styles.navbar}>
        <a className="navbar-brand" href="#">
          <img src={'/img/logoimg.jpg'} alt="Logo" style={styles.logo} /> {/* Circular Logo */}
          Homely Bites
        </a>
      </nav>

      {/* About Section */}
      <div style={styles.aboutSection}>
        <h2 style={styles.aboutTitle}>ABOUT US</h2>
        <p style={styles.aboutText}>
          <strong>At Homely Bites</strong>, we believe that great food deserves a great experience.
          Whether you're dining in or reserving a table for a special occasion, we make it effortless.
          Our platform connects you with the best restaurant, allowing you to explore menus, read reviews,
          and book your table in advance—all in one place.
        </p>

        <h3 style={styles.offerTitle}>WHAT WE OFFER!!!</h3>

        {/* Buttons */}
        <div style={styles.buttonGroup}>
          <button className="btn btn-warning" style={styles.button}>Digital Menus</button>
          <button className="btn btn-warning" style={styles.button}>Reviews & Ratings</button>
          <button className="btn btn-warning" style={styles.button}>Table Reservations</button>
        </div>

        {/* Mission Section */}
        <div style={styles.missionSection}>
          <p><em><strong>Our Mission</strong></em></p>
          <p>
            We are dedicated to enhancing your dining experience by simplifying reservations.
            Whether you're planning a casual outing or a formal dinner,
            <strong> Homely Bites</strong> ensures a smooth and delightful experience from start to finish.
          </p>
          <p><em>Discover, reserve, and enjoy – all at your fingertips! 🍽️</em></p>
        </div>
      </div>
    </div>
  );
}
export default AboutUs;

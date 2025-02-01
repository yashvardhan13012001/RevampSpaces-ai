import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import InpaintingPage from "./pages/inpaintingpage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="home-wrapper">
          <header className="navbarhome">
            <h1>RevampSpaces</h1>
            <div className="navbar-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="#about" className="nav-link">About Us</Link>
              <Link to="#contact" className="nav-link">Contact Us</Link>
              <Link to="/login" className="nav-link">Login</Link>
            </div>
          </header>
          <HomePage />
        </div>
      } />
      <Route path="/main" element={<MainPage />} />
      <Route path="/inpainting" element={<InpaintingPage />} />
    </Routes>
  );
}

function HomePage() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <header className="hero" style={{ backgroundImage: 'url(/images/backimg2.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-content">
          <div className="hero-card">
            <h1>Revamp Your Space with AI</h1>
            <p>Transform your interiors effortlessly with AI-powered design tools.</p>
            <Link to="/main" className="cta-button">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose RevampSpaces?</h2>
        <div className="card-container">
          <div className="card">
            <h3>AI-Powered Precision</h3>
            <p>Get stunning, AI-generated interior designs tailored to your taste.</p>
          </div>
          <div className="card">
            <h3>Quick & Easy</h3>
            <p>Transform your space in just a few clicks—no design skills needed!</p>
          </div>
          <div className="card">
            <h3>Budget-Friendly</h3>
            <p>Explore design solutions that fit within your budget effortlessly.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>Our AI-driven platform helps you create stunning interior designs with ease.</p>
      </section>

      <section class="gallery">
        <h2> Our Generated Images</h2>
         <div class="gallery-container">
           <div class="gallery-track">
            <img src="/images/image1.png" alt="Gallery Image 1"/>
            <img src="/images/image2.png" alt="Gallery Image 2"/>
            <img src="/images/image3.png" alt="Gallery Image 3"/>
            <img src="/images/image4.png" alt="Gallery Image 4"/>
            <img src="/images/image5.png" alt="Gallery Image 5"/>
            <img src="/images/image1.png" alt="Gallery Image 1"/>
            <img src="/images/image2.png" alt="Gallery Image 2"/>
            <img src="/images/image3.png" alt="Gallery Image 3"/>
            <img src="/images/image4.png" alt="Gallery Image 4"/>
            <img src="/images/image5.png" alt="Gallery Image 5"/>
           </div>
         </div>
      </section>

      <section class="gallery2">
         <div class="gallery-container2">
           <div class="gallery-track2">
           <img src="/images/image6.png" alt="Gallery Image 1"/> 
            <img src="/images/image7.png" alt="Gallery Image 2"/>
            <img src="/images/image8.png" alt="Gallery Image 3"/>
            <img src="/images/image9.png" alt="Gallery Image 4"/>
            <img src="/images/image10.png" alt="Gallery Image 5"/>
            <img src="/images/image11.png" alt="Gallery Image 5"/>
            <img src="/images/image12.png" alt="Gallery Image 5"/>
            <img src="/images/image6.png" alt="Gallery Image 1"/> 
            <img src="/images/image7.png" alt="Gallery Image 2"/>
            <img src="/images/image8.png" alt="Gallery Image 3"/>
            <img src="/images/image9.png" alt="Gallery Image 4"/>
            <img src="/images/image10.png" alt="Gallery Image 5"/>
            <img src="/images/image11.png" alt="Gallery Image 5"/>
            <img src="/images/image12.png" alt="Gallery Image 5"/>
           </div>
         </div>
      </section>


      {/* Types of Images We Work With Section */}
      <section className="image-types">
        <h2>Types of Images We Work With</h2>
        <div className="image-grid">
          {/* First Image Card */}
          <div className="image-card">
            <div className="hover-image">
              <img src="/images/livingroom1.jpg" alt="Simple Room Before" className="before" />
              <img src="/images/livingroom.png" alt="Simple Room After" className="after" />
            </div>
            <div className="card-content">
              <h3>Turn Simple Room into a Design</h3>
              <p>This is the description for the first card. The image and text are placed in an alternating layout.</p>
            </div>
          </div>

          {/* Second Image Card */}
          <div className="image-card">
            <div className="hover-image">
              <img src="/images/bathroom.jpg" alt="Sketch Before" className="before" />
              <img src="/images/bathroom1.png" alt="Sketch After" className="after" />
            </div>
            <div className="card-content">
              <h3>Turn a Simple Sketch into a Design</h3>
              <p>This is the description for the second card. The image and text are placed in an alternating layout.</p>
            </div>
          </div>

          {/* Third Image Card */}
          <div className="image-card">
            <div className="hover-image">
              <img src="/images/tvpanel1.png" alt="3D Model Before" className="before" />
              <img src="/images/tvpanel.png" alt="3D Model After" className="after" />
            </div>
            <div className="card-content">
              <h3>Turn a Simple 3D Model into a Design</h3>
              <p>This is the description for the third card. The image and text are placed in an alternating layout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Do It Yourself */}
      <div className="how-it-works">
        <h2>Do It Yourself</h2>
        <div className="card-container">
          <div className="card">
            <h3>Step 1: Upload Your Room</h3>
            <p>Simply upload a picture of your room, and we’ll take care of the rest!</p>
            <img src="/images/uploadicon.png" alt="Simple Room Before" className="before" />
          </div>
          <div className="card">
            <h3>Step 2: Select Your Style</h3>
            <p>Choose your favorite interior design style and let us create the perfect look for you.</p>
            <img src="/images/styles.png" alt="Simple Room Before" className="before" />
            <img src="/images/rooms.png" alt="Simple Room Before" className="after" />
          </div>
          <div className="card">
            <h3>Step 3: Receive Your Design</h3>
            <p>Get your personalized design suggestions, ready to transform your space!</p>
            <img src="/images/bedroom.png" alt="Simple Room Before" className="after1" />
          </div>
        </div>
      </div>

      {/* <section className="how-it-works">
        <h2>Do It Yourself</h2>
          <div className="how-it-works-card-container">
            <div className="how-it-works-card">
               <h3>Step 1: Upload Your Room</h3>
                <p>Simply upload a picture of your room, and we’ll take care of the rest!</p>
               <img src="/images/uploadicon.png" alt="Simple Room Before" className="before" />
            </div>
            <div className="how-it-works-card">
              <h3>Step 2: Select Your Style</h3>
              <p>Choose your favorite interior design style and let us create the perfect look for you.</p>
              <img src="/images/styles.png" alt="Simple Room Before" className="before" />
            </div>
            <div className="how-it-works-card">
              <h3>Step 3: Receive Your Design</h3>
              <p>Get your personalized design suggestions, ready to transform your space!</p>
              <img src="/images/bedroom.png" alt="Simple Room Before" className="before" />
            </div>
          </div>
      </section> */}


      {/* Features Section */}
      <section className="features">
        <h2>Explore Our Tools</h2>
        <div className="card-container">
          <Link to="/main" className="card">
            <h3>Text to Image</h3>
            <p>Generate interior designs from text prompts.</p>
          </Link>
          <Link to="/inpainting" className="card">
            <h3>Inpainting</h3>
            <p>Edit and enhance existing interior images.</p>
          </Link>
        </div>
      </section>

      {/* Upcoming Tools Section */}
      <section className="upcoming-tools">
        <h2>Upcoming Tools</h2>
        <div className="card-container">
          <div className="card">
            <h3>Floor Planner to 3D</h3>
            <p>Generate floor plans from text or images.</p>
            <img src="/images/floorplan.jpg" alt="Floor Planner to 3D" className="card-image" />
          </div>
          <div className="card">
            <h3>3D Room Visualization</h3>
            <p>View your designs in a 3D environment.</p>
            <img src="image1.jpg" alt="Floor Planner to 3D" className="card-image" />
          </div>
          <div className="card">
            <h3>Custom Designs</h3>
            <p>Personalized interior AI models for designers to ease their workload.</p>
            <img src="image1.jpg" alt="Floor Planner to 3D" className="card-image" />
          </div>
          <div className="card">
            <h3>Furniture selection</h3>
            <p>Use products available in you nearby shops in you image to understand if it looks good or not and buy them</p>
            <img src="image1.jpg" alt="Floor Planner to 3D" className="card-image" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <h2>Pricing</h2>
        <div className="price-card">
          <h3>Basic</h3>
          <p>Free</p>
          <p>Get basic AI-generated designs.</p>
        </div>
        <div className="price-card">
          <h3>Pro</h3>
          <p>$19.99/month</p>
          <p>Advanced designs with customization.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>How does it work?</h3>
          <p>Upload a photo, select a style, and receive a design.</p>
        </div>
        <div className="faq-item">
          <h3>Is it free to use?</h3>
          <p>We offer a free basic version and a paid pro plan.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Email: support@revampspaces.com</p>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2025 RevampSpaces | AI-Powered Interior Design</p>
      </footer>
    </div>
  );
}

export default App;

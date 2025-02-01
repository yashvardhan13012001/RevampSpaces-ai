// import React, { useState, useEffect, useCallback } from "react";
// import PropTypes from "prop-types"; // Optional: For prop type checking
// import "./Carousel.css";

// const Carousel = ({ data, title, onSelect, autoPlay = false, autoPlayTime = 3000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
//   }, [data]);

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
//   };

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   const handleItemClick = (index) => {
//     if (onSelect && typeof onSelect === "function") {
//       onSelect(data[index]);
//     }
//   };

//   useEffect(() => {
//     let interval;
//     if (autoPlay) {
//       interval = setInterval(handleNext, autoPlayTime);
//     }
//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, [autoPlay, autoPlayTime, handleNext]);

//   const getVisibleItems = () => {
//     const items = [];
//     for (let i = 0; i < 3; i++) {
//       const index = (currentIndex + i) % data.length;
//       items.push(data[index]);
//     }
//     return items;
//   };

//   return (
//     <div className="carousel">
//       <h3>{title}</h3>
//       <div className="carousel-container">
//         <button onClick={handlePrev} className="carousel-button prev" aria-label="Previous Slide">
//           &#10094;
//         </button>

//         <div className="carousel-items">
//           {getVisibleItems().map((item, index) => (
//             <div 
//               key={item.id} 
//               className="carousel-item" 
//               onClick={() => handleItemClick((currentIndex + index) % data.length)}
//               role="button" 
//               tabIndex={0} 
//               onKeyPress={(e) => { if (e.key === 'Enter') handleItemClick((currentIndex + index) % data.length); }}
//             >
//               <h4>{item.label}</h4>
//               {/* <p><strong>Positive Prompt:</strong> {item.positivePrompt}</p>
//               <p><strong>Negative Prompt:</strong> {item.negativePrompt}</p> */}
//             </div>
//           ))}
//         </div>

//         <button onClick={handleNext} className="carousel-button next" aria-label="Next Slide">
//           &#10095;
//         </button>
//       </div>

//       <div className="carousel-indicators">
//         {data.map((item, index) => (
//           <span
//             key={item.id}
//             className={`indicator ${index === currentIndex ? "active" : ""}`}
//             onClick={() => goToSlide(index)}
//             role="button"
//             tabIndex={0}
//             onKeyPress={(e) => { if (e.key === 'Enter') goToSlide(index); }}
//             aria-label={`Go to slide ${index + 1}`}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// Carousel.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       label: PropTypes.string.isRequired,
//       positivePrompt: PropTypes.string.isRequired,
//       negativePrompt: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   title: PropTypes.string.isRequired,
//   onSelect: PropTypes.func, // Optional
//   autoPlay: PropTypes.bool,
//   autoPlayTime: PropTypes.number,
// };

// export default Carousel;





import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./Carousel.css";

const Carousel = ({ data, title, onSelect, autoPlay, autoPlayTime }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    if (data.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }
  }, [data]);

  const handlePrev = () => {
    if (data.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    }
  };

  const goToSlide = (index) => setCurrentIndex(index);

  const handleItemClick = (index) => {
    if (onSelect && typeof onSelect === "function") {
      onSelect(data[index]);
    }
  };

  useEffect(() => {
    if (autoPlay && data.length > 1) {
      const interval = setInterval(handleNext, autoPlayTime);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayTime, handleNext, data.length]);

  const getVisibleItems = () => {
    if (data.length === 0) return [];
    const items = Array.from({ length: 3 }, (_, i) => data[(currentIndex + i) % data.length]);
    console.log("Visible Items:", items); // Debugging
    return items;
  };

  if (!data || data.length === 0) {
    return <div className="carousel"><p>No items available</p></div>;
  }

  return (
    <div className="carousel">
      <h3>{title}</h3>
      <div className="carousel-container">
        <button onClick={handlePrev} className="carousel-button prev" aria-label="Previous Slide">
          &#10094;
        </button>
        <div className="carousel-items">
          {getVisibleItems().map((item, index) => (
            <div
              key={item?.id || index}
              className="carousel-item"
              onClick={() => handleItemClick((currentIndex + index) % data.length)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') handleItemClick((currentIndex + index) % data.length); }}
            >
              <h4>{item?.label || "No Label Available"}</h4>
            </div>
          ))}
        </div>
        <button onClick={handleNext} className="carousel-button next" aria-label="Next Slide">
          &#10095;
        </button>
      </div>
      <div className="carousel-indicators">
        {data.map((item, index) => (
          <span
            key={item?.id || index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter') goToSlide(index); }}
            aria-label={`Go to slide ${index + 1}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  autoPlay: PropTypes.bool,
  autoPlayTime: PropTypes.number,
};

Carousel.defaultProps = {
  data: [],
  autoPlay: false,
  autoPlayTime: 3000,
};

export default Carousel;

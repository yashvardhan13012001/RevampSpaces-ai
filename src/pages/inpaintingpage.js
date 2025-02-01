// import React, { useRef, useState } from "react";
// import axios from "axios";
// import "./InpaintingPage.css"; // Add custom styles for better design.
// import { Link } from "react-router-dom"; // Import Link from React Router

// function InpaintingPage() {
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [mask, setMask] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [error, setError] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   // Handle drawing on the canvas
//   const handleMouseDown = (e) => {
//     setIsDrawing(true);
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     ctx.beginPath();
//     ctx.moveTo(x, y);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     ctx.lineTo(x, y);
//     ctx.strokeStyle = "red"; // Mask color
//     ctx.lineWidth = 5; // Brush size
//     ctx.stroke();
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);

//     // Save the mask data for processing
//     const canvas = canvasRef.current;
//     setMask(canvas.toDataURL("image/png"));
//   };

//   // Handle image upload for inpainting
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImageUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Clear the canvas and reset the mask
//   const handleClearCanvas = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setMask(null);
//   };

//   // Submit the image and mask for inpainting
//   const handleInpaint = async () => {
//     if (!imageUrl || !mask) {
//       setError("Both image and mask are required for inpainting.");
//       return;
//     }

//     setIsProcessing(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append("image", imageUrl);
//     formData.append("mask", mask);

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/inpaint", formData);
//       if (response.data.image_url) {
//         setImageUrl(response.data.image_url);
//       } else {
//         setError("Inpainting failed. Please try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("An error occurred during inpainting.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };


//   return (
//     <div className="inpainting-wrapper">
//       <header className="navbarinpaint">
//         <h1>Inpainting Page - AI Interior Designer</h1>
//         <Link to="/" className="navbar-button">Home</Link> {/* Added Home Link */}
//       </header>
//       <div className="inpainting-page">
//         <h1>Inpainting Tool</h1>
//         <div className="toolbar">
//           <label>
//             Upload Image:{" "}
//             <input type="file" accept="image/*" onChange={handleImageUpload} />
//           </label>
//           <button onClick={handleClearCanvas}>Clear Mask</button>
//           <button onClick={handleInpaint} disabled={isProcessing}>
//             {isProcessing ? "Processing..." : "Inpaint"}
//           </button>
//         </div>
//         {error && <p className="error">{error}</p>}
//         <div className="canvas-container">
//           {imageUrl && (
//             <img
//               ref={imageRef}
//               src={imageUrl}
//               alt="Original"
//               className="background-image"
//               onLoad={() => {
//                 const canvas = canvasRef.current;
//                 canvas.width = imageRef.current.width;
//                 canvas.height = imageRef.current.height;
//               }}
//             />
//           )}
//           <canvas
//             ref={canvasRef}
//             className="mask-canvas"
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//             onMouseUp={handleMouseUp}
//           ></canvas>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InpaintingPage;












// import React, { useRef, useState, useEffect } from "react"; // Added React and necessary hooks
// import axios from "axios"; // Ensure axios is imported
// import "./InpaintingPage.css";
// import { Link } from "react-router-dom"; // Ensure Link is imported from react-router-dom



// function InpaintingPage() {
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [mask, setMask] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [error, setError] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
  
//   // New state for prompts and brush
//   const [positivePrompt, setPositivePrompt] = useState("Enhance and fill the missing area");
//   const [negativePrompt, setNegativePrompt] = useState("blurry, low quality, distorted");
//   const [brushSize, setBrushSize] = useState(10);
//   const [brushColor, setBrushColor] = useState("rgba(255, 0, 0, 0.3)"); // Translucent red

//   // Handle drawing on the canvas
//   const handleMouseDown = (e) => {
//     setIsDrawing(true);
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     ctx.beginPath();
//     ctx.moveTo(x, y);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     ctx.lineTo(x, y);
//     ctx.strokeStyle = brushColor;
//     ctx.lineWidth = brushSize;
//     ctx.lineCap = 'round'; // Rounded brush tip
//     ctx.lineJoin = 'round';
//     ctx.stroke();
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);

//     // Save the mask data for processing
//     const canvas = canvasRef.current;
//     setMask(canvas.toDataURL("image/png"));
//   };

//     const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImageUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Clear the canvas and reset the mask
//   const handleClearCanvas = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setMask(null);
//   };

//   // Submit the image and mask for inpainting
//   const handleInpaint = async () => {
//     if (!imageUrl || !mask) {
//       setError("Both image and mask are required for inpainting.");
//       return;
//     }

//     setIsProcessing(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append("image", imageUrl);
//     formData.append("mask", mask);

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/inpaint", formData);
//       if (response.data.image_url) {
//         setImageUrl(response.data.image_url);
//       } else {
//         setError("Inpainting failed. Please try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("An error occurred during inpainting.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="inpainting-wrapper">
//       <header className="navbarinpaint">
//         <h1>Inpainting Page - AI Interior Designer</h1>
//         <Link to="/" className="navbar-button">Home</Link>
//       </header>
//       <div className="inpainting-page">
//         <h1>Inpainting Tool</h1>
//         <div className="toolbar">
//           <label>
//             Upload Image:{" "}
//             <input type="file" accept="image/*" onChange={handleImageUpload} />
//           </label>
//           <label>
//             Positive Prompt:{" "}
//             <input 
//               type="text" 
//               value={positivePrompt}
//               onChange={(e) => setPositivePrompt(e.target.value)}
//               placeholder="Describe what you want to generate"
//             />
//           </label>
//           <label>
//             Negative Prompt:{" "}
//             <input 
//               type="text" 
//               value={negativePrompt}
//               onChange={(e) => setNegativePrompt(e.target.value)}
//               placeholder="Describe what you want to avoid"
//             />
//           </label>
//           <div className="brush-controls">
//             <label>
//               Brush Size: {brushSize}px
//               <input 
//                 type="range" 
//                 min="1" 
//                 max="50" 
//                 value={brushSize}
//                 onChange={(e) => setBrushSize(Number(e.target.value))}
//               />
//             </label>
//             <label>
//               Brush Color:
//               <select 
//                 value={brushColor}
//                 onChange={(e) => setBrushColor(e.target.value)}
//               >
//                 <option value="rgba(255, 0, 0, 0.3)">Translucent Red</option>
//                 <option value="rgba(0, 255, 0, 0.3)">Translucent Green</option>
//                 <option value="rgba(0, 0, 255, 0.3)">Translucent Blue</option>
//                 <option value="rgba(255, 255, 0, 0.3)">Translucent Yellow</option>
//               </select>
//             </label>
//           </div>
//           <button onClick={handleClearCanvas}>Clear Mask</button>
//           <button onClick={handleInpaint} disabled={isProcessing}>
//             {isProcessing ? "Processing..." : "Inpaint"}
//           </button>
//         </div>
//         {error && <p className="error">{error}</p>}
//         <div className="canvas-container">
//           {imageUrl && (
//             <img
//               ref={imageRef}
//               src={imageUrl}
//               alt="Original"
//               className="background-image"
//               onLoad={() => {
//                 const canvas = canvasRef.current;
//                 canvas.width = imageRef.current.width;
//                 canvas.height = imageRef.current.height;
//               }}
//             />
//           )}
//           <canvas
//             ref={canvasRef}
//             className="mask-canvas"
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//             onMouseUp={handleMouseUp}
//           ></canvas>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InpaintingPage;




















// import React, { useRef, useState, useEffect } from "react";
// import axios from "axios";
// import "./InpaintingPage.css";
// import { Link } from "react-router-dom";

// function InpaintingPage() {
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [mask, setMask] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [generatedImages, setGeneratedImages] = useState([]);
//   const [error, setError] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
  
//   // New state for prompts and brush
//   const [positivePrompt, setPositivePrompt] = useState("Enhance and fill the missing area");
//   const [negativePrompt, setNegativePrompt] = useState("blurry, low quality, distorted");
//   const [brushSize, setBrushSize] = useState(10);
//   const [brushColor, setBrushColor] = useState("rgba(255, 0, 0, 0.3)"); // Translucent red

//   // Handle image upload for inpainting
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImageUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle drawing on the canvas
//   const handleMouseDown = (e) => {
//     setIsDrawing(true);
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     ctx.beginPath();
//     ctx.moveTo(x, y);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     ctx.lineTo(x, y);
//     ctx.strokeStyle = brushColor;
//     ctx.lineWidth = brushSize;
//     ctx.lineCap = 'round'; // Rounded brush tip
//     ctx.lineJoin = 'round';
//     ctx.stroke();
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);

//     // Save the mask data for processing
//     const canvas = canvasRef.current;
//     setMask(canvas.toDataURL("image/png"));
//   };

//   // Clear the canvas and reset the mask
//   const handleClearCanvas = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setMask(null);
//   };

//   // Submit the image and mask for inpainting
//   const handleInpaint = async () => {
//     if (!imageUrl || !mask) {
//       setError("Both image and mask are required for inpainting.");
//       return;
//     }

//     setIsProcessing(true);
//     setError(null);

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/inpaint", 
//         {
//           image: imageUrl,
//           mask: mask,
//           positive_prompt: positivePrompt,
//           negative_prompt: negativePrompt
//         },
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       if (response.data.image_url) {
//         // Add the new generated image to the list of generated images
//         setGeneratedImages(prev => [response.data.image_url, ...prev]);
//       } else {
//         setError("Inpainting failed. Please try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || "An error occurred during inpainting.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="inpainting-wrapper">
//       <header className="navbarinpaint">
//         <h1>Inpainting Page - AI Interior Designer</h1>
//         <Link to="/" className="navbar-button">Home</Link>
//       </header>
//       <div className="inpainting-content">
//         {/* Left Column - Generated Images */}
//         <div className="generated-images-column">
//           <h2>Generated Images</h2>
//           <div className="generated-images-grid">
//             {generatedImages.map((image, index) => (
//               <div key={index} className="generated-image-item">
//                 <img 
//                   src={image} 
//                   alt={`Generated ${index + 1}`} 
//                   className="generated-image"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Column - Upload and Mask */}
//         <div className="upload-mask-column">
//           <h1>Inpainting Tool</h1>
//           <div className="toolbar">
//             <label>
//               Upload Image:{" "}
//               <input type="file" accept="image/*" onChange={handleImageUpload} />
//             </label>
//             <label>
//               Positive Prompt:{" "}
//               <input 
//                 type="text" 
//                 value={positivePrompt}
//                 onChange={(e) => setPositivePrompt(e.target.value)}
//                 placeholder="Describe what you want to generate"
//               />
//             </label>
//             <label>
//               Negative Prompt:{" "}
//               <input 
//                 type="text" 
//                 value={negativePrompt}
//                 onChange={(e) => setNegativePrompt(e.target.value)}
//                 placeholder="Describe what you want to avoid"
//               />
//             </label>
//             <div className="brush-controls">
//               <label>
//                 Brush Size: {brushSize}px
//                 <input 
//                   type="range" 
//                   min="1" 
//                   max="50" 
//                   value={brushSize}
//                   onChange={(e) => setBrushSize(Number(e.target.value))}
//                 />
//               </label>
//               <label>
//                 Brush Color:
//                 <select 
//                   value={brushColor}
//                   onChange={(e) => setBrushColor(e.target.value)}
//                 >
//                   <option value="rgba(255, 0, 0, 0.3)">Translucent Red</option>
//                   <option value="rgba(0, 255, 0, 0.3)">Translucent Green</option>
//                   <option value="rgba(0, 0, 255, 0.3)">Translucent Blue</option>
//                   <option value="rgba(255, 255, 0, 0.3)">Translucent Yellow</option>
//                 </select>
//               </label>
//             </div>
//             <button onClick={handleClearCanvas}>Clear Mask</button>
//             <button onClick={handleInpaint} disabled={isProcessing}>
//               {isProcessing ? "Processing..." : "Inpaint"}
//             </button>
//           </div>
//           {error && <p className="error">{error}</p>}
//           <div className="canvas-container">
//             {imageUrl && (
//               <img
//                 ref={imageRef}
//                 src={imageUrl}
//                 alt="Original"
//                 className="background-image"
//                 onLoad={() => {
//                   const canvas = canvasRef.current;
//                   canvas.width = imageRef.current.width;
//                   canvas.height = imageRef.current.height;
//                 }}
//               />
//             )}
//             <canvas
//               ref={canvasRef}
//               className="mask-canvas"
//               onMouseDown={handleMouseDown}
//               onMouseMove={handleMouseMove}
//               onMouseUp={handleMouseUp}
//             ></canvas>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InpaintingPage;










import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./InpaintingPage.css";
import { Link } from "react-router-dom";

function InpaintingPage() {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mask, setMask] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // New state for prompts and brush
  const [positivePrompt, setPositivePrompt] = useState("Enhance and fill the missing area");
  const [negativePrompt, setNegativePrompt] = useState("blurry, low quality, distorted");
  const [brushSize, setBrushSize] = useState(10);
  const [brushColor, setBrushColor] = useState("rgba(255, 0, 0, 0.3)"); // Translucent red

  // Handle image upload for inpainting
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drawing on the canvas
  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round'; // Rounded brush tip
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);

    // Save the mask data for processing
    const canvas = canvasRef.current;
    setMask(canvas.toDataURL("image/png"));
  };

  // Clear the canvas and reset the mask
  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setMask(null);
  };

  // Submit the image and mask for inpainting
  const handleInpaint = async () => {
    if (!imageUrl || !mask) {
      setError("Both image and mask are required for inpainting.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/inpaint", 
        {
          image: imageUrl,
          mask: mask,
          positive_prompt: positivePrompt,
          negative_prompt: negativePrompt
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: [function (data) {
            return Object.entries(data)
              .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
              .join('&');
          }]
        }
      );

      if (response.data.image_url) {
        // Construct full URL for the image
        const fullImageUrl = `http://127.0.0.1:8000${response.data.image_url}`;
        
        // Add error handling for image loading
        const img = new Image();
        img.onload = () => {
          setGeneratedImages(prev => [fullImageUrl, ...prev]);
        };
        img.onerror = () => {
          console.error("Failed to load image:", fullImageUrl);
          setError("Failed to load generated image");
        };
        img.src = fullImageUrl;
      } else {
        setError("Inpainting failed. Please try again.");
      }
    } catch (err) {
      console.error("Inpainting error:", err);
      setError(err.response?.data?.error || "An error occurred during inpainting.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="inpainting-wrapper">
      <header className="navbarinpaint">
        <h1>Inpainting Page - AI Interior Designer</h1>
        <Link to="/" className="navbar-button">Home</Link>
      </header>
      <div className="inpainting-content">
        {/* Left Column - Generated Images */}
        <div className="generated-images-column">
          <h2>Generated Images</h2>
          <div className="generated-images-grid">
            {generatedImages.map((image, index) => (
              <div key={index} className="generated-image-item">
                <img 
                  src={image} 
                  alt={`Generated ${index + 1}`} 
                  className="generated-image"
                  onError={(e) => {
                    console.error("Image load error:", image);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Upload and Mask */}
        <div className="upload-mask-column">
          <h1>Inpainting Tool</h1>
          <div className="toolbar">
            <label>
              Upload Image:{" "}
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </label>
            <label>
              Positive Prompt:{" "}
              <input 
                type="text" 
                value={positivePrompt}
                onChange={(e) => setPositivePrompt(e.target.value)}
                placeholder="Describe what you want to generate"
              />
            </label>
            <label>
              Negative Prompt:{" "}
              <input 
                type="text" 
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="Describe what you want to avoid"
              />
            </label>
            <div className="brush-controls">
              <label>
                Brush Size: {brushSize}px
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                />
              </label>
              <label>
                Brush Color:
                <select 
                  value={brushColor}
                  onChange={(e) => setBrushColor(e.target.value)}
                >
                  <option value="rgba(255, 0, 0, 0.3)">Translucent Red</option>
                  <option value="rgba(0, 255, 0, 0.3)">Translucent Green</option>
                  <option value="rgba(0, 0, 255, 0.3)">Translucent Blue</option>
                  <option value="rgba(255, 255, 0, 0.3)">Translucent Yellow</option>
                </select>
              </label>
            </div>
            <button onClick={handleClearCanvas}>Clear Mask</button>
            <button onClick={handleInpaint} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Inpaint"}
            </button>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="canvas-container">
            {imageUrl && (
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Original"
                className="background-image"
                onLoad={() => {
                  const canvas = canvasRef.current;
                  canvas.width = imageRef.current.width;
                  canvas.height = imageRef.current.height;
                }}
              />
            )}
            <canvas
              ref={canvasRef}
              className="mask-canvas"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InpaintingPage;
// import React, { useState } from "react";
// import axios from "axios";
// import Carousel from "./component/Carousel"; // Assuming this is still part of your component directory

// function MainPage() {
//   const [positivePrompt, setPositivePrompt] = useState("");
//   const [negativePrompt, setNegativePrompt] = useState("");
//   const [imageUrl, setImageUrl] = useState(null);
//   const [uploadedImage, setUploadedImage] = useState(null); // Store uploaded image preview
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleRoomSelect = (selectedItem) => {
//     setPositivePrompt(selectedItem.positivePrompt);
//     setNegativePrompt(selectedItem.negativePrompt);
//   };

//   const handleDesignSelect = (selectedItem) => {
//     // Append design prompts to the existing prompts
//     setPositivePrompt((prev) => `${prev}, ${selectedItem.positivePrompt}`);
//     setNegativePrompt((prev) => `${prev}, ${selectedItem.negativePrompt}`);
//   };

//   const handleGenerate = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append("positive_prompt", positivePrompt); // Use the combined prompts
//     formData.append("negative_prompt", negativePrompt);
//     formData.append("steps", 20);
//     formData.append("cfg_scale", 7.5);
//     formData.append("width", 512);
//     formData.append("height", 512);
//     formData.append("sampler_index", "Euler a");

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/generate", formData);
//       if (response.data.image_url) {
//         setImageUrl(response.data.image_url);
//       } else if (response.data.error) {
//         setError(response.data.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleControlNet = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);
//     const formData = new FormData(e.target);
//     formData.append("steps", 20);
//     formData.append("cfg_scale", 7.5);
//     formData.append("width", 512);
//     formData.append("height", 512);
//     formData.append("sampler_index", "Euler a");
//     formData.append("weight", 1.0);
//     formData.append("resize_mode", "Scale to Fit");
//     formData.append("lowvram", false);

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/controlnet", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       if (response.data.image_url) {
//         setImageUrl(response.data.image_url);
//       } else if (response.data.error) {
//         setError(response.data.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploadedImage(URL.createObjectURL(file)); // Preview the uploaded image
//     }
//   };

//   // Sample data for Room Styles
//   const roomStyles = [
//     {
//       id: 1,
//       label: "Living Room",
//       positivePrompt: "(best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior, Cozy living room with modern furniture",
//       negativePrompt: "(worst quality:2),(low quality:2),(normal quality:2),(poor quality:2),lowres,polar lowres,((monochrome)),((grayscale)),low res,drawing,ugly,anime,illustration,paintings,sketches,Cluttered space, outdated decor",
//       image: "https://via.placeholder.com/400x300.png?text=Living+Room",
//     },
//     {
//       id: 2,
//       label: "Bedroom",
//       positivePrompt: "(best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior, Serene bedroom with minimalistic design",
//       negativePrompt: "(worst quality:2),(low quality:2),(normal quality:2),(poor quality:2),lowres,polar lowres,((monochrome)),((grayscale)),low res,drawing,ugly,anime,illustration,paintings,sketches,Messy room, too many decorations",
//       image: "https://via.placeholder.com/400x300.png?text=Bedroom",
//     },
//     {
//       id: 3,
//       label: "Kitchen",
//       positivePrompt: "(best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior, Spacious kitchen with stainless steel appliances",
//       negativePrompt: "(worst quality:2),(low quality:2),(normal quality:2),(poor quality:2),lowres,polar lowres,((monochrome)),((grayscale)),low res,drawing,ugly,anime,illustration,paintings,sketches,Small kitchen, old appliances",
//       image: "https://via.placeholder.com/400x300.png?text=Kitchen",
//     },
//     {
//       id: "Dinning Room",
//       positivePrompt: "(best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior, Spacious dining room with elegant decor",
//       negativePrompt: "(worst quality:2),(low quality:2),(normal quality:2),(poor quality:2),lowres,polar lowres,((monochrome)),((grayscale)),low res,drawing,ugly,anime,illustration,paintings,sketches,Small kitchen, old appliances",
//       image: "https://via.placeholder.com/400x300.png?text=Dinning+Room",
//     },
//   ];

//   // Sample data for Design Styles
//   const designStyles = [
//     {
//       id: 1,
//       label: "Modern",
//       positivePrompt: "(best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior, Clean lines, minimalist design",
//       negativePrompt: "(worst quality:2),(low quality:2),(normal quality:2),(poor quality:2),lowres,polar lowres,((monochrome)),((grayscale)),low res,drawing,ugly,anime,illustration,paintings,sketches,Ornate details, cluttered spaces",
//       image: "https://via.placeholder.com/400x300.png?text=Modern",
//     },
//     {
//       id: 2,
//       label: "Traditional",
//       positivePrompt: "(best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior, Cozy, vintage elements with warm colors",
//       negativePrompt: "(worst quality:2),(low quality:2),(normal quality:2),(poor quality:2),lowres,polar lowres,((monochrome)),((grayscale)),low res,drawing,ugly,anime,illustration,paintings,sketches,Contemporary design, modern furnishings",
//       image: "https://via.placeholder.com/400x300.png?text=Traditional",
//     },
//     {
//       id: 3,
//       label: "Minimalistic",
//       positivePrompt: "(best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior, Simple, clean design with focus on space",
//       negativePrompt: "(worst quality:2),(low quality:2),(normal quality:2),(poor quality:2),lowres,polar lowres,((monochrome)),((grayscale)),low res,drawing,ugly,anime,illustration,paintings,sketches,Cluttered design, excessive details",
//       image: "https://via.placeholder.com/400x300.png?text=Minimalistic",
//     },
//   ];

//   return (
//     <div className="mainPage">
//       <section className="content">
//         <h2>Room Styles</h2>
//         <Carousel
//           items={roomStyles}
//           onSelect={handleRoomSelect}
//         />

//         <h2>Design Styles</h2>
//         <Carousel
//           items={designStyles}
//           onSelect={handleDesignSelect}
//         />
        
//         {/* Form to handle the generation process */}
//         <form onSubmit={handleGenerate}>
//           <div>
//             <button type="submit" disabled={isLoading}>
//               {isLoading ? "Generating..." : "Generate Image"}
//             </button>
//           </div>
//         </form>

//         {/* Display Error if there's any */}
//         {error && <div className="error">{error}</div>}

//         {/* Display Image */}
//         {imageUrl && <img src={imageUrl} alt="Generated Design" />}
//       </section>
//     </div>
//   );
// }

// export default MainPage;



import React, { useState, useEffect } from "react";
// import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
// import "./App.css";
import Carousel from "./component/Carousel";
import "./MainPage.css";
import { Link } from "react-router-dom"; // Import Link from React Router
// import InpaintingPage from "./inpaintingpage";

function MainPage() {
  const [positivePrompt, setPositivePrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); // Store uploaded image preview
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  const handleRoomSelect = (selectedItem) => {
    setPositivePrompt(selectedItem.positivePrompt);
    setNegativePrompt(selectedItem.negativePrompt);
  };

  const handleDesignSelect = (selectedItem) => {
    setPositivePrompt((prev) => `${prev}, ${selectedItem.positivePrompt}`);
    setNegativePrompt((prev) => `${prev}, ${selectedItem.negativePrompt}`);
  };

  const validatePrompts = () => {
    if (!positivePrompt.trim()) {
      setError("Positive prompt cannot be empty.");
      return false;
    }
    return true;
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!validatePrompts()) return;

    setError(null);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("positive_prompt", positivePrompt);
    formData.append("negative_prompt", negativePrompt);
    formData.append("steps", 20);
    formData.append("cfg_scale", 7.5);
    formData.append("width", 512);
    formData.append("height", 512);
    formData.append("sampler_index", "Euler a");

    try {
      const response = await axios.post("http://127.0.0.1:8000/generate", formData);
      if (response.data.image_url) {
        setImageUrl(response.data.image_url);
      } else if (response.data.error) {
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleControlNet = async (e) => {
    e.preventDefault();
    if (!validatePrompts()) return;

    setError(null);
    setIsLoading(true);
    const formData = new FormData(e.target);
    formData.append("steps", 20);
    formData.append("cfg_scale", 7.5);
    formData.append("width", 500);
    formData.append("height", 500);
    formData.append("sampler_index", "Euler a");
    formData.append("weight", 1.0);
    formData.append("resize_mode", "Scale to Fit");
    formData.append("lowvram", false);

    try {
      const response = await axios.post("http://127.0.0.1:8000/controlnet", formData);
      if (response.data.image_url) {
        setImageUrl(response.data.image_url);
      } else if (response.data.error) {
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const roomStyles = [
        {
          id: 1,
          label: "Living Room",
          // (best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior,Living room,white,
          positivePrompt: "(best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior, Cozy living room with modern furniture",
          negativePrompt: "(worst quality:2),(low quality:2),(normal quality:2),(poor quality:2),lowres,polar lowres,((monochrome)),((grayscale)),low res,drawing,ugly,anime,illustration,paintings,sketches,Cluttered space, outdated decor",
          image: "https://via.placeholder.com/400x300.png?text=Living+Room",
        },
        {
          id: 2,
          label: "Bedroom",
          positivePrompt: "(best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior, Serene bedroom with minimalistic design",
          negativePrompt: "(worst quality:2),(low quality:2),(normal quality:2),(poor quality:2),lowres,polar lowres,((monochrome)),((grayscale)),low res,drawing,ugly,anime,illustration,paintings,sketches,Messy room, too many decorations",
          image: "https://via.placeholder.com/400x300.png?text=Bedroom",
        },
        {
          id: 3,
          label: "Kitchen",
          positivePrompt: "(best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior, Spacious kitchen with stainless steel appliances",
          negativePrompt: "(worst quality:2),(low quality:2),(normal quality:2),(poor quality:2),lowres,polar lowres,((monochrome)),((grayscale)),low res,drawing,ugly,anime,illustration,paintings,sketches,Small kitchen, old appliances",
          image: "https://via.placeholder.com/400x300.png?text=Kitchen",
        },
        {
          id: "Dinning Room",
          positivePrompt: "(best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior, Spacious dining room with elegant decor",
          negativePrompt: "(worst quality:2),(low quality:2),(normal quality:2),(poor quality:2),lowres,polar lowres,((monochrome)),((grayscale)),low res,drawing,ugly,anime,illustration,paintings,sketches,Small kitchen, old appliances",
          image: "https://via.placeholder.com/400x300.png?text=Dinning+Room",
        }
      ];

      const designStyles = [
            {
              id: 1,
              label: "Modern",
              positivePrompt: "(best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior, Clean lines, minimalist design",
              negativePrompt: "(worst quality:2),(low quality:2),(normal quality:2),(poor quality:2),lowres,polar lowres,((monochrome)),((grayscale)),low res,drawing,ugly,anime,illustration,paintings,sketches,Ornate details, cluttered spaces",
              image: "https://via.placeholder.com/400x300.png?text=Modern",
            },
            {
              id: 2,
              label: "Traditional",
              positivePrompt: "(best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior, Elegant furniture with classic details",
              negativePrompt: "(worst quality:2),(low quality:2),(normal quality:2),(poor quality:2),lowres,polar lowres,((monochrome)),((grayscale)),low res,drawing,ugly,anime,illustration,paintings,sketches,Minimalistic furnishings, modern decor",
              image: "https://via.placeholder.com/400x300.png?text=Traditional",
            },
            {
              id: 3,
              label: "Industrial",
              positivePrompt: "(best quality:1.4),(masterpiece:1.4),(photorealistic:1.4),(ultra high res, raw photo:1.4),(hdr, hyperdetailed:1.2),(8K:1.2),real,(realistic),super detailed,(4k),8k,interior, Exposed brick, metal fixtures, open spaces",
              negativePrompt: "(worst quality:2),(low quality:2),(normal quality:2),(poor quality:2),lowres,polar lowres,((monochrome)),((grayscale)),low res,drawing,ugly,anime,illustration,paintings,sketches,Soft colors, ornate decorations",
              image: "https://via.placeholder.com/400x300.png?text=Industrial",
            },
          ];

  return (
    <div className="main-page-wrapper">
      <div className="App">
        <header className="navbarmain">
          <h1>AI Interior Designer</h1>
          <div className="LeftHome">
              <Link to="/" className="navbar-button">Home</Link> {/* Added Home Link */}
          </div>
        </header>

        <div className="container">
          <div className="left-column">
            <h3>ControlNet Image Upload</h3>
            <form onSubmit={handleControlNet} encType="multipart/form-data">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {uploadedImage && (
                <div className="image-preview">
                  <img src={uploadedImage} alt="Uploaded Preview" width="200" />
                </div>
              )}
              <input
                type="text"
                name="positive_prompt"
                placeholder="Enter positive prompt"
                value={positivePrompt}
                onChange={(e) => setPositivePrompt(e.target.value)}
                required
              />
              <input
                type="text"
                name="negative_prompt"
                placeholder="Enter negative prompt"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Process with ControlNet"}
              </button>
            </form>

            <Carousel data={roomStyles} title="Room Styles" onSelect={handleRoomSelect} />
            <Carousel data={designStyles} title="Design Styles" onSelect={handleDesignSelect} />

            <form onSubmit={handleGenerate}>
              <input
                type="text"
                name="positive_prompt"
                placeholder="Enter positive prompt"
                value={positivePrompt}
                onChange={(e) => setPositivePrompt(e.target.value)}
                required
              />
              <input
                type="text"
                name="negative_prompt"
                placeholder="Enter negative prompt"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Image"}
              </button>
            </form>
          </div>

          <div className="right-column">
            <h2>Generated Image</h2>
            {error && <p className="error">{error}</p>}
            {imageUrl && <img src={imageUrl} alt="Generated" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;

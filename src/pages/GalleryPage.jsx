import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const GalleryPage = () => {
  const [images, setImages] = useState([]);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery/");
      const data = await res.json();

      const gallery = data.map((item) => {
        if (item) {
          const imgPath = "../assets/images/";
          const imgSrc = new URL(`${imgPath}${item.image}`, import.meta.url)
            .href;
          return {
            ...item,
            imgSrc,
          };
        }
      });
      setImages(gallery);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleLike = async (image) => {
    const newLikes = image.likes + 1;
    const updatedImage = {
      ...image,
      likes: newLikes,
    };
    console.log(updatedImage);

    const res = await fetch(`/api/gallery/${image.id}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(updatedImage),
    });

    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === image.id ? { ...img, likes: img.likes + 1 } : img
      )
    );
  };

  return (
    <>
      <Header
        heading={"Fashion Gallery"}
        expo={"Some of our iconic Features"}
      />
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 p-4">
        {images.map((image) => (
          <div key={image.id} className="mb-4 break-inside-avoid">
            <div className="relative group">
              <img
                src={image.imgSrc}
                alt={image.comment}
                className="w-full rounded-lg transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-lg">
                <h3 className="text-white text-lg font-semibold">
                  {image.comment}
                </h3>
                <button
                  onClick={() => handleLike(image)}
                  className="mt-2 text-white flex items-center"
                >
                  ❤ {image.likes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GalleryPage;

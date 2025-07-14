import GalleryItem from "./GalleryItem";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from "react";

const Gallery = () => {
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
      setImages(gallery.slice(0,4));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <section className="gallery-section">
      <SectionHeader
        heading={"Gallery"}
        text={"Explore Our Latest Collections"}
      />
      <div className="gallery-grid">
        {images.map((item) => (
          <GalleryItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;

import { useState, useEffect } from "react";
import Header from "../components/Header";
import CollectionsGrid from "../components/CollectionsGrid";

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const resCollection = await fetch("/api/collections/");
      const collectionData = await resCollection.json();
      setCollections(collectionData);
    } catch (e) {
      console.log(e);
    } finally {
      null;
    }
  };

  useEffect(() => {
    fetchCollections();
  });

  return (
    <>
      <Header
        heading={"Collections"}
        expo={"Discover our Latest Collections"}
      />

      <div className="bg-gray-100 min-h-screen py-12 px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
<CollectionsGrid collection={collection}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default CollectionsPage;

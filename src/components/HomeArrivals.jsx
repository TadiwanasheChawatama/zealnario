import SectionHeader from "./SectionHeader";
import ArrivalItem from "./ArrivalItem";
import { useEffect, useState } from "react";

const HomeArrivals = () => {
  const [arrivalItems ,setArrivalItems] = useState([]);

  
  const fetchArrivals = async ()=>{
    try {
      const resArrivals = await fetch("/api/collections/")
      const arrivalData = await resArrivals.json()
      setArrivalItems(arrivalData)
    } catch (e) {
      console.error(`/api/collections/`)
      console.log(e)
    }finally{
      null
    }
  }

  useEffect(()=>{
    fetchArrivals()
  },[])
  

  return (
    
    <section className="latest-collection">
      <SectionHeader
        heading={"Latest Collection"}
        text={"Trending This Season"}
      />
      <div className="collection-grid">
        {arrivalItems.map((item) => (
          <ArrivalItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default HomeArrivals;

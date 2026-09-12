import useFetch from "../useFetch";

const HotelByName = ({ name }) => {
  const { data, loading, error } = useFetch(
    `https://hotels-backend-f82.vercel.app/hotels/${name}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No Hotel Found</p>;

  return (
    <div>
      <h2>{data.name}</h2>
      <p><strong>Location:</strong> {data.location}</p>
      <p><strong>Rating:</strong> {data.rating}</p>
      <p><strong>Price Range:</strong> {data.priceRange}</p>
    </div>
  );
};

export default HotelByName;
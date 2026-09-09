import useFetch from "../useFetch";

const AllHotels = () => {
  const { data, loading, error } = useFetch("https://hotels-backend-f82.vercel.app/hotels");

  console.log(data);

  return (
    <div>
      <h1>All Hotels</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <ul>
          {data.map((hotel) => (
            <li key={hotel._id}>{hotel.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllHotels;
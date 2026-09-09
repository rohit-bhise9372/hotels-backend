import useFetch from "../useFetch";

const Allhotels = () => {
  const { data, loading, error } = useFetch(
    "https://hotels-backend-f82.vercel.app/hotels"
  );

  return (
    <div>
      <h1>All Hotels</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {data &&
        data.map((hotel) => (
          <div key={hotel._id}>
            <h3>{hotel.name}</h3>
            <p>{hotel.category}</p>
            <p>{hotel.location}</p>
            <p>⭐ {hotel.rating}</p>
          </div>
        ))}
    </div>
  );
};

export default Allhotels;
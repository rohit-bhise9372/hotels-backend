import AllHotels from "../components/AllHotels";
import HotelByName from "../components/HotelByName";

function App() {
  return (
    <div>
      <AllHotels />
      <HotelByName name="New Hotel 1" />
    </div>
  );
}

export default App;
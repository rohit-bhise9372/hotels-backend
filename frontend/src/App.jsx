import AllHotels from "../components/Allhotels";
import HotelByName from "../components/Hotelbyname";

function App() {
  return (
    <div>
      <Allhotels />
      <Hotelbyname name="New Hotel 1" />
    </div>
  );
}

export default App;
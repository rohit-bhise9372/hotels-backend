import "./App.css";
import AllHotels from "../components/AllHotels";
import HotelByName from "../components/HotelByName";
import AddHotelForm from "../components/AddHotelForm";

function App() {
  return (
    <main>
      <AddHotelForm />
      <hr />

      <AllHotels />
      <hr />

      <HotelByName name="New Hotel 1" />
    </main>
  );
}

export default App;
import { useState } from "react";
import axios from "axios";

const API = "https://hotels-frontend-f82.vercel.app/";

export default function AddHotelForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    rating: "",
    website: "",
    phoneNumber: "",
    checkInTime: "",
    checkOutTime: "",
    amenities: "",
    priceRange: "",
    reservationsNeeded: false,
    isParkingAvailable: false,
    isWifiAvailable: false,
    isPoolAvailable: false,
    isSpaAvailable: false,
    isRestaurantAvailable: false,
    photos: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newHotel = {
      ...formData,
      rating: Number(formData.rating),
      amenities: formData.amenities.split(",").map((item) => item.trim()),
      photos: formData.photos.split(",").map((item) => item.trim()),
    };

    try {
      const response = await axios.post(`${API}/hotels`, newHotel);

      console.log("Hotel Added:", response.data);
      alert("Hotel added successfully!");

      setFormData({
        name: "",
        category: "",
        location: "",
        rating: "",
        website: "",
        phoneNumber: "",
        checkInTime: "",
        checkOutTime: "",
        amenities: "",
        priceRange: "",
        reservationsNeeded: false,
        isParkingAvailable: false,
        isWifiAvailable: false,
        isPoolAvailable: false,
        isSpaAvailable: false,
        isRestaurantAvailable: false,
        photos: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add hotel.");
    }
  };

  return (
    <div>
      <h2>Add New Hotel</h2>

      <form onSubmit={handleSubmit}>
        <label>Hotel Name:</label>
        <br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Category:</label>
        <br />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Budget">Budget</option>
          <option value="Mid-Range">Mid-Range</option>
          <option value="Luxury">Luxury</option>
          <option value="Resort">Resort</option>
        </select>
        <br />
        <br />

        <label>Location:</label>
        <br />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Rating:</label>
        <br />
        <input
          type="number"
          step="0.1"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Website:</label>
        <br />
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Phone Number:</label>
        <br />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Check-In Time:</label>
        <br />
        <input
          type="text"
          name="checkInTime"
          value={formData.checkInTime}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Check-Out Time:</label>
        <br />
        <input
          type="text"
          name="checkOutTime"
          value={formData.checkOutTime}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Amenities (comma separated):</label>
        <br />
        <input
          type="text"
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Price Range:</label>
        <br />
        <select
          name="priceRange"
          value={formData.priceRange}
          onChange={handleChange}
        >
          <option value="">Select Price Range</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$$">$$$$</option>
        </select>
        <br />
        <br />

        <label>
          <input
            type="checkbox"
            name="reservationsNeeded"
            checked={formData.reservationsNeeded}
            onChange={handleChange}
          />
          Reservations Needed
        </label>
        <br />
        <br />

        <label>
          <input
            type="checkbox"
            name="isParkingAvailable"
            checked={formData.isParkingAvailable}
            onChange={handleChange}
          />
          Parking Available
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            name="isWifiAvailable"
            checked={formData.isWifiAvailable}
            onChange={handleChange}
          />
          WiFi Available
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            name="isPoolAvailable"
            checked={formData.isPoolAvailable}
            onChange={handleChange}
          />
          Pool Available
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            name="isSpaAvailable"
            checked={formData.isSpaAvailable}
            onChange={handleChange}
          />
          Spa Available
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            name="isRestaurantAvailable"
            checked={formData.isRestaurantAvailable}
            onChange={handleChange}
          />
          Restaurant Available
        </label>
        <br />
        <br />

        <label>Photos (comma separated URLs):</label>
        <br />
        <input
          type="text"
          name="photos"
          value={formData.photos}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">Add Hotel</button>
      </form>
    </div>
  );
}


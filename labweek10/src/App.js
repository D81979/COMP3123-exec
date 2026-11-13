
import { useState } from 'react';
import './App.css';

function App() {
  // Store the values entered in the form
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    address2: '',
    city: '',
    province: '',
    postalCode: ''
  });

  // Store the submitted information
  const [submittedData, setSubmittedData] = useState(null);

  // Update a field when the user types
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Display the information after Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedData({ ...formData });
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Data Entry Form</h1>

        <form onSubmit={handleSubmit}>

          {/* Email and Name */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fullName">Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="1234 Main St"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address 2 */}
          <div className="form-group">
            <label htmlFor="address2">Address 2</label>
            <input
              type="text"
              id="address2"
              name="address2"
              placeholder="Apartment, studio, or floor"
              value={formData.address2}
              onChange={handleChange}
            />
          </div>

          {/* City, Province and Postal Code */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="province">Province</label>
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
              >
                <option value="">Choose...</option>
                <option>Alberta</option>
                <option>British Columbia</option>
                <option>Manitoba</option>
                <option>New Brunswick</option>
                <option>Newfoundland and Labrador</option>
                <option>Nova Scotia</option>
                <option>Ontario</option>
                <option>Prince Edward Island</option>
                <option>Quebec</option>
                <option>Saskatchewan</option>
                <option>Northwest Territories</option>
                <option>Nunavut</option>
                <option>Yukon</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="M5R 1M3"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="terms">
            <label>
              <input type="checkbox" required />
              Agree Terms &amp; Condition?
            </label>
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>

      {/* Show the information after submission */}
      {submittedData && (
        <div className="submitted-info">
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Address:</strong> {submittedData.address}</p>

          {submittedData.address2 && (
            <p><strong>Address 2:</strong> {submittedData.address2}</p>
          )}

          <p><strong>City:</strong> {submittedData.city}</p>
          <p><strong>Province:</strong> {submittedData.province}</p>
          <p><strong>Postal Code:</strong> {submittedData.postalCode}</p>
        </div>
      )}
    </div>
  );
}

export default App;

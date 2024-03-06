import React, { useState } from 'react';
import './RegistrationForm.css';
import { db } from '../../firebase-config';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [address, setAddress] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [deliveryType, setDeliveryType] = useState('car');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await db.collection('driver_user').add({
        username,
        phone,
        telegram,
        address,
        dateTime,
        deliveryType
      });

      console.log('User registered successfully!');
      // Clear form fields
      setUsername('');
      setPhone('');
      setTelegram('');
      setAddress('');
      setDateTime('');
      setDeliveryType('car');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="registration-form">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </label>
        <label>
          Telegram:
          <input
            type="text"
            value={telegram}
            onChange={(event) => setTelegram(event.target.value)}
            required
          />
        </label>
        <label>
          Address:
          <textarea
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          ></textarea>
        </label>
        <label>
          Date and Time:
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(event) => setDateTime(event.target.value)}
            required
          />
        </label>
        <label>
          Delivery Type:
          <select
            value={deliveryType}
            onChange={(event) => setDeliveryType(event.target.value)}
            required
          >
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
          </select>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
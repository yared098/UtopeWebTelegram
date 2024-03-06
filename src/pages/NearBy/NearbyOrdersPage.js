import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function NearbyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const earthRadius = 6371; // Radius of the earth in kilometers
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadius * c;
      return distance;
    };

    const fetchOrders = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          // Get the user's current location
          const { latitude, longitude, error } = await getCurrentLocation();

          if (error) {
            // Location permission is denied
            setLocationPermissionGranted(false);
            setShowDialog(true);
            return;
          }

          // Fetch all orders from Firebase
          const ordersSnapshot = await firebase.firestore().collection('messages').get();

          // Filter orders based on distance
          const nearbyOrders = ordersSnapshot.docs
            .map((doc) => doc.data())
            .filter((order) =>
              calculateDistance(latitude, longitude, order.senderLocation.latitude, order.senderLocation.longitude) <= 4
            );

          // Set the nearby orders in the state
          setOrders(nearbyOrders);
        }
      } catch (error) {
        console.error('Error fetching nearby orders:', error);
      }
    };

    const toRadians = (degrees) => {
      return degrees * (Math.PI / 180);
    };

    const getCurrentLocation = () => {
      return new Promise((resolve, reject) => {
        // Use the browser's geolocation API to get the current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve({ latitude, longitude, error: null });
            },
            (error) => {
              console.error('Error getting current location:', error);
              resolve({ latitude: null, longitude: null, error });
            }
          );
        } else {
          resolve({ latitude: null, longitude: null, error: new Error('Geolocation is not supported') });
        }
      });
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Nearby Orders...</h2>

      {!locationPermissionGranted ? (
        <h2>Well...</h2>
        // <button onClick={fetchNearbyOrders}>Grant Location Permission</button>
      ) : orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Customer Name: {order.customerName}</p>
              {/* Display other order details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No nearby orders available</p>
      )}

      {showDialog && (
        <div>
          <p>Please allow location access to view nearby orders.</p>
          <button onClick={() => setShowDialog(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default NearbyOrdersPage;
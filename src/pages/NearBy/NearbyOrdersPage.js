import React, { useEffect, useState } from 'react';
import './NearbyOrdersPage.css';
import { db } from '../../firebase-config';

function NearbyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const toRadians = (degrees) => {
      return degrees * (Math.PI / 180);
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const earthRadius = 6371; // Radius of the earth in kilometers
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadius * c;
      return distance.toFixed(2); // Return the distance rounded to 2 decimal places
    };

    const fetchOrders = async () => {
      try {
        setLoading(true);

        // Get the user's current location
        const { latitude, longitude } = await getCurrentLocation();

        // Fetch orders from Firebase based on pagination
        const ordersSnapshot = await db
          .collection('messages')
          .orderBy('order-date')
          .limit(10 * page)
          .get();

        // Filter orders based on distance
        const nearbyOrders = ordersSnapshot.docs
          .map((doc) => doc.data())
          .filter(
            (order) =>
              calculateDistance(
                latitude,
                longitude,
                order.location.sender_lat,
                order.location.sender_lon
              ) <= 400
          );

        // Set the nearby orders in the state
        setOrders(nearbyOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching nearby orders:', error);
        setLoading(false);
      }
    };

    const getCurrentLocation = () => {
      return new Promise((resolve, reject) => {
        // Use the browser's geolocation API to get the current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve({ latitude, longitude });
            },
            (error) => {
              console.error('Error getting current location:', error);
              resolve({ latitude: null, longitude: null });
            }
          );
        } else {
          resolve({ latitude: null, longitude: null });
        }
      });
    };

    fetchOrders();
  }, [page]);

  const handleCall = (phoneNumber) => {
    // Implement the logic to initiate the call using the provided phone number
    // This can be done using a third-party library or a platform-specific API
    console.log('Calling:', phoneNumber);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
    };
    
    const calculateDistance1 = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Radius of the earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance.toFixed(2); // Return the distance rounded to 2 decimal places
    };

    return (
      <div className="container">
        <h2>Nearby Orders</h2>
    
        {orders.length > 0 ? (
          <>
            {orders.map((order) => (
              <div className="card" key={order.id}>
                <p>Order ID: {order.to}</p>
                <p>Receiver address: {order.receiver_address}</p>
                <p>Sender phone: {order.sender_phone}</p>
                <p>
                  Distance:{' '}
                  {calculateDistance1(
                    order.location.sender_lat,
                    order.location.sender_lon,
                    order.location.receiver_lat || 0.00,
                    order.location.receiver_lon || 0.00
                  )}{' '}
                  km
                </p>
                {/* Display other order details as needed */}
                <button
                  className="call-button"
                  onClick={() => handleCall(order.sender_phone)}
                >
                  Call
                </button>
              </div>
            ))}
            {!loading && (
              <button className="load-more-button" onClick={handleLoadMore}>
                Load More
              </button>
            )}
            {loading && <p>Loading...</p>}
          </>
        ) : (
          <p className="empty-message">No nearby orders available</p>
        )}
      </div>
    );
}

export default NearbyOrdersPage;
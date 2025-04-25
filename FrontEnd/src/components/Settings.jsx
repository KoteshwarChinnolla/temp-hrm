import React, { useState } from 'react';
import {FaHome  } from "react-icons/fa";

const SecuritySettings = () => {
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSave = () => {
        // Implement your save logic here, e.g., API call
        console.log('Saving security settings:', { username, currentPassword, newPassword });
        // You would typically send this data to your backend for processing.
    };

    return (
        <div className="bg-white rounded-md shadow p-4 mb-6">
            <h2>Security Settings</h2>
            <div className="mb-3">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="currentPassword" className="block text-gray-700 text-sm font-bold mb-2">
                    Current Password
                </label>
                <input
                    type="password"
                    id="currentPassword"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                    New Password
                </label>
                <input
                    type="password"
                    id="newPassword"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <button
                className="bg-blue-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSave}
            >
                Save
            </button>
        </div>
    );
};

const AccountSettings = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');

    const handleSaveChanges = () => {
        // Implement your save changes logic here, e.g., API call
        console.log('Saving account settings:', { firstName, lastName, city, email, country, address });
        // You would typically send this data to your backend for processing.
    };

    return (
        <div className="bg-white rounded-md shadow p-4 mb-6">
            <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
            <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                    <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                    Address
                </label>
                <textarea
                    id="address"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button
                className="bg-blue-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSaveChanges}
            >
                Save Changes
            </button>
        </div>
    );
};

const SettingsPage = () => {
    return (
        <div className="p-6">
                        <div className="flex justify-between items-center">
                            <h2 className="p-4 text-sm">Settings</h2>
                            <div className="flex gap-2 items-center">
                              <a href="/dashboard">
                                {" "}
                                <FaHome className="text-lg" />
                              </a>
                              <span className="text-lg">&gt;</span>
                              <span className="text-lg">Home</span>
                              <span className="text-lg">&gt;</span>
                              <span className="text-lg">Settings</span>
                            </div>
                          </div>
            <SecuritySettings />
            <AccountSettings />
        </div>
    );
};

export default SettingsPage;
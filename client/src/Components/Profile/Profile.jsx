import React, { useState, useEffect } from 'react';
import profile from '../../services/profile';
import { useParams } from 'react-router-dom';
import { useQuery } from "react-query";
import UserCard from './UserCard';
import updateUser from '../../services/updateUser.js';
import { useNavigate } from 'react-router-dom';

async function fetchUserProfile(username) {
    try {
        const res = await profile(username)
        const result = JSON.parse(res);
        return result;
    }
    catch (error) {
        if (error.statusCode !== 201) {
            console.error(`Profile fetch Failed: ${error.errorText}`);
            if (error.errorText.includes("exist")) {
                console.error(`Profile Failed: ${error.errorText}`);
            }
        } else {
            console.error(`Profile: ${error}`);
        }
    }
}

export default function PersonalProfile() {
    useEffect(() => {
        // Check if the user is already logged in (e.g., token exists in session storage)
        if (!sessionStorage.getItem('user')) {
            navigate('/');
        }
    }, []);
    const { username } = useParams();
    const navigate = useNavigate();
    const { data: userData, isLoading: isUserLoading, isError: isUserError, refetch } = useQuery(['userData', username], () => fetchUserProfile(username), {
        cacheTime: 120000, // Data will be cached for 2 minute
        staleTime: 60000
    });


    const handleProfileData = async (updatedData) => {
        const updateUserProfile = async () => {
            try {
                await updateUser(username, updatedData);
                refetch();
            } catch (e) {
                console.error('Error updating user profile:', e);
            }
        }
        updateUserProfile();
    }

    return (
        <>
            <div>
                {isUserLoading ? (<p>Loading...</p>) : isUserError ? (<p>Error fetching user.</p>)
                    : <div>
                        <UserCard userData={userData} onUserDataChange={handleProfileData} />
                    </div>}
            </div>
        </>
    );
}

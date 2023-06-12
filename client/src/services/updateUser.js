//Updateprofile
const URI = "http://localhost:3000/api/v1"
const updateUser = async (username, user) => {
    try {
        const response = await fetch(`${URI}/update/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const result = await response.text();
            return result;
        }
        else {
            const errorText = await response.text();
            const statusCode = response.status;

            if (response.status !== 201) {
                throw { errorText, statusCode };
            }
            else {
                throw new Error(`failed to put Profile: ${errorText}`);
            }
        }
    }
    catch (error) {
        throw (error);
    }
};

export default updateUser;
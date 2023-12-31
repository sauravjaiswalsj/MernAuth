//profile
const URI = "http://localhost:3000/api/v1"
const profile = async (username) => {
    try {
        const response = await fetch(`${URI}/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const result = await response.text();
            return result;
        } else {
            const errorText = await response.text();
            const statusCode = response.status;

            if (response.status !== 201) {
                throw { errorText, statusCode };
            }
            else {
                throw new Error(`failed to fetch Profile: ${errorText}`);
            }
        }
    }
    catch (error) {
        throw (error);
    }
};

export default profile;
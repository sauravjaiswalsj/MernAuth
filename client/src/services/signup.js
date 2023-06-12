//signup
const URI = "http://localhost:3000/api/v1"
const signup = async (user) => {
    try {
        const response = await fetch(`${URI}/signup`, {
            method: 'POST',
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
                throw new Error(`Signup failed: ${errorText}`);
            }
        }
    } catch (error) {
        throw (error);
    }
};

export default signup;
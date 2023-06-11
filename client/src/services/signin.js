//signin
const URI = "http://localhost:3000/api/v1"
const signin = async (user) => {
    try {
        const response = await fetch(`${URI}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        console.log(response);
        if (response.ok) {
            const result = await response.text();
            //console.log(result);
            return result;
        } else {
            const errorText = await response.text();
            const statusCode = response.status;

            if (response.status !== 201) {
                throw { errorText, statusCode };
            }
            else {
                throw new Error(`Login failed: ${errorText}`);
            }
        }
    }
    catch (error) {
        throw (error);
    }
};

export default signin;
import { apiInstanceExpress } from "@/utils/apiInstance"

export const checkFavoriteMovies = async ({ email, token, data }) => {
    try {
        // Make sure data, emailStorage, and tokenStorage are properly defined
        const response = await apiInstanceExpress.post('my-movies/check', {
            email,
            token,
            data
        });

        // Check the response status
        if (response.status === 202) {
            return response.data.data.match;
        } else {
            console.log(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        // Log detailed error information
        console.error("Error checking favorite movies", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        }
    }
}

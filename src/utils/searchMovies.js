import { apiInstance } from "@/utils/apiInstance"

export const searchMovies = async ({ query }) => {
    try {
        const movies = await apiInstance.get("search/movie?query=" + query)
        return movies.data.results
    } catch (error) {
        console.log("error")
    }

}
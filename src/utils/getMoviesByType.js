import { apiInstance } from "./apiInstance"

export const getMoviesByType = async ({ moviesType }) => {
    try {
        let movies = await apiInstance.get("movie/" + moviesType)
        console.log({ movies })
        return movies.data.results
    } catch (error) {
        console.log("Error getting movies")
    }

}
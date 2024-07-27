import { apiInstance } from "@/utils/apiInstance";

export const getMoviesRecommendation = async ({ movie_id }) => {
    try {
        const movies = await apiInstance("movie/" + movie_id + "/recommendations")
        return movies.data.results
    } catch (error) {
        console.log(error)
    }
}
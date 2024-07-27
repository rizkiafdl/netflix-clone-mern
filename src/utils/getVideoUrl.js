import { apiInstance } from "./apiInstance"

export const getVideoUrl = async ({ movie_id }) => {
    try {
        const url = await apiInstance.get(`${import.meta.env.VITE_BASE_URL_TMDB}movie/${movie_id}/videos`)
        return url.data.results[0].key
    } catch (error) {
        console.log(error.message)
    }

}
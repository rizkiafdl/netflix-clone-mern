import BrowseLayout from "@/components/Layouts/BrowseLayout"
import MovieList from "@mods//BrowsePage/MovieList"
import Jumbotron from "@mods/BrowsePage/Jumbotron"
import Modal from "@mods//BrowsePage/Modal"
import { useAtom } from "jotai"
import { searchMoviesAtom } from "@/jotai/atoms"
import SearchMovies from "@mods/BrowsePage/SearchMovies"
import Footer from "@/components/Modules/LandingPage/Footer"

function Browse() {
    const [searchQuery] = useAtom(searchMoviesAtom)

    return (
        <BrowseLayout>
            {searchQuery ? <SearchMovies /> : (
                <>
                    <Jumbotron />
                    <MovieList title={"Now Playing"} moviesType={"now_playing"} />
                    <MovieList title={"Popular Movies"} moviesType={"popular"} />
                    <MovieList title={"Top Rated Movies"} moviesType={"top_rated"} />
                    <MovieList title={"Upcoming"} moviesType={"upcoming"} />
                </>
            )}
            <Footer />
            <Modal />
        </BrowseLayout>
    )
}

export default Browse
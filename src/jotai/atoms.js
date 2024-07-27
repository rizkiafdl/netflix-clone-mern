import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const languangeAtom = atomWithStorage("languange", "id")
export const tokenAtom = atomWithStorage("token", null)
export const emailStorageAtom = atomWithStorage("email", null)

export const idMovieAtom = atom(null)
export const isOpenModalAtom = atom(false)
export const searchMoviesAtom = atom(null)
export const isFetchingAtom = atom(false)
export const emailLandingAtom = atom(null)
export const isFavoriteAtom = atom(false)
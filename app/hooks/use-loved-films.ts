import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Movie } from "@prisma/client";

import { useCurrentNetflixUser } from "./use-current-user";
import { toast } from "sonner";

interface UseAddFilmMyList {
  lovedFilmsByUser: { [userId: string]: Movie[] };
  addLovedFilm: (data: Movie) => void;
  removeLovedItem: (id: string) => void;
}

export const useLovedFilms = create(
  persist<UseAddFilmMyList>(
    (set, get) => ({
      lovedFilmsByUser: {},

      addLovedFilm: (data: Movie) => {
        const { currentUser } = useCurrentNetflixUser.getState(); // Get the current user

        if (!currentUser) {
          return toast("Ningún usuario seleccionado 🙋‍♂️");
        }

        const currentLovedItems = get().lovedFilmsByUser[currentUser.id] || [];
        const existingItem = currentLovedItems.find(
          (item: Movie) => item.id === data.id
        );

        if (existingItem) {
          return toast("La película ya está en tu lista 😊", {
            style: { backgroundColor: "rgb(229 9 20 / var(--tw-bg-opacity, 1))", color: "white" },
          });          
        }

        set({
          lovedFilmsByUser: {
            ...get().lovedFilmsByUser,
            [currentUser.id]: [...currentLovedItems, data],
          },
        });

        toast("Película añadida a tu lista 🚀");
      },

      removeLovedItem: (id: string) => {
        const { currentUser } = useCurrentNetflixUser.getState();

        if (!currentUser) {
          return toast("Ningún usuario seleccionado 🙋‍♂️", {
            style: { backgroundColor: "rgb(229 9 20 / var(--tw-bg-opacity, 1))", color: "white" },
          }); 
        }

        const currentLovedItems = get().lovedFilmsByUser[currentUser.id] || [];

        set({
          lovedFilmsByUser: {
            ...get().lovedFilmsByUser,
            [currentUser.id]: currentLovedItems.filter(
              (item) => item.id !== id
            ),
          },
        });

        toast("La película ha sido eliminada de tu lista 😢");
      },
    }),
    {
      name: "add-loved-films-by-user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
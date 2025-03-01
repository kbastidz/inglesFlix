"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trendingMovies } from "./TrendingMovies.data";

export function TrendingMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const uploadTrendingMovies = async () => {
    setIsLoading(true);
    try {
      await axios.post("/api/create-popular-movies", {
        movies: trendingMovies,
      });
      toast.success("Películas se han subido correctamente!", {
        description: "Tu acción se ha realizado correctamente.",
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-lg border-white-400 p-6 hover:bg-slate-500 transition-all duration-300">
      <h1 className="text-xl font-bold mb-4">Subir películas populares</h1>
      <Button
        className="w-full"
        onClick={uploadTrendingMovies}
        variant="secondary"
        disabled={isLoading}
      >
        Subir películas
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}

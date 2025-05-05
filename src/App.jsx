import { useState, useEffect, useRef } from "react";
import supabase from "./utils/supabase.js";
import Header from "./components/Header.jsx";
import Carousel from "./components/Carousel.jsx";
import { useMediaQuery } from "react-responsive";
import { Button, Input } from "@heroui/react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const isDesktop = useMediaQuery({
    query: "(min-width: 850px)",
  });

  async function fetchImages() {
    const { data, error } = await supabase.storage
      .from("carousel")
      .list("public", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (data !== null) {
      setImages(data);
      console.log("Fetched images:", data.length);
    } else {
      //TODO handle error with a cuter message
      alert("No hay imagenes o algo malilla paso");
    }
  }

  async function uploadImage() {
    if (!image) return;

    //Las restricciones de supa me hicieron cambiar el nombre del tipo de la imagen
    const fileExt = image.name.split(".").pop().toLowerCase();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    //Subo la imagen a supa
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("carousel")
      .upload(filePath, image);

    setLoading(false);

    if (error) {
      //TODO handle error with a cuter message
      console.error("Error uploading image:", error);
    }

    if (data) {
      console.log("Image uploaded successfully:", data.name);
    }

    //Vacio el input y el state de la imagen
    fileInputRef.current.value = null;
    setImage(null);

    //Vuelvo a cargar las imagenes
    fetchImages();
  }

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="w-screen animated-background h-screen bg-gradient-to-r from-amber-200 via-yellow-400 to-yellow-600 flex flex-col justify-center gap-4">
      <Header />
      <Carousel images={images} />
      <div className="flex items-center justify-center p-4 gap-4">
        <Input
          label="Imagen"
          type="file"
          className="max-w-xs"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        >
          Añadir Imagen
        </Input>
        {loading ? (
          <Button isLoading>Subiendo Imagen</Button>
        ) : (
          <Button
            onPress={() => {
              console.log("Subiendo imagen");
              uploadImage();
            }}
            className="bg-yellow-600"
          >
            Subir Imagen
          </Button>
        )}
      </div>
    </div>
  );
}

export default App;

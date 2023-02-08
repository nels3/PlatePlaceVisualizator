import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import Map from "src/components/map/Map";
import GalleryFilters from "src/components/gallery/GalleryFilters";

import { RootState } from "src/store/store";
import Gallery from "react-photo-gallery";
import { fetchPlatesList } from "src/store/slices/plates/platesThunk";
const photos = [
  {
    src: "http://example.com/example/img1.jpg",
    width: 1,
    height: 1,
  },
  {
    src: "http://example.com/example/img2.jpg",
    width: 1,
    height: 1,
  },
];

export default function PhotoGallery() {
  const platesList = useSelector((state: RootState) => state.plates.list);

  const dispatch = useDispatch();
  useEffect(() => {
    document.title = `Gallery`;
  }, []);

  const createImagesList = () => {
    let images = [];
    platesList.map((plate) => {
      let plateTmp = {};
      plateTmp.width = 1;
      plateTmp.height = 1;
      plateTmp.src = plate.src;
      images.append(plateTmp);
    });
    return images;
  };

  let images = useMemo(() => createImagesList(), [platesList]);

  return (
    <div style={{ padding: "5px" }}>
      <GalleryFilters />
      <Gallery photos={photos} />;
    </div>
  );
}

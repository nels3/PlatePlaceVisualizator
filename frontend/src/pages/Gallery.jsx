import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import GalleryFilters from "src/components/gallery/GalleryFilters";

import { LoadingState } from "src/utils/constants";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

import { fetchPlateImage } from "src/store/slices/gallery/galleryThunk";
import {
  setPhotosLoading,
  clearChosen,
} from "src/store/slices/gallery/gallerySlice";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const breakpoints = [4320, 2160, 1080, 640, 384, 256, 128];

export default function PhotoGallery() {
  const [index, setIndex] = useState(-1);

  const platesList = useSelector((state) => state.gallery.plates);
  const photosList = useSelector((state) => state.gallery.photos);
  const chosen = useSelector((state) => state.gallery.chosen);
  const loadingStatus = useSelector((state) => state.gallery.photosLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    document.title = `Gallery`;
    dispatch(clearChosen());
  }, []);

  useEffect(() => {
    if (loadingStatus === LoadingState.pending) {
      platesList.map((plate) => {
        if (plate.image_present === "x") dispatch(fetchPlateImage(plate.id));
      });
    }
  }, [loadingStatus, platesList]);

  useEffect(() => {
    if (photosList && platesList) {
      if (
        photosList[chosen] &&
        platesList.length === photosList[chosen].length
      ) {
        dispatch(setPhotosLoading(LoadingState.fulfilled));
      }
    }
  }, [platesList, photosList]);

  const createImagesList = () => {
    let images = [];
    if (photosList && photosList[chosen]) {
      photosList[chosen].map((photo) => {
        let plateTmp = {};
        plateTmp.width = 200;
        plateTmp.height = 200;
        plateTmp.src = photo;
        images.push(plateTmp);
      });
    }
    return images;
  };

  let photos = useMemo(() => createImagesList(), [photosList]);

  const createSlidesList = () => {
    let slides = [];
    if (photosList && photosList[chosen]) {
      slides = photosList[chosen].map((photo, index) => {
        const width = 500;
        const height = 500;
        return {
          src: photo,
          key: `${index}`,
          width,
          height,
          images: breakpoints.map((breakpoint) => {
            const breakpointHeight = Math.round((height / width) * breakpoint);
            return {
              src: photo,
              width: breakpoint,
              height: breakpointHeight,
            };
          }),
        };
      });
    }
    return slides;
  };

  let slides = useMemo(() => createSlidesList(), [photosList, index]);

  return (
    <div style={{ padding: "5px" }}>
      <GalleryFilters />
      <PhotoAlbum
        layout="masonry"
        spacing="2"
        columns="4"
        onClick={({ index }) => setIndex(index)}
        photos={photos}
      />
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </div>
  );
}

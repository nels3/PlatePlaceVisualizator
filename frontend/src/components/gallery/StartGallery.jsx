import FilterSelect from "src/components/common/FilterSelect";
import Label from "src/components/common/Label";

import PhotoAlbum from "react-photo-album";

export default function StartGallery() {
  const photos = [
    { src: "img/5.jpg", width: 1500, height: 2000 },
    { src: "img/9.jpg", width: 2000, height: 1500 },
    { src: "img/11.jpg", width: 1000, height: 580 },
  ];

  return (
    <>
      <PhotoAlbum layout="masonry" spacing="2" columns="2" photos={photos} />
    </>
  );
}

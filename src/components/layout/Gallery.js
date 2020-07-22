import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import "./Gallery.css";

import ImageLoader from "../component/ImageLoader";
const Key = "1baa95454384177c798bda1b8fda590e";

const Gallery = ({ match }) => {
  const [photos, setPhotos] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [maxPage, setMaxPage] = useState(1);

  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [currentLength, setCurrentLength] = useState(0);

  useEffect(() => {
    if (match.params.groupId) {
      axios
        .get(
          `https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=${Key}&group_id=${match.params.groupId}&per_page=20&page=${pageNumber}&format=json&nojsoncallback=true`
        )
        .then((res) => {
          setPhotos((prev) => [...prev, ...res.data.photos.photo]);
          setMaxPage(res.data.photos.pages);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useEffect(() => {
    if (maxPage >= pageNumber) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [maxPage, pageNumber]);

  useEffect(() => {
    if (photos.length > 0) {
      const photosNew = [];
      const promises = [];
      photos.slice(currentLength, currentLength + 20).forEach((i) => {
        promises.push(
          axios.get(
            `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${Key}&photo_id=${i.id}&format=json&nojsoncallback=true`
          )
        );
      });
      axios.all(promises).then((results) => {
        results.forEach((result, index) => {
          if (result.data.photo) {
            photosNew.push({
              owner: result.data.photo.owner.username,
              title: result.data.photo.title._content,
            });
          } else {
            photosNew.push({
              owner: "",
              title: "",
            });
          }
        });

        setPhotosData((prev) => [...prev, ...photosNew]);
      });
    }
  }, [photos, currentLength]);

  //Infinite scroll using useRef and useCallback
  const observer = useRef();
  const bottomBoundaryRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
          setCurrentLength((prev) => prev + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div>
      {photos.length ? (
        <div className="image-wrapper container-fluid">
          {photos.map((i, index) => {
            if (photos.length === index + 1) {
              return (
                <div
                  ref={bottomBoundaryRef}
                  className="image-container"
                  key={i.id}
                >
                  {/* Lazy loads the image and keep track of the last element */}
                  <ImageLoader
                    src={`https://farm${i.farm}.staticflickr.com/${i.server}/${i.id}_${i.secret}.jpg`}
                  />
                  <div className="desc-container">
                    <div className="desc-wrapper">
                      <span>
                        {photosData[index] && photosData[index].title}
                      </span>
                      <span style={{ fontSize: "11px", display: "block" }}>
                        {photosData[index] && `By ${photosData[index].owner}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="image-container" key={i.id}>
                  <ImageLoader
                    src={`https://farm${i.farm}.staticflickr.com/${i.server}/${i.id}_${i.secret}.jpg`}
                  />
                  <div className="desc-container">
                    <div className="desc-wrapper">
                      <span>
                        {photosData[index] && photosData[index].title}
                      </span>
                      <span style={{ fontSize: "11px", display: "block" }}>
                        {photosData[index] && `By ${photosData[index].owner}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      ) : null}
    </div>
  );
};
export default Gallery;

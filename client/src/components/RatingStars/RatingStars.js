import React from "react";
import "./RatingStars.scss";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RatingStars = ({ ratingScore }) => {
  // const [rating, setRating] = useState(ratingScore);
  const tabChoice = [1, 2, 3, 4, 5];

  // const handleRating = (value) => {
  //   setRating(value);
  // };

  const changeRating = () => {
    let index = tabChoice.map((value) => {
      return (
        <span
          key={value}
          // onClick={() => handleRating(value)}
          style={{ cursor: "pointer" }}
        >
            <FontAwesomeIcon
              icon={faStar}
              size="sm"
              style={{ color: value <= ratingScore ? "#FDEB6A" : "#9999A3" }}
            />
        </span>
      );
    });

    return index;
  };

  return (
    <div>
      <div>{changeRating()}</div>
    </div>
  );
};

export default RatingStars;

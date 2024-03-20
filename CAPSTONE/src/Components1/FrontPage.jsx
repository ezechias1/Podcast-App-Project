import { useEffect, useState, useCallback } from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import Search from "./Search";
export default function FrontPage() {
  const [data, setData] = useState([]);

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const genreMap = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "news",
    9: "Kids and Family",
  };

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => res.json())
      .then((shows) => setData(shows))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const formateDate = (date) => {
    const dateAsDateTime = new Date(date);
    const formattedDate = dateAsDateTime.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };
  const convertGenre = (genres) => {
    const convertedGenres = genres.map((item) => genreMap[item]);

    return convertedGenres.join(", ");
  };

  const handleAscSort = () => {
    // Sort Data Alphabetically by Title
    const sortedData = data.sort((a, b) => {
      // Takes the current title (a) and checks it against the next title (b) to see if it's in order, if it is not, then it gets swapped (by index)
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }

      //Once the sort completed, we are given a list of indexes and it orders it as such
      return 0;
    });
    setData(sortedData);

    console.log("click", sortedData);
    return;
  };

  return (
    <div>
      <NavBar
      
        onButtonClick={() => {
          handleAscSort();
          forceUpdate();
        }}
      />
      
<Search/>
      <div className="info">
        {data.map((show) => (
          <Link to={`Episode/${show.id}`} key={show.id}>
            <div key={show.id} className="episode">
              <img src={show.image} alt={show.title} />
              <div className="episode-details">
                <h3>{show.title}</h3>

                <p>Seasons: {show.seasons}</p>
                <p>Genres: {convertGenre(show.genres)}</p>
                <p>Last Updated:{formateDate(show.updated)}</p>
                
                  
                
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


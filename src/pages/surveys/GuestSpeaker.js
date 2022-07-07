import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../../firebase-config";

function GuestSpeaker(props) {
  const [surveys, setSurveys] = useState([]);
  const [collection, setCollection] = useState([]);
  const speakers = "survey-speakers";

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();

      let speakersFiltered = data.speakers.filter((item) => item[0].length > 0);
      speakersFiltered = speakersFiltered.sort();
      setSurveys(speakersFiltered);

      // create an object in which every Key is every brand we find in the array
      let result = {};
      let counter = 0;
      // loop through the resulting array
      for (let i = 0; i < speakersFiltered.length; i++) {
        let name = speakersFiltered[i][0];
        let instructor_rate = speakersFiltered[i][2];
        if (result[name]) {
          result[name].rate += instructor_rate;

          counter += 1;
          if (speakersFiltered[i][0] !== speakersFiltered[i + 1][0]) {
            result[name].rate = Math.round(result[name].rate / counter);
          }

          // console.log(name);
        } else {
          result[name] = {
            rate: Number(speakersFiltered[i][2]),
          };
          counter = 1;
        }
      }
      setCollection(result);
      // console.log(result);
    });
  }, []);

  return (
    <div classNameName="App">
      <div className="w-full flex space-between">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>
      </div>
      <button
        classNameName="m-4 py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-black hover:bg-indigo-400 hover:text-white"
        onClick={props.logout}
      >
        Log out
      </button>
    </div>
  );
}

export default GuestSpeaker;

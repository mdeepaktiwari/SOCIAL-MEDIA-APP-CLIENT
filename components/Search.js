import { useState, useContext } from "react";
import { UserContext } from "../context";
import axios from "axios";
import People from "./cards/People";
import { toast } from "react-toastify";

const Search = () => {
  // state
  const [state, setState] = useContext(UserContext);
  // user query data
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const seachUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/search-user/${query}`);
      // set result in state after query in db
      setResult(data);
    } catch (e) {
      console.log("Error in search", e);
    }
  };

  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });

      // update local storage update user keep token
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      // update context
      setState({ ...state, user: data });
      // update people state
      let filtered = result.filter((e) => e._id !== user._id);
      setResult(filtered);
      // re render the post in news feed
      toast.success(`Following ${user.name}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnfollow = async (user) => {
    try {
      const { data } = await axios.put("/user-unfollow", {
        _id: user._id,
      });

      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      // update context
      setState({ ...state, user: data });
      // update people state
      let filtered = result.filter((e) => e._id !== user._id);
      setResult(filtered);
      // re render the post in news feed
      toast.success(`Unfollowed ${user.name}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <form className="pt-2 form-inline row" onSubmit={seachUser}>
        <div className="col-8">
          <input
            className="form-control"
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setResult([]);
            }}
          />
        </div>
        <div className="col-4 d-flex">
          <button
            disabled={!query}
            type="submit"
            className=" col-12 btn btn-sm btn-outline-secondary my-2 my-sm-0 mr-2"
          >
            Search
          </button>
        </div>
      </form>
      {/* show result using people component */}
      {query && result && (
        <People
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
          people={result}
        />
      )}
    </>
  );
};

export default Search;

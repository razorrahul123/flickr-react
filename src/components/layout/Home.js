import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import CardComponent from "../component/Card";
import PieComponent from "../component/PieChart";
import Pagination from "../component/Pagination";
import "./Home.css";

const Key = "1baa95454384177c798bda1b8fda590e";

//Enables throlling when searching groups

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

const Home = ({ history }) => {
  const [group, setGroup] = useState(null);

  const [submitGroup, setSubmitGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotatCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Triggers debounce on loading options
  const debounceOnChangeAsync = useCallback(debounce(loadOptions, 400), []);

  //Executes when user submits query or changes page

  useEffect(() => {
    if (submitGroup) {
      setLoading(true);
      axios
        .get(
          `https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=${Key}&text=${submitGroup.value}&per_page=20&page=${page}&format=json&nojsoncallback=true`
        )
        .then((res) => {
          setGroups(res.data.groups.group);
          setTotatCount(parseInt(res.data.groups.total));
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          history.push("/groups");
        });
    }
  }, [submitGroup, page, history]);

  async function loadOptions(inputText, callback) {
    const response = await axios.get(
      `https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=${Key}&text=${inputText}&per_page=10&page=1&format=json&nojsoncallback=true`
    );

    const json = response.data.groups.group;

    callback(json.map((i) => ({ label: i.name, value: i.name, id: i.nsid })));
  }

  const handleOnChange = (selectedGroup) => {
    setGroup(selectedGroup);
  };

  const handleSubmit = () => {
    setSubmitGroup(group);
  };

  const onPageChanged = (data) => {
    const { currentPage } = data;
    setPage(currentPage);
  };

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 col-md-10">
            <AsyncSelect
              onKeyDown={onEnter}
              isMulti={false}
              loadOptions={debounceOnChangeAsync}
              value={group}
              onChange={handleOnChange}
              placeholder="Search Groups..."
            />
          </div>
          <div className="col-4 col-md-2  button-container">
            <button
              className="button-wrapper btn btn-primary"
              onClick={handleSubmit}
            >
              Get results
            </button>
          </div>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        {groups.length && !loading ? (
          <div>
            <PieComponent
              data={groups.map((i) => ({
                id: i.name,
                value: parseInt(i.pool_count),
                label: i.name,
              }))}
            />
            <CardComponent data={groups} />
          </div>
        ) : loading ? (
          <div style={{ position: "relative", width: 0, height: "auto" }}>
            <div className="loader-container">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="pagination-container">
        <div className="d-flex flex-row py-4 align-items-center">
          {totalCount > 0 ? (
            <Pagination
              loading={loading}
              totalRecords={totalCount}
              pageLimit={20}
              pageNeighbours={1}
              onPageChanged={onPageChanged}
            />
          ) : null}
        </div>
      </div>
      {/* {loading ? (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : null} */}
    </div>
  );
};
export default Home;

import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import Truncate from "react-truncate";

const CardComponent = ({ data }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        {data.map((item) => (
          <div
            className="col-6 col-md-4 col-lg-3 card-container"
            key={item.nsid}
          >
            <div className="card card-wrapper">
              <Link to={`/groups/${item.nsid}`}>
                <div className="card-body row">
                  <div className="col-md-3">
                    <img
                      src={`https://live.staticflickr.com/${item.iconserver}/buddyicons/${item.nsid}.jpg`}
                      className="rounded-circle"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-9">
                    <div
                      className="card-title"
                      data-toggle="tooltip"
                      title={item.name}
                    >
                      <Truncate lines={1} ellipsis={<span>...</span>}>
                        {item.name}
                      </Truncate>
                    </div>
                    <div>
                      <span className="card-text member-container">
                        <i
                          className="fa fa-users icon-container"
                          aria-hidden="true"
                        ></i>
                        {item.members}
                      </span>
                      <span className="card-text">
                        <i
                          className="fa fa-picture-o icon-container"
                          aria-hidden="true"
                        ></i>
                        {item.pool_count}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComponent;

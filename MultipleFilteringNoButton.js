import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

const BrPostApi = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState({
    applicationType: "",
    applicantName: "",
    district: "",
    localityName: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await axios.post(
      "https://backend.ts-bpass.com/api/v1/citizen_search/search_by_params",
      {},
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(data.data.data);
    setApplications(data.data.data.applications);
  };

  const changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const filteredApplications = applications.filter(
    (each) =>
      (search.applicationType
        ? each.application_type
            .toLowerCase()
            .includes(search.applicationType.toLowerCase())
        : true) &&
      (search.district
        ? each.district_name
            .toLowerCase()
            .includes(search.district.toLowerCase())
        : true) &&
      (search.applicantName
        ? each.applicant_name
            .toLowerCase()
            .includes(search.applicantName.toLowerCase())
        : true) &&
      (search.localityName
        ? each.locality
            .toLowerCase()
            .includes(search.localityName.toLowerCase())
        : true)
  );
  console.log(search);
  console.log(filteredApplications);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to Website</h1>
      <div>
        <input
          type="text"
          className="m-2"
          placeholder="Application Type"
          name="applicationType"
          value={search.applicationType}
          onChange={changeHandler}
        />
        <input
          type="text"
          className="m-2"
          placeholder="Applicant Name"
          name="applicantName"
          value={search.applicantName}
          onChange={changeHandler}
        />
        <input
          type="text"
          className="m-2"
          placeholder="District"
          name="district"
          value={search.district}
          onChange={changeHandler}
        />
        <input
          type="text"
          className="m-2"
          placeholder="Locality"
          name="localityName"
          value={search.localityName}
          onChange={changeHandler}
        />
      </div>
      <Table applications={filteredApplications} />
    </div>
  );
};
export default BrPostApi;

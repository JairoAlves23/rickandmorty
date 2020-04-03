import React, { useState, useEffect } from "react";
//import Axios from "../config/base"
import TablePagination from "@material-ui/core/TablePagination";
import axios from "axios";

const Main = props => {
  const [page, setPage] = useState(1);
  const [newUrl, setNewUrl] = useState();
  const [valueCount, setValueCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [oldPage, setOldPage] = useState(1);
  const [changePage, setChangePage] = useState(0);
  const [results, setResults] = useState([]);
  const [info, setInfo] = useState([]);

  const URL = `https://rickandmortyapi.com/api/character/?page=1`;

  useEffect(() => {
    async function seachData() {
      try {
        const response = await axios.get(URL);
        //console.log(response)
        const rawCharacter = await response.data.results;
        const rawInfo = await response.data.info;
        setResults(rawCharacter);
        setInfo(rawInfo.next);
        setNewUrl(URL);
        setValueCount(rawInfo.count);
        setIsLoading(false)
      } catch (error) {}
    }
    seachData();
  }, []);

  useEffect(() => {
    async function seachData() {
      setIsLoading(true)
      try {
        const response = await axios.get(newUrl);
        const rawCharacter = await response.data.results;
        const rawInfo = await response.data.info;
        setResults(rawCharacter);
        setInfo(rawInfo);
        setIsLoading(false)
      } catch (error) {}
    }
    seachData();
  }, [page]);

  const { count, pages, next, prev } = info;

  const handleChangePage = (event, changePage) => {
    event.preventDefault();
    console.log('O link foi clicado.');
    setChangePage(changePage);
    if (changePage === oldPage || changePage > oldPage) {
      //page == pages?setPage(page):setPage(page + 0.5)
      setPage(page + 0.5);
      setOldPage(changePage);

      if (!Number.isInteger(page)) {
        setNewUrl(next);
      }
    }

    if (changePage < oldPage) {
      //page == pages?setPage(page + 0.5):setPage(page - 0.5)
      setPage(page - 0.5);
      setOldPage(changePage);
      if (Number.isInteger(page)) {
        setNewUrl(prev);
      }
    }
  };

  const listIndex = page % 1 ? (_, index) => index > 9 : (_, index) => index < 10;
  //const newIndex =  typeof index10 === "undefined" ? (_, index) => index > 9 : index10;

  return (
    isLoading ? <h1>isLoading...</h1>:
    <div>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={valueCount ? valueCount : 1}
        rowsPerPage={10}
        page={changePage}
        onChangePage={handleChangePage}
      />

      <ul>
        {results.filter(listIndex).map(item => (
          <li key={item.id}>
            <img src={item.image}></img>
            {item.id}
            {item.status}
            {"------"}
            {item.name}
            {"------"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;

import React, { useState, useEffect } from "react";
import Axios from "../config/base";
import TablePagination from "@material-ui/core/TablePagination";

const Main = props => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [oldPage, setOldPage] = useState(1);
  const [changePage, setChangePage] = useState(0);
  const [results, setResults] = useState([]);
  const [info, setInfo] = useState([]);

  const URL = `/?page=${page ? page : 0}`;

  useEffect(() => {
    Axios.get(`${URL}`).then(resp => {
      const rawCharacter = resp.data.results;
      const arCharacter = [];
      if (!lastPage) {
        for (let key in rawCharacter) {
          if (key < 10) {
            arCharacter.push({
              ...rawCharacter[key]
            });
          }
        }
        setResults(arCharacter);
      } 
      
      if (lastPage) {
          console.log('Entrou Aqui')
          for (let index = 11; index < rawCharacter; index++) {
            arCharacter.push({
                ...rawCharacter[index]
              }); 
          }
          setResults(arCharacter);
      }
    });
    Axios.get(`${URL}`).then(res => setInfo(res.data.info));
  }, [page]);

  const { count, pages } = info;

  const handleChangePage = (event, changePage) => {
    setChangePage(changePage);
    if (changePage === oldPage || changePage > oldPage) {
      setPage(page + 0.5);
      setOldPage(changePage);
      console.log(page);
      console.log(pages);

      if (page == pages) {
        setPage(pages);
        setLastPage(true);
      }
    }

    if (changePage < oldPage) {
      setPage(page - 0.5);
      setOldPage(changePage);
      setLastPage(false);
    }
  };

  return (
    <div>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={count ? count : 0}
        rowsPerPage={10}
        page={changePage}
        onChangePage={handleChangePage}
      />
      <ul>
        {results.map(item => (
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

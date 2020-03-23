import React, { useState, useEffect } from "react"
import Axios from "../config/base"
import TablePagination from "@material-ui/core/TablePagination"

const Main = props => {
  const [page, setPage] = useState(1)
  const [oldPage, setOldPage] = useState(1)
  const [changePage, setChangePage] = useState(0)
  const [results, setResults] = useState([])
  const [info, setInfo] = useState([])

  

  const URL = `/?page=${page ? page : 0}`

  useEffect(() => {
    Axios.get(`${URL}`).then(resp => {
      const rawCharacter = resp.data.results
      //console.log(resp.data.results.length)
      const arCharacter = [];
      for (let key in rawCharacter) {
        if(key < 10) {
            arCharacter.push({
              ...rawCharacter[key],
            }
            )
          }
        }  
        setResults(arCharacter)
    }  
    )
    Axios.get(`${URL}`).then(res => setInfo(res.data.info))
  },[page]);

    
  const { count, pages, next, prev } = info
  console.log(info)

  //console.log(info)

  

  const handleChangePage = (event, changePage) => {
    setChangePage(changePage)
    if (changePage === oldPage || changePage > oldPage) {
      
      //page == pages?setPage(page):setPage(page + 0.5)
      setPage(page + 0.5)
      setOldPage(changePage)
      console.log(`${page} page`) 
      console.log(`${pages} pages`)  
     
    }

    if (changePage < oldPage) {
      //page == pages?setPage(page + 0.5):setPage(page - 0.5)
      setPage(page - 0.5)
      setOldPage(changePage)
      console.log(`${changePage} changePage`) 
      console.log(`${oldPage} oldPage`) 
      console.log(`${page} page`) 
      console.log(`${pages} pages`)
      //console.log(results)
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

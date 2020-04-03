import React, { useState, useEffect } from "react";
import axios from "axios";
//import Axios from "../config/base"

import TablePagination from "@material-ui/core/TablePagination";
import { ProgressBar } from "primereact/progressbar";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import "./style.css";

const Main = props => {
  const [page, setPage] = useState(1);
  const [newUrl, setNewUrl] = useState();
  const [valueCount, setValueCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setVisible] = useState(false);
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
        setIsLoading(false);
      } catch (error) {}
    }
    seachData();
  }, []);

  useEffect(() => {
    async function seachData() {
      setIsLoading(true);
      try {
        const response = await axios.get(newUrl);
        const rawCharacter = await response.data.results;
        const rawInfo = await response.data.info;
        setResults(rawCharacter);
        setInfo(rawInfo);
        setIsLoading(false);
      } catch (error) {}
    }
    seachData();
  }, [page]);

  const { count, pages, next, prev } = info;

  const handleChangePage = (event, changePage) => {
    event.preventDefault();
    console.log("O link foi clicado.");
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

  const listIndex =
    page % 1 ? (_, index) => index > 9 : (_, index) => index < 10;
  //const newIndex =  typeof index10 === "undefined" ? (_, index) => index > 9 : index10;

  const markAsPending = (item) => {
    console.log(item.name)
  }

  return (
    //isLoading ? <h1>isLoading...</h1>:
    isLoading ? (
      <ProgressBar mode="indeterminate" style={{ height: "6px" }}></ProgressBar>
    ) : (
      <div>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={valueCount ? valueCount : 1}
          rowsPerPage={10}
          page={changePage}
          onChangePage={handleChangePage}
        />

        <div className="profile-container">
          {results.filter(listIndex).map(item => (
            <div key={item.id}>
              <Card
                title={`Name: ${item.name}`}
                subTitle={`Status: ${item.status}`}
                style={{
                  width: "360px",
                  boxShadow: "9px 7px 5px rgba(50, 50, 50, 0.77)",
                  borderRadius: "2em"
                }}
                className="ui-card-shadow"
                footer={`Species: ${item.species}`}
                header={<img src={item.image}></img>}
              >
                <div>{`Id: ${item.id}`}</div>
                <Dialog
                  baseZIndex={item.id}
                  header={`Name: ${item.name}`}
                  visible={isVisible}
                  style={{ width: "50vw" }}
                  modal={true}
                  onHide={() => setVisible(false)}
                >
                  {item._id} ----- The story begins as Don Vito Corleone, the
                  head of a New York Mafia family, oversees his daughter's
                  wedding. His beloved son Michael has just come home from the
                  war, but does not intend to become part of his father's
                  business. Through Michael's life the nature of the family
                  business becomes clear. The business of the family is just
                  like the head of the family, kind and benevolent to those who
                  give respect, but given to ruthless violence whenever anything
                  stands against the good of the family.
                </Dialog>

                <Button
                  label="Show"
                  icon="pi pi-info-circle"
                  onClick={e => {setVisible(!isVisible) 
                    markAsPending(item)
                  }}
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Main;

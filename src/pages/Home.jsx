import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../utilities/constants";
import UserData from "../components/UserData";
import {UserContext, SelectedUserContext} from "../utilities/UserContext";
import Pagination from "../components/Pagination";

const Home = () => {
  const {allData, setAllData} = useContext(UserContext);
  const {selectedUser, setSelectedUser} = useContext(SelectedUserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage]=useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);

  //fetching data
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL, { method: "GET" });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setAllData(data);
        // setFilteredItems(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    setFilteredItems(allData)
  },[allData])

  //handle search query
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    const filteredData = allData.filter((item) => {
      const searchTerms = searchQuery.toLowerCase().split(" ");
      return searchTerms.every((term) =>
        [item.name, item.email, item.role].some((attribute) =>
          attribute.toLowerCase().includes(term)
        )
      );
    });

    setFilteredItems(filteredData);
  };


  const handleSelectedDelete=()=>{
    if(selectedUser.length > 0){
      const updatedItems = allData.filter((item) => !selectedUser.includes(item.id));
      if(confirm(`Are you sure you want to delete the selected items?`)){
        setAllData(updatedItems);
        setSelectedUser([]);
      }
    } else{
      alert("Nothing to delete... \nSelect something to delete!");
    }
  }


  //Pagination
  const lastUserIndex = currentPage * dataPerPage
  const firstUserIndex = lastUserIndex - dataPerPage
  const currentPosts = allData.slice(firstUserIndex, lastUserIndex);
  const filteredPost = filteredItems.slice(firstUserIndex, lastUserIndex)

  return (
    <div className="my-3">
      <div className="flex justify-center my-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name, email or role..."
          className="w-[90%] py-2 px-4 border-2 focus:outline-none rounded-lg"
        />
      </div>
      <div className="flex justify-center items-center text-center flex-col">
        {searchQuery ? (
          filteredItems.length == 0 ? (
            <h1>No Data matches your search query</h1>
          ) : (
            <>
              <UserData data={filteredPost} />
              <div className="flex mt-4">
                <div className="flex">
                  <button className="bg-red-500 px-5 py-2 rounded-xl text-white font-semibold text-md w-[fit-content]"
                    onClick={handleSelectedDelete}
                  >
                    Delete Selected
                  </button>
                  <div>
                    <Pagination totalData={filteredItems.length} dataPerPage={dataPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                  </div>
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <UserData data={currentPosts} />
            <div className="flex mt-4">
              <div className="flex">
                <button className="bg-red-500 px-5 py-2 rounded-xl text-white font-semibold text-md w-[fit-content]"
                  onClick={handleSelectedDelete}
                >
                  Delete Selected
                </button>
                <div>
                  <Pagination totalData={allData.length} dataPerPage={dataPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
    </div>
  );
};

export default Home;

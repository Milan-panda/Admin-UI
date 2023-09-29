import React, { useContext, useEffect, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { UserContext, SelectedUserContext } from "../utilities/UserContext";
import EditModal from "./EditModal";

const UserData = ({ data }) => {
  const { selectedUser, setSelectedUser } = useContext(SelectedUserContext);
  const { allData, setAllData } = useContext(UserContext);

  const [selectAll, setSelectAll] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setSelectAll(selectedUser.length === data.length);
  }, [selectedUser, data]);

  const handleEdit = (itemToEdit) => {
    setEditItem(itemToEdit);
    setShowEditModal(true);
  };

  const handleSingleDelete = (itemToDelete) => {
    if (
      confirm(
        `Are you sure you want to delete \n id: ${itemToDelete.id} \n name: ${itemToDelete.name} \n email: ${itemToDelete.email}`
      )
    ) {
      setAllData((prevData) =>
        prevData.filter((item) => item !== itemToDelete)
      );
    }
  };

  const handleChange = (itemId) => {
    if (selectedUser.includes(itemId)) {
      setSelectedUser((prevData) => prevData.filter((id) => id !== itemId));
    } else {
      setSelectedUser((prevData) => [...prevData, itemId]);
    }
  };

  const handleAllSelected = () => {
    if (selectAll) {
      setSelectedUser([]);
    } else {
      const allItemIds = data.map((item) => item.id);
      setSelectedUser(allItemIds);
    }
  };

  return (
    <>
      {data ? (
        <table className="w-[90%]">
          <thead>
            <tr className="border-b-2 [&>*]:py-2">
              <th>
                <input
                  type="checkbox"
                  onChange={handleAllSelected}
                  checked={selectAll}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b-2 [&>*]:py-2">
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleChange(item.id)}
                    checked={selectedUser.includes(item.id)}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button className="mx-1" onClick={() => handleEdit(item)}>
                    <FiEdit />
                  </button>
                  <button
                    className="mx-1"
                    onClick={() => handleSingleDelete(item)}
                  >
                    <MdOutlineDeleteForever className="text-red-600 text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>Fetching data please wait...</h1>
      )}

      {showEditModal && (
        <EditModal
          item={editItem}
          onSave={(editedUserData) => {
            const updatedUsers = allData.map((item) =>
              item.id === editedUserData.id ? editedUserData : item
            );
            setAllData(updatedUsers);
            console.log("Edited user data:", editedUserData);
            setShowEditModal(false);
          }}
          onClose={() => {
            setShowEditModal(false);
            setEditItem(null);
          }}
        />
      )}
    </>
  );
};

export default UserData;

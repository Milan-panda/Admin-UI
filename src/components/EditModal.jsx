import React, { useState, useEffect } from "react";

const EditModal = ({ item, onSave, onClose }) => {
  const [editedItem, setEditedItem] = useState(item);

  useEffect(() => {
    setEditedItem(item);
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({
      ...editedItem,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedItem);
    onClose();
  };

  const handleOnClose = (e)=>{
    if(e.target.id === 'container') onClose();  
  }

  return (
    <div id="container" onClick={handleOnClose} className="fixed bg-black inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-lg w-[30%]">
        <div className="p-7">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl">Edit User</h2>
            <span
              className="text-xl bg-red-200 rounded-full px-[9px] py-[1px] text-red-800 cursor-pointer"
              onClick={onClose}
            >
              X
            </span>
          </div>
          <form>
            <div className="block text-start my-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Id:
              </label>
              <input
                type="number"
                name="id"
                value={editedItem.id}
                disabled
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm p-3 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none"
              />
            </div>
            <div className="block text-start my-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={editedItem.name}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm p-3 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none"
              />
            </div>
            <div className="block text-start my-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={editedItem.email}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm p-3 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none"
              />
            </div>
            <div className="block text-start my-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Role:
              </label>
              <input
                type="text"
                name="role"
                value={editedItem.role}
                disabled
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm p-3 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none"
              />
            </div>
            <button onClick={handleSave} className="bg-blue-400 px-5 py-2 rounded-xl text-white font-semibold text-md w-[fit-content] mt-6 ">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

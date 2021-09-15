import React ,{useState, useEffect }from "react";
import "./Style.css";

// get the localStorage data back

const getLocalData =() => {
  const lists = localStorage.getItem("mytodolist");
  if(lists){
    return JSON.parse(lists);
  }else{
    return[];
  }
};

const  User = ( ) => {
  const [inpudata , setInputData] = useState(" ");
  const [ items, setItems] = useState (getLocalData());
  const [isEditItems, setIseditItem] = useState("");
  const  [toggleButton, setToggleBotton] = useState( false);
  // add the items function
  const  addItem = ( ) => {
    if(!inpudata){
      alert("please fill the data");
    } else if(inpudata && toggleButton){
      setItems(
        items.map((curElem) => {
          if(curElem.id === isEditItems){
            return {...curElem, name : inpudata};
          }
          return curElem;
        })
      );
      setInputData (" ");
      setIseditItem (null);
      setToggleBotton(false);
    }
    else{
      const myNeewInputData = { 
        id: new Date().getTime().toString(),
        name:inpudata,
      };
      setItems([ ... items,myNeewInputData ]);
      setInputData("") ;
    }
  }
// edit the items

const editItem = (index) =>{
  const item_todo_edited = items.find((curElem) =>{
    return curElem.id === index;
  } );
  setInputData(item_todo_edited.name);
setIseditItem(index);
setToggleBotton(true);
};
  // how to delete items section
   const deleteItem =( index) =>{
     const updatedItems = items.filter((curElem) =>{
       return curElem.id !== index
     });
     setItems(updatedItems);
   };

   const removeAll = () =>{
     setItems([])
   };

   // adding localStorage

   useEffect (() => {
     localStorage.setItem("mytodolist",JSON.stringify(items));
   } ,[items]);




    return (
      <>
        <div className="main-div">
          <div className="child-div">
            <figure>
              <figcaption>Todo List</figcaption>
            </figure>

            <input type="text" name=""  placeholder="Input Your Todo List"
             className="form-control" 
             value= { inpudata}
             onChange={(event) => setInputData(event.target.value) }
               />
               { toggleButton ? ( 
             <i className="fa fa-pencil-square" onClick ={addItem} ></i>
               ) :(  
             <i className="fa fa-plus" onClick ={addItem} ></i>
             )}
 
             {/* {show aur items} */}

<div className="showItems"> 
{items.map((curElem, index) => {
  return(
<div className="eachItem" key ={curElem.id}>
    <h3>{curElem.name} </h3>
    <div className="todo-btn">
    <i className="fa fa-pencil-square"
      onClick = {
        () => editItem(curElem.id)
      }
    ></i>
    <i className="fa fa-trash-o" onClick ={() => deleteItem(curElem.id)}></i>
    </div>
  </div>
  );
}
)}
  
</div>



             {/* {remove all button} */}
             <div className="showItems">
               <button className="btn effect04" data-sm-link-text="Remove All" onClick ={removeAll}>
              <span>Clear Items</span>
               </button>

             </div>
          </div>
        </div>
      </>
    );
  }
  
  export default User;  
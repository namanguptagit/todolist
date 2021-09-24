import React from 'react'
import "./style.css"
import { useState ,useEffect} from 'react'
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
};
const Todo = () => {
    const [inputdata , setInputdata] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const addItem = () =>{
        if(!inputdata){
            alert('plz fill the data')
        }
        else if(inputdata && toggleButton){
          setItems(
              items.map((currElem) => {
               if(currElem.id === isEditItem){
                   return {...currElem, name : inputdata }
               }
               return currElem;
              })
          )   
          setInputdata("");
          setIsEditItem(null);
          setToggleButton(false); 
        }
            else{
                const myNewInputData = {
                    id: new Date().getTime().toString(),
                    name: inputdata
                }
             setItems([...items, myNewInputData]);
             setInputdata("");
            }
       
    };

    const deleteItem=(index) => {
        const updatedItem = items.filter((currElem)=>{
            return currElem.id !==index;
        })
        setItems(updatedItem)
    }
    const removeAll=()=>{
        setItems([]);
    }
    const editItem=(index)=>{
      const item_todo_edited = items.find((currElem) =>{
          return currElem.id === index;
      });
      setInputdata( item_todo_edited.name);
      setIsEditItem(index);
      setToggleButton(true);
    };
    useEffect(() => {
        localStorage.setItem("mytodolist",JSON.stringify(items))
    }, [items]);
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here 👍</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder= "✍ Add Item" className="form-control" value={inputdata} onChange={(event)=>setInputdata(event.target.value)}/>
                        {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}

                    </div>
                    <div className="showItems">
                        {items.map((currElem,index)=>{
                            return(
                            <div className="eachItem" key={currElem.id}>
                            <h3>{currElem.name}</h3>
                            <div className="todo-btn">
                            <i class="far fa-edit add-btn " onClick={()=>editItem(currElem.id)}></i>
                            <i class="far fa-trash-alt add-btn "onClick={()=>deleteItem(currElem.id)}></i>
                            </div>
                            </div>
                            )
                        })
                        }
                        
                        
                    </div>
                    <div className="showItems"><button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button></div>
                </div>
            </div>
        </>
    )
}

export default Todo

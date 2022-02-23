import React,{useState,useEffect} from 'react'
import './main.css';
import axios from 'axios'
import { faEdit,faTrash, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CRUD(){

  const [data,setData]=useState([])
  const [fetch,setFetch]=useState(false)
  const [item,setItem]=useState({id:null,title:""})
  const [checkForUpdate,setCheckForUpdate]=useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: response} = await axios.get('http://127.0.0.1:8000/app/crud_get_post')
        setData(response);
      } catch (error) {
        console.error("error");
      }
    }
    fetchData();
  }, [fetch]);


  const handlechange=(event) => {
    setItem({...item, title:event.target.value, })
    }
    
   const handleSubmit = async () => {
        try {
            const resp = await axios.post('http://127.0.0.1:8000/app/crud_get_post/',item)
            setFetch(fetch)
            console.log(resp.data)
        } 
        catch (err) {
            console.log("error")
        }
    }   
  
    const Edit=(item) => {
        setCheckForUpdate(true)
        setFetch(fetch)
        setItem(item)   
    }  
    
    const handleEdit = async () => {
        try {
            const resp = await axios.put(`http://127.0.0.1:8000/app/crud_update_delete/${item.id}/`,
            {
                title:item.title,     
            })
            setFetch(fetch)
            setCheckForUpdate(false)
            console.log(resp.data)
        } catch (err) {
            console.error("error")
        }
    }

    const handleDelete = async item => {

        try {
            const resp = await axios.delete(`http://127.0.0.1:8000/app/crud_update_delete/${item.id}/`)
            setFetch(!fetch)  
            console.log(resp.data);
             
        }   
        catch (err) {
            console.log("error")
        }
    }

    return(
        
        <div className="crud-container">
            <div className="crud-header">
                <form onSubmit={event=>(checkForUpdate)?handleEdit(event):handleSubmit(event) }>
                    <div className="crud-wrapper">   
                        <input 
                            type="text" 
                            className="crud-form-input" 
                            onChange={event=>handlechange(event)} 
                            value={item.title} 
                            placeholder="add item " 
                        />
                        <button 
                            className="submit-button" 
                            type="submit" 
                            value="Add">
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button> 
                     </div>
                </form>   
            </div>
              
            {data.map(item => ( 
                <div key={item.id} className="crud-list">  
                    <div className="crud-list-item"> 
                        {item.title}
                    </div>
                    <button onClick={()=> Edit(item)} 
                        className="button edit-button">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>         
                    <button onClick={()=> handleDelete(item)} 
                        className="button delete-button">
                        <FontAwesomeIcon icon={faTrash} />
                     </button>    
                </div>
            ))}
        </div>
    )
}
export default CRUD
       
 
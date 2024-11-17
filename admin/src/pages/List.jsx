import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {

    try {
      const response = await axios.get(backendUrl + '/api/product/list',{headers:{token}});
      if(response.status === 200) 
      {
        setList(response.data.products);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  
  };
  useEffect(() => {
    fetchList();
  }, []);
  const handleDelete = async (id) =>{
    try {
      const response = await axios.post(backendUrl + '/api/product/remove' , {id}, {headers:{token}});
      if(response.status === 200) {
        toast.success("Xóa thành công");
        await fetchList();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }
  return (
    <>
      <b className="mb-2 text-red-500 text-2xl">Tất cả sản phẩm</b>
      <div className="flex flex-col gap-2 ">
  
        
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center  py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>

        </div>
        {
          list.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center  py-1 px-2 border bg-white text-sm">
              <img src={item.image[0]} alt={item.name} className="w-12 h-10" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency} {item.price}</p>
              <p onClick={()=>handleDelete(item._id) } className='md:text-center text-right cursor-pointer '>Delete</p>

              {/* <div className="md:text-center text-right cursor-auto text-lg">
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </div> */}
            </div>
          ))
        }
      </div>
    </>
  );
};

export default List;
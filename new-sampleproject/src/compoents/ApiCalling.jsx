import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ApiCalling() {
    console.log("hello");
    
    const [products,setProducts] = useState([]);
    useEffect(()=>{
             axios.get("https://fakestoreapi.com/products")
            .then((res)=> setProducts(res.data)
    )
    },[])
    
    
  return (
    <div>
        {
         products.map(() => (
            <h1>{product.title}</h1>
          ))
        }
    </div>
  )
}
+
export default ApiCalling
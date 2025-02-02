import React, {useState} from 'react'


function BaseTemplate() {

    const [page , setPage] = useState(0);


  return (
    <div style={{ 
      width: '100%', 
      height: '98vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'flex-start', 
      marginTop: "2vh" ,
      marginLeft : "125%"
    }}>
      <div style={{ width: '100%', height: '10vh', backgroundColor: "black", border: "2px solid black", borderRadius: "10px", display: "inline-block", flexDirection: "row", justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: 'flex', background: "black", width: "200px", justifyContent: "center", border: "2px solid", borderColor: "#00A386", borderRadius: "10px", margin: "10px" }} onClick={() => setPage(0)}>
            <p style={{ textAlign: "center" }}>Graph To Code</p>
          </div>
    
          <div style={{ display: 'flex', background: "black", width: "200px", justifyContent: "center", border: "2px solid", borderColor: "#00A386", borderRadius: "10px", margin: "10px" }} onClick={() => setPage(1)}>
            <p style={{ textAlign: "center" }}>Code To Graph</p>
          </div>
        </div>
      </div>
    
    
    </div>
  )
}

export default BaseTemplate
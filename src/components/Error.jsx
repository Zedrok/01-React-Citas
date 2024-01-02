import { useState, useEffect } from "react"

const Error = ({ children }) => {
  return (
    <div className="bg-red-800 text-white text-center p-3 uppercase rounded-lg font-bold mb-3">
          <p>{ children }</p>
    </div>
  )
}

export default Error

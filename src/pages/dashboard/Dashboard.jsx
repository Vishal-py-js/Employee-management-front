import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import EmployeeTable from '../../components/table/Table'
import AddEmployeeModal from '../../components/add-employee/AddEmployeeModal'
import Button from '../../components/button/Button'
import AddDepartmentModal from '../../components/add-department/AddDepartmentModal'
import axios from 'axios'

function Dashboard() {

  const[employees, setEmployees] = useState(null)
  const[showEmpModal, setShowEmpModal] = useState(false)
  const[showDepModal, setShowDepModal] = useState(false)
  const[search, setSearch] = useState(null)
  const[updateTable, setUpdateTable] = useState(false)

  useEffect(() => {
    if(employees&&employees.length>0){
      let arr = [...employees]
      let arr1 = arr.filter((item) => {
        return item.name.startsWith(search)
      })
      setEmployees(arr1)
    }
  }, [search])

  const handleOuterClick = (e) => {
    setShowEmpModal(false)
    setShowDepModal(false)
    e.stopPropagation()
  }

  const getEmployees = async() => {
    try{
      let data = await axios.get(`${import.meta.env.VITE_BASE_URL}/employees`)
      setEmployees(data.data)
    } catch(err){

    }
  }

  useEffect(() => {
    getEmployees()
  }, [updateTable])


  return (
    <div className='container'>
      <div className='actions'>
        <div className='searchbar'>
          <input 
            type='text' 
            placeholder='Search by name or department..'
            onChange={(e)=>setSearch(e.target.value)}
          />
          <img src="assets/icons/search.svg" alt="search"/>
        </div>
        <div className='buttons'>
          <Button onClick={()=>setShowDepModal(true)} text="Add Department"/>
          <Button onClick={()=>setShowEmpModal(true)}text="Add Employee"/>
          
        </div>
      </div>
      <EmployeeTable update={updateTable} data={employees}/>
      {
        showEmpModal&&<AddEmployeeModal update={setUpdateTable} handleClose={handleOuterClick}/>
      }
      {
        showDepModal&&<AddDepartmentModal handleClose={handleOuterClick}/>
      }
    </div>
  )
}

export default Dashboard
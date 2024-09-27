import React, { useEffect, useState } from 'react'
import "./employee.css"
import Button from '../button/Button'
import axios from 'axios'


function AddEmployeeModal({ handleClose, update }) {
    const[details, setDetails] = useState({name:"", department:"", address:""})
    const[success, setSuccess] = useState(false)
    const[departments, setDepartments] = useState(null)

    const handleChange = (e) => {
        setDetails({...details, [e.target.name]: e.target.value})
    }

    const getDepartments = async() => {
        const data = await axios.get(`${import.meta.env.VITE_BASE_URL}/department`)
        setDepartments(data.data)
    }

    useEffect(() => {
        getDepartments()
    }, [])


    const addEmployee = async() => {
        let data = await axios.post(`${import.meta.env.VITE_BASE_URL}/employees/`, details)
        const removeSuccess = () => {
            setSuccess(false)
            setDetails({name:"", department:"", address:""})
            update((prev) => !prev)
        }
        if(data.status===201){
            setSuccess(true)
            setTimeout(removeSuccess, 2000)
        }
    }


    return (
        <div onClick={handleClose} className='modal1'>
            <div className='cont' onClick={(e)=>e.stopPropagation()}>
                <h3>ADD EMPLOYEE</h3>
                
                <div className='input-cont'>
                    <input
                        name='name'
                        placeholder='Enter name'
                        onChange={handleChange}
                        value={details.name}
                    />
                    <label className="select">
                        <select
                            name='department'
                            onChange={handleChange}
                            value={details.department}
                        >
                            <option>Select department</option>
                            {
                                departments&&departments.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </label>
                    <input
                        placeholder='Enter address'
                        onChange={handleChange}
                        value={details.address}
                        name='address'
                    />
                </div>
                {
                    success&&
                    <div class="alert alert-success" role="alert">
                    Employee added successfully
                    </div>
                }
                <Button onClick={addEmployee} text="Add Employee" />
            </div> 
        </div>
    )
}

export default AddEmployeeModal
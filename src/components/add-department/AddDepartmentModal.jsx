import React, { useState } from 'react'
import "../add-employee/employee.css"
import Button from '../button/Button'
import axios from 'axios'


function AddDepartmentModal({ handleClose }) {
    const[details, setDetails] = useState({name:"", description:""})
    const[success, setSuccess] = useState(false)

    const handleChange = (e) => {
        setDetails({...details, [e.target.name]: e.target.value})
    }

    const addDepartment = async() => {
        let data = await axios.post(`${import.meta.env.VITE_BASE_URL}/department/`, details)
        const removeSuccess = () => {
            setSuccess(false)
            setDetails({name:"", description:""})
        }
        if(data.status===201){
            setSuccess(true)
            setTimeout(removeSuccess, 2000)
        }
    }

    return (
        <div className='modal1' onClick={handleClose}>
            <div className='cont' onClick={e => e.stopPropagation()}>
                <h3>ADD DEPARTMENT</h3>
                
                <div className='input-cont'>
                    <input
                        placeholder='Enter name'
                        value={details.name}
                        name='name'
                        onChange={handleChange}
                    />
                    <input
                        placeholder='Enter description'
                        value={details.description}
                        name='description'
                        onChange={handleChange}
                    />
                </div>
                {
                    success&&
                    <div class="alert alert-success" role="alert">
                    Department added successfully
                    </div>
                }
                <Button onClick={addDepartment} text="Add Department" />
            </div> 
        </div>
    )
}

export default AddDepartmentModal
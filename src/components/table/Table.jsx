import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import "./Table.css"
import axios from 'axios';

function EmployeeTable({ data, update }) {

    const[departments, setDepartments] = useState(null)

    const findName = (id) => {
        if(departments!==null && departments.length>0){
            let found =  departments.find((item) => item.id===id)
            console.log(found);
            if(found?.name){
                return found?.name
            }
        }
    }

    const getDepartments = async() => {
        const dta = await axios.get(`${import.meta.env.VITE_BASE_URL}/department`)
        setDepartments(dta.data)
    }

    useEffect(() => {
        getDepartments()
    }, [update])

    return (
        <Table className='tab' striped bordered hover>
            <thead>
                <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {
                    data&&data.length>0?
                    data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{findName(item.department)}</td>
                            {/* <td>{item.department}</td> */}
                            <td>{item.address}</td>
                        </tr>
                    ))
                    :"No records"
                }    
            </tbody>
        </Table>
    )
}

export default EmployeeTable
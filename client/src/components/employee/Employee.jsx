import React , { useState, useEffect } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form, Button, ListGroup, Card, CardHeader } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
// import './employee.css';

export  const Employee= () => {
    const [societies, setSocieties] = useState([]);
    const [departments, setDepartments] = useState([]); 
    const [workhours, setWorkhours] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [newEmployee, setNewEmployee] = useState({
        name: "",
        firstname: "",
        id_departments:"",
        id_societies: "",
        id_work_hours:"",
    });
    const [editedEmployee, setEditedEmployee] = useState({
        name: "",
        firstname: "",
        id_departments:"",
        id_societies: "",
        id_work_hours:"",
    });

    const editEmployee = (employee) => {
        setIsEditing(employee.id);
        setEditedEmployee({
            name: employee.name,
            firstname: employee.firstname,
            id_departments: employee.id_departments,
            id_societies: employee.id_societies,
            id_work_hours: employee.id_work_hours,
        });
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/employees");
            console.log("Response data:", response.data); 
            setEmployees(response.data.employees);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
        }
    };
    
    const fetchSocieties = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/societies");
            setSocieties(response.data);
        } catch (error) {
            console.error("Error fetching societies:", error);
        }
    };

    useEffect(() => {
        fetchSocieties();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/departments");
            setDepartments(response.data.departments);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };
    
    useEffect(() => {
        fetchDepartments();
    }, []);
    
    const fetchWorkhours = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/workhours");
            setWorkhours(response.data);
        } catch (error) {
            console.error("Error fetching work hours:", error);
        }
    };

    useEffect(() => {
        fetchWorkhours();
        console.log('workhours: ', workhours)
    }, []);

    const createEmployees = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/employees", newEmployee);
            setEmployees([...employees, response.data]); 
            
            window.location.reload()
            setNewEmployee({
                name: "",
                firstname: "",
                id_departments: "",
                id_societies: "",
                id_work_hours: "",
            });
            // toast.success('Employee created successfully')
            window.location.reload()
            toast.success('Employee created successfully')
        } catch (error) {
            console.error("Failed to create employee:", error);
        }
    };
    
    
    

    const updateEmployee = async () => {
        try {
            await axios.put(`http://localhost:8000/api/employees/${isEditing}`, editedEmployee);
            setEmployees(employees.map((employee) => (employee.id === isEditing ? editedEmployee : employee)));
            setIsEditing(null);
            setEditedEmployee({
                name: "",
                firstname: "",
                id_departments: "",
                id_societies: "",
                id_work_hours: "",
            });
        } catch (error) {
            console.error("Failed to update employee:", error);
        }
    };

    const deleteEmployee = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'this action is irreversible!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8000/api/employees/${id}`);
                    setEmployees(employees.filter((employee) => employee.id !== id));
                    Swal.fire(
                        'Deleted!',
                        'Employee has been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.error("Failed to delete employee:", error);
                    Swal.fire(
                        'Error!',
                        'Failed to delete employee.',
                        'error'
                    );
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Employee deletion has been cancelled.',
                    'error'
                );
            }
        });
    };
    
    return (
        <Container>
            <Row>
                <Col md={5}>
                <Card style={{backgroundColor:'transparents',background:"transparent" ,border:'none'}}>
                    <Card.Header className='' style={{backgroundColor:'#50b64a',color:'white',textAlign:'center'}}>  <h2>{isEditing ? "Edit Employee" : "Create Employee"}</h2></Card.Header>                        
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={isEditing ? editedEmployee.name : newEmployee.name}
                                onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, name: e.target.value }) : setNewEmployee({ ...newEmployee, name: e.target.value }))}
                            />
                        </Form.Group>
                        <Form.Group controlId="firstname">
                            <Form.Label>Firstame</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter firstame"
                                value={isEditing ? editedEmployee.firstname : newEmployee.firstname}
                                onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, firstname: e.target.value }) : setNewEmployee({ ...newEmployee, firstname: e.target.value }))}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicDepartmentId">
                        <Form.Label>Department</Form.Label>
                        <Form.Control as="select" name="id_departments" onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, id_departments: e.target.value }) : setNewEmployee({ ...newEmployee, id_departments: e.target.value }))} value={isEditing ? editedEmployee.id_departments : newEmployee.id_departments}>
                            <option value="">Select Department</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.description}
                                </option>
                            ))}

                        </Form.Control>
                    </Form.Group>
                        <Form.Group controlId="formBasicSocietyId">
                            <Form.Label>Society</Form.Label>
                            <Form.Control as="select" name="id_societies" onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, id_societies: e.target.value }) : setNewEmployee({ ...newEmployee, id_societies: e.target.value }))} value={isEditing ? editedEmployee.id_societies : newEmployee.id_societies}>
                                <option value="">Select Society</option>
                                {societies && societies.map((society) => (
                                    <option key={society.id} value={society.id}>
                                        {society.company_name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicWorkhourId">
                            <Form.Label>Workhour</Form.Label>
                            <Form.Control as="select" name="id_work_hours" onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, id_work_hours: e.target.value }) : setNewEmployee({ ...newEmployee, id_work_hours: e.target.value }))} value={isEditing ? editedEmployee.id_work_hours : newEmployee.id_work_hours}>
                                <option value="">Select Workhour</option>
                                {workhours && workhours.map((workhour) => (
                                    <option key={workhour.id} value={workhour.id}>
                                        {workhour.nom}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        {isEditing ? (
                            <Button variant="primary mt-2" onClick={updateEmployee}>
                                Update employee
                            </Button>
                        ) : (
                            <Button variant="primary mt-2" onClick={createEmployees}>
                                Create employee
                            </Button>
                        )}
                    </Form>
                    </Card>
                </Col>
                <Col md={7} className="bg-transparent">
                    <Card className='department-table bg-transparent' style={{backgroundColor:'transparent',border:'none'}}>
                    <Card.Header className='' style={{backgroundColor:'#50b64a',color:'white',textAlign:'center'}}><h2>Employee List</h2></Card.Header>
                    <table className='departement-table'    style={{ width: "100%", backgroundColor: "transparent" }}>
                        <thead style={{ backgroundColor: "transparent" }}>
                            <tr>
                                <th>Name</th>
                                <th>Firstname</th>
                                <th>workhour</th>
                                <th>Society</th>
                                <th>departement</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.firstname}</td>
                                <td>{workhours.find((workhour) => workhour.id === employee.id_work_hours)?.nom}</td>
                                <td>{societies.find((society) => society.id === employee.id_societies)?.company_name}</td>
                                <td>{departments.find((department) => department.id === employee.id_departments)?.description}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteEmployee(employee.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <span>&nbsp;</span>
                                    <button className="btn btn-primary ml-2" onClick={() => editEmployee(employee)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

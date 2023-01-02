import { useState, useEffect } from 'react';
import './App.css'
import { Container, Accordion, Row, Col, Image, Form, Button, Modal } from 'react-bootstrap'
import { RiDeleteBin5Line, RiPencilLine } from 'react-icons/ri'
import { RxCross1 } from 'react-icons/rx'
import { AiOutlineCheck } from 'react-icons/ai'
import celebrities from './celebrities.json';
function App() {
  const [celebritiesData, setcelebritiesData] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [country, setCountry] = useState('')
  const [description, setDescription] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true)
    setSelectedId(id)
  };
  const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  useEffect(() => {
    celebrities.forEach((c) => {
      c.edit = false
      c.dob = calculateAge(c.dob)
    })
    setcelebritiesData(celebrities)
    console.log(celebrities)
  }, [])

  const editAction = (id) => {
    let data = celebritiesData
    data.forEach((c) => {
      if (c.id == id) {
        c.edit = true
        setName(c.first + ' ' + c.last)
        setAge(c.dob)
        setGender(c.gender)
        setCountry(c.country)
        setDescription(c.description)
      }
    })
    console.log(data)
    setcelebritiesData([...data])
  }

  const deleteAction = (id) => {
    let data = celebritiesData
    data = data.filter((c) => c.id != id)
    console.log(data)
    setcelebritiesData([...data])
    setShow(false)
  }

  const editData = (id) => {
    let data = celebritiesData
    data.forEach((c) => {
      if (c.id == id) {
        c.edit = false
        c.first = name
        c.last = ''
        c.dob = age
        c.gender = gender
        c.country = country
        c.description = description
      }
    })
    setcelebritiesData([...data])
  }

  const cancelAction = (id) => {
    let data = celebritiesData
    data.forEach((c) => {
      if (c.id == id) {
        c.edit = false
      }
    })
    console.log(data)
    setcelebritiesData([...data])
  }

  return (
    <>
      <Container>
        <h1>List of celebrities</h1>
        <div>
          <Accordion>
            {celebritiesData.map((celebrity) => {
              return (
                <>
                  {celebrity.edit == false && (
                    <Accordion.Item eventKey={celebrity.id}>
                      <Accordion.Header>
                        <Image src={celebrity.picture} id="avatar" />
                        <span class="header-name">{celebrity.first + ' ' + celebrity.last} {celebrity.edit}</span>

                      </Accordion.Header>
                      <Accordion.Body>
                        <Row style={{ color: 'grey' }}>
                          <Col>Age</Col><Col>Gender</Col><Col>Country</Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col>{celebrity.dob}</Col><Col>{celebrity.gender}</Col><Col>{celebrity.country}</Col>
                        </Row>

                        <Row style={{ color: 'grey' }}><Col>Description</Col></Row>
                        <Row><Col>{celebrity.description}</Col></Row>
                        <Row className='my-3'>
                          <span className='action-buttons'>
                            <Button variant="light" style={{ float: 'right' }} onClick={() => editAction(celebrity.id)} className='mx-2'><RiPencilLine color="blue" /></Button>
                            <Button variant="light" style={{ float: 'right' }} onClick={() => handleShow(celebrity.id)} className='mx-2'><RiDeleteBin5Line color='red' /></Button>
                          </span>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  )}
                  {celebrity.edit == true && (
                    <Accordion.Item eventKey={celebrity.id}>
                      <Accordion.Header>
                        <Image src={celebrity.picture} id="avatar" />
                        <span class="header-name">{celebrity.first + ' ' + celebrity.last} {celebrity.edit}</span>

                      </Accordion.Header>
                      <Accordion.Body>
                        <Row style={{ color: 'grey' }}>
                          <Col>Age</Col><Col>Gender</Col><Col>Country</Col>
                        </Row>
                        <Row className='mb-3'>
                          <Col><Form.Control type="text" className='mx-2' onChange={(e) => setAge(e.target.value)} value={age} /></Col>
                          <Col>
                            <Form.Select onChange={(e) => setGender(e.target.value)}>
                              <option>Rather not Say</option>
                              <option>Male</option>
                              <option>Female</option>
                            </Form.Select>
                          </Col>
                          <Col><Form.Control type="text" className='mx-2' onChange={(e) => setCountry(e.target.value)} value={country} /></Col>
                        </Row>
                        <Row style={{ color: 'grey' }}><Col>Description</Col></Row>
                        <Row><Col> <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} value={description} /></Col></Row>
                        <Row className='my-3'>
                          <span>
                            <Button variant="light" style={{ float: 'right' }} onClick={() => editData(celebrity.id)} className='mx-2'><AiOutlineCheck color='red' /></Button>
                            <Button variant="light" style={{ float: 'right' }} onClick={() => cancelAction(celebrity.id)} className='mx-2'><RxCross1 color='green' /></Button>
                          </span>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  )}
                </>
              )
            })}

          </Accordion>
        </div>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={() => deleteAction(selectedId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;

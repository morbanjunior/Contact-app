import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {connect} from 'react-redux';

const Home = ({contacts, deleteContact}) => {
 
    
    return (
        <Container>
            <Row>
                <Container className="col-md-12 my-5 text-end ">
                 <Button variant=""><Link to="/add" className="btn btn-outline-dark "> Add Contact</Link>                   
                 </Button>  
                </Container>     
                
                <div className="col-md-10 mx-auto">
                <Table  bordered hover>
                  <thead className="text-white bg-dark text-center">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Action</th>
                        
                      </tr>
                  </thead>
                  <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                      <Link
                        to={`/edit/${contact.id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteContact(contact.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No contacts found</th>
                </tr>
              )}
            </tbody>
                </Table>
                   
                </div>                         
            </Row>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    contacts: state,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    deleteContact: (id) => {
      dispatch({ type: "DELETE_CONTACT", payload: id });
      toast.success("Contact deleted sucessfully");
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Home);


///
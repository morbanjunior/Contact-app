import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams, Link} from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Container, Row } from 'react-bootstrap';


const EditContact = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const history = useNavigate();
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentContact.name);
    setEmail(currentContact.email);
    setNumber(currentContact.number);
  }, [currentContact]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email && contact.id !== currentContact.id
        ? contact
        : null
    );
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.number === number && contact.id !== currentContact.id
        ? contact
        : null
    );

    if (!email || !name || !number) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkContactEmailExists.length > 0) {
      return toast.error("This email already exists!!");
    }
    if (checkContactPhoneExists.length > 0) {
      return toast.error("This phone number already exists!!");
    }

    const data = {
      id: currentContact.id,
      email,
      name,
      number,
    };

    updateContact(data);
      toast.success("Contact update successfully!!");
      history("/");

    }

      
    return (
        <Container>
          {
            currentContact? (
              <>
              <Row>
            <h1 className="display-3 my-5 text-center">
               Edit Contact {id}
            </h1>     
            <div className="col-md-6 shadow mx-auto p-5">
            <Form onSubmit={handleSubmit}>
               <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Name" value={name} onChange={e=> setName(e.target.value)}/>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control type="number" placeholder="Phone Number"value={number} onChange={e=> setNumber(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" value="Add" type="submit">
                    Submit
                </Button>      

                <Button variant=""><Link to="/" className="btn btn-danger"> Cancel</Link>                   
                </Button>                               
               </Form>
               
            </div>                         
        </Row>
            </>) : <h1 className="display-3 my-5 text-center">
               Contact id {id} not exist.
            </h1> 
          }
        
    </Container>
    )
}

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);

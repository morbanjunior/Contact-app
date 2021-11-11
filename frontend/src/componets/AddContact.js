import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row } from 'react-bootstrap';
import {connect} from 'react-redux';
import { toast } from 'react-toastify';


const AddContact = ({ contacts, addContact }) => {
  
//useStete for get te value fron forn and settle to the varibles.
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
 
   
     //History for push to home.
    const history = useNavigate();
  
    //Funcion for Handle Submit.
    const handleSubmit = (e)=>{
      e.preventDefault();

      //check Email wrote if exist from state 
      const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email ? contact : null
    );
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.number === number ? contact : null
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
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      email,
      name,
      number,
    };
      //accion addContact
      addContact(data);
      toast.success("Contact added successfully!!");
      history("/");

    }

    

    
    return (
        <Container>
        <Row>
            <h1 className="display-3 my-5 text-center">
               Add Contact
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
                  <Form.Control type="number" placeholder="Phone Number" value={number} onChange={e=> setNumber(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" value="Add" type="submit">
                    Submit
                </Button>      

                <Button variant=""><Link to="/" className="btn btn-danger"> Cancel</Link>
                   
                </Button>                               
               </Form>

               
            </div>                         
        </Row>
    </Container>
    )
}

 //for get the state fron redux
const mapStateToProps = (state) => ({
  contacts: state,
});

 //conect de accions redux to the contactReducer.
const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: "ADD_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
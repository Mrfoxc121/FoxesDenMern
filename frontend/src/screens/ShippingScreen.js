import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAdress } from "../actions/cartActions";


const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postcode, setPostcode] = useState(shippingAddress.postcode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(saveShippingAdress({ address, city,  postcode, country }))
      history.push('/payment')
  }
  
    return <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
                <Form.Label className="py-2">Address: </Form.Label>
                <Form.Control type='text' placeholder='Enter address' value={address} required onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
                <Form.Label className="py-2">City</Form.Label>
                <Form.Control type='text' placeholder='Enter city' value={city} required onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='postCode'>
                <Form.Label className="py-2">Postcode</Form.Label>
                <Form.Control type='text' placeholder='Enter address' value={postcode} required onChange={(e) => setPostcode(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
                <Form.Label className="py-2">Country</Form.Label>
                <Form.Control type='text' placeholder='Enter country' value={country} required onChange={(e) => setCountry(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="submit" variant="custom">Continue</Button>
        </Form>
        </FormContainer>;
};

export default ShippingScreen;

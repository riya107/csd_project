import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { updateMenuAPI } from "../api-calls/shop-api-calls";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMenu = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('itemPrice', itemPrice);
    formData.append('type', type);
    formData.append('image', image);

    const success = await updateMenuAPI(formData);
    if (success) {
      alert("New item added in menu!");
      navigate('/');
    } else {
      alert("Something went wrong, retry!");
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="itemName">
          <Form.Label className="col-p mt-5">Food Item Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Food Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="mb-3"
          />
        </Form.Group>
        <Form.Group controlId="itemPrice">
          <Form.Label className="col-p mt-5">Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Price"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            className="mb-3"
          />
        </Form.Group>

        <Container>
          <Form.Check inline label="Veg" type={"radio"} name="type" onChange={()=>{setType('Veg')}} checked={type === 'Veg'}/>
          <Form.Check inline label="Non-veg" type={"radio"} name="type" onChange={()=>{setType('Non-veg')}} checked={type==='Non-veg'} />
        </Container>

        <Form.Group controlId="">
          <Form.Label className="col-p mt-4">Upload Picture</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-3"
          />
        </Form.Group>

        <Button className="bg-p col-s" type="submit">
          Add
        </Button>
      </Form>
    </Container>
  );
};

export default AddMenu;

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import { useState } from "react";

const AddMenu = () => {
  const [picture, setPicture] = useState(null);
  const [itemName, setItemName] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = () => {};

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

        <Container>
          <Form.Check inline label="Veg" type={"radio"} name="type" onChange={()=>{setType('Veg')}} checked={type === 'Veg'}/>
          <Form.Check inline label="Non-veg" type={"radio"} name="type" onChange={()=>{setType('Non-veg')}} checked={type==='Non-veg'} />
        </Container>

        <Form.Group controlId="picture">
          <Form.Label className="col-p mt-4">Upload Picture</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setPicture(e.target.files[0])}
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

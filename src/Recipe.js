import React, { useState } from "react";
import "./Recipe.css";
import { Button, Modal } from "react-bootstrap";
const Recipe = ({ title, calories, image, ingredients }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="recipe-card">
      <img src={image} alt={title} />
      <div className="info">
        <h2>{title}</h2>
        <p>Calorie Count = {calories}kcal</p>
        <Button variant="primary" onClick={handleShow}>
          Check Ingredients
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Ingredients Required:</h5>
            <ul>
              {ingredients.map((ingredient) => (
                <li>{ingredient.text}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Recipe;

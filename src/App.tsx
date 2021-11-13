import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Form, FormControl, FormSelect, InputGroup } from 'react-bootstrap';

class Ingredient {
  name: string = ""
  qnt: number = 0
  qntResultant: number = 0
}

function App() {
  const emptyIngredient = {
    name: "",
    qnt: 0,
    qntResultant: 0
  }
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ ...emptyIngredient }])

  const [refIngredient, setRefIngredient] = useState<Ingredient>()

  const [proporsion, setProporsion] = useState<number>(0)

  useEffect(() => {

    ingredients
    .filter(ingredient => ingredient !== refIngredient)
    .forEach(ingredient => {
      ingredient.qntResultant = ingredient.qnt * proporsion;
    });
    setIngredients([...ingredients])
        
    console.log(ingredients, proporsion)
  }, [proporsion])

  function editingName(ing: Ingredient, name: string) {
    ing.name = name;

    if (ingredients[ingredients.length - 1] === ing) {
      if (ing.name) {
        addIngredient()
        return
      }
    }
    setIngredients([...ingredients])
  }
  function editRefEvent(ing: Ingredient, value: string): void {
    const isOn = value === "on"

    if (isOn) {
      setRefIngredient(ing)
    }
  }
  function editQntResultantEvent(ing: Ingredient, value: string): void {
    const numberValue = Number(value)
    ing.qntResultant = numberValue;
    setIngredients([...ingredients])
    if (ing === refIngredient) {
      const calculedProporsion = ing.qntResultant / ing.qnt;
      setProporsion(calculedProporsion)
      console.log(ing, calculedProporsion)
    }
  }

  function editQnt(ing: Ingredient, value: string): void {
    const numberValue = Number(value)
    ing.qnt = numberValue;

    setIngredients([...ingredients])
  }
  function addIngredient(): void {
    setIngredients([...ingredients, { ...emptyIngredient },])
  }

  console.log("new draw", ingredients, proporsion)

  return (
    <Container>
      <h1>
        Uber Converter
      </h1>

      <Row>

        {ingredients.map((ing) => {

          return (
            <>
              <Form.Check type="radio" aria-label="Select the reference" checked={ing === refIngredient} onChange={event => editRefEvent(ing, event.target.value)} />
              <FormControl placeholder="Ingredient name" value={ing.name ? ing.name : ""} onChange={newValue => editingName(ing, newValue.target.value)} />
              <FormControl placeholder="Original Quantity" value={ing.qnt ? ing.qnt : ""} onChange={newValue => editQnt(ing, newValue.target.value)} />
              {
                refIngredient === ing ?
                  <FormControl placeholder="New Quantity" value={ing.qntResultant ? ing.qntResultant : ""} onChange={newValue => editQntResultantEvent(ing, newValue.target.value)} />
                  :
                  <InputGroup.Text>{ing.qntResultant}</InputGroup.Text>
              }
            </>
          )
        })}


      </Row>
    </Container>
  );
}

export default App;



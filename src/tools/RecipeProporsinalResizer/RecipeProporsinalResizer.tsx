import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, ChangeEvent } from "react";
import {
  Container,
  Row,
  Form,
  FormControl,
  InputGroup,
  Button,
  Stack,
} from "react-bootstrap";
import "./RecipeProporsinalResizer.css";

class InputNumber {
  private _number: number = 0;
  public get number(): number {
    return this._number;
  }

  private _string: string = "";
  public get string(): string {
    return this._string;
  }
  public set string(value: string) {
    let eventValue = value;
    console.log(eventValue);
    const oldValue = this.number;
    const oldStringValue = this.string;

    this._number = Number(eventValue);
    this._string = eventValue;
    if (!this._number && eventValue) {
      this._number = oldValue;
      this._string = oldStringValue;
    }
  }

  constructor() {
    this.string = "";
  }
}

class Ingredient {
  qnt: InputNumber = new InputNumber();
  qntResultant: number = 0;
}
class RefIngredient {
  qnt: InputNumber = new InputNumber();
  qntResultant: InputNumber = new InputNumber();
}

const RecipeProporsionalResizer = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    new Ingredient(),
  ]);

  const [refIngredient, setRefIngredient] = useState<RefIngredient>(new RefIngredient());

  const [proporsion, setProporsion] = useState<number>(0);

  useEffect(() => {
    ingredients.forEach((ingredient) => {
      ingredient.qntResultant = ingredient.qnt.number * proporsion;
    });
    setIngredients([...ingredients]);
  }, [proporsion]);

  function editQnt(
    ingredient: Ingredient,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    ingredient.qnt.string = event.target.value;

    ingredient.qntResultant = ingredient.qnt.number * proporsion;
    setIngredients([...ingredients]);
  }

  function onChangeReferenceOriginalQuantity(
    ingredient: RefIngredient,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    ingredient.qnt.string = event.target.value;
    setRefIngredient({ ...ingredient });

    if (ingredient.qnt.number == 0) {
      setProporsion(0);
      return;
    }

    setProporsion(ingredient.qntResultant.number / ingredient.qnt.number);
  }
  function onChangeReferenceResultantQuantity(
    ingredient: RefIngredient,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    ingredient.qntResultant.string = event.target.value;
    setRefIngredient({ ...ingredient });

    if (ingredient.qntResultant.number == 0) {
      setProporsion(0);
      return;
    }

    setProporsion(ingredient.qntResultant.number / ingredient.qnt.number);
  }
  function addIngredient(): void {
    setIngredients([...ingredients, new Ingredient()]);
  }
  function removeIngredient(ingredientToRemove: Ingredient): void {
    setIngredients([
      ...ingredients.filter((ing) => ing !== ingredientToRemove),
    ]);
  }

  return (
    <>
      <h3>Referencial Value</h3>
      <div>
        <InputGroup>
          {/* <InputGroup.Text>Reference Name</InputGroup.Text> */}
          <FormControl placeholder="Reference name" />
          <FormControl
            className="form-number"
            placeholder="Original Quantity"
            value={refIngredient.qnt.string}
            onChange={(event) =>
              onChangeReferenceOriginalQuantity(refIngredient, event)
            }
          />
          <FormControl
            className="form-number "
            placeholder="New Quantity"
            value={refIngredient.qntResultant.string}
            onChange={(event) =>
              onChangeReferenceResultantQuantity(refIngredient, event)
            }
          />
        </InputGroup>
      </div>
      <div>
        <h3>Recipe</h3>
        <Stack gap={1}>
          {ingredients.map((ing, index) => {
            return (
              <InputGroup id={"ingredient" + index}>
                {console.log(ing)}
                <Button
                  variant="outline-secondary"
                  aria-label="Close"
                  onClick={(event) => {
                    removeIngredient(ing);
                    event.preventDefault();
                  }}
                >
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </Button>
                <FormControl placeholder="Ingredient name" />
                <FormControl
                  className="form-number"
                  placeholder="Original Quantity"
                  value={ing.qnt.string}
                  onChange={(event) => editQnt(ing, event)}
                />
                <InputGroup.Text>{ing.qntResultant}</InputGroup.Text>
              </InputGroup>
            );
          })}
          <Button
            variant="outline-dark"
            size="lg"
            onClick={(event) => {
              addIngredient();
              event.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default RecipeProporsionalResizer;

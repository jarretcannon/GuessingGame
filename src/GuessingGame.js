import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const GuessingGame = () => {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Start Guessing");
  const [randomNumber, setRandomNumber] = useState(null);
  const [timeGuessed, setTimeGuessed] = useState(null);

  function generateNum() {
    let random = Math.floor(Math.random() * 100);
    localStorage.setItem("random", JSON.stringify(random));
    return random;
  }
  
  useEffect(() => {
    if (randomNumber === null) {
      setRandomNumber(
        JSON.parse(localStorage.getItem("random") || generateNum())
      );
    }
   
    if (timeGuessed === null) {
      setTimeGuessed(JSON.parse(localStorage.getItem("guesses") || 0));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    let parseNum = parseInt(guess);

    if (parseNum === randomNumber) {
      setMessage("hey you got it!");
    } else if (parseNum > randomNumber) {
      setMessage("hey that's too high!");
    } else {
      setMessage("hey too low");
    }


    setTimeGuessed(timeGuessed + 1);
    localStorage.setItem("guesses", JSON.stringify(timeGuessed + 1));
  }

  function handleChange(e) {
    if (!isNaN(e.target.value)) {
      setGuess(e.target.value);
    } else {
      alert("hey type a number you are wrong!");
    }
  }

  function reset() {
    setGuess("");
    setMessage("Start Guessing");
    setTimeGuessed(0);
    setRandomNumber(generateNum());
    localStorage.removeItem("guesses");
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            I am thinking of a number between 1 and 100, guess the lucky number!
          </Form.Label>
          <br />

          <Form.Label>You have made {timeGuessed} guesses</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            value={guess}
            name="name"
          />
          <Button type="submit">Guess</Button>
          <Form.Label>{message}</Form.Label>
          <Button onClick={reset} type="button">
            Reset
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default GuessingGame;
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Fade, IconButton, Modal, Paper, TextField } from "@material-ui/core";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import logo from "./assets/cobalt-logo.png";
import "./App.css";
import Leaderboard from "./components/Leaderboard";

const useStyles = makeStyles((theme) => ({
  drawButton: {
    color: "#177ec8",
    border: "1px solid #177ec8",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#177ec8",
    },
    marginRight: theme.spacing(3)
  },
  header: {
    backgroundColor: "#3612c8",
    color: "#ffffff",
    margin: theme.spacing(0),
    padding: theme.spacing(3)
  },
  info: {
    marginBottom: "4px"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(6)
  },
  modalPaper: {
    backgroundColor: "#ffffff",
    border: '2px solid #000',
    padding: theme.spacing(5)
  },
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    width: "90%",
  },
  subHeader: {
    margin: theme.spacing(3),
  },
  submitButton: {
    color: "#ffffff",
    backgroundColor: "#3612c8",
    "&:hover": {
      backgroundColor: "#4417f5"
    },
    border: "1px solid #3612c8",
    marginLeft: theme.spacing(4)
  },
  textfield: {
    marginBottom: theme.spacing(4)
  }
}));

function HighScoreApp() {
  const classes = useStyles();

  const [currentNumber, setCurrentNumber] = useState(0);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const [inputName, setInputName] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    if (numberOfClicks === 10) {
      setIsDisabled((prev) => !prev);
    }
  }, [numberOfClicks]);

  useEffect(() => {
    fetch("http://localhost:3000/players").then(res => res.json()).then(data => setPlayers(data))
  },[isScoreSubmitted])

  const handleGetNumber = () => {
    if (!isDisabled && numberOfClicks < 10) {
      setNumberOfClicks((prev) => prev + 1);
      let randomNumber = Math.floor(Math.random() * (100 + 100) - 100);
      setCurrentNumber(randomNumber);
    }
  };

  const handleInputName = (e) => {
    setInputName(e.target.value);
  };

  const handleOpenModal = () => setIsModalOpen(prev => !prev)
  const handleCloseModal = () => setIsModalOpen(prev => !prev)

  const handleSubmit = async () => {
    const gameData = {
      name: inputName,
      totalPoints: currentNumber,
      clicks: numberOfClicks,
    };
    try {
      const response = await fetch("http://localhost:3000/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsScoreSubmitted(prev => !prev)
      resetGame();
    }
  };

  const resetGame = () => {
    setNumberOfClicks(0);
    setCurrentNumber(0);
    setIsDisabled(false);
    setIsScoreSubmitted(false);
  };

  return (
    <div className="App">
      <h1 className={classes.header}>High Score App</h1>
      <div className={classes.subHeader}>
        <span>Get the highest score in the fewest number of clicks!
          <IconButton className={classes.info} onClick={handleOpenModal}><InfoOutlinedIcon/></IconButton>
        </span>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        <Fade in={isModalOpen}>
          <div className={classes.modalPaper}>
            <h2 id="transition-modal-title">Instructions</h2>
            <p id="transition-modal-description">Enter your name. A number will be randomly generated from -100 to 100. Your goal is to submit the highest number you can land within 10 clicks. Your ranking on the Leaderboard can be determined by either your cumulative total score or average score per total clicks. Have fun!</p>
          </div>
        </Fade>
      </Modal>
      <Container>
        <Paper className={classes.paper}>
          <img src={logo} alt="cobalt logo"></img>
          <h3>Clicks Remaining: {(10 - numberOfClicks)}</h3>
          <h3>Current high score: {currentNumber}</h3>
          <form noValidate autoComplete="off">
            <TextField 
              className={classes.textfield}
              placeholder="Name" 
              value={inputName}
              error={!inputName}
              helperText={"Enter your name"} 
              onChange={handleInputName}>
            </TextField>
          </form>
          <span>
            <Button className={classes.drawButton}onClick={handleGetNumber} disabled={isDisabled}>Draw number</Button>
            <Button className={classes.submitButton} onClick={handleSubmit} disabled={!inputName}>Submit</Button>
          </span>
        </Paper>
      </Container>
      <Leaderboard players={players}/>
    </div>
  );
}

export default HighScoreApp;

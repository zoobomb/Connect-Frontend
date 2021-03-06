import React, { useEffect, useState } from "react";
import "./App.css";
import TitleImage from "./TitleImage";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Profiles from "../Profiles";
import Forum from "../Forum";
import Home from "../Home";

import QuestionPage from "../Forum/QuestionPage";

import { BACKEND_URL } from "../../config";

// const questions = [
//   {
//     id: 0,
//     name: "Bryan",
//     topic: "React",
//     question: "sos",
//   },
//   {
//     id: 1,
//     name: "Jess",
//     topic: "Functions",
//     question: "why is this not working?",
//   },
// ];

function App() {
  const [questionsArray, setQuestionsArray] = useState([]);

  useEffect(() => {
    async function getQuestions() {
      const res = await fetch(`${BACKEND_URL}/forum`);
      const { payload } = await res.json();
      setQuestionsArray(payload);
    }
    getQuestions();
    console.log(questionsArray);
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">
            <TitleImage id="TitleImage" />
          </Link>
          <div className="Sidebar">
            <Link className="Profiles" to="/profiles">
              Profiles
            </Link>
            <Link className="Forum" to="/forum">
              Forum
            </Link>
          </div>
        </nav>
        <Switch>
          <Route path="/profiles">
            <Profiles />
          </Route>
          {/* Creating a page and creating a route for each question in the array */}
          {questionsArray.map((q) => {
            console.log(q.id);
            return (
              <Route path={`/forum/${q.id}`}>
                <QuestionPage question={q} id={q.id} />
              </Route>
            );
          })}

          <Route path="/forum">
            <Forum
              questionsArray={questionsArray}
              setQuestionsArray={setQuestionsArray}
            />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// Questions in the API
// Get questions and display - GET to /forum
// Add questions - update API data - POST to /forum

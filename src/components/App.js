import { useEffect} from "react";

import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextButton from "./NextButton.js";
import Progress from "./Progress.js";
import FinishedScreen from "./FinishedScreen.js";
import Footer from "./Footer.js";
import Timer from "./Timer.js";

import { useQuizContext } from "../contexts/QuizContext.js";

// const SECS_PER_QUESTION = 30;

// const initialState = {
//   questions: [],

//   // 'loading', 'error', 'ready', 'active', 'finished', 'reset'
//   status: "loading",
//   index: 0,
//   answer: null,
//   points: 0,
//   highscore: 0,
//   secondsRemaining: null,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "dataReceived":
//       return { ...state, questions: action.payload, status: "ready" };
//     case "dataFailed":
//       return { ...state, status: "error" };
//     case "start":
//       return { ...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_QUESTION };
//     case "newAnswer":
//       const question = state.questions.at(state.index);
//       return {
//         ...state,
//         answer: action.payload,
//         points:
//           action.payload === question.correctOption
//             ? state.points + question.points
//             : state.points
//       };
//     case "nextQuestion":
//       return { ...state, index: state.index + 1, answer: null };
//       case 'finish':
//         return {...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore};
//       case 'reset':
//         return {...initialState, questions: state.questions, status: 'active'}
//         case 'tick' : 
//         return{...state, secondsRemaining: state.secondsRemaining -1, status: state.secondsRemaining === 0 ? 'finished' : state.status}
//     default:
//       throw new Error("Action unkown");
//   }
// }

export default function App() {
  const {dispatch, status} = useQuizContext()
  
  
  // const [{ questions, status, index, answer, points, highscore , secondsRemaining}, dispatch] = useReducer(
  //   reducer,
  //   initialState
  // );

  // const numQuestions = questions.length;
  // const maxPossiblePoints = questions.reduce((prev,cur) => prev + cur.points, 0)

  useEffect(function() {
    fetch("http://localhost:8000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: "dataReceived", payload: data }))
      .catch(err => dispatch({ type: "dataFailed" }));
  }, []);



  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" &&
          <StartScreen />}
        {status === "active" &&
        <>
        <Progress />
        <Question
        />
        <Footer>
        <Timer />
        </Footer>
        <NextButton />
        </>}
        {status === 'finished' && <FinishedScreen />}
      </Main>
    </div>
  );
}

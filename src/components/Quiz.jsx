import { useState, useCallback } from 'react';
import { QUIZ_QUESTIONS, calculateQuizScore } from '../data/quizData';
import { getScoreMessage } from '../utils/helpers';
import { Section, Button } from './SharedComponents';

/**
 * QuizOption — individual answer option button.
 */
function QuizOption({ option, index, isSelected, result, onSelect, disabled }) {
  let stateClass = '';
  if (result) {
    if (index === result.correctIndex) stateClass = 'correct';
    else if (index === result.selectedIndex && !result.isCorrect) stateClass = 'incorrect';
  } else if (isSelected) {
    stateClass = 'selected';
  }

  const markers = ['A', 'B', 'C', 'D'];

  return (
    <button
      className={`quiz-option ${stateClass}`}
      onClick={() => onSelect(index)}
      disabled={disabled}
      role="radio"
      aria-checked={isSelected}
      aria-label={`Option ${markers[index]}: ${option}`}
    >
      <span className="quiz-option-marker" aria-hidden="true">
        {result ? (
          stateClass === 'correct' ? '✓' : stateClass === 'incorrect' ? '✗' : markers[index]
        ) : markers[index]}
      </span>
      <span>{option}</span>
    </button>
  );
}

/**
 * QuizResults — score summary and detailed answer review.
 */
function QuizResults({ scoreData, onRetry }) {
  return (
    <div>
      <div className="quiz-results">
        <div className="quiz-score-circle">
          <span className="quiz-score-number">{scoreData.score}/{scoreData.total}</span>
          <span className="quiz-score-label">{scoreData.percentage}%</span>
        </div>
        <p className="quiz-score-message">{getScoreMessage(scoreData.percentage)}</p>
        <Button variant="primary" onClick={onRetry}>
          Try Again
        </Button>
      </div>

      <h3 style={{ marginBottom: 'var(--space-4)', fontWeight: 600 }}>Answer Review</h3>
      {scoreData.results.map((result, i) => (
        <div
          key={i}
          className={`quiz-result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}
        >
          <div className="quiz-result-question">
            <span aria-hidden="true">{result.isCorrect ? '✅' : '❌'}</span>
            <span>{result.question}</span>
          </div>
          {!result.isCorrect && (
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              Your answer: {result.selectedAnswer || 'Not answered'} → Correct: {result.correctAnswer}
            </p>
          )}
          <p className="quiz-result-explanation">{result.explanation}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Quiz — the interactive election knowledge quiz.
 * Local state only, no backend required.
 */
export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(QUIZ_QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const question = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;
  const canGoNext = answers[currentQuestion] !== null;
  const isLastQuestion = currentQuestion === QUIZ_QUESTIONS.length - 1;

  const handleSelectOption = useCallback((optionIndex) => {
    if (submitted) return;
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = optionIndex;
      return updated;
    });
  }, [currentQuestion, submitted]);

  const handleNext = useCallback(() => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }, [currentQuestion]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
  }, []);

  const handleRetry = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
    setSubmitted(false);
  }, []);

  const scoreData = submitted ? calculateQuizScore(answers) : null;

  if (!quizStarted) {
    return (
      <Section
        id="quiz"
        title="Test Your Election Knowledge"
        subtitle="Take this short quiz to see how well you understand the election process."
      >
        <div className="quiz-container">
          <div className="empty-state">
            <div className="empty-state-icon" aria-hidden="true">🧠</div>
            <p className="empty-state-text" style={{ marginBottom: 'var(--space-6)' }}>
              5 quick questions about the Indian election process.
            </p>
            <Button variant="primary" onClick={() => setQuizStarted(true)}>
              Start Quiz
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="quiz"
      title="Test Your Election Knowledge"
      subtitle="Answer 5 questions to see how well you understand the election process."
    >
      <div className="quiz-container">
        {submitted && scoreData ? (
          <QuizResults scoreData={scoreData} onRetry={handleRetry} />
        ) : (
          <>
            {/* Progress Bar */}
            <div className="quiz-progress" aria-label="Quiz progress">
              <div className="quiz-progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="quiz-progress-text">
                {currentQuestion + 1} / {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Question Card */}
            <div className="quiz-question-card">
              <p className="quiz-question-text">
                {question.question}
              </p>
              <div className="quiz-options" role="radiogroup" aria-label={`Question ${currentQuestion + 1}`}>
                {question.options.map((option, index) => (
                  <QuizOption
                    key={index}
                    option={option}
                    index={index}
                    isSelected={answers[currentQuestion] === index}
                    result={null}
                    onSelect={handleSelectOption}
                    disabled={false}
                  />
                ))}
              </div>

              <div className="quiz-nav">
                <Button
                  variant="secondary"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  aria-label="Go to previous question"
                >
                  ← Previous
                </Button>

                {isLastQuestion ? (
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!canGoNext}
                    aria-label="Submit quiz answers"
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    disabled={!canGoNext}
                    aria-label="Go to next question"
                  >
                    Next →
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Section>
  );
}

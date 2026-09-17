/**
 * Quiz questions for election knowledge assessment.
 * All questions are factual and based on the Indian election process.
 */
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What happens immediately after an election is announced?',
    options: [
      'Voting begins',
      'The Model Code of Conduct comes into effect',
      'Candidates start counting votes',
      'The electoral roll is deleted',
    ],
    correctIndex: 1,
    explanation: 'The Model Code of Conduct (MCC) comes into effect as soon as elections are announced. It is a set of guidelines that political parties and candidates must follow to ensure free and fair elections.',
  },
  {
    id: 2,
    question: 'What is an electoral roll?',
    options: [
      'A list of all political parties',
      'A document showing election results',
      'The official list of registered voters',
      'A type of voting machine',
    ],
    correctIndex: 2,
    explanation: 'The electoral roll is the official list of all people who are registered to vote in an election. Your name must appear on this list for you to be able to vote.',
  },
  {
    id: 3,
    question: 'What does VVPAT allow a voter to verify?',
    options: [
      'Their Aadhaar number',
      'The candidate they voted for',
      'The total number of votes cast',
      'Their polling station location',
    ],
    correctIndex: 1,
    explanation: 'VVPAT (Voter Verifiable Paper Audit Trail) is a machine attached to the EVM that prints a paper slip showing the name and symbol of the candidate voted for, allowing voters to verify their choice.',
  },
  {
    id: 4,
    question: 'Who oversees the conduct of elections in India?',
    options: [
      'The Supreme Court',
      'The Prime Minister\'s Office',
      'The Election Commission of India',
      'The Parliament',
    ],
    correctIndex: 2,
    explanation: 'The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India at both national and state levels.',
  },
  {
    id: 5,
    question: 'Where should citizens look for authoritative election information?',
    options: [
      'Social media posts',
      'News channel debates',
      'The official ECI website (eci.gov.in)',
      'Political party websites',
    ],
    correctIndex: 2,
    explanation: 'The official Election Commission of India website (eci.gov.in) is the most authoritative source for election-related information, including schedules, candidate details, and voter services.',
  },
];

/**
 * Calculate quiz score and generate results.
 * @param {number[]} answers - Array of selected answer indices
 * @returns {{ score: number, total: number, percentage: number, results: Array }}
 */
export function calculateQuizScore(answers) {
  const results = QUIZ_QUESTIONS.map((question, index) => ({
    question: question.question,
    selectedIndex: answers[index],
    correctIndex: question.correctIndex,
    isCorrect: answers[index] === question.correctIndex,
    explanation: question.explanation,
    selectedAnswer: answers[index] != null ? question.options[answers[index]] : null,
    correctAnswer: question.options[question.correctIndex],
  }));

  const score = results.filter((r) => r.isCorrect).length;

  return {
    score,
    total: QUIZ_QUESTIONS.length,
    percentage: Math.round((score / QUIZ_QUESTIONS.length) * 100),
    results,
  };
}

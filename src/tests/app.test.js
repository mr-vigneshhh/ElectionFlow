import { describe, it, expect } from 'vitest';
import { calculateQuizScore } from '../data/quizData';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { STAGES, USER_MODES } from '../data/electionData';
import { OFFICIAL_RESOURCES, VOTE_ACTIONS } from '../data/resourcesData';
import { isTrustedUrl, getExternalLinkProps, getScoreMessage } from '../utils/helpers';
import { getPollingStationSearchUrl } from '../services/googleMaps';

// =============================================
// 1. Data Integrity Tests
// =============================================

describe('Election Data', () => {
  it('should have all 8 election stages', () => {
    expect(STAGES).toHaveLength(8);
    STAGES.forEach((stage, index) => {
      expect(stage.id).toBe(index + 1);
      expect(stage.title).toBeTruthy();
      expect(stage.shortDescription).toBeTruthy();
      expect(stage.details).toBeDefined();
      expect(stage.details.whatHappens).toBeTruthy();
      expect(stage.details.whyItMatters).toBeTruthy();
      expect(stage.details.citizenInfo).toBeTruthy();
    });
  });

  it('should have 3 user modes with valid configuration', () => {
    expect(Object.keys(USER_MODES)).toHaveLength(3);
    expect(USER_MODES.new).toBeDefined();
    expect(USER_MODES.basics).toBeDefined();
    expect(USER_MODES.voting).toBeDefined();

    // "New" mode should highlight all stages
    expect(USER_MODES.new.highlightedStages).toHaveLength(8);

    // "Voting" mode should highlight only relevant stages
    expect(USER_MODES.voting.highlightedStages.length).toBeLessThan(8);
  });
});

// =============================================
// 2. Quiz Scoring Tests
// =============================================

describe('Quiz Scoring', () => {
  it('should return perfect score when all answers are correct', () => {
    const correctAnswers = QUIZ_QUESTIONS.map((q) => q.correctIndex);
    const result = calculateQuizScore(correctAnswers);

    expect(result.score).toBe(5);
    expect(result.total).toBe(5);
    expect(result.percentage).toBe(100);
    expect(result.results.every((r) => r.isCorrect)).toBe(true);
  });

  it('should return zero score when all answers are wrong', () => {
    // Pick an answer that's definitely wrong for each question
    const wrongAnswers = QUIZ_QUESTIONS.map((q) => (q.correctIndex + 1) % q.options.length);
    const result = calculateQuizScore(wrongAnswers);

    expect(result.score).toBe(0);
    expect(result.percentage).toBe(0);
    expect(result.results.every((r) => !r.isCorrect)).toBe(true);
  });

  it('should provide explanations for all questions', () => {
    const answers = [0, 0, 0, 0, 0];
    const result = calculateQuizScore(answers);

    result.results.forEach((r) => {
      expect(r.explanation).toBeTruthy();
      expect(r.correctAnswer).toBeTruthy();
    });
  });

  it('should handle null answers gracefully', () => {
    const answers = [null, null, null, null, null];
    const result = calculateQuizScore(answers);

    expect(result.score).toBe(0);
    expect(result.total).toBe(5);
    result.results.forEach((r) => {
      expect(r.selectedAnswer).toBeNull();
    });
  });
});

// =============================================
// 3. Security & URL Validation Tests
// =============================================

describe('URL Security', () => {
  it('should validate trusted ECI domains', () => {
    expect(isTrustedUrl('https://eci.gov.in/')).toBe(true);
    expect(isTrustedUrl('https://voters.eci.gov.in/')).toBe(true);
    expect(isTrustedUrl('https://electoralsearch.eci.gov.in/')).toBe(true);
    expect(isTrustedUrl('https://results.eci.gov.in/')).toBe(true);
    expect(isTrustedUrl('https://www.google.com/maps')).toBe(true);
  });

  it('should reject untrusted domains', () => {
    expect(isTrustedUrl('https://malicious-site.com')).toBe(false);
    expect(isTrustedUrl('https://fake-eci.gov.in.attacker.com')).toBe(false);
    expect(isTrustedUrl('javascript:alert(1)')).toBe(false);
    expect(isTrustedUrl('')).toBe(false);
    expect(isTrustedUrl('not-a-url')).toBe(false);
  });

  it('should generate correct external link props', () => {
    const props = getExternalLinkProps('https://eci.gov.in/');
    expect(props.target).toBe('_blank');
    expect(props.rel).toBe('noopener noreferrer');
    expect(props.href).toBe('https://eci.gov.in/');
  });
});

// =============================================
// 4. Official Resource Links Tests
// =============================================

describe('Official Resources', () => {
  it('should have valid URLs for all resources', () => {
    OFFICIAL_RESOURCES.forEach((resource) => {
      expect(resource.url).toMatch(/^https:\/\//);
      expect(isTrustedUrl(resource.url)).toBe(true);
    });
  });

  it('should have valid URLs for all vote actions with links', () => {
    VOTE_ACTIONS.filter((a) => a.link).forEach((action) => {
      expect(action.link).toMatch(/^https:\/\//);
      expect(isTrustedUrl(action.link)).toBe(true);
      expect(action.linkLabel).toBeTruthy();
    });
  });
});

// =============================================
// 5. Google Maps Integration Tests
// =============================================

describe('Google Maps Integration', () => {
  it('should generate valid search URL without query', () => {
    const url = getPollingStationSearchUrl();
    expect(url).toContain('google.com/maps/search');
    expect(url).toContain('polling+station+near+me');
  });

  it('should encode user query in search URL', () => {
    const url = getPollingStationSearchUrl('New Delhi');
    expect(url).toContain('google.com/maps/search');
    expect(url).toContain('New%20Delhi');
    expect(url).toContain('polling+station+near+');
  });

  it('should handle special characters in query safely', () => {
    const url = getPollingStationSearchUrl('test<script>alert(1)</script>');
    expect(url).not.toContain('<script>');
    expect(url).toContain(encodeURIComponent('test<script>alert(1)</script>'));
  });
});

// =============================================
// 6. Utility Function Tests
// =============================================

describe('Score Messages', () => {
  it('should return appropriate messages for different scores', () => {
    expect(getScoreMessage(100)).toContain('Perfect');
    expect(getScoreMessage(80)).toContain('Excellent');
    expect(getScoreMessage(60)).toContain('Good');
    expect(getScoreMessage(40)).toContain('Not bad');
    expect(getScoreMessage(20)).toContain('Keep learning');
    expect(getScoreMessage(0)).toContain('Keep learning');
  });
});

import { useState, useCallback, useRef, useEffect } from 'react';
import { STAGES, USER_MODES } from '../data/electionData';
import { Badge } from './SharedComponents';

/**
 * TimelineStep component — individual stage in the election journey.
 */
function TimelineStep({ stage, isActive, isHighlighted, isDimmed, onClick }) {
  const stepClasses = [
    'timeline-step',
    isActive ? 'active' : '',
    isHighlighted ? 'highlighted' : '',
    isDimmed ? 'timeline-step-dimmed' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={stepClasses}
      onClick={() => onClick(stage.id)}
      aria-label={`Stage ${stage.id}: ${stage.title}${isActive ? ' (currently selected)' : ''}`}
      aria-pressed={isActive}
      role="tab"
      aria-selected={isActive}
      id={`stage-tab-${stage.id}`}
      aria-controls={isActive ? 'stage-detail-panel' : undefined}
    >
      <div className="timeline-step-inner">
        <div className="timeline-step-number" aria-hidden="true">
          {stage.icon}
        </div>
        <div className="timeline-step-content">
          <div className="timeline-step-title">{`${String(stage.id).padStart(2, '0')}. ${stage.title}`}</div>
          <div className="timeline-step-desc">{stage.shortDescription}</div>
        </div>
      </div>
    </button>
  );
}

/**
 * StageDetail component — expanded detail panel for a selected stage.
 */
function StageDetail({ stage, simplified, onClose }) {
  const panelRef = useRef(null);
  const { details } = stage;

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.focus();
    }
  }, [stage.id]);

  return (
    <div
      className="stage-detail"
      id="stage-detail-panel"
      role="tabpanel"
      aria-labelledby={`stage-tab-${stage.id}`}
      ref={panelRef}
      tabIndex={-1}
    >
      <div className="stage-detail-header">
        <div>
          <div className="stage-detail-step">
            <Badge variant="primary">Stage {String(stage.id).padStart(2, '0')}</Badge>
          </div>
          <h3 className="stage-detail-title">
            <span className="stage-detail-icon" aria-hidden="true">{stage.icon}</span>{' '}
            {stage.title}
          </h3>
        </div>
        <button
          className="stage-detail-close"
          onClick={onClose}
          aria-label="Close stage details"
        >
          ✕ Close
        </button>
      </div>

      <div className="stage-detail-section">
        <h4>📌 What happens?</h4>
        <p>{details.whatHappens}</p>
      </div>

      <div className="stage-detail-section">
        <h4>💡 Why it matters</h4>
        <p>{details.whyItMatters}</p>
      </div>

      <div className="stage-detail-section">
        <h4>👤 What citizens should know</h4>
        <p>{details.citizenInfo}</p>
      </div>

      {!simplified && details.terminology && details.terminology.length > 0 && (
        <div className="stage-detail-section">
          <h4>📖 Key terminology</h4>
          <ul className="terminology-list" aria-label="Key terms">
            {details.terminology.map((item) => (
              <li key={item.term} className="terminology-item">
                <div className="terminology-term">{item.term}</div>
                <div className="terminology-def">{item.definition}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {details.officialLink && (
        <div className="stage-detail-section">
          <h4>🔗 Official source</h4>
          <a
            href={details.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
            aria-label={`Visit official source for ${stage.title} — opens in a new tab`}
          >
            Visit Official Source ↗
          </a>
        </div>
      )}
    </div>
  );
}

/**
 * ModeSelector component — the Election Journey Explorer feature.
 */
function ModeSelector({ activeMode, onModeChange }) {
  return (
    <div className="mode-selector" role="radiogroup" aria-label="Choose your experience level">
      {Object.values(USER_MODES).map((mode) => (
        <button
          key={mode.id}
          className={`mode-card ${activeMode === mode.id ? 'active' : ''}`}
          onClick={() => onModeChange(mode.id)}
          role="radio"
          aria-checked={activeMode === mode.id}
          aria-label={mode.label}
        >
          <div className="mode-card-icon" aria-hidden="true">{mode.icon}</div>
          <div className="mode-card-label">{mode.label}</div>
          <div className="mode-card-desc">{mode.description}</div>
        </button>
      ))}
    </div>
  );
}

/**
 * ElectionJourney — the primary feature.
 * Renders the interactive election timeline with mode-based filtering.
 */
export default function ElectionJourney() {
  const [activeStage, setActiveStage] = useState(null);
  const [activeMode, setActiveMode] = useState('new');

  const currentModeConfig = USER_MODES[activeMode];
  const highlightedIds = currentModeConfig.highlightedStages;

  const handleStageClick = useCallback((stageId) => {
    setActiveStage((prev) => (prev === stageId ? null : stageId));
  }, []);

  const handleCloseDetail = useCallback(() => {
    setActiveStage(null);
  }, []);

  const selectedStage = activeStage
    ? STAGES.find((s) => s.id === activeStage)
    : null;

  return (
    <>
      {/* Hero */}
      <div className="hero">
        <h1 className="section-title">How does an election actually work?</h1>
        <p className="section-subtitle">
          Follow the election journey from announcement to results. 
          Select your experience level, then explore each stage.
        </p>
      </div>

      {/* Journey Explorer Mode Selector */}
      <ModeSelector activeMode={activeMode} onModeChange={setActiveMode} />

      {/* Timeline */}
      <div className="timeline" role="tablist" aria-label="Election journey stages">
        <div className="timeline-track">
          {STAGES.map((stage) => {
            const isHighlighted = highlightedIds.includes(stage.id);
            const isDimmed = activeMode === 'voting' && !isHighlighted;

            return (
              <TimelineStep
                key={stage.id}
                stage={stage}
                isActive={activeStage === stage.id}
                isHighlighted={isHighlighted}
                isDimmed={isDimmed}
                onClick={handleStageClick}
              />
            );
          })}
        </div>
      </div>

      {/* Stage Detail Panel */}
      {selectedStage ? (
        <StageDetail
          stage={selectedStage}
          simplified={currentModeConfig.simplified}
          onClose={handleCloseDetail}
        />
      ) : (
        <div className="empty-state" role="status">
          <p className="empty-state-text">
            👆 Select a stage above to explore what happens at each step of the election process.
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <p style={{
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-text-muted)',
        textAlign: 'center',
        marginTop: 'var(--space-6)',
        lineHeight: 'var(--line-height-relaxed)',
      }}>
        Note: This shows the general election process. Specific dates and schedules vary by election.
        For official election-specific information, visit{' '}
        <a href="https://eci.gov.in/" target="_blank" rel="noopener noreferrer">
          eci.gov.in
        </a>.
      </p>
    </>
  );
}

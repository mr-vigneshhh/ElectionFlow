import { useState, useCallback } from 'react';
import { VOTE_ACTIONS } from '../data/resourcesData';
import { Section, Button } from './SharedComponents';
import { getExternalLinkProps } from '../utils/helpers';
import { openPollingStationSearch } from '../services/googleMaps';

/**
 * VoteActionCard — individual action card in the How to Vote section.
 */
function VoteActionCard({ action }) {
  const [mapQuery, setMapQuery] = useState('');

  const handleMapSearch = useCallback(() => {
    openPollingStationSearch(mapQuery);
  }, [mapQuery]);

  const handleMapKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      openPollingStationSearch(mapQuery);
    }
  }, [mapQuery]);

  return (
    <div className="vote-action-card" id={`vote-action-${action.id}`}>
      <div className="vote-action-icon" aria-hidden="true">{action.icon}</div>
      <h3 className="vote-action-title">{action.title}</h3>
      <p className="vote-action-desc">{action.description}</p>

      {action.steps && (
        <ol className="vote-action-steps" aria-label={`Steps for ${action.title}`}>
          {action.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      )}

      {action.link && (
        <a
          className="btn btn-outline btn-sm"
          {...getExternalLinkProps(action.link)}
          aria-label={`${action.linkLabel} — opens in a new tab`}
        >
          {action.linkLabel} ↗
        </a>
      )}

      {action.hasMapAction && (
        <div className="maps-section" aria-label="Find polling station on Google Maps">
          <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
            🗺️ Search on Google Maps
          </p>
          <div className="maps-input-group">
            <label htmlFor="map-search-input" className="sr-only">
              Enter your area or locality name
            </label>
            <input
              id="map-search-input"
              type="text"
              className="maps-input"
              placeholder="Enter your area or locality..."
              value={mapQuery}
              onChange={(e) => setMapQuery(e.target.value)}
              onKeyDown={handleMapKeyDown}
              aria-describedby="maps-disclaimer"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={handleMapSearch}
              aria-label="Search for polling stations on Google Maps"
            >
              Search
            </Button>
          </div>
          <p className="maps-disclaimer" id="maps-disclaimer">
            ⚠️ This opens a Google Maps search for polling stations near the area you enter. 
            The results are indicative only. Your exact polling station is determined by your 
            voter registration address. Please verify your polling station through the{' '}
            <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer">
              National Voters' Service Portal
            </a>{' '}
            or your official voter slip.
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * HowToVote — the voter action center section.
 */
export default function HowToVote() {
  return (
    <Section
      id="vote"
      title="Ready to Vote?"
      subtitle="Everything you need to know to participate in the election. Check each step to make sure you're prepared."
    >
      <div className="vote-actions-grid">
        {VOTE_ACTIONS.map((action) => (
          <VoteActionCard key={action.id} action={action} />
        ))}
      </div>
    </Section>
  );
}

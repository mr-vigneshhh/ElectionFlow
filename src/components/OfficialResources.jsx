import { OFFICIAL_RESOURCES } from '../data/resourcesData';
import { Section, ResourceLink } from './SharedComponents';

/** Map resource categories to icons. */
const CATEGORY_ICONS = {
  primary: '🏛️',
  voter: '🗳️',
  results: '📊',
  candidates: '👤',
  info: '❓',
};

/**
 * OfficialResources — curated links to official election information sources.
 */
export default function OfficialResources() {
  return (
    <Section
      id="resources"
      title="Official Resources"
      subtitle="Access authoritative election information from official sources. All links open in a new tab."
    >
      <div className="resources-grid">
        {OFFICIAL_RESOURCES.map((resource) => (
          <ResourceLink
            key={resource.id}
            title={resource.title}
            description={resource.description}
            url={resource.url}
            icon={CATEGORY_ICONS[resource.category] || '🔗'}
          />
        ))}
      </div>
    </Section>
  );
}

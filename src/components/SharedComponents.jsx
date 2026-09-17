import { getExternalLinkProps } from '../utils/helpers';

/**
 * Badge component for labeling and categorization.
 */
export function Badge({ children, variant = 'primary' }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

/**
 * Button component with variants.
 */
export function Button({ children, variant = 'primary', size, onClick, ...props }) {
  const className = [
    'btn',
    `btn-${variant}`,
    size === 'sm' ? 'btn-sm' : '',
  ].filter(Boolean).join(' ');

  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

/**
 * Card component for content containers.
 */
export function Card({ children, elevated = false, className = '' }) {
  const classes = ['card', elevated ? 'card-elevated' : '', className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
}

/**
 * Section component for page sections with consistent spacing.
 */
export function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section" aria-labelledby={id ? `${id}-title` : undefined}>
      {(title || subtitle) && (
        <div className="section-header">
          {title && <h2 id={id ? `${id}-title` : undefined} className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

/**
 * ResourceLink component for external official links.
 * Includes safety attributes and external indicator.
 */
export function ResourceLink({ title, description, url, icon = '🔗' }) {
  return (
    <a
      className="resource-link"
      {...getExternalLinkProps(url)}
      aria-label={`${title} — opens in a new tab`}
    >
      <div className="resource-link-icon" aria-hidden="true">{icon}</div>
      <div>
        <div className="resource-link-title">{title}</div>
        <div className="resource-link-desc">{description}</div>
        <div className="resource-link-external" aria-hidden="true">
          ↗ Opens official website in a new tab
        </div>
      </div>
    </a>
  );
}

/**
 * EmptyState component for when there's nothing to show.
 */
export function EmptyState({ icon = '📋', message }) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state-icon" aria-hidden="true">{icon}</div>
      <p className="empty-state-text">{message}</p>
    </div>
  );
}

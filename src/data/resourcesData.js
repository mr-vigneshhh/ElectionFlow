/**
 * Official resource links for election information.
 * All URLs point to genuine official sources.
 */
export const OFFICIAL_RESOURCES = [
  {
    id: 'eci-main',
    title: 'Election Commission of India',
    description: 'The official website of the Election Commission of India — the constitutional authority that administers elections.',
    url: 'https://eci.gov.in/',
    category: 'primary',
  },
  {
    id: 'voter-services',
    title: 'National Voters\' Service Portal',
    description: 'Register to vote, search the electoral roll, check your polling station, and access other voter services.',
    url: 'https://voters.eci.gov.in/',
    category: 'voter',
  },
  {
    id: 'electoral-search',
    title: 'Electoral Roll Search',
    description: 'Search for your name in the electoral roll to verify your voter registration.',
    url: 'https://electoralsearch.eci.gov.in/',
    category: 'voter',
  },
  {
    id: 'results',
    title: 'Election Results',
    description: 'Official election results published by the Election Commission of India.',
    url: 'https://results.eci.gov.in/',
    category: 'results',
  },
  {
    id: 'candidate-info',
    title: 'Candidate Information',
    description: 'Find information about candidates contesting elections, including their affidavits.',
    url: 'https://eci.gov.in/candidate-political-parties/candidate/',
    category: 'candidates',
  },
  {
    id: 'eci-faqs',
    title: 'ECI FAQs',
    description: 'Frequently asked questions about the election process, voter registration, and more.',
    url: 'https://eci.gov.in/faqs/',
    category: 'info',
  },
];

/**
 * How-to-vote action items.
 */
export const VOTE_ACTIONS = [
  {
    id: 'check-registration',
    icon: '✓',
    title: 'Check Voter Registration',
    description: 'Your name must be on the electoral roll to vote. Verify your registration on the National Voters\' Service Portal or through the Electoral Roll Search.',
    link: 'https://electoralsearch.eci.gov.in/',
    linkLabel: 'Search Electoral Roll (Official ECI Service)',
  },
  {
    id: 'find-station',
    icon: '📍',
    title: 'Find Your Polling Station',
    description: 'Your polling station is assigned based on your registered address. You can find it on the National Voters\' Service Portal or your voter slip.',
    link: 'https://voters.eci.gov.in/',
    linkLabel: 'National Voters\' Service Portal',
    hasMapAction: true,
  },
  {
    id: 'at-the-booth',
    icon: '🏛️',
    title: 'What Happens at the Booth',
    description: 'At the polling station, officials will verify your identity using a valid photo ID. You will be given a mark on your finger (indelible ink) and directed to the EVM to cast your vote privately.',
    steps: [
      'Bring a valid photo ID (e.g., Voter ID card, Aadhaar, Passport, Driving License).',
      'Your name will be checked against the electoral roll.',
      'Indelible ink will be applied to your finger.',
      'You will be directed to the EVM in a private booth.',
      'Press the button next to your chosen candidate.',
      'Verify your vote on the VVPAT slip.',
    ],
  },
  {
    id: 'evm-vvpat',
    icon: '🖥️',
    title: 'EVM & VVPAT Explained',
    description: 'India uses Electronic Voting Machines (EVMs) for casting votes. The VVPAT machine is attached to the EVM and prints a paper slip showing the candidate\'s name and symbol, allowing you to verify your vote.',
    link: 'https://eci.gov.in/voter/voter-informations/',
    linkLabel: 'Learn More on ECI Website',
  },
];

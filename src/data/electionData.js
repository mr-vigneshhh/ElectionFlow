/**
 * Election journey stages data.
 * Contains general process information — not election-specific dates.
 * For official election-specific schedules, users should visit the ECI website.
 */

export const STAGES = [
  {
    id: 1,
    title: 'Election Announced',
    icon: '📢',
    shortDescription: 'The Election Commission announces upcoming elections and sets the schedule.',
    details: {
      whatHappens: 'The Election Commission of India (ECI) announces the election schedule, including key dates for nominations, voting, and counting. The Model Code of Conduct comes into effect immediately.',
      whyItMatters: 'This marks the official start of the election process. The Model Code of Conduct ensures a level playing field by restricting what governments and parties can do during the election period.',
      citizenInfo: 'Check if your name is on the electoral roll. This is the time to verify your voter registration and note important dates announced by the ECI.',
      terminology: [
        { term: 'Model Code of Conduct (MCC)', definition: 'A set of guidelines for political parties and candidates to ensure free and fair elections.' },
        { term: 'Electoral Roll', definition: 'The official list of people who are registered to vote in an election.' },
        { term: 'Gazette Notification', definition: 'The formal government announcement that officially starts the election process.' },
      ],
      officialLink: 'https://eci.gov.in/',
    },
  },
  {
    id: 2,
    title: 'Nomination',
    icon: '📝',
    shortDescription: 'Candidates file their nomination papers to contest the election.',
    details: {
      whatHappens: 'Candidates who wish to contest the election submit their nomination papers to the Returning Officer. They must provide personal details, declare assets and criminal cases (if any), and pay a security deposit.',
      whyItMatters: 'Nominations ensure transparency — voters can see who is contesting and review their backgrounds through mandatory affidavits.',
      citizenInfo: 'You can review candidate affidavits on the ECI website to learn about candidates\' backgrounds, education, assets, and any criminal cases.',
      terminology: [
        { term: 'Nomination Paper', definition: 'The official form a candidate fills to declare their intention to contest the election.' },
        { term: 'Security Deposit', definition: 'A monetary deposit candidates must pay, which is forfeited if they receive less than one-sixth of the total votes.' },
        { term: 'Affidavit', definition: 'A sworn legal document where candidates declare their assets, liabilities, educational qualifications, and criminal records.' },
      ],
      officialLink: 'https://eci.gov.in/candidate-political-parties/candidate/',
    },
  },
  {
    id: 3,
    title: 'Scrutiny',
    icon: '🔍',
    shortDescription: 'Nomination papers are examined for validity and completeness.',
    details: {
      whatHappens: 'The Returning Officer examines all nomination papers to check if they are properly filled, if the candidate is eligible, and if all required documents are submitted. Invalid nominations are rejected.',
      whyItMatters: 'Scrutiny ensures that only eligible candidates who have followed proper procedures can contest the election.',
      citizenInfo: 'The scrutiny process is an important safeguard. Candidates whose nominations are rejected can challenge the decision.',
      terminology: [
        { term: 'Returning Officer', definition: 'An official appointed by the ECI to manage the election in a constituency.' },
        { term: 'Scrutiny of Nominations', definition: 'The formal process of examining nomination papers for completeness and validity.' },
      ],
      officialLink: 'https://eci.gov.in/',
    },
  },
  {
    id: 4,
    title: 'Candidate Finalization',
    icon: '✅',
    shortDescription: 'Final list of candidates is published after withdrawal deadline.',
    details: {
      whatHappens: 'After scrutiny, candidates have a window to withdraw their nominations. Once the withdrawal deadline passes, the final list of contesting candidates is published.',
      whyItMatters: 'This gives voters a clear picture of who is contesting in their constituency, allowing them to make informed decisions.',
      citizenInfo: 'Check the final list of candidates for your constituency on the ECI website. Review their affidavits to understand their backgrounds.',
      terminology: [
        { term: 'Withdrawal of Candidature', definition: 'The process by which a nominated candidate can choose to withdraw from the election before a specified deadline.' },
        { term: 'Contesting Candidate', definition: 'A candidate whose nomination is valid and who has not withdrawn, thus appearing on the final ballot.' },
      ],
      officialLink: 'https://eci.gov.in/candidate-political-parties/candidate/',
    },
  },
  {
    id: 5,
    title: 'Campaign Period',
    icon: '📣',
    shortDescription: 'Candidates and parties campaign to reach voters before polling day.',
    details: {
      whatHappens: 'Political parties and candidates campaign through rallies, advertisements, door-to-door outreach, and social media. Campaigning must stop 48 hours before polling begins (the "silence period").',
      whyItMatters: 'Campaigns allow voters to learn about different candidates and their positions on issues. The silence period gives voters time to reflect.',
      citizenInfo: 'Use this time to learn about candidates, attend public meetings, and review manifestos. Be aware of the Model Code of Conduct — report violations to the ECI.',
      terminology: [
        { term: 'Silence Period', definition: 'The 48-hour period before polling when campaigning is prohibited, allowing voters to reflect.' },
        { term: 'Manifesto', definition: 'A public declaration of a political party\'s policies, aims, and promises.' },
        { term: 'Star Campaigner', definition: 'A recognized leader whose campaign expenses are borne by the party rather than individual candidates.' },
      ],
      officialLink: 'https://eci.gov.in/',
    },
  },
  {
    id: 6,
    title: 'Polling Day',
    icon: '🗳️',
    shortDescription: 'Voters cast their votes at designated polling stations.',
    details: {
      whatHappens: 'Registered voters go to their assigned polling stations and cast their votes using Electronic Voting Machines (EVMs). The VVPAT slip allows voters to verify their vote. Polling officials manage the process.',
      whyItMatters: 'This is the core of democracy — every registered voter has the right to cast their vote in a free and secret ballot.',
      citizenInfo: 'Bring a valid photo ID to the polling station. Your name must be on the electoral roll. Locate your polling station before polling day. You will use an EVM to vote and can verify using VVPAT.',
      terminology: [
        { term: 'EVM (Electronic Voting Machine)', definition: 'The electronic device used for casting votes in Indian elections. It has a ballot unit and a control unit.' },
        { term: 'VVPAT (Voter Verifiable Paper Audit Trail)', definition: 'A machine attached to the EVM that prints a slip showing the candidate\'s name and symbol, allowing voters to verify their vote.' },
        { term: 'Polling Station', definition: 'The designated venue where voters cast their votes.' },
        { term: 'Presiding Officer', definition: 'The official in charge of managing a polling station on election day.' },
      ],
      officialLink: 'https://eci.gov.in/voter/voter-informations/',
    },
  },
  {
    id: 7,
    title: 'Counting',
    icon: '🔢',
    shortDescription: 'Votes are counted under strict supervision.',
    details: {
      whatHappens: 'After polling, EVMs are securely stored and transported to counting centres. On counting day, votes are counted round by round under the supervision of the Returning Officer, with candidates\' agents present.',
      whyItMatters: 'Transparent counting ensures the integrity of election results. Multiple safeguards exist, including matching VVPAT slips with EVM counts.',
      citizenInfo: 'Counting is conducted in a transparent manner with representatives from all candidates present. Results are announced constituency by constituency.',
      terminology: [
        { term: 'Counting Agent', definition: 'A representative appointed by a candidate to observe the counting process.' },
        { term: 'Round', definition: 'Counting is done in rounds, with each round covering a set of EVMs from specific polling stations.' },
        { term: 'Strong Room', definition: 'A secure, sealed room where EVMs are stored between polling day and counting day.' },
      ],
      officialLink: 'https://results.eci.gov.in/',
    },
  },
  {
    id: 8,
    title: 'Results',
    icon: '🏆',
    shortDescription: 'Winners are declared and the election process concludes.',
    details: {
      whatHappens: 'The candidate with the most votes in each constituency is declared the winner by the Returning Officer. Results are published officially by the ECI. Winning candidates receive a certificate of election.',
      whyItMatters: 'The declaration of results completes the democratic process. Elected representatives take oath and form the government or take their seats in the legislature.',
      citizenInfo: 'Official results are published on the ECI website. If you believe there were irregularities, election petitions can be filed in the appropriate court.',
      terminology: [
        { term: 'First Past The Post (FPTP)', definition: 'The voting system used in India where the candidate with the most votes wins, regardless of whether they have a majority.' },
        { term: 'Certificate of Election', definition: 'The official document given to winning candidates confirming their election.' },
        { term: 'Election Petition', definition: 'A legal challenge to the result of an election, filed in the High Court.' },
      ],
      officialLink: 'https://results.eci.gov.in/',
    },
  },
];

/**
 * User mode configurations for the Election Journey Explorer.
 * Maps user intent to recommended stages and experience level.
 */
export const USER_MODES = {
  new: {
    id: 'new',
    label: "I'm new to elections",
    icon: '🌱',
    description: 'Get a simplified overview of every stage in the election process.',
    highlightedStages: [1, 2, 3, 4, 5, 6, 7, 8],
    simplified: true,
  },
  basics: {
    id: 'basics',
    label: 'I already know the basics',
    icon: '📚',
    description: 'Explore detailed terminology, procedures, and official resources.',
    highlightedStages: [1, 2, 3, 4, 5, 6, 7, 8],
    simplified: false,
  },
  voting: {
    id: 'voting',
    label: 'I need help voting',
    icon: '🗳️',
    description: 'Jump directly to registration, polling stations, and voting day information.',
    highlightedStages: [1, 6],
    simplified: true,
  },
};

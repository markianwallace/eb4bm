/**
 * EB4B Network Data Module
 * This module contains all data definitions for the network visualization
 * Generated from updated PI list on 2025-04-08
 * UPDATED: Enhanced rendering for higher resolution
 */

// Define domain/challenge area sizes
const domainSizes = {
  "Biomolecular Engineering": 15,       // INCREASED from 10
  "Interface Engineering and Materials": 15, // INCREASED from 10
  "Bioprocessing and Scale-up": 15,     // INCREASED from 10
  "Engineered Cellular Entry": 15,      // INCREASED from 10
  "Programmable Microenvironments": 15, // INCREASED from 10
  "Synthetic Cell-Cell Communication": 15 // INCREASED from 10
};

// Domain and challenge colors for visualization and legend
const domainColors = {
  "TD1": "#2d6e73", // Dark teal (Biomolecular Engineering)
  "TD2": "#3ac0b4", // Turquoise (Biomaterials Engineering)
  "TD3": "#7cdfdf", // Light cyan (Bioprocessing and Scale-up)
  // Challenge Areas
  "CA1": "#f9d647", // Yellow (Engineered Cellular Entry)
  "CA2": "#f5aa3c", // Orange (Programmable Microenvironments)
  "CA3": "#e8754e"  // Coral (Synthetic Cell to Cell Communication)
};

// Affiliation colors for researchers
const affiliationColors = {
  "KCL": "#e6001f",    // Red for KCL
  "UoL": "#000000",    // Black for UoL
  "Other": "#cccccc"   // Light grey for Other
};

// Define the nodes data 
const nodes = [
  // Technical Domains
  { id: "TD1", name: "Biomolecular Engineering", desc: "Alex Taylor", group: 2, type: "domain", area: domainSizes["Biomolecular Engineering"] },
  { id: "TD2", name: "Biomaterials Engineering", desc: "Paolo Actis", group: 2, type: "domain", area: domainSizes["Interface Engineering and Materials"] },
  { id: "TD3", name: "Bioprocessing and Scale-up", desc: "Charalampos Makatsoris", group: 2, type: "domain", area: domainSizes["Bioprocessing and Scale-up"] },
  
  // Challenge Areas
  { id: "CA1", name: "Engineered Cellular Entry", desc: "Driton Vllasaliu & Arwen Tyler", group: 2, type: "challenge", area: domainSizes["Engineered Cellular Entry"] },
  { id: "CA2", name: "Programmable Microenvironments", desc: "Tanya Shaw & Bahijja Raimi Abraham", group: 2, type: "challenge", area: domainSizes["Programmable Microenvironments"] },
  { id: "CA3", name: "Syn Cell to Cell Communication", desc: "Paula Booth & James Hindley", group: 2, type: "challenge", area: domainSizes["Synthetic Cell-Cell Communication"] },
  
  // Researchers 115 total researcher nodes (total)
  { id: "Whitehouse", name: "Ade Whitehouse", group: 3, domains: ["CA1"], affiliation: "UoL" },
  { id: "Najer", name: "Adrian Najer", group: 3, domains: ["TD2","CA1"], affiliation: "KCL" },
  { id: "Ramsay", name: "Alan Ramsay", group: 3, domains: ["CA2"], affiliation: "KCL" },
  { id: "Fueyo", name: "Alberto Sanchez Fueyo", group: 3, domains: ["TD2","CA1"], affiliation: "KCL" },
  { id: "Vigilante", name: "Aleesandra Vigilante", group: 3, domains: ["CA2"], affiliation: "KCL" },
  { id: "Ponjavic", name: "Aleks Ponjavic", group: 3, domains: ["CA2"], affiliation: "UoL" },
  { id: "Zelezniak", name: "Aleksej Zelezniak", group: 3, domains: ["TD1","CA2"], affiliation: "KCL" },
  { id: "Taylor", name: "Alexander Taylor", group: 3, domains: ["TD1","CA1"], affiliation: "KCL" },
  { id: "Baker", name: "Alison Baker", group: 3, domains: ["TD1","CA1"], affiliation: "UoL" },
  { id: "Beedle", name: "Amy Beedle", group: 3, domains: ["TD2"], affiliation: "KCL" },
  { id: "Melbourne", name: "Andrew Melbourne", group: 3, domains: ["CA2"], affiliation: "KCL" },
  { id: "Surman", name: "Andrew Surman", group: 3, domains: ["TD2"], affiliation: "KCL" },
  { id: "Herbert", name: "Anthony Herbert", group: 3, domains: ["CA2"], affiliation: "UoL" },
  { id: "Calabrese", name: "Antonio Calabrese", group: 3, domains: ["TD1","TD2"], affiliation: "UoL" },
  { id: "Tyler", name: "Arwen Tyler", group: 3, domains: ["TD2","CA2"], affiliation: "UoL" },
  { id: "Raimi", name: "Bahijja Raimi-Abraham", group: 3, domains: ["CA2", "TD3"], affiliation: "KCL" },
  { id: "Forbes", name: "Ben Forbes", group: 3, domains: ["TD2","TD3"], affiliation: "KCL" },
  { id: "Berninger", name: "Benedikt Berninger", group: 3, domains: ["CA2","CA3"], affiliation: "KCL" },
  { id: "Yorke", name: "Briony Yorke", group: 3, domains: ["CA2"], affiliation: "UoL" },
  { id: "Turnbull", name: "Bruce Turnbull", group: 3, domains: ["TD1"], affiliation: "UoL" },
  { id: "Makatsoris", name: "Charalampos Makatsoris", group: 3, domains: ["TD3"], affiliation: "KCL" },
  { id: "McTernan", name: "Charlie McTernan", group: 3, domains: ["TD1"], affiliation: "KCL" },
  { id: "Scarff", name: "Charlie Scarff", group: 3, domains: ["CA2"], affiliation: "UoL" },
  { id: "Hogstrand", name: "Christer Hogstrand", group: 3, domains: ["CA2"], affiliation: "KCL" },
  { id: "Waiti", name: "Christoph Waiti", group: 3, domains: ["TD2"], affiliation: "UoL" },
  { id: "Chiappini", name: "Ciro Chiappini", group: 3, domains: ["TD2","CA1"], affiliation: "KCL" },
  { id: "Tomlinson", name: "Darren Tomlinson", group: 3, domains: ["TD1","CA1"], affiliation: "UoL" },
  { id: "Brockwell", name: "David Brockwell", group: 3, domains: ["TD1"], affiliation: "UoL" },
  { id: "Zhou", name: "Dejian Zhou", group: 3, domains: ["TD2"], affiliation: "UoL" },
  { id: "McGonagale", name: "Dennis McGonagale", group: 3, domains: ["CA2"], affiliation: "UoL" },
  { id: "Vilasaliu", name: "Driton Vilasaliu", group: 3, domains: ["TD3","CA1"], affiliation: "KCL" },
  { id: "Eggert", name: "Eggert", group: 3, domains: ["CA1"], affiliation: "KCL" },
  { id: "Hewitt", name: "Eric Hewitt", group: 3, domains: ["TD2","CA2"], affiliation: "UoL" },
  { id: "Csibra", name: "Eszter Csibra", group: 3, domains: ["TD1"], affiliation: "UoL" },
  { id: "Sobbott", name: "Frank Sobbott", group: 3, domains: ["TD1"], affiliation: "UoL" },
  { id: "Bewick", name: "Gavin Bewick", group: 3, domains: ["CA1","CA2"], affiliation: "KCL" },
  { id: "Heath", name: "George Heath", group: 3, domains: ["TD2"], affiliation: "UoL" },
  { id: "Forte", name: "Giancarlo Forte", group: 3, domains: ["TD2","CA3"], affiliation: "KCL" },
  { id: "Fruhwirth", name: "Gilbert Fruhwirth", group: 3, domains: ["CA2"], affiliation: "KCL" },
  { id: "Aleku", name: "Godwin Aleku", group: 3, domains: ["TD3"], affiliation: "KCL" },
  { id: "Carpenter", name: "Guy Carpenter", group: 3, domains: ["TD2","CA2"], affiliation: "KCL" },
  { id: "Britt", name: "Hannah Britt", group: 3, domains: ["CA2"], affiliation: "UoL" },
  { id: "Li", name: "Hao-Ying Li", group: 3, domains: ["CA2"], affiliation: "KCL" },
  { id: "Saliem", name: "Heba Saliem", group: 3, domains: ["CA2","CA3"], affiliation: "KCL" },
  { id: "Isaacson", name: "Isaacson", group: 3, domains: ["TD1"], affiliation: "KCL" },
  { id: "Lieberam", name: "Ivo Lieberam", group: 3, domains: ["TD2","CA2"], affiliation: "KCL" },
  { id: "Hindley", name: "James Hindley", group: 3, domains: ["TD3","CA3"], affiliation: "KCL" },
  { id: "Garnettt", name: "James Garnettt", group: 3, domains: ["TD1","CA2"], affiliation: "KCL" },
  { id: "McDonnell", name: "James McDonnell", group: 3, domains: ["TD1","CA2"], affiliation: "KCL" },
  { id: "Kwok", name: "Jessica Kwok", group: 3, domains: ["CA2"], affiliation: "UoL" },
  { id: "Ladbury", name: "John Ladbury", group: 3, domains: ["CA2"], affiliation: "UoL" },
  { id: "Gala", name: "Julia Gala de Pablo", group: 3, domains: ["CA2"], affiliation: "UoL" },
  { id: "Bergeron", name: "Julien Bergeron", group: 3, domains: ["TD1"], affiliation: "KCL" },
  { id: "Critchley", name: "Kevin Critchley", group: 3, domains: ["TD2"], affiliation: "UoL" },
  { id: "Ke", name: "Lijing Ke", group: 3, domains: ["TD2","CA1","CA2"], affiliation: "UoL" },
  { id: "Zeng", name: "Lingfang Zeng", group: 3, domains: ["CA1","CA2"], affiliation: "KCL" },
  { id: "Dougan", name: "Lorna Dougan", group: 3, domains: ["TD2"], affiliation: "UoL" },
  { id: "Gnudi", name: "Luigi Gnudi", group: 3, domains: ["TD3","CA2"], affiliation: "KCL" },
  { id: "Margiotta", name: "Luigi Margiotta-Casaluci", group: 3, domains: ["CA3"], affiliation: "KCL" },
  { id: "Rossetti", name: "Leone Rossetti", group: 3, domains: ["CA2"], affiliation: "KCL" },
  { id: "Al-Jawad", name: "Maisoon Al-Jawad", group: 3, domains: ["TD2"], affiliation: "UoL" },
  { id: "Muller", name: "Manuel Muller", group: 3, domains: ["TD1"], affiliation: "KCL" },
  { id: "Green", name: "Mark Green", group: 3, domains: ["TD2"], affiliation: "KCL" },
  { id: "Wallace", name: "Mark Wallace", group: 3, domains: ["TD2", "CA1", "CA3"], affiliation: "KCL" },
  { id: "Castronovo", name: "Matteo Castronovo", group: 3, domains: ["TD1","CA1"], affiliation: "UoL" },
  { id: "Krause", name: "Matthias Krause", group: 3, domains: ["CA2"], affiliation: "KCL" },
  { id: "Thanou", name: "Maya Thanou", group: 3, domains: ["TD2","CA1"], affiliation: "KCL" },
  { id: "Wright", name: "Megan Wright", group: 3, domains: ["CA2"], affiliation: "UoL" },
  { id: "MGuo", name: "Miao Guo", group: 3, domains: ["TD3"], affiliation: "KCL" },
  { id: "Matta", name: "Micaela Matta", group: 3, domains: ["TD2"], affiliation: "KCL" },
  { id: "Peckham", name: "Michelle Peckham", group: 3, domains: ["CA2"], affiliation: "UoL" },
  { id: "Mano", name: "Miguel Mano", group: 3, domains: ["TD2"], affiliation: "KCL" },
  { id: "Webb", name: "Mike Webb", group: 3, domains: ["TD1","CA2"], affiliation: "UoL" },
  { id: "Stroud", name: "Mtthew Stroud", group: 3, domains: ["TD2","CA3"], affiliation: "KCL" },
  { id: "Thompson", name: "Neil Thompson", group: 3, domains: ["TD2"], affiliation: "UoL" },
  { id: "Forde", name: "Niamh Forde", group: 3, domains: ["TD2","CA2"], affiliation: "UoL" },
  { id: "Stonehouse", name: "Nicola Stonehouse", group: 3, domains: ["CA1"], affiliation: "UoL" },
  { id: "Kapur", name: "Nik Kapur", group: 3, domains: ["TD3"], affiliation: "UoL" },
  { id: "Rudyk", name: "Olen Rudyk", group: 3, domains: ["CA2"], affiliation: "KCL" },
  { id: "Ipek", name: "Ozlem Ipek", group: 3, domains: ["TD2","TD3","CA1"], affiliation: "KCL" },
  { id: "Shangaris", name: "Panicos Shangaris", group: 3, domains: ["CA3"], affiliation: "KCL" },
  { id: "Actis", name: "Paolo Actis", group: 3, domains: ["TD2","CA1"], affiliation: "UoL" },
  { id: "Beales", name: "Paul Beales", group: 3, domains: ["TD2","CA3"], affiliation: "UoL" },
  { id: "Booth", name: "Paula Booth", group: 3, domains: ["CA3"], affiliation: "KCL" },
  { id: "Adams", name: "Peter Adams", group: 3, domains: ["TD1"], affiliation: "UoL" },
  { id: "Stockley", name: "Peter Stockley", group: 3, domains: ["TD1","CA1"], affiliation: "UoL" },
  { id: "Rosales", name: "Rafale Torres Martin de Rosales", group: 3, domains: ["TD2"], affiliation: "KCL" },
  { id: "Richter", name: "Ralf Richter", group: 3, domains: ["CA2"], affiliation: "UoL" },
  { id: "Frank", name: "Rene Frank", group: 3, domains: ["CA1"], affiliation: "UoL" },
  { id: "Benjamin", name: "Reuben Benjamin", group: 3, domains: ["CA2"], affiliation: "KCL" },
  { id: "Bayliss", name: "Richard Bayliss", group: 3, domains: ["TD1","TD2"], affiliation: "UoL" },
  { id: "Southworth", name: "Richard Southworth", group: 3, domains: ["TD1"], affiliation: "KCL" },
  { id: "Davies", name: "Robert Davies", group: 3, domains: ["TD2","CA2"], affiliation: "UoL" },
  { id: "Jefferson", name: "Robert Jefferson", group: 3, domains: ["TD1"], affiliation: "KCL" },
  { id: "Kochl", name: "Robert Kochl", group: 3, domains: ["CA1","CA2"], affiliation: "KCL" },
  { id: "Barry", name: "Sarah Barry", group: 3, domains: ["TD1"], affiliation: "KCL" },
  { id: "Conte", name: "Sasi Conte", group: 3, domains: ["CA1"], affiliation: "KCL" },
  { id: "Serio", name: "Serio", group: 3, domains: ["CA2","CA3"], affiliation: "KCL" },
  { id: "Garcia-Manyes", name: "Sergi Garcia-Manyes", group: 3, domains: ["TD2"], affiliation: "KCL" },
  { id: "Connell", name: "Simon Connell", group: 3, domains: ["TD2"], affiliation: "UoL" },
  { id: "Tsoka", name: "Sophia Tsoka", group: 3, domains: ["TD1","CA3"], affiliation: "KCL" },
  { id: "Vladescu", name: "Sorin-Cristian Vladescu", group: 3, domains: ["TD2"], affiliation: "KCL" },
  { id: "Karagiannis", name: "Sphia Karagiannis", group: 3, domains: ["CA1","CA2"], affiliation: "KCL" },
  { id: "Bo", name: "Stefano Bo", group: 3, domains: ["CA2"], affiliation: "KCL" },
  { id: "Muench", name: "Stephen Muench", group: 3, domains: ["TD2","CA3"], affiliation: "UoL" },
  { id: "Evans", name: "Steve Evans", group: 3, domains: ["TD2"], affiliation: "UoL" },
  { id: "Warriner", name: "Stuart Warriner", group: 3, domains: ["TD1","CA1"], affiliation: "UoL" },
  { id: "Mukhopadhyay", name: "Subhankar Mukhopadhyay", group: 3, domains: ["CA1"], affiliation: "KCL" },
  { id: "Sanchez", name: "Sánchez-Fueyo", group: 3, domains: ["TD2","CA1"], affiliation: "KCL" },
  { id: "Shaw", name: "Tanya Shaw", group: 3, domains: ["CA2","CA3"], affiliation: "KCL" },
  { id: "Nott", name: "Tim Nott", group: 3, domains: ["TD1"], affiliation: "KCL" },
  { id: "Chamberlain", name: "Tom Chamberlain", group: 3, domains: ["TD3"], affiliation: "UoL" },
  { id: "Pensabene", name: "Virginia Pensabene", group: 3, domains: ["TD2"], affiliation: "UoL" },
  { id: "Kulkami", name: "Vishwesh Kulkami", group: 3, domains: ["CA3"], affiliation: "KCL" },
  { id: "Deng", name: "Yansha Deng", group: 3, domains: ["TD3"], affiliation: "KCL" },
  { id: "Guo", name: "Yuan Guo", group: 3, domains: ["CA1","CA2"], affiliation: "UoL" },
  { id: "Nyathi", name: "Yvonne Nyathi", group: 3, domains: ["CA2"], affiliation: "UoL" }
];

// Create the links array from node data
function createLinks() {
  const links = [];
  
  // Add links from domains/challenges to researchers
  nodes.forEach(node => {
    if (node.group === 3 && node.domains) {
      // For each domain this researcher belongs to, create a link
      node.domains.forEach(domainId => {
        links.push({
          source: domainId,
          target: node.id,
          value: 1.5 // INCREASED from 1 for thicker links
        });
      });
    }
  });
  
  return links;
}

// Export domain names and colors for legend
const legendData = {
  domains: {
    "Biomolecular Engineering": domainColors["TD1"],
    "Biomaterials Engineering": domainColors["TD2"],
    "Bioprocessing and Scale-up": domainColors["TD3"]
  },
  challenges: {
    "Engineered Cellular Entry": domainColors["CA1"],
    "Programmable Microenvironments": domainColors["CA2"],
    "Synthetic Cell to Cell Communication": domainColors["CA3"]
  },
  affiliations: affiliationColors
};

// Define domain positions for layout
const domainPositions = {
  // Technical domains (left side, top to bottom)
  "TD1": { angle: -2*Math.PI/3 },  // Top 
  "TD2": { angle: -Math.PI },      // Middle 
  "TD3": { angle: -4*Math.PI/3 },  // Bottom 
  
  // Challenge areas (right side, top to bottom)
  "CA1": { angle: -Math.PI/3 },    // Top 
  "CA2": { angle: 0 },             // Middle  
  "CA3": { angle: Math.PI/3 }      // Bottom 
};

// Utility functions for working with the data
const dataUtils = {
  // Get color for a node based on its type
  getNodeColor: function(node) {
    if (node.group === 2) {
      // Domain or challenge node
      return domainColors[node.id];
    } else if (node.group === 3) {
      // Researcher node - color by affiliation
      return affiliationColors[node.affiliation] || affiliationColors["Other"];
    }
    return "#999"; // Default color
  },
  
  // Get radius from area for sizing nodes
  getRadiusFromArea: function(area) {
    const scaleFactor = 45; // INCREASED from 40 for larger domain bubbles
    return Math.sqrt(area / Math.PI) * scaleFactor;
  },
  
  // Check if a node is part of multiple domains
  hasMultipleDomains: function(node) {
    return node.domains && node.domains.length > 1;
  }
};

// Export the network data and utilities
// FIXED: Ensuring property names match the variable names used in the code
const networkData = {
  nodes: nodes,
  createLinks: createLinks,
  domainColors: domainColors,          // FIXED: Matching the variable name exactly
  affiliationColors: affiliationColors, // FIXED: Matching the variable name exactly
  legendData: legendData,
  domainPositions: domainPositions,
  utils: dataUtils
};
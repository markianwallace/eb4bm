/**
 * EB4B Network Visualization Module
 * This module handles rendering the network visualization and interactions
 * UPDATED: Increased resolution for better visualization
 */

document.addEventListener('DOMContentLoaded', function() {
  const NetworkViz = (function() {
    // Private variables
    let svg, simulation;
    let width, height, centerX, centerY;
    let nodes, links, nodeElements, linkElements, textBackgrounds;
    
    // Configuration
    const config = {
      // Node appearance
      nodeRadius: 15,              // INCREASED from 10 - Default node radius for researchers
      nodeBorderWidth: 1.5,        // INCREASED from 1 - Width of node border
      nodeBorderColor: "#fff",     // Color of node border
      
      // Layout parameters
      centerRadius: 500,           // INCREASED from 300 - Radius for domain/challenge positions
      textPadding: 5,              // INCREASED from 4 - Padding for text backgrounds
      nodeSpacing: 20,             // INCREASED from 15 - Minimum space between researcher nodes
      randomOffsetRange: 0,      // INCREASED from 150 - Range of random offset for initial positions
      researcherLabelOffset: 22,   // INCREASED from 20 - Distance between researcher nodes and their labels
      
      // Link appearance
      linkOpacity: 0.6,            // Default opacity for links
      linkWidth: 5,                // INCREASED from 4 - Default width for links
      
      // Simulation parameters
      simulationAlpha: 0.1,          // Initial simulation alpha
      simulationDecay: 0.01,      // DECREASED from 0.02 - Alpha decay rate (slower cooling)
      linkDistance: 161,           // INCREASED from 110 - Distance between linked nodes
      linkDistanceVariance: 60,    // INCREASED from 60 - Variance in link distances
      linkStrength: 0.15,          // Strength of link forces
      chargeStrength: 1.5,         // Strength of charge forces
      collisionStrength: 0.1,       // Strength of collision forces
      domainForceStrength: 0.025,   // Force strength for researchers
      fixedNodeForceStrength: 0.03, // Force strength for fixed nodes
      
      // Text parameters
      domainLabelSize: 20,         // INCREASED from 14 - Font size for domain/challenge labels
      themeLabelSize: 20,          // INCREASED from 14 - Font size for theme lead labels
      researcherLabelSize: 24,     // INCREASED from 13 - Font size for researcher labels
      labelLineHeight: 1.5,        // INCREASED from 1.1 - Line height for wrapped text
      textBackgroundOpacity: 0.5,  // Opacity of text background rectangles
      textRenderDelay: 1000,       // Delay for text background rendering
      textWidthFactor: 1.8,        // Factor to determine text width from node radius
      
      // Boundary constraints
      nodePadding: 25              // INCREASED from 20 - Padding to keep nodes within boundaries
    };
    
    // Initialize the visualization
    function initialize() {
      setupDimensions();
      createSVG();
      prepareData();
      createSimulation();
      renderVisualization();
      createLegend();
    }
    
    // Set up container dimensions
    function setupDimensions() {
      const container = document.getElementById('visualization');
      width = 1800;  // INCREASED from 1200 - Set a larger fixed width
      height = 1800; // INCREASED from 1200 - Set a larger fixed height
      centerX = width / 2;
      centerY = height / 2;
    }
    
    // Create the SVG element
    function createSVG() {
      svg = d3.select('#visualization')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('style', 'max-width: 100%; height: auto;');
      
      // Add background
      svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', '#ffffff')
        .attr('stroke', '#ddd');
    }
    
    // Prepare data for visualization
    function prepareData() {
      // Clone nodes to avoid modifying the original data
      nodes = networkData.nodes.map(d => Object.assign({}, d));
      
      // Process node data
      nodes.forEach(node => {
        if (node.group === 3) {
          // Ensure domains is an array
          if (!node.domains) node.domains = [];
          
          // Set default affiliation
          if (!node.affiliation) node.affiliation = "Other";
        }
      });
      
      // Create links
      links = networkData.createLinks();
      
      // Position domains and challenge areas
      positionDomainsAndChallenges();
      
      // Initialize researcher positions
      initializeResearcherPositions();
    }
    
    // Position domains and challenges in a circle
    function positionDomainsAndChallenges() {
      const domainsAndChallenges = nodes.filter(n => n.group === 2);
      
      domainsAndChallenges.forEach((domain) => {
        const position = networkData.domainPositions[domain.id];
        if (position) {
          domain.fx = centerX + config.centerRadius * Math.cos(position.angle);
          domain.fy = centerY + config.centerRadius * Math.sin(position.angle);
        }
      });
    }
    
    // Initialize researcher positions near their domains
    function initializeResearcherPositions() {
      nodes.forEach(node => {
        if (node.group === 3 && node.domains && node.domains.length > 0) {
          let totalX = 0;
          let totalY = 0;
          let count = 0;
          
          // Get parent domain positions
          node.domains.forEach(domainId => {
            const parentNode = nodes.find(n => n.id === domainId);
            if (parentNode && parentNode.fx) {
              totalX += parentNode.fx;
              totalY += parentNode.fy;
              count++;
            }
          });
          
          if (count > 0) {
            // Set initial position near parent domains with randomness
            node.x = totalX / count + (Math.random() - 0.5) * config.randomOffsetRange;
            node.y = totalY / count + (Math.random() - 0.5) * config.randomOffsetRange;
          } else {
            // Default to center with randomness
            node.x = centerX + (Math.random() - 0.5) * config.randomOffsetRange;
            node.y = centerY + (Math.random() - 0.5) * config.randomOffsetRange;
          }
        }
      });
    }
    
    // Create the force simulation
    function createSimulation() {
      simulation = d3.forceSimulation(nodes)
        // Link force
        .force("link", d3.forceLink(links)
          .id(d => d.id)
          .distance(d => config.linkDistance + (Math.random() - 0.5) * config.linkDistanceVariance)
          .strength(config.linkStrength)
        )
        
        // Attraction force
        .force("charge", d3.forceManyBody().strength(config.chargeStrength))
        
        // Collision avoidance
        .force("collision", d3.forceCollide().radius(getCollisionRadius).strength(config.collisionStrength))
        
        // X positioning force
        .force("domain-x", d3.forceX(getDomainXForce).strength(getDomainForceStrength))
        
        // Y positioning force
        .force("domain-y", d3.forceY(getDomainYForce).strength(getDomainForceStrength));
      
      // Set up the simulation tick handler
      simulation.on("tick", simulationTick);
      
      // Start the simulation with the specified parameters
      simulation.alpha(config.simulationAlpha).alphaDecay(config.simulationDecay).restart();
    }
    
    // Get collision radius for a node
    function getCollisionRadius(d) {
      if (d.group === 2) {
        // For domains/challenges, use area-based radius plus padding
        return networkData.utils.getRadiusFromArea(d.area) + 20;
      }
      
      // For researchers (group 3), add spacing to ensure adequate separation
      return config.nodeRadius + config.nodeSpacing;
    }
    
    // Calculate X force for domain positioning
    function getDomainXForce(d) {
      if (d.group !== 3) return centerX;
      
      if (d.domains && d.domains.length > 0) {
        let totalX = 0;
        let domainCount = 0;
        
        d.domains.forEach(domainId => {
          const parentNode = nodes.find(n => n.id === domainId);
          if (parentNode && parentNode.fx) {
            totalX += parentNode.fx;
            domainCount++;
          }
        });
        
        if (domainCount > 0) {
          // Add random variation for natural distribution
          return (totalX / domainCount) + (Math.random() - 0.5) * config.randomOffsetRange;
        }
      }
      
      return centerX; // Default to center
    }
    
    // Calculate Y force for domain positioning
    function getDomainYForce(d) {
      if (d.group !== 3) return centerY;
      
      if (d.domains && d.domains.length > 0) {
        let totalY = 0;
        let domainCount = 0;
        
        d.domains.forEach(domainId => {
          const parentNode = nodes.find(n => n.id === domainId);
          if (parentNode && parentNode.fy) {
            totalY += parentNode.fy;
            domainCount++;
          }
        });
        
        if (domainCount > 0) {
          // Add random variation for natural distribution
          return (totalY / domainCount) + (Math.random() - 0.5) * config.randomOffsetRange;
        }
      }
      
      return centerY; // Default to center
    }
    
    // Get force strength based on node type
    function getDomainForceStrength(d) {
      return d.group === 3 ? config.domainForceStrength : config.fixedNodeForceStrength;
    }
    
    // Handle simulation tick - update positions
    function simulationTick() {
      // Apply boundary constraints to keep nodes in view
      nodes.forEach(d => {
        if (!d.fx && !d.fy) {
          d.x = Math.max(config.nodePadding, Math.min(width - config.nodePadding, d.x));
          d.y = Math.max(config.nodePadding, Math.min(height - config.nodePadding, d.y));
        }
      });
      
      // Update link positions
      linkElements
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      
      // Update node positions
      nodeElements.attr("transform", d => `translate(${d.x},${d.y})`);
      
      // Update background rectangles
      textBackgrounds.attr("transform", d => `translate(${d.x},${d.y})`);
    }
    
    // Render the visualization
    function renderVisualization() {
      renderLinks();
      renderNodes();
      updateTextBackgrounds();
    }
    
    // Render network links
    function renderLinks() {
      linkElements = svg.append("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", d => {
          // For links to researchers, use the domain color
          const domainId = d.source.id.startsWith("TD") || d.source.id.startsWith("CA") ? 
                          d.source.id : d.target.id;
          return networkData.domainColors[domainId] || "#999";
        })
        .attr("stroke-opacity", config.linkOpacity)
        .attr("stroke-width", d => Math.sqrt(d.value) * config.linkWidth);
    }
    
    // Render network nodes
    function renderNodes() {
      const nodeGroup = svg.append("g");
      
      // Add background rectangles for text
      textBackgrounds = nodeGroup.selectAll(".text-bg")
        .data(nodes.filter(d => d.group === 3))
        .join("rect")
        .attr("class", "text-bg")
        .attr("fill", "#ffffff")
        .attr("opacity", config.textBackgroundOpacity)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("width", 0)
        .attr("height", 0)
        .attr("x", 0)
        .attr("y", 0);
      
      // Create the nodes
      nodeElements = nodeGroup.selectAll(".node")
        .data(nodes)
        .join("g")
        .attr("class", "node")
        .call(createDragBehavior());
      
      // Add circles to nodes
      nodeElements.append("circle")
        .attr("r", getNodeRadius)
        .attr("fill", d => networkData.utils.getNodeColor(d))
        .attr("stroke", config.nodeBorderColor)
        .attr("stroke-width", config.nodeBorderWidth);
      
      // Add labels to nodes
      addNodeLabels();
    }
    
    // Calculate node radius based on type
    function getNodeRadius(d) {
      if (d.group === 2) {
        // For domains and challenges, use area
        return networkData.utils.getRadiusFromArea(d.area);
      }
      
      // All researchers have the same radius
      return config.nodeRadius;
    }
    
    // Add labels to nodes based on type
    function addNodeLabels() {
      // Add domain/challenge name labels with text wrapping
      nodeElements.filter(d => d.group === 2)
        .append("text")
        .attr("class", "node-label-domain")
        .attr("x", 0)
        .attr("y", -15) // Restore original position
        .attr("text-anchor", "middle")
        .style("font-size", config.domainLabelSize + "px")
        .text(d => d.name)
        .each(function(d) {
          wrapText(d3.select(this), getMaxTextWidth(d));
        });
      
      // // Add domain/challenge theme lead labels
      // nodeElements.filter(d => d.group === 2)
      //   .append("text")
      //   .attr("class", "node-label")
      //   .attr("x", 0)
      //   .attr("y", 20) // Restore original position
      //   .attr("text-anchor", "middle")
      //   .attr("fill", "white")
      //   .style("font-size", config.themeLabelSize + "px") // Standardized theme lead font size
      //   .text(d => d.desc)
      //   .each(function(d) {
      //     wrapText(d3.select(this), getMaxTextWidth(d));
      //   });
      
      // Add researcher labels
      nodeElements.filter(d => d.group === 3)
        .append("text")
        .attr("class", "node-label")
        .attr("x", 0)
        .attr("y", config.researcherLabelOffset) // Increased distance for researchers
        .attr("text-anchor", "middle")
        .style("font-size", config.researcherLabelSize + "px")
        .text(d => {
          // Just show surname for researchers
          const parts = d.name.split(" ");
          return parts[parts.length - 1];
        });
    }
    
    // Calculate max width for text wrapping
    function getMaxTextWidth(d) {
      if (d.group === 2) {
        const radius = networkData.utils.getRadiusFromArea(d.area);
        return radius * config.textWidthFactor; // Use factor from config
      }
      return 120; // Default for other nodes
    }
    
    // Function to wrap text within a given width
    function wrapText(text, width) {
      text.each(function() {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        const lineHeight = config.labelLineHeight; // ems
        const y = text.attr("y");
        const dy = parseFloat(text.attr("dy") || 0);
        
        let line = [];
        let lineNumber = 0;
        let word = words.pop();
        let tspan = text.text(null).append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", dy + "em");
        
        while (word) {
          line.push(word);
          tspan.text(line.join(" "));
          
          if (tspan.node().getComputedTextLength() > width && line.length > 1) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
          
          word = words.pop();
        }
      });
    }
    
    // Update background rectangles for text
    function updateTextBackgrounds() {
      setTimeout(() => {
        // Update rectangles for researcher labels
        nodeElements.filter(d => d.group === 3).each(function(d) {
          const nodeElement = d3.select(this);
          const textElement = nodeElement.select("text");
          
          if (textElement.node()) {
            const textBox = textElement.node().getBBox();
            const padding = config.textPadding;
            
            // Find matching background rect
            textBackgrounds.filter(bg => bg.id === d.id)
              .attr("width", textBox.width + padding * 2)
              .attr("height", textBox.height + padding * 2)
              .attr("x", -textBox.width/2 - padding)
              .attr("y", textBox.y - padding);
          }
        });
      }, config.textRenderDelay); // Wait for text rendering
    }
    
    // Create drag behavior for nodes
    function createDragBehavior() {
      return d3.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded);
      
      function dragStarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        
        // Store original positions
        if (event.subject.group === 2) {
          // For fixed nodes, store original fixed positions
          event.subject._originalFx = event.subject.fx;
          event.subject._originalFy = event.subject.fy;
        } else {
          // For regular nodes, fix them during drag
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }
      }
      
      function dragged(event) {
        // Move node during drag
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragEnded(event) {
        if (!event.active) simulation.alphaTarget(0);
        
        // Restore original positions or unfix nodes
        if (event.subject.group === 2) {
          event.subject.fx = event.subject._originalFx;
          event.subject.fy = event.subject._originalFy;
        } else {
          // Regular researcher nodes return to being unfixed
          event.subject.fx = null;
          event.subject.fy = null;
        }
      }
    }
    
    // Create the legend
    function createLegend() {
      const legend = d3.select('#legend');
      
      // Add legend section for domains
      legend.append('div')
        .attr('class', 'legend-title')
        .text('Technical Domains');
      
      Object.entries(networkData.legendData.domains).forEach(([domain, color]) => {
        createLegendItem(legend, domain, color);
      });
      
      // Add legend section for challenges
      legend.append('div')
        .attr('class', 'legend-title')
        .style('margin-top', '15px')
        .text('Challenge Areas');
      
      Object.entries(networkData.legendData.challenges).forEach(([challenge, color]) => {
        createLegendItem(legend, challenge, color);
      });
      
      // Add affiliation legend items
      legend.append('div')
        .attr('class', 'legend-title')
        .style('margin-top', '15px')
        .text('Affiliations');
      
      Object.entries(networkData.legendData.affiliations).forEach(([affiliation, color]) => {
        createLegendItem(legend, affiliation, color);
      });
    }
    
    // Create a legend item
    function createLegendItem(container, label, color) {
      const legendItem = container.append('div')
        .attr('class', 'legend-item');
      
      legendItem.append('div')
        .attr('class', 'legend-color')
        .style('background-color', color);
      
      legendItem.append('div')
        .attr('class', 'legend-label')
        .text(label);
    }
    
    // Public API
    return {
      initialize: initialize,
      
      // Add public methods for external control if needed
      refreshLayout: function() {
        simulation.alpha(1).restart();
      }
    };
  })();
  
  // Initialize the visualization
  NetworkViz.initialize();
});

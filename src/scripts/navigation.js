/**
 * NavigationManager - Intelligent scroll-based navigation system
 * Handles section detection, navigation state management, and portfolio subpage selection
 */
export class NavigationManager {
  constructor() {
    // Main page sections in order
    this.sections = ['hero', 'portfolio', 'about', 'contact'];
    
    // Current active section and navigation state
    this.currentSection = null;
    this.currentPage = null;
    
    // Intersection Observer instance
    this.observer = null;
    
    // Navigation elements cache
    this.navLinks = new Map();
    
    // Configuration
    this.config = {
      threshold: 0.3, // Section is active when 30% visible
      rootMargin: '-10px 0px -10px 0px', // Slight buffer for edge cases
      debounceMs: 100 // Debounce rapid scroll changes
    };
    
    // Debounce timer
    this.debounceTimer = null;
  }

  /**
   * Initialize the navigation manager
   */
  init() {
    this.detectPageType();
    this.cacheNavigationElements();
    
    if (this.currentPage === 'main') {
      this.setupIntersectionObserver();
      this.handleInitialState();
    } else if (this.currentPage === 'portfolio-subpage') {
      this.handlePortfolioSubpage();
    }
  }

  /**
   * Detect current page type (main page vs portfolio subpage)
   */
  detectPageType() {
    const path = window.location.pathname;
    
    if (path.includes('/portfolio/project-')) {
      this.currentPage = 'portfolio-subpage';
    } else {
      this.currentPage = 'main';
    }
  }

  /**
   * Cache navigation elements for performance
   */
  cacheNavigationElements() {
    // Cache main navigation links
    const navContainer = document.querySelector('.w-nav-menu');
    if (!navContainer) return;

    // Map navigation links to their corresponding sections/pages
    const linkMappings = [
      { href: '#hero', id: 'home', element: null },
      { href: '#portfolio', id: 'portfolio', element: null },
      { href: '#about', id: 'about', element: null },
      { href: '#contact', id: 'contact', element: null },
      { href: '/portfolio/project-1', id: 'project-1', element: null },
      { href: '/portfolio/project-2', id: 'project-2', element: null },
      { href: '/portfolio/project-3', id: 'project-3', element: null }
    ];

    // Find and cache navigation elements
    linkMappings.forEach(mapping => {
      const link = navContainer.querySelector(`a[href*="${mapping.href}"]`);
      if (link) {
        mapping.element = link;
        this.navLinks.set(mapping.id, mapping);
      }
    });
  }

  /**
   * Set up Intersection Observer for section detection
   */
  setupIntersectionObserver() {
    // Only run on main page
    if (this.currentPage !== 'main') return;

    const options = {
      root: null, // Use viewport as root
      rootMargin: this.config.rootMargin,
      threshold: this.config.threshold
    };

    this.observer = new IntersectionObserver((entries) => {
      this.handleIntersection(entries);
    }, options);

    // Observe all sections
    this.sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        this.observer.observe(section);
      }
    });
  }

  /**
   * Handle intersection observer entries
   */
  handleIntersection(entries) {
    // Clear existing debounce timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Debounce the intersection handling
    this.debounceTimer = setTimeout(() => {
      this.processIntersectionEntries(entries);
    }, this.config.debounceMs);
  }

  /**
   * Process intersection observer entries and update navigation
   */
  processIntersectionEntries(entries) {
    const visibleSections = [];

    // Collect all visible sections with their visibility ratio
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleSections.push({
          id: entry.target.id,
          ratio: entry.intersectionRatio,
          top: entry.boundingClientRect.top
        });
      }
    });

    // Determine the most appropriate active section
    const activeSection = this.determineActiveSection(visibleSections);
    
    if (activeSection && activeSection !== this.currentSection) {
      this.updateNavigationState(activeSection);
      this.currentSection = activeSection;
    }
  }

  /**
   * Determine which section should be considered active
   */
  determineActiveSection(visibleSections) {
    if (visibleSections.length === 0) return null;

    // If only one section is visible, use it
    if (visibleSections.length === 1) {
      return visibleSections[0].id;
    }

    // Multiple sections visible - use smart selection logic
    
    // 1. Prioritize section with highest visibility ratio
    visibleSections.sort((a, b) => b.ratio - a.ratio);
    
    // 2. If ratios are similar, prefer the one closest to top of viewport
    const topSection = visibleSections[0];
    const secondSection = visibleSections[1];
    
    if (Math.abs(topSection.ratio - secondSection.ratio) < 0.1) {
      // Ratios are similar, use the one with smaller absolute top value
      return Math.abs(topSection.top) < Math.abs(secondSection.top) ? 
             topSection.id : secondSection.id;
    }
    
    return topSection.id;
  }

  /**
   * Update navigation state for main page sections
   */
  updateNavigationState(sectionId) {
    // Clear all current states
    this.clearNavigationStates();

    // Map section to navigation ID
    const navMapping = {
      'hero': 'home',
      'portfolio': 'portfolio',
      'about': 'about', 
      'contact': 'contact'
    };

    const navId = navMapping[sectionId];
    if (navId && this.navLinks.has(navId)) {
      const navItem = this.navLinks.get(navId);
      if (navItem.element) {
        navItem.element.classList.add('w--current');
      }
    }
  }

  /**
   * Handle portfolio subpage navigation state
   */
  handlePortfolioSubpage() {
    const path = window.location.pathname;
    let projectId = null;

    // Extract project ID from URL
    if (path.includes('/portfolio/project-1')) projectId = 'project-1';
    else if (path.includes('/portfolio/project-2')) projectId = 'project-2';
    else if (path.includes('/portfolio/project-3')) projectId = 'project-3';

    if (projectId) {
      this.clearNavigationStates();
      
      // Set portfolio parent as current-parent
      const portfolioNav = this.navLinks.get('portfolio');
      if (portfolioNav && portfolioNav.element) {
        portfolioNav.element.classList.add('w--current-parent');
      }
      
      // Set specific project as current
      const projectNav = this.navLinks.get(projectId);
      if (projectNav && projectNav.element) {
        projectNav.element.classList.add('w--current');
      }
    }
  }

  /**
   * Handle initial state on page load
   */
  handleInitialState() {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const sectionId = hash.substring(1); // Remove #
      this.updateNavigationState(sectionId);
      this.currentSection = sectionId;
    } else {
      // Default to hero section on main page
      this.updateNavigationState('hero');
      this.currentSection = 'hero';
    }
  }

  /**
   * Clear all navigation states
   */
  clearNavigationStates() {
    this.navLinks.forEach(navItem => {
      if (navItem.element) {
        navItem.element.classList.remove('w--current', 'w--current-parent');
      }
    });
  }

  /**
   * Clean up observers and event listeners
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }

    this.navLinks.clear();
  }
}

/**
 * Enhanced navigation setup function that replaces the basic nav setup
 */
export function setupNav() {
  const navManager = new NavigationManager();
  navManager.init();

  // Also setup the mobile nav toggle (preserve existing functionality)
  const navButton = document.querySelector('.navbar-icon-button');
  const navMenu = document.querySelector('.w-nav-menu');

  if (navButton && navMenu) {
    const toggleNav = () => {
      const isOpen = navMenu.classList.contains('is-open');

      navMenu.classList.toggle('is-visible', !isOpen);
      setTimeout(
        () => {
          navMenu.classList.toggle('is-open', !isOpen);
        },
        isOpen ? 300 : 10
      );
    };

    navButton.addEventListener('click', toggleNav);
    
    // Return cleanup function
    return () => {
      navManager.destroy();
      navButton.removeEventListener('click', toggleNav);
    };
  }

  // Return cleanup function for navigation manager only
  return () => navManager.destroy();
}

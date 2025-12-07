// Preludio Landing Page - Main JavaScript
// Handles scroll animations and smooth scrolling

(function() {
    'use strict';

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        setupScrollAnimations();
        setupSmoothScroll();
    }

    /**
     * Setup Intersection Observer for scroll-triggered animations
     */
    function setupScrollAnimations() {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: Show all elements immediately
            showAllElements();
            return;
        }

        const observerOptions = {
            root: null, // viewport
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: '0px 0px -100px 0px' // Trigger slightly before element comes into view
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        // Observe all feature cards and phone mockups
        const elementsToAnimate = document.querySelectorAll('.feature-card, .phone-mockup');
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Handle intersection observer callback
     */
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                entry.target.classList.add('animate-in');

                // Optionally unobserve after animating (one-time animation)
                observer.unobserve(entry.target);
            }
        });
    }

    /**
     * Fallback for browsers without IntersectionObserver
     */
    function showAllElements() {
        const elements = document.querySelectorAll('.feature-card, .phone-mockup');
        elements.forEach(element => {
            element.classList.add('animate-in');
        });
    }

    /**
     * Setup smooth scroll for anchor links
     */
    function setupSmoothScroll() {
        // Select all links that start with #
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', handleAnchorClick);
        });
    }

    /**
     * Handle click on anchor links for smooth scrolling
     */
    function handleAnchorClick(event) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') {
            return;
        }

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            event.preventDefault();

            // Smooth scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update URL without jumping
            if (history.pushState) {
                history.pushState(null, null, href);
            }
        }
    }

    // Add staggered animation delays to feature cards
    function addStaggeredDelays() {
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        const screenshots = document.querySelectorAll('.phone-mockup');
        screenshots.forEach((screenshot, index) => {
            screenshot.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Call on init
    addStaggeredDelays();

})();

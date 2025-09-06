import { useEffect } from 'react';

/**
 * Custom hook to scroll to the top of a specific element when a condition changes
 * @param condition - The condition that triggers the scroll (e.g., step change, form open)
 * @param selector - CSS selector for the element to scroll to
 * @param options - Scroll options (behavior, block, inline)
 */
export const useScrollToTop = (
  condition: any,
  selector: string,
  options: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'start'
  }
) => {
  useEffect(() => {
    if (condition) {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView(options);
      }
    }
  }, [condition, selector, options]);
};

/**
 * Hook specifically for form step navigation
 * @param step - Current step number
 * @param selector - CSS selector for the form container
 */
export const useFormStepScroll = (step: number, selector: string = '.form-container') => {
  useScrollToTop(step, selector);
};

/**
 * Hook specifically for form open/close navigation
 * @param isOpen - Whether the form is open
 * @param selector - CSS selector for the form container
 */
export const useFormOpenScroll = (isOpen: boolean, selector: string = '.form-container') => {
  useScrollToTop(isOpen, selector);
};

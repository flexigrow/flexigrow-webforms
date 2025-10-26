import { createWebComponent } from "@/lib/web-component-wrapper";
import { MultiStepForm } from "./MultiStepForm";

/**
 * Multi-Step Form Web Component
 *
 * Usage in HTML/WordPress:
 *
 * <multi-step-form></multi-step-form>
 *
 * Using react-to-webcomponent library for web component creation
 * with Shadow DOM enabled for style isolation
 */

createWebComponent({
  tagName: "multi-step-form",
  Component: MultiStepForm,
  props: {},
  shadow: "open", // Enable shadow DOM
});

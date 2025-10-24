import { createWebComponent } from "@/lib/web-component-wrapper";
import { MultiStepForm } from "./MultiStepForm";

/**
 * Multi-Step Form Web Component
 *
 * Usage in HTML/WordPress:
 *
 * <multi-step-form></multi-step-form>
 */

createWebComponent({
  tagName: "multi-step-form",
  Component: MultiStepForm,
  attributes: [],
  observedAttributes: [],
});

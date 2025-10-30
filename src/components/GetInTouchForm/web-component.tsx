import { createWebComponent } from "@/lib/web-component-wrapper";
import { GetInTouchForm } from "./GetInTouchForm";

createWebComponent({
  tagName: "get-in-touch-form",
  Component: GetInTouchForm,
  props: {},
  shadow: "open",
});

import "external-library";
import { bootstrapApplication } from "@angular/platform-browser";
import { App } from "./app/app";
import { provideZonelessChangeDetection } from "@angular/core";

bootstrapApplication(App, {
  providers: [provideZonelessChangeDetection()],
});

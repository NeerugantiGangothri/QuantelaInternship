# Angular Components Guide
 Table of Contents
Introduction,
Creating a Component,
Component Structure,
Data Binding in Components:
    `Interpolation`
    `Property Binding`
    `Event Binding`
    `Two-Way Data Binding`
Component Interaction:
    `@Input()`
    `@Output()`
Lifecycle Hooks,
Styling Components,
## Introduction
In Angular, components are the building blocks of the user interface (UI). Each component represents a view and is responsible for displaying and managing data, handling user interactions, and rendering the appropriate view.

## Key Features of Angular Components
Modular and reusable code.
Supports various types of data binding.
Communicates with other components using `@Input()` and `@Output()`.
Lifecycle hooks to manage component creation and destruction.

## Creating a Component
Using Angular CLI
To create a component using Angular CLI, run the following command:
ng generate component component-name

This command creates:
TypeScript file (`.ts`): Contains the logic and data.
HTML file (`.html`): Contains the structure and layout.
CSS/SCSS file (`.cssor .scss`): Contains styles.
Spec file (`.spec.ts`): For testing the component.

## Manual Creation

Create a `.ts` file for the TypeScript logic.
Create an `.html` file for the template.
Create a `.css` file for styles.
Use the `@Component` decorator to define metadata for the component.

## Component Structure
A typical Angular component consists of four parts:

HTML Template: Defines the view structure.
CSS Styles: Defines the styles for the component.
TypeScript Class: Contains the component's logic.
Metadata (`@Component` Decorator): Links the class to the template and styles.
### Example:
typescript

import { Component } from '@angular/core';

@Component({
  selector: 'app-example',  // The tag used to include this component
  templateUrl: './example.component.html',  // Path to the template
  styleUrls: ['./example.component.css']  // Path to styles
})
export class ExampleComponent {
  title = 'Hello Angular Component!';
  showAlert() {
    alert('Button clicked!');
  }
}

## Data Binding in Components
Angular provides four main types of data binding:

## Interpolation
Displays data in the template using {{}} syntax.

html
`<h1>{{ title }}</h1>`

Property Binding
Binds properties of DOM elements to component data.

html
`<img [src]="imageUrl">`

Event Binding
Binds DOM events to component methods.

html
<button (click)="showAlert()">Click Me</button>

Two-Way Data Binding
Syncs data between the component and the view using [(ngModel)].

html
<input [(ngModel)]="username">

To use two-way binding, ensure you have the FormsModule imported in your module:
typescript
`import { FormsModule } from '@angular/forms';`


## Component Interaction
[@Input()]
Allows a parent component to pass data to a child component.

typescript
// child.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<p>{{ name }}</p>`
})
export class ChildComponent {
  @Input() name: string;  // Parent passes this value
}
@Output()
Allows a child component to emit an event to its parent.

typescript
// child.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-child',
  template: `<button (click)="sendMessage()">Send Message</button>`
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit('Hello from Child');
  }
}

## Lifecycle Hooks
Angular components have a lifecycle managed by Angular, and lifecycle hooks provide a way to tap into specific moments in a component's life.

`ngOnInit()`: Called once after the component is initialized.
`ngOnChanges()`: Called when input properties change.
`ngOnDestroy()`: Called just before the component is destroyed.

## Example of ngOnInit:
typescript
export class ExampleComponent implements OnInit {
  ngOnInit() {
    console.log('Component initialized!');
  }
}


## Styling Components
Components can have their own styles, and Angular provides several options for styling:

## Scoped Styles
Styles defined in a component’s .css file are scoped to that component by default.

## Global Styles
You can also add global styles to the styles.css or styles.scss file in the root of the application.

## Inline Styles
You can define inline styles directly in the `@Component` decorator:

typescript
@Component({
  selector: 'app-inline',
  template: `<p>Inline component</p>`,
  styles: [`p { color: blue; }`]
})
export class InlineComponent {}

## Best Practices
Keep Components Simple: Each component should only focus on one thing (e.g., displaying data, handling user input).
Use Services for Business Logic: Keep your components clean by moving logic into services.
Follow Naming Conventions: Use meaningful names for your components, and suffix them with Component (e.g., UserComponent).
Avoid Large Components: Break down large components into smaller, reusable components.
Use Lifecycle Hooks Appropriately: Use lifecycle hooks for specific use cases, like fetching data (ngOnInit) or cleaning up resources (ngOnDestroy).

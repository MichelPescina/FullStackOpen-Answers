# Full Stack Open - Part 0
## Exercise 0.4

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser gets the page from the server <br> and the user introduces a new message inside <br> the form and clicks the Save button.

    Note right of browser: The POST request's body contains the message: <br> note=Hola+a+todos%21

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server

    Note left of server: Receives the POST request, reads it<br>and pushes the new note into the array.
    
    server-->>browser: 302 Found Response - Redirects to /exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: The JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript <br> code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content":"test","date":"2025-04-10"}, ...]
    deactivate server

    Note right of browser: The browser executes the callback <br> function that renders the notes
```

## Exercise 0.5

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML Document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: The JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code.

    Note right of browser: The script attaches a function that <br> handles the creation of new notes in SPA fashion.

    Note right of browser: The script sends a GET request to <br> fetch notes data from server as JSON.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content":"test","date":"2025-04-10"}, ...]
    deactivate server

    Note right of browser: The browser executes the callback <br> function that renders the notes
```

## Exercise 0.6

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML Document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: The JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code.

    Note right of browser: The script attaches a function that <br> handles the creation of new notes in SPA fashion.

    Note right of browser: The script sends a GET request to <br> fetch notes data from server as JSON.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content":"test","date":"2025-04-10"}, ...]
    deactivate server

    Note right of browser: The browser executes the callback <br> function that parses and renders the notes.

    Note right of browser: The user introduces a new message inside <br> the form and clicks the Save button.

    Note right of browser: The browser redraws notes with new one <br> added and sends a POST request to the server.

    Note right of browser: The POST request's body contains the message: <br> {"content":"₍^. .^₎⟆","date":"2025-04-11T04:35:40.831Z"}

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server

    Note left of server: Receives the POST request, reads it,<br> validates and pushes the new note into the array.
    
    server-->>browser: 201 Created Response <br>Body {"message":"note created"}
    deactivate server

```
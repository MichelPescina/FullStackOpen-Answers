# Full Stack Open - Part 0
## Excersice 0.4

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser gets the page from the server <br> and the user introduces a new message inside <br> the form and clicks the Save button.

    Note right of browser: The POST request's body contains the message: <br> note=Hola+a+todos%21

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server

    Note left of server: Receives the POST request, extracts it<br>and pushes the new note into the array.
    
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

## Excersice 0.5
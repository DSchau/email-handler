import * as React from 'react';

export function EmailTemplate({
  email = '',
  message: messageContent,
  name,
  subject = 'Hello from dustinschau.com'
}) {
  return (
    <container>
      <row>
        <column small="12" large="4">
          <callout class="success">
            <p>Created a new folder. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </callout>
        </column>
        <column small="12" large="8"></column>
      </row>
    </container>
  );
}

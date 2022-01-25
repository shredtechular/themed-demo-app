# LaunchDarkly - Themed Demo App for Solutions Engineers

## Getting Started

1. Create a .env file in the project root
2. Add the following keys and supply your own values:

    - REACT_APP_LD_CLIENT_SIDE_ID=[your client id]
    - REACT_APP_GITHUB_PAGES_URL=[your github pages URL]
    - REACT_APP_LD_PROJECT_KEY=[your project key]
    - REACT_APP_LD_PROJECT_ENV_KEY=[your environment key]
    - REACT_APP_LD_API_KEY=[your api key]

3. Open src/main.tf in your favorite text editor
4. Update the locals section with your LaunchDarkly settings
5. From a command line, change to the src directory
6. (Optional) Run 'terraform apply' to create the required feature flags
7. Run npm install
8. Open package.json
9. Remove the 'homepage' attribute and value
10. Run npm start to start the app on localhost:3000
11. The following flags are available and will affect the app:

- DemoAdmin (bool) - when true, allows the user to set the theme and targeting rules for the sound feature from the app without having to go to LaunchDarkly!
Make sure you have targeting rules in place to only allow certain user(s) (or nobody) during your demo to have this.

- DemoBroken (bool) - when true, a blue scrseen of death will show up when the user clicks the first link in the navigation header (if any are configured in theme.json)

- DemoQRCode (bool) - when true, shows the QR code for the app's GitHub pages URL on the screen so that users can scan with their phone and play along at home.

- DemoServerDown (bool) - when true, a red screen of death will show for all users (unless you apply targeting in LD). this is good to simulate some massive server failure, then toggled off to demonstrate how to restore peace and happiness when a new server feature release breaks everyone.

- DemoSoundEnabled (bool) - when true, allows the main image to be clicked on/tapped to play a sound. Every theme has a default sound that plays (if targeting rules are satisfied), or each item in the theme.json items list can have it's own sound by supplying the URL to the sound file in the 'sound' attribute

- DemoTheme (string) - a list of string names that correspond to a theme in public/themes.

How to set targeting rules for the sound feature
-

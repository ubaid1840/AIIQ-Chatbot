# WordPress Plugin: Admin Panel and Floating Chatbot
This WordPress plugin integrates an admin panel and a floating chatbot, each developed in React with Bootstrap. The admin panel is accessible from the WordPress dashboard, and the chatbot is available on all front-end pages.

# Repository Structure
AIIQ Chatbot: Containg all the files and folders of admin panel, floating chatbot and wordpress plugin.

# Directory Structure

AIIQ Chatbot/
├── admin-panel/
│   ├── build/                  # build folder of admin pane;
│   ├── classes/
│   ├── src/                    # source files
│   ├── package.json
│   ├── package-lock.json
│   ├── webpack.config.js
│   └── wp-admin-panel.php
├── floating-chatbot/
│   ├── build/                  # build folder of floatin chatbot;
│   ├── src/                    # source files
│   ├── floating-chatbot.php
│   ├── package.json
│   ├── package-lock.json
│   └── webpack.config.js
└── WordPress Plugin/
    ├── bot/
    │   └── build/              # build folder of floating chatbot (copied from floating chatbot folder)
    ├── build/                  # build folder of admin panel (copied from admin panel folder)
    ├── classes/                
    └── wp-admin-panel.php

# Working with Admin Panel individually

1. Ensure WordPress is Installed Locally:
Make sure you have a local installation of WordPress.

2. Copy the Admin Panel Folder:
Navigate to your local WordPress site directory (e.g., wordpress/wp-content/plugins) and paste the admin-panel folder there.

3. Install Dependencies:
Open the admin-panel folder in your terminal and run:
npm install --force
This command will download all the required dependencies.

4. Build the Project:
Run the following command to create or update the build folder:
npm run build

5. Activate the Plugin:
Go to your local WordPress site, navigate to the Plugins section, and activate the "AIIQ" plugin.

6. Develop and Refresh:
Whenever you make changes to the admin panel code, ensure to run the npm run build command again and refresh your WordPress site to see the updated changes.

# Working with Floating Chatbot individually

1. Ensure WordPress is Installed Locally:
Make sure you have a local installation of WordPress.

2. Copy the floating chatbot Folder:
Navigate to your local WordPress site directory (e.g., wordpress/wp-content/plugins) and paste the floating-chatbot folder there.

3. Install Dependencies:
Open the floating-chatbot folder in your terminal and run:
npm install --force
This command will download all the required dependencies.

4. Build the Project:
Run the following command to create or update the build folder:
npm run build

5. Activate the Plugin:
Go to your local WordPress site, navigate to the Plugins section, and activate the "Floating Chatbot" plugin.

6. Develop and Refresh:
Whenever you make changes to the admin panel code, ensure to run the npm run build command again and refresh your WordPress site to see the updated changes.

# Combining Both Projects

To integrate the admin panel and floating chatbot into a single WordPress plugin, follow these steps:

1. Copy Files from Admin Panel:
    - Navigate to the admin-panel folder.
    - Copy the build, classes, and wp-admin-panel.php files and folders.
    - Paste these into the WordPress Plugin folder.

2. Copy Files from Floating Chatbot:
    - Navigate to the floating-chatbot folder.
    - Copy the build folder.
    - Paste this into the bot folder inside the WordPress Plugin folder.

3. Prepare the Plugin for Upload:

    - Ensure the WordPress Plugin folder now contains:

WordPress Plugin/
├── bot/
│   └── build/              # Build folder of floating chatbot (copied from floating chatbot folder)
├── build/                  # Build folder of admin panel (copied from admin panel folder)
├── classes/                
└── wp-admin-panel.php

Zip the WordPress Plugin folder to create a compressed archive.

4. Upload and Install the Plugin:
    - Open your WordPress admin dashboard.
    - Navigate to Plugins -> Add New.
    - Click Upload Plugin and select the zip archive created in the previous step.
    - Click Install Now and then activate the plugin once the installation is complete.

By following these steps, you will have successfully combined the admin panel and floating chatbot into a single, functional WordPress plugin.




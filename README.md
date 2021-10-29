This is a repository for various react/tailwindcss projects that each define a specific generic component.

the files required to copy any component goes as follows:
ComponentFile.js - the actual component
Index.css - for tailwind utility classes
ComponentFolder (various other files it uses, custom hooks, etc)

additionally, some components might be related, so they'll have a structure like this:

ComponentFileA.js
ComponentFolderA

sharedCodeFolder

ComponentFileB.js
ComponentFolderB

and in the index.css file, there will be a clear distinction between the utilities for each component - and/or potentially shared utilities

more info can alwasy be found in each react-app's README file
# Obsidian Emacs Hotkey

Unstable.
W.I.P

This plugin provides some Emacs-like command.
If you set a hotkey to these commands, you can edit Obsidian Notes like emacs.
At now, below shortcut is implemented.

+ `C-p`, `C-n`, `C-f`, `C-b`, `C-a`, `C-e`: Moving around
+ `C-h`: Backspace
+ `C-d`: Delete
+ `C-k`, `C-y`, `C-Space`, `C-w`: Kill, yank, mark are derived from [https://github.com/inouetakuya/obsidian-kill-and-yank]
+ `C-/`: Undo

This plugin has default keymaps, so many conflict will occur at first time.
Because of this, you need configure hotkeys for these new commands.

## How to use

+ Clone this repo.
+ `npm i` or `yarn` to install dependencies
+ `npm run dev` to start compilation in watch mode.

## Manually installing the plugin

+ Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.
+ Enable plugin in Obsidian setting.

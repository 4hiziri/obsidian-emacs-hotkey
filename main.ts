import { getCurves } from 'crypto';
import { App, Editor, MarkdownView, Scope, Hotkey, Modal, Notice, Plugin, PluginSettingTab, Setting, EditorPosition } from 'obsidian';

// editorCheckCallback: デフォルトのホットキーと衝突させないためのCallback
// デフォルトで衝突してしまうものだからどうしようか
// 衝突するキーマップを解除した.obsidian/hotkeys.jsonを直接配布?
// C-M-a - editor.exec('goStart'); // これはこれで使えるのでメモしておく

export default class EmacsHotkey extends Plugin {
	async onload() {
		this.addCommand({
			id: 'emacs-head-line',
			name: 'Go head line',
			hotkeys: [{ modifiers: ['Ctrl'], key: 'a' }],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				let pos: EditorPosition = editor.getCursor();
				pos.ch = 0;
				editor.setCursor(pos);
			}
		});

		this.addCommand({
			id: 'emacs-line-end',
			name: 'Go end line',
			hotkeys: [{ modifiers: ['Ctrl'], key: 'e' }],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				let pos: EditorPosition = editor.getCursor();
				let len = editor.getLine(pos.line).length;
				pos.ch = len;
				editor.setCursor(pos);
			}
		});

		this.addCommand({
			id: 'emacs-previous-line',
			name: 'Go previous line',
			hotkeys: [{ modifiers: ['Ctrl'], key: 'p' }],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.exec('goUp');
			}
		});

		this.addCommand({
			id: 'emacs-next-line',
			name: 'Go next line',
			hotkeys: [{ modifiers: ['Ctrl'], key: 'n' }],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.exec('goDown');
			}
		});

		this.addCommand({
			id: 'emacs-forward-char',
			name: 'Go forward char',
			hotkeys: [{ modifiers: ['Ctrl'], key: 'f' }],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.exec('goRight');
			}
		});

		this.addCommand({
			id: 'emacs-backward-char',
			name: 'Go backward char',
			hotkeys: [{ modifiers: ['Ctrl'], key: 'b' }],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.exec('goLeft');
			}
		});
	}

	onunload() {

	}
}
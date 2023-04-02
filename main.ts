import { getCurves } from 'crypto';
import { App, Editor, MarkdownView, Scope, Hotkey, Modal, Notice, Plugin, PluginSettingTab, Setting, EditorPosition } from 'obsidian';

// 衝突するキーマップを解除した.obsidian/hotkeys.jsonを直接配布?

// C-M-a - editor.exec('goStart'); // これはこれで使えるのでメモしておく

// TODO: 欲しいキー
// C-h = backspace
// C-d = delete
// C-uは無理か
// とりあえずで実装してしまう、CodeMirrorとかの考慮はあと

export default class EmacsHotkey extends Plugin {
	private mark: EditorPosition | null = null;

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
				const len = editor.getLine(pos.line).length;
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

		this.addCommand({
			id: 'emacs-kill-line',
			name: 'Emacs kill line',
			hotkeys: [{ modifiers: ['Ctrl'], key: 'k' }],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const pos: EditorPosition = editor.getCursor();
				const line: string = editor.getLine(pos.line);

				const textToBeRetained: string = line.slice(0, pos.ch);
				const textToBeCut: string = line.slice(pos.ch);

				navigator.clipboard.writeText(textToBeCut);

				editor.setLine(pos.line, textToBeRetained);
				editor.setCursor(pos, pos.ch); // setLineとかすると位置が行頭になるっぽい
			},
		})

		this.addCommand({
			id: 'emacs-kill-region',
			name: 'Emacs kill region',
			hotkeys: [{ modifiers: ['Ctrl'], key: 'w' }],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				if (this.mark) {
					editor.setSelection(this.mark, editor.getCursor());
					this.mark = null;
				}
				navigator.clipboard.writeText(editor.getSelection());
				editor.replaceSelection('');
			},
		})

		this.addCommand({
			id: 'emacs-yank',
			name: 'Emacs yank',
			hotkeys: [{ modifiers: ['Ctrl'], key: 'y' }],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				navigator.clipboard.readText().then((text) => {
					editor.replaceSelection(text);
				})
			},
		})

		this.addCommand({
			id: 'emacs-set-mark',
			name: 'Emacs set mark',
			hotkeys: [{ modifiers: ['Ctrl'], key: ' ' }],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.mark = editor.getCursor();
			},
		})

		this.addCommand({
			id: 'emacs-undo',
			name: 'Emacs undo',
			hotkeys: [{ modifiers: ['Ctrl'], key: '/' }],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.undo();
			},
		})

		// this.addCommand({
		// 	id: 'emacs-backspace',
		// 	name: 'Emacs backspace',
		// 	hotkeys: [{ modifiers: ['Ctrl'], key: 'h' }],
		// 	editorCallback: (editor: Editor, view: MarkdownView) => {
		// 		editor.exec('goLeft');

		// 	},
		// })
	}

	onunload() {}
}
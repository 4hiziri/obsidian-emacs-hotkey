import { getCurves } from 'crypto';
import { App, Editor, MarkdownView, Scope, Hotkey, Modal, Notice, Plugin, PluginSettingTab, Setting, EditorPosition } from 'obsidian';

// editorCheckCallback: デフォルトのホットキーと衝突させないためのCallback
// デフォルトで衝突してしまうものだからどうしようか
// 衝突するキーマップを解除した.obsidian/hotkeys.jsonを直接配布?
// C-M-a - editor.exec('goStart'); // これはこれで使えるのでメモしておく

// https://github.com/inouetakuya/obsidian-kill-and-yank/
// からkill yankを実装
// MITだから適当にREADMEの最後にでも記載する
// TODO: ライセンスとかに色々反映

export default class EmacsHotkey extends Plugin {
	private mark: EditorPosition | null = null;

	// private isComposing(view: MarkdownView): boolean {
	// 	const editorView = view.editor.cm as EditorView;
	// 	return editorView.composing;
	// }

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
			editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
				// if (this.isComposing(view)) return;
				new Notice(checking.toString());

				const pos: EditorPosition = editor.getCursor();
				const line: string = editor.getLine(pos.line);

				const textToBeRetained = line.slice(0, pos.ch);
				const textToBeCut = line.slice(pos.ch);

				navigator.clipboard.writeText(textToBeCut);

				editor.setLine(pos.line, textToBeRetained);
				// editor.setCursor(pos, pos.ch);
			},
		})

		this.addCommand({
			id: 'emacs-kill-region',
			name: 'Emacs kill region',
			hotkeys: [{ modifiers: ['Ctrl'], key: 'w' }],
			editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
				// if (this.isComposing(view)) return
				new Notice(checking.toString());

				if (this.mark) {
					editor.setSelection(this.mark, editor.getCursor());
					this.mark = null;
				}
				navigator.clipboard.writeText(editor.getSelection());
				editor.replaceSelection('');
			},
		})

		this.addCommand({
			id: 'emacs yank',
			name: 'Emacs yank',
			hotkeys: [{ modifiers: ['Ctrl'], key: 'y' }],
			editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
				// if (this.isComposing(view)) return
				new Notice(checking.toString());

				navigator.clipboard.readText().then((text) => {
					editor.replaceSelection(text);
				})
			},
		})

		this.addCommand({
			id: 'set-mark',
			name: 'Set mark (Toggle the start position of the selection)',
			hotkeys: [{ modifiers: ['Ctrl'], key: ' ' }],
			editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
				new Notice(checking.toString());

				if (this.mark) {
					editor.setSelection(this.mark, editor.getCursor());
					this.mark = null;
				} else {
					this.mark = editor.getCursor();
				}
			},
		})
	}

	onunload() {}
}
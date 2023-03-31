import { getCurves } from 'crypto';
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class EmacsHotkey extends Plugin {
	async onload() {
		this.addCommand({
			id: 'emacs-goto-head',
			name: 'Emacs go to head',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				new Notice(editor.getCursor().toString());
			}
		});
	}

	onunload() {

	}
}
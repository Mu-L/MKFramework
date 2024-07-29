import * as cc from "cc";
import mk from "mk";
import mvc_model_base from "./base/mvc_model_base";
import mvc_view_base from "./base/mvc_view_base";
import mvc_control_base from "./base/mvc_control_base";
import { _decorator } from "cc";
const { ccclass, property } = _decorator;

export class resources_module_mvc_model extends mvc_model_base {
	test = "123";
}

export class resources_module_mvc_control extends mvc_control_base {
	protected _model = new resources_module_mvc_model();
	protected _view!: resources_module_mvc_view;

	async open(): Promise<void> {
		await mk.ui_manage.regis(resources_module_mvc_view, "db://assets/resources/module/module/mvc/resources_module_mvc.prefab", null);
		this._view = (await mk.ui_manage.open(resources_module_mvc_view))!;

		// 数据到视图
		mk.monitor
			.on(
				this._model,
				"test",
				() => {
					this._view.show_test(this._model.test);
				},
				this
			)
			?.call(this, this._model.test);

		// 用户输入
		this._view.button.node.on(
			cc.Button.EventType.CLICK,
			() => {
				this.close();
			},
			this
		);
	}

	close(): void {
		mk.ui_manage.unregis(resources_module_mvc_view);
	}

	// 外部接口
	update_test(value_s_: string): void {
		this._model.test = value_s_;
	}
}

@ccclass("resources_module_mvc_view")
class resources_module_mvc_view extends mvc_view_base {
	@property(cc.Label)
	label: cc.Label = null!;

	@property(cc.Button)
	button: cc.Button = null!;

	show_test(value_s_: string): void {
		this.label.string = value_s_;
	}
}

export default resources_module_mvc_view;

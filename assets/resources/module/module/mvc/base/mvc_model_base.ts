import mk from "mk";
import tool from "../../../../../tool/tool";

class mvc_model_base {
	constructor() {
		this.open?.();
		tool.func.run_parent_func(this, ["open", "close"]);
	}

	open?(): void;
	close() {
		tool.object.reset(this, true);
		mk.monitor.clear(this);
	}
}

export default mvc_model_base;

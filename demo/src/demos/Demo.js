import { FogExp2, LoadingManager, PerspectiveCamera, Scene } from "three";

/**
 * A demo base class.
 */

export class Demo {

	/**
	 * Constructs a new demo.
	 *
	 * @param {WebGLRenderer} renderer - A renderer.
	 */

	constructor(renderer) {

		/**
		 * A renderer.
		 *
		 * @type {WebGLRenderer}
		 */

		this.renderer = renderer;

		/**
		 * A loading manager.
		 *
		 * @type {LoadingManager}
		 */

		this.loadingManager = new LoadingManager();

		/**
		 * An asset map.
		 *
		 * @type {Map}
		 */

		this.assets = null;

		/**
		 * A scene.
		 *
		 * @type {Scene}
		 */

		this.scene = new Scene();
		this.scene.fog = new FogExp2(0x0d0d0d, 0.0025);

		/**
		 * A camera.
		 *
		 * @type {PerspectiveCamera}
		 */

		this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);

		/**
		 * Camera controls.
		 *
		 * @type {OrbitControls}
		 */

		this.controls = null;

	}

	/**
	 * Loads the demo. Override this method to load assets.
	 *
	 * @param {Function} callback - Call this function when all assets have been loaded.
	 */

	load(callback) { callback(); }

	/**
	 * Creates the scene.
	 */

	initialise() {}

	/**
	 * Renders this demo.
	 *
	 * @param {Number} delta - The time since the last frame in seconds.
	 */

	render(delta) {}

	/**
	 * Registers configuration options.
	 *
	 * @param {GUI} gui - A GUI.
	 */

	configure(gui) {}

	/**
	 * Resets this demo.
	 *
	 * @return {Demo} This demo.
	 */

	reset() {

		const fog = this.scene.fog;

		this.scene = new Scene();
		this.scene.fog = fog;

		if(this.controls !== null) {

			this.controls.dispose();
			this.controls = null;

		}

		return this;

	}

}
